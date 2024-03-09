import React, { useEffect, useState } from "react";
import {
  VStack,
  Text,
  Textarea,
  HStack,
  Button,
} from "@chakra-ui/react";

type Props = {
  title: string;
  setTitle: (title: string) => void;
  saveChanges: () => void; 
  status : string; 
  edit : boolean; 
};

const DetailsTitle = ({ edit, status, title, setTitle, saveChanges }: Props) => {
  const bgColor: string = "#E6F0F8";
  const borderRadius: string = "10px";
  const [changeActive, setChangeActive] = React.useState(false);
  const [textInput, setTextInput] = React.useState("")
  

  // Handles text updates to title
  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextInput(event.target.value)
  }

  const handleTextBlur = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(textInput)
  };

  useEffect(() => {
    // Set the initial value of textInput to the current title when component mounts
    setTextInput(title);
  }, [title]);

  // Function for activiating editing
  const editTitle = () => {
    setChangeActive(true);
  };

  // Saves changes to title
  const saveTitle = async() => {
    setTitle(textInput);
    setChangeActive(false);
    try {
      await saveChanges();

      window.location.reload()
    } catch (error) {
      console.error("Error saving title", error);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: bgColor,
        borderRadius: borderRadius,
        position: "relative",
        paddingBottom: "15px",
      }}
    >
      <VStack width={"90%"} alignItems={"left"} spacing={1}>
        {!changeActive && (
          <HStack paddingTop={'10px'}>
            <Text
              as={"b"}
              // marginTop={"10px"}
              fontSize={"20px"}
              marginLeft={"20px"} maxW={'90%'}
            >
              {title}
            </Text>
            {status !== "Finished" && edit ? (
            <Text
              as={"u"}
              fontSize={"12px"}
              cursor={"pointer"}
              onClick={editTitle}
              marginLeft={"15px"}
            >
              Redigera titel
            </Text>
            ): null } 
          </HStack>
        )}
        {changeActive && (
          <>
            <Textarea
              h="5vh"
              minHeight={0}
              variant="filled"
              resize={"none"}
              width={"50vh"}
              value={textInput}
              marginLeft={"10px"}
              onChange={handleTextChange}
              onBlur={handleTextBlur}
            ></Textarea>
            <Button
              cursor={"pointer"}
              onClick={saveTitle}
              marginLeft={"30px"}
              variant={"darkBlueButton"}
              paddingX={"7px"}
              w={"fit-content"}
              size={'sm'}
            >
              Spara
            </Button>
          </>
        )}
      </VStack>
    </div>
  );
};

export default DetailsTitle;
