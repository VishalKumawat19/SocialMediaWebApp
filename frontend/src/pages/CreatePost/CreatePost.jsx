import React, { useEffect, useState } from 'react';
import {useNavigate } from 'react-router-dom';
import FileUpload from '../../components/FileUpload/FileUpload';
import TextArea from '../../components/TextArea/TextArea';
import styles from './CreatePost.module.css';
import { createPost, getAllPosts } from '../../services/postService';
import Alert from '../../components/Alert/Alert';

function CreatePost() {
  const navigateTo = useNavigate()
  const [caption, setCaption] = useState('');
  const [postImage, setPostImage] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('success'); // Can be 'success', 'error', or 'info'
  const [alertMessage, setAlertMessage] = useState('');



  useEffect(()=>{
   const verifyUser = async() =>{
    const response = await getAllPosts()
    if(response.status==403){
      return navigateTo('/')
    }
   }
   verifyUser()
  },[])
  const handleShowAlert = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };
  
  const handleImageChange = (e) => {
    setPostImage(e.target.files[0]);
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    const response = await createPost({postImage,caption})
    
    if(response.status==201){
      handleShowAlert('success',response.data.message)
      setTimeout(() => {
        navigateTo('/my-posts')
        setShowAlert(false)
      }, 4000);
      
    }
    else{
      console.log(response)
      handleShowAlert('error',response.data.message)
    }
    
  };

  return (
    <>
 <div>
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
      {showAlert && (
      <Alert type={alertType} message={alertMessage} onClose={handleCloseAlert} />
    )}
    </div>
    </>
  );
}

export default CreatePost;
