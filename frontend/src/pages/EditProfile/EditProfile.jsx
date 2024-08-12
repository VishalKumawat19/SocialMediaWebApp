import React, { useState, useEffect } from 'react';
import {useNavigate } from 'react-router-dom';
import styles from './EditProfile.module.css';
import TextInput from '../../components/TextInput/TextInput';
import FileUpload from '../../components/FileUpload/FileUpload';
import TextArea from '../../components/TextArea/TextArea';
import { getProfile, updateProfile } from '../../services/profileService';
import Alert from '../../components/Alert/Alert';

function EditProfile() {
  const navigateTo = useNavigate()
  const [fullname, setFullname] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [gender, setGender] = useState('');
  const [bio, setBio] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('success'); // Can be 'success', 'error', or 'info'
  const [alertMessage, setAlertMessage] = useState('');

  const handleShowAlert = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };


  useEffect(() => {
    // Fetch profile data from the server
    const fetchProfile = async () => {
      const response = await getProfile()
      const profile = response.data.profile
      setFullname(profile.fullname);
      setProfileImage(profile.profileImage);
      setGender(profile.gender);
      setBio(profile.bio);
    };
    fetchProfile();
  }, []);

  const handleProfileImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('fullname', fullname);
    formData.append('profileImage', profileImage);
    formData.append('gender', gender);
    formData.append('bio', bio);

    const response = await updateProfile(formData)
    console.log(response)
    if(response.status==200){
      navigateTo('/profile')
    }
    else{
      handleShowAlert('error',response.data.message)
    }
  };

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
    {showAlert && (
      <Alert type={alertType} message={alertMessage} onClose={handleCloseAlert} />
    )}
    </div>
    
  
  );
}

export default EditProfile;


