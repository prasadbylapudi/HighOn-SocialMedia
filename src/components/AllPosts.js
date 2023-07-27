import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8000/getAllPosts')
      .then((res) => {
        setPosts(res.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  if (posts.length === 0) {
    return <LoadingButton />;
  }

  return (
    <div>
      {posts.map((post) => (
        <Card sx={{ maxWidth: 400, margin: '0 auto' }} key={post.id}>
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
      ))}
    </div>
  );
}

export default AllPosts;
