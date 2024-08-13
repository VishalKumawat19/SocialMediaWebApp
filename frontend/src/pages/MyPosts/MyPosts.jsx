import React, { useState, useEffect } from 'react';
import styles from './MyPosts.module.css';
import { deletePost, getUserPosts } from '../../services/postService';
import { useNavigate } from 'react-router-dom';
import NoDataAvailable from '../../components/NoDataAvailable/NoDataAvailable';


function MyPosts() {
  const navigateTo = useNavigate()
  const [posts, setPosts] = useState([]);
  const [noData, setNoData] = useState(false);

  useEffect(() => {
    // Fetch user's posts from the server (mock data for now)
    const fetchPosts = async () => {
      const response = await getUserPosts();
      if(response.status==403){
        return navigateTo('/')
      }
      const data = response.data.posts
      if (data.length == 0) {
        setNoData(true);
      }
      console.log(response.data.posts)
      if(response.data.posts){
        const userPosts = response.data.posts
        setPosts(userPosts);
      }
      console.log(posts)
    };
    fetchPosts();
  }, []);

  const handleDelete = async (postId) => {
    // Delete post
    await deletePost(postId)
    setPosts(posts.filter(post => post._id !== postId));
  };

  return noData?(<NoDataAvailable />):(
    <div className={styles.myPostsPage}>
      <div className={styles.postsContainer}>
        {posts.map((post) => (
          <div key={post._id} className={styles.post}>
            <img src={post.imageUrl} alt="Post content" className={styles.postImage} />
            <p className={styles.caption}>{post.caption}</p>
            <button className={styles.deleteBtn} onClick={() => handleDelete(post._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyPosts;


