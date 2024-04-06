import React, { useEffect } from 'react';
import './ToastNotification.css';

const ToastNotification = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="toast">
      <span>{message}</span>
    </div>
  );
};

export default ToastNotification;
