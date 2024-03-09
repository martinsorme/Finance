import React from 'react'
import { Text } from '@chakra-ui/react'

type Props = {
  startDate: string
  setStartDate: (startDate: string) => void
}

const NextDeadline = ({ startDate, setStartDate }: Props) => {

  const textStyle = {
    width: "150px",
    fontSize: "22px",
    color: "#182745",
    fontStyle: "italic",
    marginLeft: "5px",
    marginTop: "16px"
  };
  return (
    
  <div style={{height:"70px", width:"350px", backgroundColor: "#E6F0F8", borderRadius:"10px", display:"flex"}}>
    <div style={{ width: "130px", fontSize: "22px", color: "#182745", fontWeight: "bold", marginLeft: "15px", marginTop: "16px" }}>Startdatum: </div>
    <Text style={textStyle}>{new Date(startDate).toLocaleDateString('en-GB', { weekday: 'short', year: '2-digit', month: 'short', day: 'numeric' })}</Text>
  </div>
  
  )
}

export default NextDeadline