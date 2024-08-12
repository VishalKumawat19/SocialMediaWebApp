import React from 'react';
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

function App() {
  const location = useLocation();
  const noNavRoutes = ['/login', '/register'];

  return (
    <>
      {!noNavRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/my-posts" element={<MyPosts />} />
        <Route path="/create-profile" element={<CreateProfile />} />
        <Route path="/profile" element={<SeeProfile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
      </Routes>
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

