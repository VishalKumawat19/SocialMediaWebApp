import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';
import { logout } from '../../services/authService';

function Navbar() {
  const navigateTo = useNavigate()
  const logoutHandler = async() =>{
    const response = await logout()
    if(response.status==200){
      navigateTo('/')
    }
  }
  return (
    <nav className={styles.navbar}>
      <div className={styles.leftLinks}>
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
}

export default Navbar;




