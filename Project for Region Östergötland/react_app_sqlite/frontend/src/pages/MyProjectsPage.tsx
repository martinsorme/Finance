import React from "react";
import LeftSidePanel from "../components/LeftSidePanelComponents/LeftSidePanel";
import LightBlueHeader from "../components/LightBlueHeader";
import OngoingImprovementsLP from "../components/LandingpageComponents/OngoingImprovementsLP";
import { Center, HStack, Text} from "@chakra-ui/react";

type Props = {};

const MyProjectsPage = (props: Props) => {
  const [draft, setDraft] = React.useState<boolean>(false);
  const color = "#F2F8FB";
  const sideMargin = "7px";
  return (
    <div style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", height: "50vh" }}>
      <LeftSidePanel greenButton={2} />
      <LightBlueHeader icon="ph:squares-four" text="Mina förbättringsarbeten" isFinishProject={false}/>
      <div style ={{width:"70%", marginTop:"80px", height: "100%"}}>
        <HStack marginLeft={sideMargin} marginRight={sideMargin}>
          <div style={{
            borderRadius: "10px",
            backgroundColor: color,
            width: "50%",
            height: "40px",
            cursor: "pointer",
          }}
          onClick={() => {setDraft(false)}}>
            <Center height={"100%"}>
              <Text as='b' fontSize={'l'} textColor={draft ? 'GrayText' : 'initial'}>
                Påbörjade förbättringsarbeten
              </Text>
            </Center>
          </div>
          <div style={{
            borderRadius: "10px",
            backgroundColor: color,
            width: "50%",
            height: "40px",
            cursor: "pointer",
            }} 
            onClick={() => {setDraft(true)}}>
              <Center height={"100%"}>
                <Text as='b' fontSize={'l'} textColor={!draft ? 'GrayText' : 'initial'}>
                  Utkast förbättringsarbete
                </Text>
            </Center>
            </div>
        </HStack>
        <OngoingImprovementsLP showTitle={false} color="var(--lightblue2)" draft={draft} height = {'600px'}/>
        
      </div>
    </div>
  );
};

export default MyProjectsPage;
