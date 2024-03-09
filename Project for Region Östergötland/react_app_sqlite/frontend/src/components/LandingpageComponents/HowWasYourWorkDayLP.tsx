// Import necessary dependencies
import React, { useState } from "react";
import { Text, Textarea, HStack, VStack, Button, Flex } from "@chakra-ui/react";
import Hearts from "./Hearts";
import {BASE_URL} from "../../Constants";

// Define the type for the component props
type Props = {};

// Define the functional component
const HowWasYourWorkDayLP = (props: Props) => {
  // State variables
  const [heartClicked, setHeartClicked] = useState(0);
  const [comment, setComment] = useState("");

  // Function to get the number of hearts clicked
  const getHeartClicked = () => {
    return heartClicked;
  }

  // Function to handle heart click event
  const handleHeartClick = (imageNumber: number) => {
    setHeartClicked(imageNumber);
  }

  // Function to handle comment change event
  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setComment(event.target.value);
  };

  // Function to submit feedback
  const submitFeedback = () => {
    // Validate the input
    if (heartClicked === 0) {
      alert("Klicka i antal hjärtan");
      return;
    }
    if (comment === "") {
      alert("Du måste skriva en kommentar");
      return;
    }
    // Call the submit function
    handleSubmit();
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    try {
      // Send a POST request to upload the feedback to server
      const response = await fetch(`${BASE_URL}/add_new_rating`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + JSON.parse(sessionStorage.getItem('auth') + '').token
        },
        body: JSON.stringify({rating : heartClicked, comment : comment}),
      });
    } catch (error) {
      console.error('Error:', error);
      alert("Något gick fel, försök igen senare")
      return;
    }
    alert("Tack för din feedback!")
  };

  // Render the component
  return (
    <VStack
      spacing={0}
      alignItems={"left"}
      height={'fit-content'}
      
    >
      <Text as="b" fontSize={"l"} marginLeft={8} marginTop={5} marginRight="1" >
        Hur nöjd är du med de förbättringarna som drivs idag?
      </Text>
      <Hearts heartClicked={heartClicked} setHeartClicked={handleHeartClick}/>
      <Text fontSize={"s"} marginLeft={9} marginBottom={1} marginTop={3}>
        Hur hade det kunnat bli bättre?
      </Text>
      <HStack>
        <Textarea
          h="120px"
          w="100%"
          minHeight={0}
          marginLeft="20px"
          marginRight={'20px'}
          variant="filled"
          bg="white"
          resize={"none"}
          value={comment}
          onChange={handleCommentChange}
        />

      </HStack>
      <Flex justifyContent={'end'} paddingRight={'20px'}>
      <Button
        onClick={() => {
          submitFeedback();
        }}
          variant={"darkBlueButton"}
          marginY={'10px'}
        size={'sm'}
      >
        Skicka in
      </Button>
      </Flex>
      
    </VStack>
  );
};

export default HowWasYourWorkDayLP;
