import React from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, VStack } from '@chakra-ui/react';
import TimeInput from '../CreateProjectComponents/TimeInput';
import { useState } from 'react';
import { useParams } from "react-router-dom";
import {BASE_URL} from "../../Constants";

// this popup has only support for two buttons 
// determine amount of buttons by passing in the onclick functions and button texts as props
// it is possible to not have any buttons at all by not passing any button props

type PopupProps = {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
};

const Popup: React.FC<PopupProps> = ({ title = "Redigera",  
   isOpen, onClose}) => {

const { projectId } = useParams();


//Start variables 
const [selectedstart, setSelectedstart] = useState('')
//end  variables 
const [selectedsend, setSelectedend] = useState('')
//set start function 
const handleStartDateChange = (day : string, month : string, year: string) => {
  if (day.length === 0 || month.length === 0|| year.length === 0){
    setSelectedstart('inget datum')
  }else {
  
  setSelectedstart(year+'-' + month+'-'+ day + ' 12:00:00')
  }
};
//set end function 
const handleEndDateChange = (day : string, month : string, year: string) => {
  if (day.length === 0 || month.length === 0|| year.length === 0){
    setSelectedend('inget datum')
  }else {
    
  setSelectedend(year+'-' + month+'-'+ day + ' 12:00:00')
  }

};
const saveChanges = async () => {
  let token = JSON.parse(sessionStorage.getItem('auth') + "").token
  
  
  try {
    const response = await fetch(BASE_URL + "/project/" + projectId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      },
      body: JSON.stringify({startTime : selectedstart, deadline : selectedsend}),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    } 
    const data = await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  window.location.reload();
}
  

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent background="#E5EFF8" borderRadius="8px">
        <ModalHeader background="#CEE2F2" fontSize="10px" height="50px" borderRadius="8px 8px 0px 0px" textAlign="center">
          <h3 style={{ marginTop: "1px", textAlign: "center", marginBottom: "1px" }}>{title}</h3>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody display="flex" flexDirection="column" alignItems="center">
        <VStack>
            <div>
            <TimeInput onDateChange={handleEndDateChange} header = {"Nytt slutdatum:"}/>
            </div>

            <div style={{display:"flex", justifyContent:"flex-end", marginTop: "10px"}}>
            <Button style={{backgroundColor:"#B9D87A", fontWeight:"bold", color:"white", width:"170px", height:"45px",  marginRight:"15px", 
                borderRadius:"10px", fontSize:"14px"}} onClick={saveChanges}>Spara</Button>
            </div>
        </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Popup;



