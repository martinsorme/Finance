import { Icon } from '@iconify/react'
import React, { useEffect, useState } from 'react'
import Modal from "react-modal";

import AddMemberToNewTaskModal from './addMembersToNewTaskModal';
import { Task } from '../../Types';
import HowToCreateATask from './HowToCreateATask';
import {BASE_URL} from "../../Constants";
import { Input } from '@chakra-ui/react';

type Props = {setTasks: (tasks: Task[]) => void, tasks: Task[], getProject : () => void}

const AddNewTaskModal = ({setTasks, tasks, getProject}: Props) => {
    const [inputproject, setInputproject] = useState(0);
    const [selectedUser, setSelectedUser] = useState<{ value: number; label: string }[]>([]);
  const [isInfoPopupVisible, setInfoPopupVisible] = useState(false);
  const [invalidInput, setInvalidInput] = useState(false);
    useEffect(() => {
        const currentURL = window.location.href;
        const parts = currentURL.split('/');
        const numberPart = parts.find(part => /^\d+$/.test(part));
        const project_id = numberPart ? parseInt(numberPart, 10) : 0;
        setInputproject(project_id)
}); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [inputText, setInputText] = useState('');
    const openModal = () => {
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
      };
      const avbryt = () => {
        setInputValue('')
        setInputText('')
        setSelectedUser([])
        closeModal()
      }; 
      const handleInputChange = (e :React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value); 
      };

      const handleTextInputChange = (e :React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputText(e.target.value); 
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

  const handleSubmit = async () => {
    //Check if title is entered before saving task
    if (inputValue === "") {
      setInvalidInput(true);
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}/add_new_task/${inputproject}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        //Add correct creator ID
        body: JSON.stringify({ taskName: inputValue, taskDescription: inputText, status: "Not yet started" }),
      });

      if (response.ok) {
        const data = await response.json();
        if (selectedUser.length > 0) {
          for (const u of selectedUser) {
            addMember(data.taskId, u.value);
          }
          getProject();
          closeModal();
        } else {
          getProject();
          closeModal();
        }
      } else {
        alert("Fill all the information");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div style={{height:"49px", display:"flex", width:"700px", flexDirection:"column"}}>
    <button style={{height: "49px", width: "100%", backgroundColor: "#E7E7E7", alignContent: "bottom", 
                borderBottomLeftRadius: "5px", borderBottomRightRadius: "5px", display: "flex", alignItems: "center", marginTop: "10px"}} onClick={openModal}
                >
                    <Icon style={{height: "18px", width: "18px", display: "flex", marginLeft: "10px"}}icon="fluent:add-28-regular" />
                   Skapa ny uppgift
                </button>
                <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="skapa ny uppgift"
          style={{
            overlay: { background: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: "100" },
            content: { background: "white", display: "flex", flexDirection: "column", height: "650px", width: "800px", alignItems: "center", padding: "0px", marginTop: "80px", marginLeft: "350px", borderRadius:"30px", border:"3px solid black"},
          }}
        >
            <div style={{display: "flex", flexDirection:"row", width: "700px", height: "30px", marginLeft:"30px", marginTop:"20px"}}>
            <Icon icon="lucide:check-square" color="black" width="30" height="30" style ={{}}/>
            <div style={{marginLeft:"20px", fontSize:"20px", fontWeight:"bold"}}>Skapa ny uppgift</div>
            
             {/* help-popup*/}
    <div onMouseEnter={() => setInfoPopupVisible(true)}
            onMouseLeave={() => setInfoPopupVisible(false)}
            style={{ marginLeft: '20px', cursor: 'pointer' }}>
      {/* info icon */}
            <Icon icon="material-symbols:info-outline" color="black" width="30" height="30" style={{marginLeft:"20px"}} />
            </div>
            </div>
            {/* HowToCreateATask */}
    {isInfoPopupVisible && (
      <div
        onMouseEnter={() => setInfoPopupVisible(true)}
        onMouseLeave={() => setInfoPopupVisible(false)}
        style={{ position: 'absolute',
        top: '40px', 
        left: '0',
        width: '100%',
        zIndex: '999',marginTop: '10px', cursor: 'pointer' }}
      >
        <HowToCreateATask />
      </div>
    )}
    {/* End help-popup*/}
  


            <div style={{display:"flex", width: "700px", height:"70px", marginLeft:"30px"}}>
              <Input isInvalid={invalidInput && inputValue ===''} style={{marginTop: "15px", fontSize:"18px", borderRadius:"10px", backgroundColor: "#E5EFF7", width:"500px", height:"45px", paddingLeft:"20px" }} 
                placeholder="Lägg till en rubrik..." value={inputValue} onChange={handleInputChange}>
              </Input>
            </div>
            <div style={{display:"flex", width: "700px", height:"30px", marginLeft:"170px", fontSize:"15px", color:"gray"}}>i listan Att göra</div>
            <div style={{display:"flex", flexDirection:"row", width:"700px", height:"40px", marginLeft:"30px", marginTop:"30px"}}>
            <Icon icon="entypo:text" color="black" width="30" height="30" />
            <div>Beskrivning</div>
            <div/>
            </div>
            <div style={{display:"flex", flexDirection:"row", width:"700px", height:"40px", marginTop:"5px", marginLeft:"30px"}}>
            <textarea placeholder="Beskriv uppgiften..." value={inputText} onChange={handleTextInputChange} 
                style={{paddingTop:"10px", resize: "none", height: "300px",  fontSize: '15px', borderRadius: '15px', backgroundColor: '#E5EFF7', width: '500px', paddingLeft: '20px', paddingRight:"20px"}}/>
                <div style={{display:"flex", flexDirection:"column"}}>
                <div style={{fontWeight:"bold", fontSize:"14px", marginLeft:"20px"}}>Lägg till på uppgift</div>
                <div style={{marginLeft:"15px"}}>
                <AddMemberToNewTaskModal selectedMembers = {setSelectedUser} project_id={inputproject}/>
                </div>
                </div>
            </div>
            <div style={{display:"flex", flexDirection:"row", marginTop:"270px", width:"700px", marginLeft: "670px"}}>
            <button style={{width: "100px", height: "30px", color: "white", backgroundColor:"#182745", borderRadius:'5px',fontSize:'13px', fontWeight:"bold", margin:'10px'}} onClick={handleSubmit}>Spara Uppgift</button>
            <button style={{width: "50px", height: "30px", backgroundColor:"white", borderRadius:'5px', fontSize:'13px', margin:'10px', fontWeight:"bold",}} onClick={avbryt}>Avbryt</button>
            </div>

            </Modal>

</div>

  )}

export default AddNewTaskModal