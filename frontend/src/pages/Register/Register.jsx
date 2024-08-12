import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Register.module.css';
import TextInput from '../../components/TextInput/TextInput';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import { register } from '../../services/authService';
import Alert from '../../components/Alert/Alert';

function Register() {
  const navigateTo = useNavigate()
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await register({username,email,password})
    console.log(res)
    if(res.status==201){
      handleShowAlert('success',res.data.message)
      setTimeout(() => {
        setShowAlert(false)
        navigateTo('/home')
      }, 5000);
      
    }
    else{
      handleShowAlert('error',res.data.message)
      setTimeout(() => {
        setShowAlert(false)
      }, 5000);
    }
  };

  return (
    <div>
    <div className={styles.registerPage}>
      <h2 className={styles.heading}>Register</h2>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Username"
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          
        />
        <TextInput
          label="Email"
          // type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          
        />
        <PasswordInput
          label="Password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          
        />
        <button type="submit" className={styles.submitBtn}>Register</button>
      </form>
      <p className={styles.loginLink}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
      
    </div>
    {showAlert && (
      <Alert type={alertType} message={alertMessage} onClose={handleCloseAlert} />
    )}
    </div>
  );
}

export default Register;




