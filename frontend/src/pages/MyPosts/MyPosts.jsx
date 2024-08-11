import React, { useState, useEffect } from 'react';
import styles from './MyPosts.module.css';

function MyPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch user's posts from the server (mock data for now)
    const fetchPosts = async () => {
      const response = await fetch('http://localhost:3000/api/v1/my-posts');
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  const handleDelete = async (postId) => {
    // Delete post
    await fetch(`http://localhost:3000/api/v1/posts/${postId}`, {
      method: 'DELETE',
    });
    setPosts(posts.filter(post => post.id !== postId));
  };

  return (
    <div className={styles.myPostsPage}>
      <div className={styles.postsContainer}>
        {posts.map((post) => (
          <div key={post.id} className={styles.post}>
            <img src={post.imageUrl} alt="Post content" className={styles.postImage} />
            <p className={styles.caption}>{post.caption}</p>
            <button className={styles.deleteBtn} onClick={() => handleDelete(post.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyPosts;


