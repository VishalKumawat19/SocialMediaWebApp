import React, { useState, useEffect } from 'react';
import styles from './MyPosts.module.css';
import { deletePost, getUserPosts } from '../../services/postService';
import { useNavigate } from 'react-router-dom';
import NoDataAvailable from '../../components/NoDataAvailable/NoDataAvailable';
import Spinner from '../../components/Spinner/Spinner';


function MyPosts() {
  const navigateTo = useNavigate()
  const [posts, setPosts] = useState([]);
  const [noData, setNoData] = useState(false);


  const [loading,setLoading] =useState(true)
  useEffect(() => {
    // Fetch user's posts from the server (mock data for now)
    const fetchPosts = async () => {
      const response = await getUserPosts();
      response && setLoading(false)
      const data = response.data.posts
      if (data.length == 0) {
        setNoData(true);
      }
      if(response.data.posts){
        const userPosts = response.data.posts
        setPosts(userPosts);
      }
    };
    fetchPosts();
  }, []);

  const handleDelete = async (postId) => {
    // Delete post
    // setLoading(true)
    // const deleteRequest = await deletePost(postId)
    // deleteRequest && setLoading(false)
    // setPosts(posts.filter(post => post._id !== postId));
    // if(!posts){
    //   setNoData(true);
    // }
    setLoading(true);
    try {
        const deleteRequest = await deletePost(postId);

        if (deleteRequest) {
            // Update posts and check if it's empty
            setPosts((prevPosts) => {
                const updatedPosts = prevPosts.filter(post => post._id !== postId);
                setNoData(updatedPosts.length === 0); // Set noData if posts are empty
                return updatedPosts;
            });
        }
    } catch (error) {
        console.error("Failed to delete post", error);
        // Handle error if necessary
    } finally {
        setLoading(false);
    }
  };

  if(loading) return <Spinner />;

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


