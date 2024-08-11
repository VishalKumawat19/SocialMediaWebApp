import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './SeeProfile.module.css';

function SeeProfile() {
  const [profile, setProfile] = useState({
    fullname: '',
    profileImage: '',
    gender: '',
    bio: '',
  });

  useEffect(() => {
    // Fetch profile data from the server (mock data for now)
    const fetchProfile = async () => {
      const response = await fetch('http://localhost:3000/api/v1/profile');
      const data = await response.json();
      setProfile(data);
    };
    fetchProfile();
  }, []);

  return (
    <div className={styles.profilePage}>
      <div className={styles.profileContainer}>
        <img src={profile.profileImage} alt="Profile" className={styles.profileImage} />
        <h2 className={styles.fullname}>{profile.fullname}</h2>
        <p className={styles.gender}>Gender: {profile.gender}</p>
        <p className={styles.bio}>{profile.bio}</p>
        <Link to="/edit-profile" className={styles.editBtn}>Edit Profile</Link>
      </div>
    </div>
  );
}

export default SeeProfile;


