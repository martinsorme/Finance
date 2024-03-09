import React from 'react'

type Props = {underline : number}


const IdeaTabs = ({underline}: Props) => {
    const getUnderline = (number: number) => {
        return underline === number ? "underline": ""
    }
  return (
    <div style={{display:"flex", flexDirection:"row", width:"100%", backgroundColor:"white", height:"20px", marginTop:"3px", justifyContent:"center"}}>
        <div style={{fontWeight:"bold", marginTop: "12px" ,fontSize:"18px", textDecoration: getUnderline(1)}}>Din avdelnings Förbättringsförslag</div>
        <div style={{width:"2px", height:"40px", backgroundColor:"black", marginTop:"5px", marginLeft:"15px", marginRight:"15px"}}></div>
        <div style={{fontWeight:"bold", marginTop: "12px" ,fontSize:"18px", textDecoration: getUnderline(2)}}>Förbättringsförslag</div>
        <div style={{width:"2px", height:"40px", backgroundColor:"black", marginTop:"5px", marginLeft:"15px", marginRight:"15px"}}></div>
        <div style={{fontWeight:"bold", marginTop: "12px" ,fontSize:"18px", textDecoration: getUnderline(3)}}>Pågående Förbättringsarbeten</div>
        <div style={{width:"2px", height:"40px", backgroundColor:"black", marginTop:"5px", marginLeft:"15px", marginRight:"15px"}}></div>
        <div style={{fontWeight:"bold", marginTop: "12px" ,fontSize:"18px", textDecoration: getUnderline(4)}}>Genomförda Förbättringsarbeten</div>
        
        </div>
  )
}

export default IdeaTabs