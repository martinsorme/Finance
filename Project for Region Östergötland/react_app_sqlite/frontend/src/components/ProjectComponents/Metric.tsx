import React from 'react'
import {
  Text,
  Button,
  Grid,
  GridItem
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import { Measurement } from '../../Types';

type Props = {
  measurement: Measurement;
  onPopUpClick: (type: string, measurement: Measurement) => void;
  status : string; 
}

// Component for a metric, used to list all metrics on a project
const Metric = ({ status , measurement, onPopUpClick }: Props) => {

  const getDisable = () => {
    if (status !== "Finished"){
      return false 
    }else{
      return true 
    }


  }

  return (
    <Grid templateRows="repeat(1, 1fr)" templateColumns="repeat(10, 1fr)" gap={0} marginBottom={"10px"} bg={"#CEE2F0"} borderRadius={"5px"} paddingY={"10px"} paddingX={"10px"}>
      {/* Title of the measurement */}
      <GridItem rowSpan={1} colSpan={4} display={"flex"} alignItems={"center"}>
        <Text marginBottom={0} cursor={"default"}>
          {measurement.name}
        </Text>
      </GridItem>
      {/* Current status of measurement */}
      <GridItem rowSpan={1} colSpan={3} paddingRight={"10%"}>
        <Button variant={"midBlueButton"} size={"sm"} onClick={() => onPopUpClick("View", measurement)}>
          <Text marginBottom={0} align={"center"}>
            Visa mätningar
          </Text>
        </Button>
      </GridItem>
      {/* Goal of measurement */}
      <GridItem rowSpan={1} colSpan={3} paddingLeft={"10%"}>
        <Button isDisabled={getDisable()} variant={"midBlueButton"} size={"sm"} onClick={() =>  onPopUpClick("Add", measurement)}>
          <Icon icon="carbon:add" width={"20px"} />
          <Text marginBottom={0} align={"center"}>
            Ny mätning
          </Text>
        </Button>
      </GridItem>
      
    </Grid>
  );
}

export default Metric