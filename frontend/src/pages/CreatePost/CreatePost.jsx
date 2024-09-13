import React, { useContext, useEffect, useState } from 'react';
import {useNavigate } from 'react-router-dom';
import FileUpload from '../../components/FileUpload/FileUpload';
import TextArea from '../../components/TextArea/TextArea';
import styles from './CreatePost.module.css';
import { createPost, getAllPosts } from '../../services/postService';
import Alert from '../../components/Alert/Alert';

import { AlertContext } from '../../ContextApi/AlertContext';
import Spinner from '../../components/Spinner/Spinner';

function CreatePost() {
  const navigateTo = useNavigate()
  const [caption, setCaption] = useState('');
  const [postImage, setPostImage] = useState(null);
  const { alert, setAlert } = useContext(AlertContext);
  const [loading,setLoading] =useState(false)

 
  const handleImageChange = (e) => {
    setPostImage(e.target.files[0]);
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    if(!postImage ){
      return setAlert({visible:true,alertType:'error',alertMessage:"Please attach an image"})
    }
    setLoading(true)
    const response = await createPost({postImage,caption})
    response && setLoading(false)
    if(response.status==201){
      setAlert({visible:true,alertType:'success',alertMessage:response.data.message})
      setTimeout(() => {
        navigateTo('/my-posts')
        setAlert({...alert,visible:false})
      }, 4000);
      
    }
    else{
      console.log(response)
      setAlert({visible:true,alertType:'error',alertMessage:response.data.message})
    }
    
  };

  if(loading) return <Spinner />;

  return (
    <>
      <div className={styles.createPostPage}>
        <h2 className={styles.heading}>Create Post</h2>
        <form onSubmit={handleSubmit}>
          <FileUpload label="Upload Image" onChange={handleImageChange} />
          <TextArea
            label="Caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <button type="submit" className={styles.submitBtn}>Post</button>
        </form>
      </div>
      <Alert />
    </>
  );
}
export default CreatePost;
