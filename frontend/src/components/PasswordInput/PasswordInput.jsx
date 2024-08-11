import React, { useState } from 'react';
import styles from './PasswordInput.module.css';

function PasswordInput({ label, id, name, value, onChange, required = false }) {
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.formGroup}>
      <label htmlFor={id} className={styles.label}>{label}</label>
      <input
        type={showPassword ? 'text' : 'password'}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={styles.input}
        required={required}
      />
      <button
        type="button"
        onClick={handlePasswordToggle}
        className={styles.togglePassword}
      >
        {showPassword ? 'Hide' : 'Show'}
      </button>
    </div>
  );
}

export default PasswordInput;
