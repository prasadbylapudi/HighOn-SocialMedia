import React, { useState,useCallback,useEffect } from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import AspectRatio from '@mui/joy/AspectRatio';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import CameraIcon from '@mui/icons-material/Camera';
import ImageIcon from '@mui/icons-material/Image';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/material/IconButton';
import { Image, Video } from 'cloudinary-react';
import Autocomplete from '@mui/joy/Autocomplete';
import {ButtonGroup } from '@mui/material';
import Input from '@mui/joy/Input';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import StyleIcon from '@mui/icons-material/Style';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import debounce from 'lodash.debounce';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

import AlertMsg from './AlertMsg'
const cloudinaryConfig = {
  cloud_name: "dcrqw0eie", // Replace with your Cloudinary cloud name
  upload_preset: "k3ecf9n6", // Replace with your Cloudinary upload preset
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Photography',
  'Food',
  'Gaming'
]; 
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}


export default function Header() {
    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);

  const [open, setOpen] = useState(false);
  const [openCreatePostModal, setOpenCreatePostModal] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [mediaStream, setMediaStream] = useState(null);
   const [selectedAspect, setSelectedAspect] = useState('1:1');
  const [description, setDescription] = useState('');
  const [openAspectRatioModal, setOpenAspectRatioModal] = useState(false);
    const [openImagePreviewModal, setOpenImagePreviewModal] = useState(false);
   const [imageDescription, setImageDescription] = useState(''); 
  const [taggedUsers, setTaggedUsers] = useState([]); 
  const [openImageDescriptionModal, setOpenImageDescriptionModal] = useState(false); 
  const [location, setLocation] = useState('');
  const [vibeTags, setVibeTags] = useState([]);
   const [users, setUsers] = useState([]);
     const [showAlert, setShowAlert] = useState(false);


  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get('http://localhost:8000/getAllUsers');
      setUsers(res.data);
    };
    fetchUsers();
  }, [uploadedImage]);
  
  const options = users.map((user) => ({
    //! label: `${user.name} (@${user.username})`,
        label: `${user.email}`,
        value: user.id,
  }));

   const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  
  const handleBackButtonClick = () => {
    setOpenAspectRatioModal(false);
    setOpenCreatePostModal(true);
  };
  
   const handleDescription = (event) => {
      setImageDescription(event.target.value);
      
    }
     const debouncedImageDescription = useCallback(
    debounce(handleDescription, 1000)
  , []);
   const handleSelectAspectRatio = (aspect) => {
    setSelectedAspect(aspect);
  };

  const handleCreatePost = () => {
    setOpenCreatePostModal(true);
  };

  const handleCloseCreatePostModal = () => {
    setOpenCreatePostModal(false);
    setUploadedImage(null);
  };

  const handlePostCreateNextButton = () => {
    setOpenCreatePostModal(false);
    setOpenAspectRatioModal(true);
  }
  const handleNextButtonClick = () => {
  setOpenAspectRatioModal(false); 
  setOpenImageDescriptionModal(true);
};
const handleSavePost = async() => {
      let postData={
        uploadedImage,
        imageDescription,
        //! taggedUsers,
        location,
        vibeTags,
      }
      const ressponse =await axios.post('http://localhost:8000/createPost', postData)
      console.log(">>>>postsaved",ressponse.data)
      if(ressponse.data.ok){
       setShowAlert(true);
       setTimeout(() => {
          setShowAlert(false);
        }, 4000);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }

      setOpenImageDescriptionModal(false); // Close the image description modal after saving the post
};

    //vibetags selection
    const vibeTagsSelection = (
      <div>
            <FormControl sx={{ m: 1, width: 290 }}>
              <InputLabel id="demo-multiple-chip-label">tags</InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {names.map((tagname) => (
                  <MenuItem
                    key={tagname}
                    value={tagname}
                    style={getStyles(tagname, personName, theme)}
                  >
                    {tagname}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
    );

  // Modal for Aspect Ratio Selection
  const AspectRatioModal = (
    <Modal open={openAspectRatioModal} onClose={() => setOpenAspectRatioModal(false)}>
      <ModalDialog sx={{ maxHeight: '600px', overflowY: 'scroll' }} >
        <Stack spacing={2}>
          <Typography sx={{px:6}} variant="h6">Select Aspect Ratio</Typography>
           <IconButton
            onClick={handleBackButtonClick}
            sx={{ position: 'absolute', top: 0, left: 0 }}
          >
            <ArrowBackIcon />
          </IconButton>
          
          <Button className="nextBtn" onClick={handleNextButtonClick} sx={{ position: 'absolute', top: 0, right: 5 }}>
          Next
        </Button>
          <AspectRatio
            variant="outlined"
            ratio={selectedAspect.replace(':', '/')}
            sx={{
              width: 300,
              bgcolor: 'background.level2',
              borderRadius: 'md',
            }}
          >
            {uploadedImage && (
              <Image
                cloudName={cloudinaryConfig.cloud_name}
                publicId={uploadedImage}
                width="100%"
                crop="fill"
              />
            )}
          </AspectRatio>
          <Typography variant="h6">Aspect Ratio: {selectedAspect}</Typography>
           <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            startDecorator={<AspectRatioIcon />}
            onClick={() => handleSelectAspectRatio('1:1')}
            variant="outlined" // Make the button outlined
          >
            1:1
          </Button>
          <Button
            startDecorator={<AspectRatioIcon />}
            onClick={() => handleSelectAspectRatio('4:5')}
            variant="outlined" // Make the button outlined
          >
            4:5
          </Button>
          <Button
            startDecorator={<AspectRatioIcon />}
            onClick={() => handleSelectAspectRatio('16:9')}
            variant="outlined" // Make the button outlined
          >
            16:9
          </Button>
        </Stack>
        </Stack>
      </ModalDialog>
    </Modal>
  );



  const ImageDescriptionModal = (
  <Modal open={openImageDescriptionModal} onClose={() => setOpenImageDescriptionModal(false)}>
    <ModalDialog sx={{ maxHeight: '600px', overflowY: 'scroll' }} >
      <Stack spacing={2}>
         <IconButton
          onClick={() => setOpenAspectRatioModal(true)}
            sx={{ position: 'absolute', top: 0, left: 0 }}
          >
            <ArrowBackIcon />
          </IconButton>
          
          <Button variant="outlined" color="primary" onClick={handleSavePost} sx={{ position: 'absolute', top: 0, right: 8 }}>
          Post
        </Button>
        <AspectRatio
          variant="outlined"
          ratio={selectedAspect.replace(':', '/')}
          sx={{
            width: 100,
            bgcolor: 'background.level2',
            borderRadius: 'md',
            mx: 'auto',
          }}
        >
          
          {uploadedImage && (
            <Image
              cloudName={cloudinaryConfig.cloud_name}
              publicId={uploadedImage}
              width="100%"
              crop="fill"
            />
          )}
        </AspectRatio>
        <Typography variant="h6">Aspect Ratio: {selectedAspect}</Typography>
        <TextField
          label="Post Description"
          variant="outlined"
          rows={2}
          value={imageDescription}
          onChange={handleDescription}
          multiline
          fullWidth
        />
        <h3>{<StyleIcon/>}Tag People</h3>
        <Autocomplete
          multiple
          options={options}
          getOptionLabel={(option) => option.label}
          value={taggedUsers}
          onChange={(event, newValue) => setTaggedUsers(newValue)}
          renderInput={(params) => <TextField {...params} label="Tag People" variant="outlined" />}
        />
        <h3>{<AddLocationIcon/>}Location</h3>
        <TextField
          label="Location..."
          variant="outlined"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          fullWidth
        />
        {/* Include the vibeTagsSelection here */}
        <h3>Add your vibeTags</h3>
        {vibeTagsSelection}
        
      </Stack>
    </ModalDialog>
  </Modal>
);


  const ImagePreviewModal = (
    <Modal open={openImagePreviewModal} onClose={() => setOpenImagePreviewModal(false)}>
      <ModalDialog sx={{ maxHeight: '80%', overflowY: 'scroll' }}>
        <Stack spacing={2}>
          
          <AspectRatio
            variant="outlined"
            ratio={selectedAspect.replace(':', '/')}
            sx={{
              width: 250,
              bgcolor: 'background.level2',
              borderRadius: 'md',
            }}
          >
            {uploadedImage && (
              <Image
                width="80"
                cloudName={cloudinaryConfig.cloud_name}
                publicId={uploadedImage}
                // width="100%"
                // crop="fill"
              />
            )}
          </AspectRatio>
          <Typography variant="h6">Aspect Ratio: {selectedAspect}</Typography>
          <Button variant="outlined" color="primary">
            Next
          </Button>
          <Button variant="outlined" color="primary">
            Back
          </Button>
        </Stack>
      </ModalDialog>
    </Modal>
  );
  
  const handleSelectFromGallery = async (acceptedFiles) => {
    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);
    formData.append('upload_preset', cloudinaryConfig.upload_preset);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloud_name}/image/upload`,
        formData
      );

      const imageURL = response.data.secure_url;
      setUploadedImage(imageURL);
      console.log('Uploaded Image URL:', imageURL);
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
    }
  };

  const handleSubmit = (buttonType) => {
    if (buttonType === 'post') {
      handleCreatePost();
    } else if (buttonType === 'story') {
      console.log('Create Story');
    }
    setOpen(false);
  };

  return (
    <div style={{ display: 'flex',alignContent:'center', alignItems: 'center',width:350, margin :'0 auto' }}>
      {/* Logo */}
      <img src="https://highon.co.in/static/media/logoImg.9635e655c9b2f2d82717.png" alt="Logo" style={{ width: 65, height: 50, marginRight: 'auto' }} />

      {/* New Project Button */}
      <Button
        variant="outlined"
        color="neutral"
        startDecorator={<AddIcon />}
        onClick={() => setOpen(true)}
      >
      </Button>
      <SearchRoundedIcon sx={{ ml: 2 }} />
      {/* Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          aria-labelledby="basic-modal-dialog-title"
          aria-describedby="basic-modal-dialog-description"
          sx={{ maxWidth: 500 }}
        >
          {/* Close Icon Button */}
          <IconButton
            onClick={() => setOpen(false)}
            sx={{ position: 'absolute', top: 0, right: 0 }}
          >
            <CloseIcon />
          </IconButton>

          {/* Modal Content */}
          <Stack spacing={2} sx={{ pt: 4 }}>
            <Button
              variant="outlined"
              color="secondary"
              startDecorator={<AddIcon />}
              onClick={() => handleSubmit('post')}
            >
              Create Post
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              startDecorator={<AddIcon />}
              onClick={() => handleSubmit('story')}
            >
              Create Story
            </Button>
          </Stack>
        </ModalDialog>
      </Modal>

      {/* Create Post Modal */}
      <Modal open={openCreatePostModal} onClose={handleCloseCreatePostModal}>
        <ModalDialog
          aria-labelledby="create-post-modal-title"
          aria-describedby="create-post-modal-description"
          sx={{ maxWidth: 500 }}
        >
          {/* Back Icon Button */}
          <IconButton
            onClick={handleCloseCreatePostModal}
            sx={{ position: 'absolute', top: 0, left: 0 }}
          >
            <ArrowBackIcon />
          </IconButton>
          

          {/* Modal Content */}
          <Stack spacing={2} sx={{ pt: 4 }}>
            <Stack spacing={2}>
              {uploadedImage ? (
                <div>
                  <Image cloudName={cloudinaryConfig.cloud_name} publicId={uploadedImage} width="200" />
                  <Button onClick={handlePostCreateNextButton} sx={{ position: 'absolute', top: 0, right: 0 }}>Next</Button>

                </div>
              ) : ( 
                <Dropzone onDrop={handleSelectFromGallery} accept="image/*" multiple={false}>
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()} style={{ cursor: 'pointer' }}>
                      <input {...getInputProps()} />
                      <Button sx={{px:6}} variant="outlined" color="secondary" startDecorator={<ImageIcon />}>
                        Select from Gallery
                      </Button>
                    </div>
                  )}
                </Dropzone>
              )}
              {!uploadedImage && (
                <Button
                  variant="outlined"
                  color="secondary"
                  startDecorator={<CameraIcon />}
                  onClick={() => {
                    console.log('Capture with Camera');
                  }}
                >
                  Capture with Camera
                </Button>
              )}
            </Stack>
          </Stack>
        </ModalDialog>
      </Modal>

      {showAlert && <AlertMsg />}
      {AspectRatioModal}

      {ImagePreviewModal}
      {ImageDescriptionModal}
    </div>
  );
}
