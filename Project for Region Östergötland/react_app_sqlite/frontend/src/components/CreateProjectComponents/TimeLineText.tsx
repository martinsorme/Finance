import React from 'react'

type Props = {}

//Returns text next to bullets 
const TimeLineText = (props: Props) => {
  return (
    <div style={{display:"flex", marginLeft:"100px",marginRight:"10px",  width: "200px", marginTop: "35px", flexDirection:"column"}}> 
        <h3 style={{color: "black", fontStyle:"italic", fontSize: "15px", textAlign:"right"}}>Allmän information</h3>
        <h3 style={{color: "black", fontStyle:"italic", fontSize: "15px",textAlign:"right", marginTop:"945px"}}>Utfallsmått</h3>
        <h3 style={{color: "black", fontStyle:"italic", fontSize: "15px",textAlign:"right", marginTop:"262px"}}>Tidsplan</h3>
        <h3 style={{color: "black", fontStyle:"italic", fontSize: "15px",textAlign:"right", marginTop:"158px"}}>Medlemmar</h3>
        <h3 style={{color: "black", fontStyle:"italic", fontSize: "15px",textAlign:"right", marginTop:"285px"}}>Påbörja</h3>
        </div>
  )
}

export default TimeLineText