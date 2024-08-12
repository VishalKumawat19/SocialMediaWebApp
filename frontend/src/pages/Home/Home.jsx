import React, { useState, useEffect } from 'react';
import styles from './Home.module.css';
import { getAllPosts } from '../../services/postService';

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts from the server (mock data for now)
    const fetchPosts = async () => {
      const response = await getAllPosts()
      console.log(response.data.posts)
      setPosts(response.data.posts);
    };
    fetchPosts();
  }, []);

  return (
    <div className={styles.homePage}>
      <div className={styles.postsContainer}>
        {posts.map((post) => (
          <div key={post._id} className={styles.post}>
            <div className={styles.profile}>
              <img src={post.profileImage} alt={`${post.username}'s profile`} className={styles.profilePic} />
              <span className={styles.username}>{post.username}</span>
            </div>
            <div className={styles.postContent}>
              <img src={post.imageUrl} alt="Post content" className={styles.postImage} />
              <p className={styles.caption}>{post.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
