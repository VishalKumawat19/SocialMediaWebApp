import React, { useContext } from 'react';
import { AlertContext } from '../../ContextApi/AlertContext';
import styles from './Alert.module.css';

const Alert = () => {
  const {alert, setAlert,handleCloseAlert } = useContext(AlertContext);
  const {visible,alertType,alertMessage} = alert;
  if (!visible) return null; 
  return (
    <div className={`${styles.alert} ${styles[alertType]}`}>
      <span>{alertMessage}</span>
      <button className={styles.closeBtn} onClick={handleCloseAlert}>
        &times;
      </button>
    </div>
  );
};

export default Alert;
