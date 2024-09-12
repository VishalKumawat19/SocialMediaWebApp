import React from 'react';
import styles from './ImageComponent.module.css';
import image from '../../assets/social_no_bg.png';

const ImageComponent = () => {
  return (
    <div className={styles.container}>
      <img src={image} alt="Centered Logo" className={styles.image} />
    </div>
  );
};

export default ImageComponent;
