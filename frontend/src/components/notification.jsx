import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const Notification = ({ message, type = 'info'}) => {
    const [open, setOpen] = useState(true);

    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <Popup
        open={open}
        onClose={handleClose}
        closeOnDocumentClick
        contentStyle={{
            width: '400px', 
            padding: '24px', 
            backgroundColor: type === 'success' ? '#4CAF50' : type === 'error' ? '#FF3333' : '#2196F3',
            color: 'white',
            borderRadius: '8px',
            textAlign: 'center',
          }}
      >
        <div>
          <p>{message}</p>
          <button onClick={handleClose} style={{ marginTop: '8px', padding: '8px' }}>
            Close
          </button>
        </div>
      </Popup>
    );
  };

export default Notification;

