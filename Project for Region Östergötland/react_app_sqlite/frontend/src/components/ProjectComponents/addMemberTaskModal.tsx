import Modal from "react-modal";
import React, { useEffect, useState } from 'react'
import { Task, User } from "../../Types";
import { Icon } from '@iconify/react';
import { close } from "inspector";
import {BASE_URL} from "../../Constants";

type Props = {task: Task, getProject : () => void , dontShowArrows?: boolean}
const AddMemberTaskModal = ({task, getProject, dontShowArrows}: Props) => {
    const colors : string[] = ["pink", "yellow","#182745","green", "grey"]
    const getRandomColor = () => {
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
      };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userNames, setUserNames] = useState<{ value: number; label: string }[]>([]);
    const [selectedUser, setSelectedUser] = useState<{ value: number; label: string }[]>([]);
    const project_id = task.project_id; 
    
    const handleUserClick = (user : { value: number; label: string }) => {
        setSelectedUser((selectedUser) => [...selectedUser, user]);
  };
  const handleRemoveUser = (userToRemove : { value: number; label: string }) => {
    setSelectedUser((prevSelectedUsers) =>
      prevSelectedUsers.filter((user) => user.value !== userToRemove.value)
    );
  };
  const handleRemoveAllUsers = () => {
    setSelectedUser([]);
    closeModal()
  };
  const addMember = async (TaskID: number, userID : number) => {
    try {
      const response = await fetch(`${BASE_URL}/add_user_to_task/${TaskID}/${userID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        getProject()
      } else {
        
       alert('redan tillagd som medlem i uppgiften');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchData = async () => {
    try {
        const response = await fetch(`${BASE_URL}/get_all_users_on_project/${project_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }});
      const data = await response.json();
      if (response.ok) {
        const names = data.map((user: User) => ({
          value: user.userId,
          label: user.name,
        }));
        setUserNames(names); 
      }
      
      
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
      fetchData();
    }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handeladdMember = () =>{
      for (const u of selectedUser ) {
          addMember(task.taskId, u.value);
        }
        setSelectedUser([]);
        closeModal()
      }
    
    return (
      <div>
         <div style={{display: 'flex', width: "100%", justifyContent: 'right'}}>
          {dontShowArrows ? null: (<button style={{boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',display: "flex", flexDirection: "row", justifyContent:"center", alignItems:"center", width: "120px", height: "30px", backgroundColor:"#182745", borderRadius:'5px', fontSize:'13px', marginRight:"10px", marginTop:"10px" }} onClick={openModal}>
                    <Icon icon="fluent:guest-add-24-filled" color="white" width="27" height="27" />
                    <div style={{fontSize:"10px", fontWeight:"bold" ,marginLeft:"5px", color:"white"}}>Tilldela Uppgift</div>
                
                </button>)}
            </div>
  
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="member modal"
          style={{
            overlay: { background: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: "100" },
            content: { background: "white", display: "flex", flexDirection: "column", height: "430px", width: "350px", alignItems: "center", padding: "0px", marginTop: "120px", marginLeft: "500px", borderRadius:"5%"},
          }}
        >
         <div style={{ marginTop:"5px", backgroundColor: "white", width: "700px", textAlign: "center", fontSize: "20px", height: "70px", display: "flex", flexDirection: "row", marginLeft: "550px", fontWeight:"bold" }}> Tilldela uppgift</div>
          <div style ={{width: "700px" ,height: "40px", textAlign:"start", marginLeft : "400px", color:"grey", fontWeight:"bold"}}>Team medlemmar</div>
          <div style={{display:"flex", height:"500px", width:"700px", flexDirection:"column", marginLeft:"400px", marginTop:"10px", overflowY: "scroll"}}>
           {userNames.map((user, index) => (
            <div key={user.label} style={{display:"flex", flexDirection: "row", width:"300px", marginTop: "10px", alignItems:"left"}}>
            <div style={{backgroundColor: "#182745", height: "30px", width:"30px", borderRadius:"50%", color:"white", textAlign:"center"}}> {user.label.substring(0,2)}</div>
            <div style={{width: "200px", height: "40px", marginLeft: "20px" , color: "black", marginTop: "1px"}}> {user.label}</div>
            {selectedUser.some((selected) => selected.value === user.value) ? (
            <Icon icon="material-symbols:check" color="green" width="20" height="20" style={{ marginTop: "2px" }} onClick={() => handleRemoveUser(user)}/>) : (
            <Icon icon="ic:baseline-plus" color="#182745" width="20" height="20" style={{ marginTop: "2px" }} onClick={() => handleUserClick(user)} /> )}

            </div>
            ))
        }
        </div>
        <div style={{display: 'flex', width: "100%", justifyContent: 'center'}}>
                <button style={{width: "80px", height: "30px", backgroundColor:"#182745", borderRadius:'5px', fontSize:'13px', marginTop:'10px',marginBottom:"15px", color:"white", fontWeight:"bold", marginLeft:"150px"}} onClick = {handeladdMember}>Spara</button>
                <button style={{width: "80px", height: "30px", backgroundColor:"white", borderRadius:'5px', fontSize:'13px', marginTop:"10px", marginBottom:"15px", fontWeight:"bold", marginLeft:"5px"}} onClick = {handleRemoveAllUsers}>Avbryt</button>
            </div>

        </Modal>
      </div>
    );
  };
  
export default AddMemberTaskModal