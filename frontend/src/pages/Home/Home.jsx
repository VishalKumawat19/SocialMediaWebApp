import React, { useState, useEffect, useContext } from "react";
import styles from "./Home.module.css";
import { getAllPosts } from "../../services/postService";
import { useNavigate } from "react-router-dom";
import NoDataAvailable from "../../components/NoDataAvailable/NoDataAvailable";
import { AuthContext } from "../../ContextApi/AuthContext";
import Spinner from "../../components/Spinner/Spinner";
import ImageComponent from "../../components/ImageComponent/ImageComponent";

function Home() {
 
  const [posts, setPosts] = useState([]);
  const [noData, setNoData] = useState(false);

  const [loading,setLoading] =useState(true)

  useEffect(() => {
   
    const fetchPosts = async () => {
   
      try {      
        const response = await getAllPosts();
        response && setLoading(false)
        const posts = response.data.posts;
        if (posts.length == 0) {
          setNoData(true);
        }
        setPosts(response.data.posts);
      } catch (error) {
        setLoading(false)
        console.log(error)
      }

    };
    fetchPosts()
  
  }, []);

  if(loading) return <ImageComponent />;


  return (noData ? (
    <NoDataAvailable />
  ) : (
    <div className={styles.homePage}>
      <div className={styles.postsContainer}>
        {posts.map((post) => (
          <div key={post._id} className={styles.post}>
            <div className={styles.profile}>
              <img
                src={post.profileImage}
                alt={`${post.username}'s profile`}
                className={styles.profilePic}
              />
              <span className={styles.username}>{post.username}</span>
            </div>
            <div className={styles.postContent}>
              <img
                src={post.imageUrl}
                alt="Post content"
                className={styles.postImage}
              />
              <p className={styles.caption}>{post.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  ))
}

export default Home;
