import React from 'react';
import styles from './TextInput.module.css';

function TextInput({ label, type, id, name, value, onChange, required = false }) {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={id} className={styles.label}>{label}</label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={styles.input}
        required={required}
      />
    </div>
  );
}

export default TextInput;
