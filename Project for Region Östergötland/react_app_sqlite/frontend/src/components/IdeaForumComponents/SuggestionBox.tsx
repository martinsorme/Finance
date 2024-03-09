import React from 'react'
import { Icon } from '@iconify/react';
type Props = {name : String}

const SuggestionBox = ({name}: Props) => {
  return (
    <div style={{marginLeft:"10px", backgroundColor:"white", width: "630px", 
    height: "80px", borderRadius:"10px", marginTop:"12px", display:"flex"}}> 
    <div style={{display:"flex", flexDirection: "column", width: "80px", alignItems:"center", marginLeft: "5px", 
            marginTop: "10px"}}>
        <Icon icon="mdi:lightbulb-on-outline" width="20" />
        <p style={{fontSize:"12px", fontWeight:"bold", marginBottom: "0px"}}>Matilda</p>
        <p style={{fontSize:"11px", fontStyle:"italic"}}>Undersköterska</p>
    </div>
    <div style={{display:"flex", flexDirection:"row"}}>
        <div style={{height:"70px", width: "1px", backgroundColor:"black", marginLeft:"10px", marginTop:"5px"}}></div>
        <div style={{fontSize:"17px", width: "200px",fontWeight:"bold", fontStyle:"italic",  display:"flex", alignItems:"center", marginLeft:"10px"}}>{name}</div>
        <button style={{height:"30px",width:"70px", color: "white", backgroundColor:"#182745", display:"flex", 
                    justifyContent:"center", alignItems:"center", borderRadius:"10px", 
                    fontSize:"13px", fontWeight:"bold", marginTop:"25px", marginLeft: "170px"}}>Läs mer</button>
    
    <div style={{display:"flex", flexDirection: "column", width: "80px", alignItems:"center", marginLeft: "20px", 
            marginTop: "5px"}}>
        <div style={{display:"flex", flexDirection: "row", width: "80px", alignItems:"center", height: "40px"}}>
        <Icon icon="ant-design:like-outlined" color="black" width="25" hFlip={true}/>
        <h3 style={{fontSize:"15px", marginTop:"5px", marginLeft: "3px"}}>10</h3>
        </div>
        <div style={{display:"flex", flexDirection: "row", width: "80px", alignItems:"center", height: "40px"}}>
        <Icon icon="material-symbols:comment-outline" color="black" width="25" hFlip={true}/>
        <h3 style={{fontSize:"15px", marginTop:"3px", marginLeft: "3px"}}>3</h3>
        </div>
        </div>

        

    </div>
    </div>
  )
}

export default SuggestionBox