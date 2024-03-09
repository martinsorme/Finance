import React, { useEffect, useState, useRef } from 'react'
import { Task, TaskStatus } from '../../Types'
import { VStack, Text, Box, Input, HStack } from '@chakra-ui/react'
import AddMemberTaskModal from './addMemberTaskModal';
import { Icon } from '@iconify/react';
import AddMemberToNewTaskModal from './addMembersToNewTaskModal';
import Modal from "react-modal";
import { User } from '../../Types';
import {BASE_URL} from "../../Constants";

type Props = {
    task : Task
    changeStatus: (id : number, status: TaskStatus) => void
    setTask: (tasks: Task) => void
    color: string
    attributes: string[]
    taskID : number 
    getProject : () => void
    dontShowArrows?: boolean; 
    outputResult : boolean;
    tempTaskId : number;
}


const TaskCard = ({task, changeStatus, setTask, color, attributes, getProject, dontShowArrows, outputResult, tempTaskId}: Props) => {

 
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState(task.taskName);
  const [inputText, setInputText] = useState(task.taskDescription);
  const [inputResult, setResult] = useState(task.result ?? ""); 
  const [inputproject, setInputproject] = useState(0);
  const [newUsers, setNewUsers] = useState<{ value: number; label: string }[]>([]);
  const [users, setUsers] = useState<{ value: number; label: string }[]>([]);
  const [timeValue, setTimeValue] = useState('');
  const [dateValue, setdateValue] = useState('');
  const [selectedUser, setSelectedUser] = useState<{ value: number; label: string }[]>([]);
  const [invalidInput, setInvalidInput] = useState(false);
  const previousStatus = useRef(task.status);

  
  //Set members and project
  useEffect(() => {
    const currentURL = window.location.href;
    const parts = currentURL.split('/');
    const numberPart = parts.find(part => /^\d+$/.test(part));
    const project_id = numberPart ? parseInt(numberPart, 10) : 0;
    setInputproject(project_id)
    let members = task.users.map((user: User) => ({ value: user.userId, label: user.name}));
    setUsers(members);
    setNewUsers(members);
}, []); 

useEffect(() => {
  console.log("TempTaskId is " + tempTaskId + "TaskID is " + task.taskId);
  console.log("task.status is " + task.status);

  if (tempTaskId === task.taskId) {
    if (task.status === TaskStatus.finished) {

      setIsEditModalOpen(true);
    }
  }

}, [task.status]);

useEffect(() => {
  previousStatus.current = task.status;
});

  const handleInputChange = (e :React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value); 
  };

  const handleTextInputChange = (e :React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value); 
  };
  const handleResultInputChange = (e :React.ChangeEvent<HTMLTextAreaElement>) => {
    setResult(e.target.value); 
  };

    //Handels editing a tasks status
    const moveTask = async (s: string, st : TaskStatus) => {
        try {
           await fetch(`${BASE_URL}/task/${task.taskId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: s }),
          }).then (response=>
            { 
            if (response.ok) {

            changeStatus(task.taskId, st)

            // if (st === TaskStatus.finished) {
            //   console.log("Opening result modal for finished task");
            //   setIsResultModalOpen(true);
            // }
          } else {
            
           alert('Fill all the information');
          }});
    
        } catch (error) {
          console.error('Error:', error);
        }
      };

      //Saves input from finished task to backend 
      const saveFinishedTask = async () => {
        type BodyType = {
          result: string;
        };
        let body: BodyType = {result: inputResult}
        try {
          const response = await fetch(`${BASE_URL}/add_new_result_to_task/${task.taskId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body ),//, deadline: dateValue, time: timeValue}),
          });
          if (response.ok) {
            getProject()
            closeModal()
          } else {
           alert('Fill all the information');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

      //Handels saving edits to a task 
      const saveEdit = async () => {
        type BodyType = {
          taskName: string;
          taskDescription: string;
        };
        let body: BodyType = {taskName: inputValue, taskDescription: inputText}
        //Check if title is entered before saving task
        if (inputValue === '') {
          setInvalidInput(true);
          return;
        }
        try {
          const response = await fetch(`${BASE_URL}/task/${task.taskId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),//, dateValue, time: timeValue}),
          });
    
          if (response.ok) {
            getProject()
            closeModal()
          } else {
           alert('Fill all the information');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
    
        const openPopUp = () => {
            //öppna en popup med task info
            alert("here you will be able to edit your task")
        }
        
        //return color on left arrow 
        const getLeftcolor = () => {
            //öppna en popup med task info
            if (task.status === TaskStatus.notYetStarted) {
                return "grey"
            }else{
                return "#182745"
            }
        

        }
         //return color on right arrow 
        const getRightcolor = () => {
            if (task.status === TaskStatus.finished) {
                return "grey"
            }else{
                return "#182745"
            }
        }
        const moveTaskRight = (color : string) => {
            if (color !== "grey"){
                if (task.status === TaskStatus.notYetStarted){
                    moveTask(TaskStatus.ongoing.valueOf(), TaskStatus.ongoing)
                }else{
                    moveTask(TaskStatus.finished.valueOf(), TaskStatus.finished)
                    console.log("Moving task");
                }
            }
        }
        const moveTaskLeft = (color : string) => {
            if (color !== "grey"){
                if (task.status === TaskStatus.finished){
                    moveTask(TaskStatus.ongoing.valueOf(), TaskStatus.ongoing)
                }else{
                    moveTask(TaskStatus.notYetStarted.valueOf(), TaskStatus.notYetStarted)
                }
            }

        }
          const openModal = () => {
              setIsEditModalOpen(true);
              
          };
        
          const closeModal = () => {
            setResult('')
            setIsEditModalOpen(false);
          };

          console.log("Modal open state: ", isEditModalOpen);

        

  return (
    <div style={{ width: "100%", backgroundColor: color, borderRadius: "10px", marginTop: "10px" }}>
      <Box cursor={"pointer"}>
        <HStack cursor={"pointer"} paddingTop={4} paddingLeft={4} alignItems={"flex-start"}>
          <VStack alignItems={"left"} onClick={openModal} style={{ flexGrow: 1 }}>
            <Text alignItems={"left"} fontSize={"s"} marginTop={0}>
              {task.taskName}
            </Text>
          </VStack>
          <div style={{ height: "30px", display: "flex", marginTop: "0px", justifyContent: "flex-end" }}>
            {!dontShowArrows && (
              <>
                <Icon icon="material-symbols:play-arrow" color={getLeftcolor()} width="20" height="20" rotate={2} style={{ marginTop: "0px", marginLeft: "5px" }} onClick={() => moveTaskLeft(getLeftcolor())} />
                <Icon icon="material-symbols:play-arrow" color={getRightcolor()} width="20" height="20" style={{ marginTop: "0px", marginRight: "2px" }} onClick={() => moveTaskRight(getRightcolor())} />
              </>
            )}
          </div>
        </HStack>
        <div style={{ display: "flex", flexDirection: "row", height: "50px", width: "100%" }}>
          {users.length === 0 && task.status !== TaskStatus.finished ? (
            <div style={{ display: "flex", width: "100%", justifyContent: "right" }} onClick={openModal}>
              <AddMemberTaskModal getProject={getProject} task={task} dontShowArrows={dontShowArrows} />
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "row", width: "100%", height: "50px", justifyContent: "right", paddingRight: "15px" }} onClick={openModal}>
              <div style={{ display: "flex", width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "#182745", marginTop: "5px", marginLeft: "30px", flexDirection: "row" }}>
                <Icon icon="fa6-solid:user" width="18" height="18" style={{ color: "white", marginTop: "10px", marginLeft: "5px" }} />
                <div style={{ display: "flex", marginTop: "8px", color: "white" }}>{users.length} </div>
              </div>
            </div>
          )}
        </div>
      </Box>
      <div>
        {task.status === TaskStatus.finished ? (
          <Modal
            isOpen={isEditModalOpen}
            onRequestClose={closeModal}
            contentLabel="skapa ny uppgift"
            style={{
              overlay: { background: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: "100" },
              content: { background: "white", display: "flex", flexDirection: "column", height: "650px", width: "800px", alignItems: "center", padding: "0px", marginTop: "80px", marginLeft: "350px", borderRadius: "5%", border: "3px solid black" },
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", flexDirection: "row", width: "700px", height: "30px", marginLeft: "30px", marginTop: "20px" }}>
                <div style={{ width: "550px", display: "flex", flexDirection: "row" }}>
                  <Icon icon="lucide:check-square" color="black" width="30" height="30" style={{}} />
                  <div style={{ marginLeft: "20px", fontSize: "20px", fontWeight: "bold", marginRight: "50px" }}>Resultat för {task.taskName} </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", marginLeft: "20px", marginTop: "70px", width: "150px" }}>
                  <div style={{ fontSize: "12px", fontWeight: "bold", marginTop: "10px", width: "150px", marginBottom: "10px" }}>Nuvarande medlemmar</div>
                  {newUsers.map((user, index) => (
                    <div key={index} style={{ display: "flex", flexDirection: "row", width: "200px", marginTop: "2px", alignItems: "left" }}>
                      <div style={{ backgroundColor: "#182745", height: "30px", width: "35px", borderRadius: "50%", color: "white", textAlign: "center", alignItems: "center" }}> {user.label.substring(0, 2)}</div>
                      <div style={{ width: "200px", height: "40px", marginLeft: "5px", color: "black", marginTop: "1px" }}> {user.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "row", width: "700px", height: "40px", marginLeft: "30px", marginTop: "30px" }}>
                <Icon icon="entypo:text" color="black" width="30" height="30" />
                <div style={{ fontWeight: "bold" }}>Beskrivning</div>

                <div />
              </div>
              <div style={{ display: "flex", marginLeft: "50px", height: "110px", width: "500px", overflowY: "scroll" }}>{task.taskDescription}</div>
              <div style={{ display: "flex", flexDirection: "row", width: "700px", height: "40px", marginLeft: "30px" }}>
                <Icon icon="tabler:list-search" color="black" width="30" height="30" />
                <div style={{ fontWeight: "bold" }}>Beskrivning hur uppgiften gått och vad som gjorts</div>
              </div>
              {outputResult ? (
                <textarea
                  placeholder="Beskriv resultatet här..."
                  value={inputResult}
                  onChange={handleResultInputChange}
                  style={{ paddingTop: "10px", resize: "none", height: "270px", fontSize: "15px", borderRadius: "15px", backgroundColor: "#E5EFF7", width: "500px", paddingLeft: "20px", paddingRight: "20px", marginLeft: "30px" }}
                />
              ) : (
                <div style={{ height: "270px", width: "500px", marginLeft: "50px", overflowY: "scroll" }}>{task.result !== null ? task.result : "Detta fält är ej ifyllt för denna uppgift"}</div>
              )}
            </div>

            <div style={{ display: "flex", flexDirection: "row", marginTop: "10px", width: "700px" }}>
              {outputResult ? (
                <>
                  <button
                    style={{
                      width: "100px",
                      height: "30px",
                      color: "white",
                      backgroundColor: "#182745",
                      borderRadius: "5px",
                      fontSize: "13px",
                      fontWeight: "bold",
                      margin: "10px",
                      marginLeft: "350px",
                    }}
                    onClick={saveFinishedTask}
                  >
                    Spara
                  </button>
                  <button
                    style={{
                      width: "50px",
                      height: "30px",
                      backgroundColor: "white",
                      borderRadius: "5px",
                      fontSize: "13px",
                      margin: "10px",
                      fontWeight: "bold",
                    }}
                    onClick={closeModal}
                  >
                    Avbryt
                  </button>
                </>
              ) : (
                <button
                  style={{
                    width: "100px",
                    height: "30px",
                    color: "white",
                    backgroundColor: "#182745",
                    borderRadius: "5px",
                    fontSize: "13px",
                    fontWeight: "bold",
                    marginLeft: "290px",
                  }}
                  onClick={closeModal}
                >
                  Stäng
                </button>
              )}
            </div>
          </Modal>
        ) : (
          <Modal
            isOpen={isEditModalOpen}
            onRequestClose={closeModal}
            contentLabel="skapa ny uppgift"
            style={{
              overlay: { background: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: "100" },
              content: { background: "white", display: "flex", flexDirection: "column", height: "650px", width: "800px", alignItems: "center", padding: "0px", marginTop: "80px", marginLeft: "350px", borderRadius: "30px", border: "3px solid black" },
            }}
          >
            <div style={{ display: "flex", flexDirection: "row", width: "700px", height: "30px", marginLeft: "30px", marginTop: "20px" }}>
              <Icon icon="lucide:check-square" color="black" width="30" height="30" style={{}} />
              <div style={{ marginLeft: "20px", fontSize: "20px", fontWeight: "bold" }}>Redigera uppgift</div>
              <Icon icon="material-symbols:info-outline" color="black" width="30" height="30" style={{ marginLeft: "20px" }} />
            </div>
            <div style={{ display: "flex", width: "800px", height: "70px", marginLeft: "130px", flexDirection: "row" }}>
              {/* <input style={{marginTop: "15px", fontSize:"18px", borderRadius:"10px", backgroundColor: "#E5EFF7", width:"500px", height:"45px", paddingLeft:"20px" }} 
                type="text" placeholder="Lägg till en rubrik..." value={inputValue} onChange={handleInputChange}>
                </input> */}
              <Input
                isInvalid={invalidInput && inputValue === ""}
                style={{ marginTop: "15px", fontSize: "18px", borderRadius: "10px", backgroundColor: "#E5EFF7", width: "500px", height: "45px", paddingLeft: "20px" }}
                placeholder="Lägg till en rubrik..."
                value={inputValue}
                onChange={handleInputChange}
              ></Input>
              <div style={{ display: "flex", flexDirection: "column", marginLeft: "20px", marginTop: "10px", width: "190px" }}>
                <div style={{ fontSize: "12px", fontWeight: "bold", marginTop: "5px", width: "150px" }}>Nuvarande medlemmar</div>
                {newUsers.map((user, index) => (
                  <div key={index} style={{ display: "flex", flexDirection: "row", width: "200px", marginTop: "2px", alignItems: "left" }}>
                    <div style={{ backgroundColor: "#182745", height: "30px", width: "35px", borderRadius: "50%", color: "white", textAlign: "center", alignItems: "center" }}> {user.label.substring(0, 2)}</div>
                    <div style={{ width: "200px", height: "40px", marginLeft: "5px", color: "black", marginTop: "1px" }}> {user.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", width: "700px", height: "30px", marginLeft: "170px", fontSize: "15px", color: "gray" }}>i listan Att göra</div>
            <div style={{ display: "flex", flexDirection: "row", width: "700px", height: "40px", marginLeft: "30px", marginTop: "80px" }}>
              <Icon icon="entypo:text" color="black" width="30" height="30" />
              <div>Beskrivning</div>
              <div />
            </div>
            <div style={{ display: "flex", flexDirection: "row", width: "700px", height: "40px", marginTop: "5px", marginLeft: "30px" }}>
              <textarea
                placeholder="Beskriv uppgiften..."
                value={inputText}
                onChange={handleTextInputChange}
                style={{ paddingTop: "10px", resize: "none", height: "300px", fontSize: "15px", borderRadius: "15px", backgroundColor: "#E5EFF7", width: "500px", paddingLeft: "20px", paddingRight: "20px" }}
              />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ fontWeight: "bold", fontSize: "14px", marginLeft: "20px" }}>Lägg till på uppgift</div>
                <div style={{ marginLeft: "15px" }}>
                  <AddMemberToNewTaskModal selectedMembers={setNewUsers} project_id={inputproject} selectUsers={newUsers} task={task} />
                </div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "row", marginTop: "270px", width: "700px", marginLeft: "670px" }}>
              <button style={{ width: "100px", height: "30px", color: "white", backgroundColor: "#182745", borderRadius: "5px", fontSize: "13px", fontWeight: "bold", margin: "10px" }} onClick={saveEdit}>
                Spara Uppgift
              </button>
              <button style={{ width: "50px", height: "30px", backgroundColor: "white", borderRadius: "5px", fontSize: "13px", margin: "10px", fontWeight: "bold" }} onClick={closeModal}>
                Avbryt
              </button>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
}

export default TaskCard