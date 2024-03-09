import React, { useState } from "react";
import { Center, VStack, Text, Spacer, HStack, Box, Button } from "@chakra-ui/react";
import PgsaDisplay from "../PgsaDisplay";
import { useParams } from "react-router-dom";
import Popup from "../Popup";
import { BASE_URL } from "../../Constants";

// Defining the type for the component's props
type Props = {
  status: string;
  userId: number;
};

// Functional component for displaying the PGSA overview
const PGSA_Overview = ({ status, userId }: Props) => {
  // State hooks for managing selectedStatus and finish project modal
  const [selectedStatus, setSelectedStatus] = useState(status);
  const [isFinishProject, setFinishProject] = useState(false);

  // Array of letters with corresponding colors
  const letters = [
    { key: "P", letter: "P", color: "#4CBB71" },
    { key: "D", letter: "G", color: "#F5D726" },
    { key: "S", letter: "S", color: "#E7A9C9" },
    { key: "A", letter: "A", color: "#37B4E7" },
  ];

  // Extracting projectId from the route parameters
  const { projectId } = useParams();

  // Retrieving the authentication token from sessionStorage
  let token = JSON.parse(sessionStorage.getItem("auth") + "").token;

  // Logging the route parameters to the console
  console.log(useParams());

  // Function for changing the project status
  const changeStatus = async (letter: string) => {
    // Constructing the request options for the fetch API
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        status: letter,
        deadline: letter === "Finished" ? new Date().toISOString().split("T")[0] + " 12:00:00" : "inget datum",
      }),
    };
    try {
      // Making a PUT request to update the project status
      const response = await fetch(`${BASE_URL}/project/` + projectId, requestOptions);
      // Handling the response from the server
      if (response.ok) {
        // Updating the selectedStatus in the component state
        setSelectedStatus(letter);
        window.location.reload();
      } else {
        alert("something went wrong");
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  // Function to initiate the project finish confirmation
  const finishProject = async () => {
    setFinishProject(true);
  };

  // Rendering the PGSA overview component
  return (
    <div
      style={{
        backgroundColor: "#E6F0F8",
        borderRadius: "10px",
        height: "500px",
        width: "350px",
      }}
    >
      <VStack align="left">
        <HStack>
          {/* Displaying the "Status" header */}
          <Text as="b" fontSize={"2xl"} justifySelf={"left"} marginLeft={"15px"}>
            Status
          </Text>
          {/* Displaying the "Avsluta förbättringsarbetet" button for the project owner */}
          {JSON.parse(sessionStorage.getItem("auth") + "").userId === userId && status !== "Finished" && (
            <Button fontSize={"xs"} variant="redButton" w="40%" h="30px" marginTop="10px" ml="auto" marginRight="10px" style={{ whiteSpace: "initial", fontSize: "15px" }} onClick={finishProject}>
              Avsluta
            </Button>
          )}
        </HStack>
        {/* Displaying the PGSA status using PgsaDisplay component */}
        <Center>
          <PgsaDisplay status={selectedStatus} size="200px" />
        </Center>
        {/* Displaying the status selection buttons for the project owner */}
        {JSON.parse(sessionStorage.getItem("auth") + "").userId === userId && status !== "Finished" ? (
          <HStack>
            <Spacer />
            {letters.map(({ key, letter, color }, index) => (
              <React.Fragment key={index}>
                <VStack>
                  {/* Displaying the letter and the clickable status button */}
                  <Text marginBottom={0} fontWeight="bold">
                    {letter}
                  </Text>
                  <Box boxSize="30px" bg={selectedStatus === key ? color : "white"} border="3px solid" borderColor={color} borderRadius="50%" marginTop={0} marginBottom={2} onClick={() => changeStatus(key)} cursor="pointer" />
                </VStack>
                {index < letters.length - 1 && <Spacer />}
              </React.Fragment>
            ))}
            <Spacer />
          </HStack>
        ) : (
          <div style = {{height:"70px"}}>
            
          </div>
        )}
      </VStack>
      {/* Displaying the finish project confirmation modal */}
      <Popup
        title="Avsluta Förbättringsarbete"
        description={"Är du säker på att du vill avsluta förbättringsarbetet, det kommer inte gå att ändra i det om du väljer att gå vidare?"}
        isOpen={isFinishProject}
        onClose={() => {
          setFinishProject(false);
        }}
        onButton1Click={() => changeStatus("Finished")}
        button1Text="Avsluta förbättringsarbetet"
      />
    </div>
  );
};

// Exporting the PGSA_Overview component
export default PGSA_Overview;
