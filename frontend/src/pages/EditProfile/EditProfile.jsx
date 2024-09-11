import React, { useState, useEffect, useContext } from 'react';
import {useNavigate } from 'react-router-dom';
import styles from './EditProfile.module.css';
import TextInput from '../../components/TextInput/TextInput';
import FileUpload from '../../components/FileUpload/FileUpload';
import TextArea from '../../components/TextArea/TextArea';
import { getProfile, updateProfile } from '../../services/profileService';
import Alert from '../../components/Alert/Alert';
import { AuthContext } from '../../ContextApi/AuthContext';
import { AlertContext } from '../../ContextApi/AlertContext';
import Spinner from '../../components/Spinner/Spinner';

function EditProfile() {
  const navigateTo = useNavigate()
  const [fullname, setFullname] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [gender, setGender] = useState('');
  const [bio, setBio] = useState('');
  const [loading,setLoading] =useState(true)
  const { alert, setAlert } = useContext(AlertContext);

  useEffect(() => {
    // Fetch profile data from the server
    const fetchProfile = async () => {
      setLoading(true)
      const response = await getProfile()
      response && setLoading(false)
      if(response.status==403){
       return navigateTo('/')
      }
      const profile = response.data.profile
      setFullname(profile.fullname);
      setProfileImage(profile.profileImage);
      setGender(profile.gender);
      setBio(profile.bio);
    
    };
    fetchProfile();
  },[]);

  const handleProfileImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const formData = new FormData();
    formData.append('fullname', fullname);
    formData.append('profileImage', profileImage);
    formData.append('gender', gender);
    formData.append('bio', bio);

    const response = await updateProfile(formData)
    response && setLoading(false)
    console.log(response)
    if(response.status==200){
      setAlert({visible:true,alertType:'success',alertMessage:response.data.message})
      setTimeout(() => {
        navigateTo('/profile')
        setAlert({...alert,visible:false})
      }, 4000);
     
    }
    else{
      setAlert({visible:true,alertType:'error',alertMessage:response.data.message})
    }
  };


  if(loading) return <Spinner />;

  return (
    <div>
    <div className={styles.editProfilePage}>
      <h2 className={styles.heading}>Edit Profile</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <TextInput
          label="Full Name"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />
        <FileUpload
          label="Profile Image"
          onChange={handleProfileImageChange}
          existingImage={profileImage}
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
        <button type="submit" className={styles.submitBtn}>Save Changes</button>
      </form>
    </div>
    <Alert />
    </div>
    
  
  );
}

export default EditProfile;


