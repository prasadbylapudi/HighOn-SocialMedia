import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import AllPosts from './AllPosts';
import Header from './Header';
import '../App.css';

export default function SinglePostPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (postId) {                                                                                                   
      axios
        .post("http://localhost:8000/getPostById", { id: postId })
        .then((res) => {
          setPost(res.data); // Assuming the response is the complete post object
        })
        .catch((error) => {
          console.error("Error fetching post:", error);
        });
    }
  }, [postId]);

  if (!post) {
    return <div>{<LoadingButton/>}</div>;
  }

  return (
    <div>
      <div className="Header">
        <Header />
      </div>
      <Card sx={{ maxWidth: 400, margin: '0 auto' }}>
      <CardMedia
        component="img"
        image={`${post.mediaUrl}?w=162&auto=format`}
        srcSet={`${post.mediaUrl}?w=162&auto=format&dpr=2 2x`}
        alt={post.description}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.description}
        </Typography>
      </CardContent>
    </Card> 
    <AllPosts />
    </div>
  );
}
