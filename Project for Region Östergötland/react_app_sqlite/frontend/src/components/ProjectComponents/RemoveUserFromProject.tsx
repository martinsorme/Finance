import React, { useState, useEffect} from "react";
import { User } from "../../Types";
import { Icon } from '@iconify/react';
import {BASE_URL} from "../../Constants";

// Define the props for the component
interface Props {
    users: User[];
    setUsers: (users: User[]) => void;
    projectId : string;
 
  }


  // Define the RemoveUserFromProject component
const RemoveUserFromProject = ({users, setUsers, projectId }: Props) => {
    const [localUsers, setLocalUsers] = useState<User[]>(users);
    let token = JSON.parse(sessionStorage.getItem("auth") + "").token;
    useEffect(() => {
      setLocalUsers(users);
    }, [users]);
  
    //Function to remove a member from a project
    const removeMember = async (userId: number, projectId: string) => {
   
      
      try {
        const response = await fetch(`${BASE_URL}/remove_user_from_project/${projectId}/${userId}`, {
          method: 'DELETE', 
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });
  
        if (response.ok) {
          const updatedUsers = localUsers.filter(user => user.userId !== userId);
          setLocalUsers(updatedUsers);
          if (setUsers) {
            setUsers(updatedUsers);
          }
        } else {
          console.error('Failed to remove user:', response.statusText);
        }
      } catch (error) {
        console.error('Error removing user:', error);
      }
    };




    return (
      <div style={{marginTop: '57px'}}>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {users.map(user => (
            <li key={user.userId} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
              <span style={{ marginRight: '10px' }}>{user.name} - {user.projectRole == 'Team-Leader' ? 'Ansvarig' : 'Medlem'}</span>
              {user.projectRole !== 'Team-Leader' && (
                <button onClick={() => removeMember(user.userId, projectId)} style={{ marginLeft: '5px' }}>
                  <Icon icon="gridicons:cross" />
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
          };

export default RemoveUserFromProject;