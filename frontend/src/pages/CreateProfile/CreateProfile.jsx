import React, { useState} from 'react';
import {useNavigate } from 'react-router-dom';
import styles from './CreateProfile.module.css';
import TextInput from '../../components/TextInput/TextInput';
import FileUpload from '../../components/FileUpload/FileUpload';
import TextArea from '../../components/TextArea/TextArea';
import { createProfile } from '../../services/profileService';
import Alert from '../../components/Alert/Alert';

function CreateProfile() {
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

  const handleProfileImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to server)
    const formData = new FormData();
    formData.append('fullname', fullname);
    formData.append('profileImage', profileImage);
    formData.append('gender', gender);
    formData.append('bio', bio);

    const res = await createProfile(formData)
    console.log(res)
    if(res.status==201){
      navigateTo('/profile')
    }
    else{
      handleShowAlert("error",res.data.message)
    }
  };

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
    {showAlert && (
      <Alert type={alertType} message={alertMessage} onClose={handleCloseAlert} />
    )}
    </div>
  );
}

export default CreateProfile;




