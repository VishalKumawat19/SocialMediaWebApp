// NoDataAvailable.js
import React from 'react';
import styles from './NoDataAvailable.module.css'; // Import the module CSS

const NoDataAvailable = () => {
    return (
        <div className={styles.container}>
            <h2 className={styles.message}>No Data Available</h2>
        </div>
    );
};

export default NoDataAvailable;
