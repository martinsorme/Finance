import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import {
  HStack,
  Text,
  Button,
  VStack,
  Grid,
  GridItem,
  useDisclosure
} from "@chakra-ui/react";
import Metric from "./Metric";
import { Icon } from '@iconify/react';
import MetricPopUp from "./MetricPopUps/MetricPopUp";
import { Measurement } from "../../Types";
import ViewMeasurements from "./MetricPopUps/ViewMeasurements";
import {BASE_URL} from "../../Constants";

type Props = {};

const measurements = [
  { title: "Antal deltagare", unit: "st", current: 7, target: 10 },
  { title: "Antal intervjuer hållna", unit: "st", current: 2, target: 5 },
]


const ResultFollowUp = (props: Props) => {
  
  const params = useParams();
  const [measurements, setMeasurements] = useState<Measurement[]>([]); // Declare state variable to store data
  const [metricsChanged, setMetricsChanged] = useState(false); // Used to force a rerender when the metrics are changed
  const { isOpen: isNewMetricOpen, onOpen: onNewMetricOpen, onClose: onNewMetricClose } = useDisclosure() // For the pop up for adding a new measurement
  const { isOpen: isMeasurementsOpen, onOpen: onMeasurementsOpen, onClose: onMeasurementsClose } = useDisclosure(); // For the pop up for viewing all measurements
  const [selectedMetric, setSelectedMetric] = useState<Measurement>({ name: '', unit: '', frequencyAmount: undefined, frequencyInterval: '', project_id: -1, measurementId: -1 }); // Used to store the selected metric
  const [popUpType, setPopUpType] = useState(""); // Initialize type state with "Add"
  const [status, setStatus] = React.useState<string>("");

  let projectId = -1;
  if (params.projectId !== undefined) {
     projectId = parseInt(params.projectId);
  }

  // Fetch the project status
  const getProject = async () => {
    try {
      const response = await fetch(BASE_URL + "/project/" + projectId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const jsonData = await response.json();
      const data = jsonData;
      setStatus(data.status)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // Fetch the measurements on component mount
  useEffect(() => {
    getProject();
  }, []); // Run only once on component mount
  

  // Fetch the measurements, called when measurements are changed
  const getMetrics = async () => {
    try {
      const response = await fetch(
        BASE_URL + "/get_all_measurements/" + projectId,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const jsonData = await response.json();
      setMeasurements(jsonData); // Set the fetched data to the state
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  useEffect(() => {
    getMetrics();
  }, [metricsChanged]);

  const handleMetricsChanged = (value: boolean) => {
    setMetricsChanged(value);
  }

  const handlePopUpClick = (type: string, metric: Measurement) => {
    setSelectedMetric(metric);
    setPopUpType(type);
    onMeasurementsOpen();
  }

  
  return (
      <div
        style={{
          backgroundColor: "var(--lightblue)",
          borderRadius: "10px",
          height: "100%",
        width: "100%",
        maxHeight: "69vh",
          overflow: "scroll"
        }}
      >
        <VStack alignItems={"left"} paddingLeft={'20px'} paddingRight={'20px'}>

          <HStack paddingTop={'15px'} justifyContent={'space-between'} marginBottom={'15px'}>
            <Text marginTop="5px" as="b" fontSize="xl" cursor={'default'}>
                Utfallsmått
            </Text>
            {status !== "Finished" ? (
            <Button variant={'darkBlueButton'} onClick={onNewMetricOpen}>Lägg till mått</Button>
            ) : null } 
          </HStack>

          {/* Rendering the measurements here */}
        {measurements && measurements.map((measurement) => (
          <Metric status = {status} measurement={measurement} onPopUpClick={handlePopUpClick} key={"measurement"+measurement.measurementId}/>
        ))}
      </VStack>
      <MetricPopUp metricsChanged={handleMetricsChanged} metricsChangedValue={metricsChanged} projectId={projectId} onClose={onNewMetricClose} isOpen={isNewMetricOpen} />
      <ViewMeasurements measurement={selectedMetric} onClose={onMeasurementsClose} isOpen={isMeasurementsOpen} type={popUpType} />
      </div>
  );
};

export default ResultFollowUp;
