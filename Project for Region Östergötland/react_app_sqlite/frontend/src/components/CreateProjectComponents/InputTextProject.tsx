import React from 'react';
import { Textarea } from "@chakra-ui/react"; // textarea flera rader 

type Props = {
  subject:string, 
  fade:string, 
  height:string, 
  input : React.Dispatch<React.SetStateAction<string>>,
  inputValue: string,
  invalidInput?:boolean
}

const InputTextProject = ({subject, fade, height, input, inputValue, invalidInput }: Props) => {

    const maxWords = 141;

    // sets input value to usestate in inputRightProject. If maximum number of words is reached you can not add any words
    const handleInputChange = (e :React.ChangeEvent<HTMLTextAreaElement>) => {
        const words = e.target.value.trim().split(/\s+/); 
        if (words.length <= maxWords) {
          input(e.target.value); 
        }
    };
  return (
    <div style={{display: "flex",  flexDirection:"column", marginLeft:"15px"}}>
        <h3 style={{fontSize:"20px", width:"500px", marginTop:"15px", fontWeight:"bold"}}>{subject}</h3>
        
        <Textarea placeholder={fade} value={inputValue} onChange={handleInputChange} isInvalid={inputValue === "" &&  invalidInput}
        style={{paddingTop:"10px", resize: "none", height: height, fontSize: '15px', borderRadius: '10px', backgroundColor: '#E5EFF7', width: '550px', paddingLeft: '20px', paddingRight:"20px"}}>
        </Textarea>
        
      <p style={{marginLeft:"10px", fontSize:"13px", fontStyle:"italic"}}>Antal ord kvar {141 - inputValue.split(/\s+/).length}</p>
    </div>
  )
}

export default InputTextProject