import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.leftLinks}>
        <Link to="/home">Home</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/create-post">Create Post</Link>
        <Link to="/my-posts">My Posts</Link>
      </div>
      <div className={styles.rightLinks}>
        <button className={styles.logoutBtn}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;




