import React from 'react';
import styles from './FileUpload.module.css';

function FileUpload({ label, onChange }) {
  return (
    <div className={styles.fileUpload}>
      <label className={styles.label}>{label}</label>
      <input type="file" onChange={onChange} className={styles.input} name='image'/>
    </div>
  );
}

export default FileUpload;
