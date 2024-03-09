// Import necessary dependencies from Chakra UI and Popup component
import React from "react";
import {
  HStack,
  Textarea,
  Text,
  Button,
} from "@chakra-ui/react";
import Popup from "../Popup";
import {BASE_URL} from "../../Constants";

// Define the type for the component props
type Props = {};

// Define a constant string for description
const description: string = "beskrivning";

// Define the WhatImproveLP component
const WhatImproveLP = (props: Props) => {
  // Define state variables for the text inputs, popup state, and suggestion ID
  let [text1, setText1] = React.useState('');
  let [text2, setText2] = React.useState('');
  const [isPopupOpen, setPopupOpen] = React.useState(false);
  const [suggestionId, setSuggestionId] = React.useState(1);

  // Event handler for the first text input change
  const handleTextChange1 = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText1(event.target.value);
  };

  // Event handler for the second text input change
  const handleTextChange2 = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText2(event.target.value);
  };

  // Event handler for the first button click (Tillbaka hem)
  const handleButton1Click = () => { 
    setPopupOpen(false);
  };

  // Event handler for the link click (Fortätt arbeta)
  const handleLinkClick = () => {   
    setPopupOpen(false);
  };
  
  // Get the API URL from environment variables
  const apiUrl = BASE_URL;

  // Function to submit the form data
  const submitWhatImprove = async() => {
    // Check if both text inputs are filled
    if (text1 === "" || text2 === "") {
      alert("Du måste fylla i båda fälten");
      return;
    } else {
      try {
        // Send a POST request to the API endpoint with the form data
        const response = await fetch(`${apiUrl}/add_new_suggestion`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + JSON.parse(sessionStorage.getItem('auth') + '').token
          },
          body: JSON.stringify({title: text1, descriptionImportance: text2}),
        });
        const data = await response.json();
        setSuggestionId(data.suggestionId);
        setText1("");
        setText2("");
      } catch (error) {
        console.error('Error:', error);
        alert("Något gick fel, försök igen senare");
        return;
      }
    }
    setPopupOpen(true);
  };

  // Render the component
  return (
    <>
      <div style={{ marginTop: "15px" }}>
        <Text marginLeft="20px" marginTop="30px" as="b" fontSize="xl">
          Vad vill du förändra?
        </Text>

        <HStack marginTop={"5px"}>
          <Text marginLeft="20px" as="b" mb="4px" fontSize={"sm"}>
            Vad tycker du borde förbättras?
          </Text>
        </HStack>

        <HStack>
          <Textarea
            h="40px"
            w="100%"
            minHeight={0}
            marginLeft="20px"
            variant="filled"
            bg="white"
            resize={"none"}
            value={text1}
            onChange={handleTextChange1}
          />

          <div
            style={{
              marginLeft: "10px",
            }}
          ></div>
        </HStack>

        <Text
          marginLeft="20px"
          marginTop="20px"
          as="b"
          mb="8px"
          fontSize={"sm"}
        >
          Vad kommer förbättringen betyda för patienten?
        </Text>

        <HStack>
          <Textarea
            marginLeft="20px"
            h="65px"
            variant="filled"
            bg="vhite"
            resize={"none"}
            minHeight={0}
            value={text2}
            onChange={handleTextChange2}
          />

          <div
            style={{
              marginLeft: "10px",
            }}
          ></div>
        </HStack>

        <HStack justifyContent={"right"} marginTop={2}>
          <Button
              size="sm"
              variant="darkBlueButton"
              w="120px"
              h="35px"
              marginRight={6}
              onClick={()=>{
                submitWhatImprove()
              }}
            >
              Spara utkast
            </Button>
        </HStack>
      </div>
      <Popup
        isOpen={isPopupOpen}
        onClose={() => setPopupOpen(false)}
        button1Text="Tillbaka hem"
        onButton1Click={handleButton1Click}
        linkText="Fortätt arbeta"
        onLinkClick={handleLinkClick}
        linkData={suggestionId}
      />
    </>
  );
};

export default WhatImproveLP;
