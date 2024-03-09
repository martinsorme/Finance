import React from 'react'
import { VStack, Text, HStack} from '@chakra-ui/react'
import line from "../../images/Vector 14.png";
import dot from "../../images/Ellipse 21.png";
import rectangle from "../../images/Rectangle 169.png";
import Popup from '../ProjectComponents/EditTime';
import { useState } from 'react';

type Props = {
    title: string
    startTime: string
    deadLine: string
}

const DetailsTimeplan = ({title, startTime, deadLine}: Props) => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  return (
    <HStack spacing={1}>
    <VStack width={"30%"} alignItems={'left'} spacing={1}>
      <HStack spacing={2}>
        <Text style={{fontSize:"36px", marginLeft:"10%"}} as={'b'}>
            {title}
        </Text>
        <a style={{display:"flex", justifyContent: "center", textDecoration:"underline", marginTop:"10px", fontStyle: "italic", cursor: "pointer"}}onClick={openPopup}>Redigera</a>
        {isPopupOpen && (
          <Popup isOpen={isPopupOpen} onClose={closePopup}/>
      )}
      </HStack>
        <div>
        <img src={line} style={{marginLeft: "12%"}}/>
          <div style={{ display: "flex", alignItems: "center"}}>
            <img src={dot} style={{marginLeft: "10.5%", marginTop: "-39%"}}/>
            <Text style={{fontSize:"18px", marginLeft:"12%", marginTop: "-39%"}} as={'b'}>{"Startdatum"}</Text>

          </div>

          <div style={{ display: "flex", alignItems: "center"}}>
            <img src={dot} style={{marginLeft: "10.5%", marginTop: "-6%"}}/>
            <Text style={{fontSize:"18px", marginLeft:"12%", marginTop: "-6%"}} as={'b'}>{"Slutdatum"}</Text>
          </div>
        </div>
  
    </VStack>

    <VStack>
    <div style={{ position: "relative" }}>
      <img src={rectangle} style={{ marginTop: "22%" }} />
      <Text style={{ fontSize: "18px", position: "absolute", top: "75%", left: 0, width: "100%", textAlign: "center" }}>
        {startTime}
      </Text>
    </div>


    <div style={{ position: "relative" }}>
      <img src={rectangle} style={{ marginTop: "5%" }} />
      <Text style={{ fontSize: "18px", position: "absolute", top: "40%", left: 0, width: "100%", textAlign: "center" }}>
        {deadLine}
      </Text>
    </div>
    </VStack>
    </HStack>
  )
}

export default DetailsTimeplan