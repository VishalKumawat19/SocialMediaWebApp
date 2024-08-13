import React, { useState, useEffect } from "react";
import styles from "./Home.module.css";
import { getAllPosts } from "../../services/postService";
import { useNavigate } from "react-router-dom";
import NoDataAvailable from "../../components/NoDataAvailable/NoDataAvailable";

function Home() {
  const navigateTo = useNavigate();
  const [posts, setPosts] = useState([]);
  const [noData, setNoData] = useState(false);

  useEffect(() => {
    // Fetch posts from the server (mock data for now)
    const fetchPosts = async () => {
      const response = await getAllPosts();
      if (response.status == 403) {
        return navigateTo("/");
      }
      const posts = response.data.posts;
      if (posts.length == 0) {
        setNoData(true);
      }
      console.log(response.data.posts);
      setPosts(response.data.posts);
    };
    fetchPosts();
  }, []);

  return noData ? (
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
  );
}

export default Home;
