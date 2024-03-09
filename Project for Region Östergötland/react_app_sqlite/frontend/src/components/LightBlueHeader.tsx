import React from 'react'
import { Icon } from '@iconify/react';

type Props = {icon:string , text:String, isFinishProject?:boolean}

const LightBlueHeader = ({icon, text, isFinishProject}: Props) => {
    
  return (
    <div style={{ backgroundColor: isFinishProject ? "#F8AE9F" : "#A9D7FF", display: "flex", height: "60px", alignItems: "center", justifyContent: "center", position: "fixed", top: 87, left: 250, right: 0, zIndex: 2 }}>
      <Icon icon={icon} color="#182745" width="35" />
      <h3 style={{ color: "#182745", marginLeft: "10px", marginTop: "10px", fontSize: "25px" }}>{isFinishProject ? `Slutfört: ${text}` : (text.length > 70) ? text.substring(0, 70) + "..." : text}</h3>
    </div>
  );
}

export default LightBlueHeader