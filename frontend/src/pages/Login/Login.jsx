import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Login.module.css';
import TextInput from '../../components/TextInput/TextInput';
import PasswordInput from '../../components/PasswordInput/PasswordInput';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission logic here
  };

  return (
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
          required
        />
        <PasswordInput
          label="Password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className={styles.submitBtn}>Login</button>
      </form>
      <p className={styles.registerLink}>
        New user? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;



