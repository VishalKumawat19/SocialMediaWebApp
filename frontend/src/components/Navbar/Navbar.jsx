import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';
import { logout } from '../../services/authService';
import { AuthContext } from '../../ContextApi/AuthContext';
import Spinner from '../Spinner/Spinner';
import logo from '../../assets/social_no_bg.png';

function Navbar() {
  const { isAuthenticated,setIsAuthenticated} = useContext(AuthContext);
  const [loading,setLoading] =useState(false)
  const navigateTo = useNavigate()


  
  const logoutHandler = async() =>{
    setLoading(true)
    const response = await logout()
    if(response.status==200){
      setLoading(false)
      setIsAuthenticated(false)
      navigateTo('/')
    }
  }

  if(loading) return <Spinner />;

  const handleLogoClick = () => {
    navigate('/home'); // Redirect to /home on logo click
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.leftLinks}>
        <img
          src={logo}
          alt="Logo"
          className={styles.logo}
          onClick={handleLogoClick} // Click event for the logo
        />
        <Link to="/home">Home</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/post/new">Create Post</Link>
        <Link to="/my-posts">My Posts</Link>
      </div>
      <div className={styles.rightLinks}>
        <button className={styles.logoutBtn} onClick={logoutHandler}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;




