// Importing necessary components and libraries
import React from "react";
import HowWasYourWorkDayLP from "../components/LandingpageComponents/HowWasYourWorkDayLP";
import LatestEventsLP from "../components/LandingpageComponents/LatestEventsLP";
import OngoingImprovementsLP from "../components/LandingpageComponents/OngoingImprovementsLP";
import WhatImproveLP from "../components/LandingpageComponents/WhatImproveLP";
import LeftSidePanel from "../components/LeftSidePanelComponents/LeftSidePanel";
import { Grid, GridItem, Text } from "@chakra-ui/react";
import LightBlueHeader from "../components/LightBlueHeader";


type Props = {
};
// Define the LandingPage component
const LandingPage = ({}: Props) => {
  // Define variables for styling
  const rowHeight: number = 1;
  const bgColor: string = "var(--lightblue)";
  const gap: number = 4;
  const radius: number = 5;

  // Render the LandingPage component
  if (sessionStorage.getItem("auth") === null){
    window.location.href = "/login";
    return (<Text>Laddar</Text>)
  } else {
    // Get the name from the session storage
    let name = JSON.parse(sessionStorage.getItem("auth") + "").name;

    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        {/* Render the LeftSidePanel component */}
        <LeftSidePanel greenButton={1} />

        {/* Render the LightBlueHeader component */}
        <LightBlueHeader icon="ic:outline-home" text={"Välkommen " + name + "!"} isFinishProject={false}/>

        {/* Render the Grid component */}
        <Grid
          h="700"
          templateRows="repeat(8, 1fr)"
          templateColumns="repeat(8, 1fr)"
          gap={gap}
          columnGap={gap}
          rowGap={gap}
          margin={6}
          flex={1}
        >
          {/* Render the WhatImproveLP component */}
          <GridItem colSpan={5} rowSpan={3} bg={bgColor} borderRadius={radius}>
            <WhatImproveLP />
          </GridItem>
          {/* Render the LatestEventsLP component */}
          <GridItem colSpan={3} rowSpan={4} bg={bgColor} borderRadius={radius}>
            <LatestEventsLP />
          </GridItem>
          {/* Render the OngoingImprovementsLP component */}
          <GridItem colSpan={5} rowSpan={5} bg={bgColor} borderRadius={radius}>
            <OngoingImprovementsLP />
          </GridItem>
          {/* Render the HowWasYourWorkDayLP component */}
          <GridItem colSpan={3} rowSpan={4} bg={bgColor} borderRadius={radius}>
            <HowWasYourWorkDayLP />
          </GridItem>
        </Grid>
      </div>
    );
  }
};

export default LandingPage;
