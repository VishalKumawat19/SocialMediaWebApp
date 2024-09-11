import React, { useContext, useEffect, useState} from 'react';
import {useNavigate } from 'react-router-dom';
import styles from './CreateProfile.module.css';
import TextInput from '../../components/TextInput/TextInput';
import FileUpload from '../../components/FileUpload/FileUpload';
import TextArea from '../../components/TextArea/TextArea';
import { createProfile } from '../../services/profileService';
import Alert from '../../components/Alert/Alert';
import { getAllPosts } from '../../services/postService';
import { AuthContext } from '../../ContextApi/AuthContext';
import { AlertContext } from '../../ContextApi/AlertContext';
import Spinner from '../../components/Spinner/Spinner';

function CreateProfile() {
  const navigateTo = useNavigate()
  const [fullname, setFullname] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [gender, setGender] = useState('');
  const [bio, setBio] = useState('');

  const [loading,setLoading] =useState(false)
  const { alert, setAlert } = useContext(AlertContext);

  const handleProfileImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!fullname ){
      return setAlert({visible:true,alertType:'error',alertMessage:"Please enter fullname"})
    }
    if(!gender){
      return setAlert({visible:true,alertType:'error',alertMessage:"Please select gender"})
    }
    setLoading(true)
    // Handle form submission (e.g., send data to server)
    const formData = new FormData();
    formData.append('fullname', fullname);
    formData.append('profileImage', profileImage);
    formData.append('gender', gender);
    formData.append('bio', bio);

    const res = await createProfile(formData)
    // console.log(res)
    res && setLoading(false)
    if(res.status==201){
      setAlert({visible:true,alertType:'success',alertMessage:res.data.message})
      setTimeout(() => {
        navigateTo('/profile')
        setAlert({...alert,visible:false})
      }, 4000);
      
    }
    else{
      setAlert({visible:true,alertType:'error',alertMessage:res.data.message})
    }
  };

  if(loading) return <Spinner />;

  return (
    <div>
    <div className={styles.createProfilePage}>
      <h2 className={styles.heading}>Create Profile</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <TextInput
          label="Full Name"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />
        <FileUpload
          label="Profile Image"
          onChange={handleProfileImageChange}
        />
        <div className={styles.genderField}>
          <label className={styles.label}>Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className={styles.select}
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <TextArea
          label="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <button type="submit" className={styles.submitBtn}>Create Profile</button>
      </form>
    </div>
    <Alert />
    </div>
  );
}

export default CreateProfile;




