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
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };



  
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
    navigateTo('/home'); // Redirect to /home on logo click
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.leftLinks}>
        <img
          src={logo}
          alt="Logo"
          className={styles.logo}
          onClick={handleLogoClick}
        />
        {/* Show links directly on large screens */}
        <div className={styles.menuLinks}>
          <Link to="/home">Home</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/post/new">Create Post</Link>
          <Link to="/my-posts">My Posts</Link>
        </div>
      </div>

      {/* Hamburger Menu Icon */}
      <div className={styles.hamburger} onClick={toggleMenu}>
        <span className={styles.hamburgerLine}></span>
        <span className={styles.hamburgerLine}></span>
        <span className={styles.hamburgerLine}></span>
      </div>

      {/* Show Logout on right on large screens */}
      <div className={styles.rightLinks}>
        <button className={styles.logoutBtn} onClick={logoutHandler}>
          Logout
        </button>
      </div>

      {/* Menu for small screens */}
      <div className={`${styles.menu} ${isMenuOpen ? styles.showMenu : ""}`}>
        <div className={styles.menuLinksVertical}>
          <Link to="/home" onClick={toggleMenu}>Home</Link>
          <Link to="/profile" onClick={toggleMenu}>Profile</Link>
          <Link to="/post/new" onClick={toggleMenu}>Create Post</Link>
          <Link to="/my-posts" onClick={toggleMenu}>My Posts</Link>
        </div>
        <div className={styles.bottomLogout}>
          <button className={styles.logoutBtn} onClick={logoutHandler}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;




