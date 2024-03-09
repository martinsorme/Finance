import React from 'react';
import { Input } from "@chakra-ui/react"; // textarea flera rader 

type Props = {
  subject : string,
  fade: string,
  input : React.Dispatch<React.SetStateAction<string>>,
  inputValue: string,
  invalidInput?: boolean
}

const InputSingelProject = ({subject, fade, input, inputValue, invalidInput }: Props) => {

  // sets input value to usestate in inputRightProject 
    const handleInputChange = (e :React.ChangeEvent<HTMLInputElement>) => {
      input(e.target.value); 
    };
  return (
    <div style={{display: "flex",  flexDirection:"column", marginLeft:"15px"}}> 
        <h3 style={{fontSize:"20px", width:"500px", marginTop:"10px", fontWeight:"bold"}}>{subject}</h3>
        
        <Input style={{fontSize:"15px", borderRadius:"10px", backgroundColor: "#E5EFF7", width:"550px", height:"35px", paddingLeft:"20px" }} 
        type="text" placeholder={fade} value={inputValue} onChange={handleInputChange} isInvalid={inputValue === "" &&  invalidInput}>
        </Input>
       
  </div>
);
}


export default InputSingelProject