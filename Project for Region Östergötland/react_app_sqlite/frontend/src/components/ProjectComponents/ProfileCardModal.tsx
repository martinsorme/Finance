import React from 'react';
import Modal from 'react-modal';
import { User } from "../../Types";

type ProfileCardModalProps = {
  user: User;
  isOpen: boolean;
  onClose: () => void;
};

    const closeBtnStyle: React.CSSProperties = {
        color: '#aaa',
        position: 'absolute',
        top: '10px',
        right: '10px',
        fontSize: '28px',
        fontWeight: 'bold' as 'bold',
        cursor: "pointer"
      
      };

const ProfileCardModal: React.FC<ProfileCardModalProps> = ({ user, isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={{
      overlay: {background: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: "100"},
      content: { top: '50%',left: '50%', transform: 'translate(-50%, -50%)',width: '400px',height: '300px', overflow: 'hidden', border:'2px solid var(--darkblue)', borderRadius:'10px',backgroundColor:'#E5F0F7'}
      }}>
    <span style={closeBtnStyle} onClick={onClose}>&times;</span>
      <h2>{user.name}</h2>
      <p>Roll: {user.projectRole}</p>
      <p>Email: {user.email}</p>
      <p>Telefonnummer: {user.phoneNumber}</p>
      <p>Avdelning: {user.unit}</p>


    </Modal>
  );
};

export default ProfileCardModal;