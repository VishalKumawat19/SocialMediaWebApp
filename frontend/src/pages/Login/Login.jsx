import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import TextInput from '../../components/TextInput/TextInput';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import { login } from '../../services/authService';
import Alert from '../../components/Alert/Alert';

function Login() {
  const navigateTo = useNavigate()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('success');
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
    const res = await login({username,password})
    console.log(res)
    if(res.status==200){
      navigateTo('/home')
    }
    else{
      handleShowAlert('error',res.data.message)
    }
  };

  return (
    <div>
    <div className={styles.loginPage}>
      <h2 className={styles.heading}>Login</h2>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Username"
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          
        />
        <PasswordInput
          label="Password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          
        />
        <button type="submit" className={styles.submitBtn}>Login</button>
      </form>
      <p className={styles.registerLink}>
        New user? <Link to="/register">Register</Link>
      </p>
    </div>
    {showAlert && (
      <Alert type={alertType} message={alertMessage} onClose={handleCloseAlert} />
    )}
    </div>
  );
}

export default Login;



