import React, { useState, useEffect } from 'react';
import styles from './EditProfile.module.css';
import TextInput from '../../components/TextInput/TextInput';
import FileUpload from '../../components/FileUpload/FileUpload';
import TextArea from '../../components/TextArea/TextArea';

function EditProfile() {
  const [fullname, setFullname] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [gender, setGender] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    // Fetch profile data from the server
    const fetchProfile = async () => {
      const response = await fetch('http://localhost:3000/api/v1/profile');
      const data = await response.json();
      setFullname(data.fullname);
      setProfileImage(data.profileImage);
      setGender(data.gender);
      setBio(data.bio);
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

    await fetch('http://localhost:3000/api/v1/profile', {
      method: 'PUT',
      body: formData,
    });
  };

  return (
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
  );
}

export default EditProfile;


