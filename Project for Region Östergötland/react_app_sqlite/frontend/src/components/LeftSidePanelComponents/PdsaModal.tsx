import React, { useState } from "react";
import Modal from "react-modal";
import { Icon } from "@iconify/react";
import PDSA from "../../images/PGSA_Components/PGSA_FULL.png";
import PGSA_P from "../../images/PGSA_Components/PGSA_P.png"
import PGSA_G from "../../images/PGSA_Components/PGSA_G.png"
import PGSA_S from "../../images/PGSA_Components/PGSA_S.png"
import PGSA_A from "../../images/PGSA_Components/PGSA_A.png"
import { HStack, Tabs , TabPanel , TabPanels , Tab , TabList } from "@chakra-ui/react";

Modal.setAppElement("#root"); // Set the app root element

type Props = {};

const PdsaModal = (props: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // open modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div style={{ padding: "3px", marginTop: "150px", backgroundColor: "#A9D7FF", width: "80px", height: "80px", borderRadius: "50%", marginLeft: "82px", cursor: 'pointer' }} onClick={openModal}>
        <Icon icon="fluent:chat-bubbles-question-20-filled" color="#182745" width="30" style={{ marginLeft: "25px", marginTop: "5px" }} />
        <h3 style={{ fontSize: "12px", color: "#182745", display: "flex", justifyContent: "center", fontWeight: "bold", textAlign: "center" }}> Vad är PGSA?</h3>
      </div>

      {/* When clicking on the "Vad är PGSA?" in the side panel the modal opens  */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="PGSA Modal"
        style={{
          overlay: { background: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: "100" },
          content: { background: "#CEE2F2", display: "flex", flexDirection: "column", height: "430px", width: "700px", alignItems: "center", padding: "0px", marginTop: "120px", marginLeft: "360px", cursor: "pointer", borderRadius: "10px", border:"2px solid var(--darkblue)" },
        }}
      >
      <div style={{ backgroundColor: "#A0C7E3", width: "700px", textAlign: "center", fontSize: "30px", height: "70px", display: "flex", flexDirection: "row" }}>
        <h3 style={{ marginTop: "20px", marginLeft: "255px", fontWeight:"bold"}}>Vad är PGSA?</h3>
        {/* When clicking on the x in the right corner the modal closes */}
        <Icon icon="carbon:close-outline" color="gray" width="25" style={{ marginLeft: "235px", marginTop: "5px" }} onClick={closeModal} />
      </div> 

      <div>   
        <Tabs variant='soft-rounded' size='lg' align='center' isFitted >
          <TabList marginLeft='10px' marginRight='10px' marginTop='5px'>
            {/* Tabs for the different parts of PGSA */}
            <Tab _selected={{ color: 'white', bg: 'blue.900'}}>Allmänt</Tab>
            <Tab _selected={{ color: 'white', bg: "#4CBB71"}}>P</Tab>
            <Tab _selected={{ color: 'white', bg: "#F5D726" }}>G</Tab>
            <Tab _selected={{ color: 'white', bg: "#E7A9C9" }}>S</Tab>
            <Tab _selected={{ color: 'white', bg: "#37B4E7" }}>A</Tab>
          </TabList>
          <TabPanels>
            {/* Below the information of each tab is written under each TabPanel */}
            <TabPanel>
              <div>
              <HStack> 
                <img src={PDSA} alt="Image Alt Text" width="200" style={{marginTop: "10px", marginLeft: "20px", marginRight: "10px"}}/>
                <div style={{height: "100px", marginLeft: "20px", marginRight: "20px", marginTop: "-75px"}}>
                  <h4 style={{textAlign: "left", fontWeight: "bold"}}> PGSA </h4>
                  <h6 style={{textAlign: "left"}}>
                    PGSA (planera, göra, studera, agera) används som ett stöd för systematiskt förbättringsarbete. Genom att arbeta steg för steg genom P-G-S-A kan förändringar följas och visa om idén leder till förbättring, inte har någon effekt eller leder till försämring. 
                  </h6>
                </div>
              </HStack>
              </div>
            </TabPanel>
            <TabPanel>
              <div style={{height: "100px", marginTop: "0px"}}>
              <HStack> 
                <img src={PGSA_P} alt="Image Alt Text" width="200" style={{marginTop: "10px", marginLeft: "20px", marginRight: "10px"}}/>
                <div style={{height: "100px", marginLeft: "20px", marginRight: "20px", marginTop: "-75px"}}>
                  <h4 style={{textAlign: "left", fontWeight: "bold"}}> Planera </h4>
                  <h6 style={{textAlign: "left"}}> 
                    I planeringsfasen (P) tar vi fram en plan för genomförandet. Detta gör vi utifrån de mål, mått och idéer som vi har identifierat. Vi planerar vad som ska göras, hur det ska göras och när och vem som ska genomföra det. Vi planerar också för hur förändringen ska följas upp och mätas. 
                  </h6>
                </div>
              </HStack> 
              </div>
            </TabPanel>
            <TabPanel>
            <div>
            <HStack> 
              <img src={PGSA_G} alt="Image Alt Text" width="200" style={{marginTop: "10px", marginLeft: "20px", marginRight: "10px"}}/>  
              <div style={{height: "100px", marginLeft: "20px", marginRight: "20px", marginTop: "-75px"}}>
                <h4 style={{textAlign: "left", fontWeight: "bold"}}> Göra </h4>
                <h6 style={{textAlign: "left"}}> 
                  I göra-fasen genomför vi den förändring som vi har planerat. Vi fångar in information kring hur förändringen tas emot genom synpunkter, iakttagelser och erfarenheter. Vi noterar också problem och oväntade händelser. Målet är att alla involverade förstår problemet och vilka förbättringar och förändringar som ska göras. 
                </h6>
              </div>
            </HStack> 
            </div>
            </TabPanel>
            <TabPanel>
            <div>
            <HStack> 
              <img src={PGSA_S} alt="Image Alt Text" width="200" style={{marginTop: "10px", marginLeft: "20px", marginRight: "10px"}}/>  
              <div style={{height: "100px", marginLeft: "20px", marginRight: "20px", marginTop: "-75px"}}>
                <h4 style={{textAlign: "left", fontWeight: "bold"}}> Studera </h4>
                <h6 style={{textAlign: "left"}}> 
                  Både under och efter genomförandet studerar vi hur det går. Resultatet analyseras och jämförs med målet och mätvärdena. En positiv effekt och en förbättring behöver fortsätta kontrolleras för att säkerställa att förbättringarna inte är en tillfällighet, utan är här för att stanna. 
                </h6>
              </div>
            </HStack> 
            </div>
            </TabPanel>
            <TabPanel>
            <div>
            <HStack> 
              <img src={PGSA_A} alt="Image Alt Text" width="200" style={{marginTop: "10px", marginLeft: "20px", marginRight: "10px"}}/>  
              <div style={{height: "100px", marginLeft: "20px", marginRight: "20px", marginTop: "-75px"}}>
                <h4 style={{textAlign: "left", fontWeight: "bold"}}> Agera </h4>
                <h6 style={{textAlign: "left"}}> 
                  I sista fasen ser vi över lärdomarna från genomförandet. Vi summerar och reflekterar över lärdomarna och avgör huruvida förändringen leder till förbättring eller inte. Utifrån detta tas beslutet om förändringen ska förkastas, justeras och prövas i ett nytt varv i PGSA eller om den ska implementeras som den är. Oavsett krävs en plan för det fortsatta arbetet. 
                </h6>
              </div>
            </HStack> 
            </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
        </div>
      </Modal>
    </div>
  );
};

export default PdsaModal;
