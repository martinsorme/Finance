import React from 'react'
import { Icon } from '@iconify/react';
import ButtonsSidePanel from "./ButtonsSidePanel"
import PdsaModal from './PdsaModal';

//The Number greenButton tells what button from 1-4 that is going to get green 

type Props = {greenButton : number}

const LeftSidePanel = ({greenButton}: Props) => {

  return (
    <div style={{display: "flex", backgroundColor: "#182745", height: "100vh" , width: "250px", flexDirection:"column", position:"fixed", left:0, top:87}}>
      <div style={{ display: "flex", backgroundColor: "#182745", flexDirection: "row", marginLeft: "20px", marginRight:'5px', marginTop:"30px"}}>
            <Icon icon="fa6-solid:user-doctor" color="white" width="45" style={{marginTop:"5px"}} />
            <div style={{display: "flex", backgroundColor: "#182745",  flexDirection:"column" ,justifyContent:"center", alignItems:"center", marginLeft:"20px", marginRight: '5px'}}>
                <h3 style={{color:"white", marginTop:"5px", fontSize:"25px", maxWidth: '150px'}}>{JSON.parse(sessionStorage.getItem("auth") + '').name}</h3>
                <h3 style={{color:"white", fontSize:"13px", fontStyle:"italic"}}>{JSON.parse(sessionStorage.getItem("auth") + '').jobTitle}</h3>
            </div>
        </div>
        <ButtonsSidePanel greenButton={greenButton}/>
        <PdsaModal/>
      
    </div>
  )
}

export default LeftSidePanel