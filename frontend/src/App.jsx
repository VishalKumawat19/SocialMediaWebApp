import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import CreatePost from './pages/CreatePost/CreatePost'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home';
import MyPosts from './pages/MyPosts/MyPosts';
import CreateProfile from './pages/CreateProfile/CreateProfile';
import SeeProfile from './pages/SeeProfile/SeeProfile';
import EditProfile from './pages/EditProfile/EditProfile';
import NotFound from './pages/NotFound/NotFound';
import { AlertProvider } from './ContextApi/AlertContext';
import {AuthProvider } from './ContextApi/AuthContext';
function App() {
  // const API_BASE_URL = import.meta.env.API_BASE_URL;
  const location = useLocation();
  const noNavRoutes = ['/', '/register'];

  return (
    <>
    <AlertProvider>
    <AuthProvider>
    
      {!noNavRoutes.includes(location.pathname) &&(<Navbar />) }
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/post/new" element={<CreatePost />} />
        <Route path="/my-posts" element={<MyPosts />} />
        <Route path="/profile/new" element={<CreateProfile />} />
        <Route path="/profile" element={<SeeProfile />} />
        <Route path="/profile/modify" element={<EditProfile />} />
        <Route path="*" element={<NotFound />} />  
      </Routes>
      
      </AuthProvider>
      </AlertProvider>
    </>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

