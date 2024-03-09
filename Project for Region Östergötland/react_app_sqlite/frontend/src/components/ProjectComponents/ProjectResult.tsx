import React, { useState } from "react";
import TabsProject from "./TabsProject";
import { Grid, GridItem } from "@chakra-ui/react";
import ResultFollowUp from "./ResultFollowUp";
import CompletedTasks from "./CompletedTasks";

type Props = {

};

const ProjectResult = (props: Props) => {
  const [tempTaskId] = useState(Number);
  return (
    <div
      style={{
        backgroundColor: "white",
        width: "100%",
        flexDirection: "column",
      }}
    >
      <TabsProject highlighted={3} />
      <Grid
        h="65vh"
        templateRows="repeat(1, 1fr)"
        templateColumns="repeat(2, 1fr)"
        gap={4}
      >
        <GridItem rowSpan={1} colSpan={1} style={{ marginLeft: "3%" }} paddingTop={'10px'}>
          {/* Right part of page where all metrics are rendered */}
          <ResultFollowUp />
        </GridItem>
        <GridItem rowSpan={1} colSpan={1} style={{ marginRight: "3%" }} paddingTop={'10px'}>
          {/* Left part of page where all completed tasks are rendered */}
          <CompletedTasks height="100%" bgColor="var(--lightblue)" width="100%" borderRadius="10px" tempTaskId={tempTaskId} />
        </GridItem>
      </Grid>
    </div>
  );
};

export default ProjectResult;
