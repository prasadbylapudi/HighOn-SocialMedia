import './App.css';
import React, { useState } from 'react';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import Header from './components/Header';
import PostsGrid from './components/PostsGrid';
import SinglePostPage from './components/SinglePostPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:postId" element={ <SinglePostPage/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

// Separate component for the home page, containing both Header and PostsGrid
function HomePage() {
  return (
    <div className="App">
      <div className="Header">
        <Header />
      </div>
      <hr />
      <div className="PostsGridContainer">
        <PostsGrid />
      </div>
    </div>
  );
}

export default App;
