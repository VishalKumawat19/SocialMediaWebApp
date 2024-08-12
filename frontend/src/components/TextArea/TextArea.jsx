import React from 'react';
import styles from './TextArea.module.css';

function TextArea({ label, value, onChange,areaName }) {
  return (
    <div className={styles.textArea}>
      <label className={styles.label}>{label}</label>
      <textarea
        value={value}
        onChange={onChange}
        className={styles.input}
        rows="4"
        name={areaName}
      />
    </div>
  );
}

export default TextArea;
