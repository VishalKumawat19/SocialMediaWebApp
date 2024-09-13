import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './SeeProfile.module.css';
import { getProfile } from '../../services/profileService';
import { AuthContext } from '../../ContextApi/AuthContext';
import { AlertContext } from '../../ContextApi/AlertContext';
import Spinner from '../../components/Spinner/Spinner';

function SeeProfile() {
  const navigateTo = useNavigate()
  const [profile, setProfile] = useState({
    fullname: '',
    profileImage: '',
    gender: '',
    bio: '',
  });

  
  const [loading,setLoading] =useState(true)
  const { alert, setAlert } = useContext(AlertContext);

  useEffect(() => {
    // Fetch profile data from the server (mock data for now)
    const fetchProfile = async () => {
      // setLoading(true)
      const response = await getProfile();
      response&&setLoading(false)
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

  if(loading) return <Spinner />;

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


