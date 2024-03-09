import React, { useState, useEffect } from 'react';
import { User } from "../../Types";
import { Icon } from '@iconify/react';
import {BASE_URL} from "../../Constants";

// Define the props for the component
type Props = {
    users: User[];
    setUsers: (users: User[]) => void;
    projectId : string;
    fetchAllUsersTrigger: boolean;
  }
  

  
// Define the AddUserToProject component
const AddUserToProject = ({users, setUsers, projectId, fetchAllUsersTrigger }: Props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  // Fetch all users from the database
  useEffect(() => {
    const fetchAllUsers = async () => {
        try {
          const response = await fetch(`${BASE_URL}/get_all_users`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }});
          const data = await response.json();
        setAllUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchAllUsers();

    if (fetchAllUsersTrigger) {
      fetchAllUsers();
    }
  }, [projectId, fetchAllUsersTrigger]);

  // Filter users based on search term
  useEffect(() => {
    const filtered = allUsers.filter(user => 
      user.name.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, allUsers]);

  const isUserInProject = (userId: number) => {
    return users.some(user => user.userId === userId);
  };
  
  let token = JSON.parse(sessionStorage.getItem("auth") + "").token;
  //Adds a user to the project
  const addUser = async (user: User) => {
    try {
      const response = await fetch(`${BASE_URL}/add_user_to_project/${projectId}/${user.userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ role: 'Team-Member' }) // Hardcoding the role, only team-members can be added to a project
      });
  
      if (response.ok) {
        setUsers([...users, { ...user, projectRole: 'Team-Member' }]);
      } else {
        console.error('Failed to add user:', await response.text());
      }
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

 

  return (
    <div style={{ marginTop: '5px' }}>
      <input
        type="text"
        placeholder="Sök efter kollega"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          border: '1px solid #ccc',
          padding: '8px 12px',
          borderRadius: '4px',
          marginBottom: '10px',
          width: '100%',
        }}
      />
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {filteredUsers.map(user => (
          <li key={user.userId} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '5px' }}>
            <span>{user.name}</span>
            {isUserInProject(user.userId) ? (
              <Icon icon="material-symbols:check" color="green" width="20" height="20" />
            ) : (
              <button onClick={() => addUser(user)}>
                <Icon icon="ic:baseline-plus" color="#182745" width="20" height="20" />
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddUserToProject;