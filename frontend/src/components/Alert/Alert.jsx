import React from 'react';
import PropTypes from 'prop-types';
import styles from './Alert.module.css';

const Alert = ({ type, message, onClose }) => {
  return (
    <div className={`${styles.alert} ${styles[type]}`}>
      <span>{message}</span>
      <button className={styles.closeBtn} onClick={onClose}>
        &times;
      </button>
    </div>
  );
};

Alert.propTypes = {
  type: PropTypes.oneOf(['success', 'error', 'info']).isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Alert;
