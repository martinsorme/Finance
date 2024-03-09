import React, { useState, useEffect} from "react";
import { User } from "../../Types";
import AddUserToProject from "./AddUserToProject";
import RemoveUserFromProject from "./RemoveUserFromProject"

type Props = {
  isOpen: boolean;
  toggleModal: () => void;
  users: User[];
  setUsers: (users: User[]) => void;
  projectId : string;
}

const headingStyle: React.CSSProperties = {
  textAlign: 'center',
  fontSize: '24px',
  fontWeight: 'bold' as 'bold',
  marginBottom: '20px', // Space below the heading
};

const modalWrapperStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  alignItems: 'flex-start',
  backgroundColor: '#E5F0F7', 
  border: '2px solid var(--darkblue)', 
  borderRadius: '10px',
  paddingBottom: '10px', 
  maxWidth: 'fit-content', 
  minWidth: '200px', 
  maxHeight: '50vh', 
  minHeight: '30vh',
  margin: 'auto',
  position: 'relative', 
  padding: '40px', // Add padding to create space inside the modal
};

const modalStyle: React.CSSProperties = {
  position: 'fixed', 
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)', // Centers the modal both vertically and horizontally
  overflow: 'auto',
  zIndex: 1000, // Ensure it's on top of other elements
  
};

const modalShadowStyle: React.CSSProperties = {
  backgroundColor: 'rgba(0,0,0,0.5)',
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh'
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

const EditMemberModal = ({ isOpen, toggleModal, users, setUsers, projectId }: Props) => {
  const [localUsers, setLocalUsers] = useState<User[]>(users);

  let token = JSON.parse(sessionStorage.getItem("auth") + "").token;
  useEffect(() => {
    setLocalUsers(users);
  }, [users]);


  

  if (!isOpen) {
    return null;
  }

  return (
    <div style={modalShadowStyle}>
    <div style={modalStyle}>
      <div style={modalWrapperStyle}>
        <span style={closeBtnStyle} onClick={toggleModal}>&times;</span>
        <div style={{flex: 1}}>
          <h2 style={headingStyle}>Redigera medlemmar i projektet</h2>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
              <h3>Ta bort medlemmar</h3>
              <RemoveUserFromProject
                users={users} 
                setUsers={setUsers}
                projectId={projectId}
              />
            </div>
            <div style={{
                
                display: 'flex',
                flexDirection: 'column',
                width: '2px',
                backgroundColor: '#ccc',
                margin: '0 20px', 
                marginRight: '40px;',
                alignSelf: 'stretch',
              }}>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
            <h3>Lägg till medlemmar</h3>
              <AddUserToProject
                users={users} 
                setUsers={setUsers}
                projectId={projectId}
                fetchAllUsersTrigger={isOpen}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};
export default EditMemberModal;
