import React from 'react';
import styles from './TextArea.module.css';

function TextArea({ label, value, onChange }) {
  return (
    <div className={styles.textArea}>
      <label className={styles.label}>{label}</label>
      <textarea
        value={value}
        onChange={onChange}
        className={styles.input}
        rows="4"
      />
    </div>
  );
}

export default TextArea;
