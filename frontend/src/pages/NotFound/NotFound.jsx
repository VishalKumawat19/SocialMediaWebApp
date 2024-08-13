// NotFound.js
import React from 'react';
import styles from './NotFound.module.css'; // Import the module CSS
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>404</h1>
            <p className={styles.message}>Oops! The page you're looking for doesn't exist.</p>
            <Link to="/" className={styles.homeLink}>Go back to Login</Link>
        </div>
    );
};

export default NotFound;
