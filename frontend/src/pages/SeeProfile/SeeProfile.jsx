import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './SeeProfile.module.css';
import { getProfile } from '../../services/profileService';

function SeeProfile() {
  const navigateTo = useNavigate()
  const [profile, setProfile] = useState({
    fullname: '',
    profileImage: '',
    gender: '',
    bio: '',
  });

  useEffect(() => {
    // Fetch profile data from the server (mock data for now)
    const fetchProfile = async () => {
      const response = await getProfile();
      if(response.status==403){
        return navigateTo('/')
      }
      console.log(response)
      if(response.status==200 && !response.data.profile){
        navigateTo('/profile/new')
      }
      else if(response.status==200){
      const profile = response.data.profile
      setProfile(profile);
      }
      
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
        <Link to="/profile/modify" className={styles.editBtn}>Edit Profile</Link>
      </div>
    </div>
  );
}

export default SeeProfile;


