import React, { useState } from 'react';
import FileUpload from '../../components/FileUpload/FileUpload';
import TextArea from '../../components/TextArea/TextArea';
import styles from './CreatePost.module.css';

function CreatePost() {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission logic here
  };

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
    </>
  );
}

export default CreatePost;
