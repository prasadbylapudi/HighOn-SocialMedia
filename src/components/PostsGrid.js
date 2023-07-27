import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Masonry from '@mui/lab/Masonry';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Link } from 'react-router-dom';
const Label = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
}));

const LikeButton = ({ isLiked, handleLike }) => (
  <IconButton onClick={handleLike}>
    {isLiked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
  </IconButton>
);

const PostItem = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked((prevIsLiked) => !prevIsLiked);
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Wrap the PostItem with the Link component */}
      <Link to={`/post/${post.id}`}>
        <img
          src={`${post.mediaUrl}?w=162&auto=format`}
          srcSet={`${post.mediaUrl}?w=162&auto=format&dpr=2 2x`}
          alt={post.description}
          loading="lazy"
          style={{
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            display: 'block',
            width: '100%',
          }}
        />
      </Link>
      <div style={{ position: 'absolute', bottom: 2, right: 20 }}>
        <LikeButton isLiked={isLiked} handleLike={handleLike} />
      </div>
    </div>
  );
};

export default function PostsGrid() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getPosts() {
      const res = await axios.get("http://localhost:8000/getAllPosts");
      setPosts(res.data);
    }
    getPosts();
  }, []);

  return (
    <div>    
      <Box sx={{ width: 350, margin: '0 auto' }}>
        <Masonry columns={2} spacing={1}>
          {posts.map((item) => (
            <PostItem key={item._id} post={item} />
          ))}
        </Masonry>
      </Box>
    </div>
  );
}
