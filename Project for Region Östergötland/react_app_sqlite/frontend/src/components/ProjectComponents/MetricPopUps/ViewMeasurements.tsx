import React, { useEffect, useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Text,
    HStack,
    VStack,
    Button,
    Input,
} from '@chakra-ui/react'
import { Measurement } from '../../../Types'
import {BASE_URL} from "../../../Constants";

type Props = {
    onClose: () => void,
    isOpen: boolean,
    measurement: Measurement,
    type: string, // "View" or "Add" - determines what content to render (measurements or form to add a new measurement)

}

//css styling for input fields
const inputStyle = {
  backgroundColor: "white",
  borderRadius: "10px",
  border: "1px solid var(--darkblue)",
  width: "100%",
  height: "40px",
};

const ViewMeasurements = ({ measurement ,onClose, isOpen, type }: Props) => {
  const [measurements, setMeasurements] = useState([{ value: "", time: "" }]); // Declare state variable to store data
  const [currentMeasurementDate, setMeasurementDate] = useState("");
  const [currentVal, setCurrentVal] = useState("");
  const [invalidInput, setInvalidInput] = useState({ date: false, measure: false }); // default/dummy values

  // Fetch the measurements
    const getMeasurements = async () => {
        if (measurement.measurementId === -1) return;
        try {
          const response = await fetch(
            BASE_URL + "/get_all_measurements_child/" + measurement.measurementId,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                },
            }
            );
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            } else if (response.ok) {
                const jsonData = await response.json();
                setMeasurements(jsonData); 
            }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
    }; 

  // Add a new measurement
  const postMeasurements = async () => {

    let isInvalid = false;
    let _invalidInputs = { date: false, measure: false };
    
    if (currentVal === "") {
      _invalidInputs.measure = true;
      isInvalid = true;
    }
    setInvalidInput(_invalidInputs)

    if (isInvalid) return;
      
    const requestOptions = {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        value: currentVal,
        date: currentMeasurementDate,
      }),
    };

    try {
      const response = await fetch(BASE_URL + "/add_new_measurement_child/" + measurement.measurementId, requestOptions);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else if (response.ok) {
        const jsonData = await response.json();
        onClose();
        setMeasurementDate("");
        setCurrentVal("");
        getMeasurements();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch the measurements, called when measurements are changed to get updated data
  useEffect(() => {
    getMeasurements();
    setMeasurementDate(currentMeasurementDate);
    setCurrentVal(currentVal);
  }, [measurement]);

  let content = null;
  let modalHeaderText = "";

  // determines wether to render a list of the measurments made or a form to add a new measurement
  if (type === "View") {
    // Render content for 'View' type here
    modalHeaderText = `${measurement.name}`;
    content = (
      <VStack>
        <Text as="b">Mätningar</Text>
        {measurements.length > 0 ? (
          measurements.map((m, index) => (
            <HStack display={"flex"} justifyContent={"space-around"} width={"100%"} key={index + m.time}>
              <Text marginBottom={0}>{m.time}</Text>
              <HStack>
                <Text marginBottom={0}>{m.value}</Text>
                <Text marginBottom={0}>{measurement.unit}</Text>
              </HStack>
            </HStack>
          ))
        ) : (
          <Text>Inga mätningar</Text>
        )}
      </VStack>
    );
  } else if (type === "Add") {
    // Render content for 'Add' type here
    modalHeaderText = `Ny mätning av "${measurement.name}"`;
    content = (
      <VStack>
        <HStack display={"flex"} justifyContent={"space-around"} width={"100%"}>
          <Text w={"40%"}>Datum</Text>
          <Text w={"40%"}>Värde</Text>
          <Text w={"15%"}>Enhet</Text>
        </HStack>
        <HStack justifyContent={"space-around"} width={"100%"}>
          <Input style={inputStyle} flex={1} defaultValue={new Date().toISOString().split("T")[0]} size="md" type="date"
            onChange={(event) => setMeasurementDate(event.target.value)
            }
          />
          <Input isInvalid={invalidInput.measure == true} style={inputStyle} flex={1} resize="none" borderColor={"black"} value={currentVal}
            onChange={(event) => {
              if (/^\d*$/.test(event.target.value)) {
                setCurrentVal(event.target.value);
              }}} />

          <Text w={"15%"}>{measurement.unit}</Text>
        </HStack>
        <HStack>
          <Button variant="darkBlueButton" align-items="center" onClick={postMeasurements}>
            Spara
          </Button>
          <Button align-items="center" onClick={onClose}>
            Avbryt
          </Button>
        </HStack>
      </VStack>
    );
  }


    return (
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent border={"2px solid var(--darkblue)"} borderRadius={"10px"} paddingX={"10px"} paddingBottom={"10px"} bg={"#E5F0F7"} maxWidth={"fit-content"} minWidth={"200px"} maxHeight={"50vh"} minHeight={"30vh"}>
          <ModalHeader marginRight={5}>{modalHeaderText}</ModalHeader>
          <ModalCloseButton />
          {/* render the content of the modal here */}
          <ModalBody>{content}</ModalBody>
        </ModalContent>
      </Modal>
    );
}

export default ViewMeasurements