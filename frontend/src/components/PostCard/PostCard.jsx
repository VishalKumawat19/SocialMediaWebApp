import React from 'react';
import styles from './PostCard.module.css';

const PostCard = ({ post }) => {
  return (
    <div className={styles.postCard}>
      <div className={styles.userInfo}>
        <img src={post.profileImage} alt="Profile" className={styles.profileImage} />
        <span className={styles.username}>{post.username}</span>
      </div>
      <img src={post.image} alt="Post" className={styles.postImage} />
      <p className={styles.caption}>{post.caption}</p>
    </div>
  );
};

export default PostCard;


