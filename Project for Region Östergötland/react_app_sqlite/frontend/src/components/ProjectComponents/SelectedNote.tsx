import React, { useEffect, useState } from "react";
import { LogBook } from "../../Types";
import { VStack, Text, HStack, Divider, Textarea, Button, Circle } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import NoteSection from "./NoteSection";
import Popup from "../Popup";
import { BASE_URL } from "../../Constants";

type Props = {
  note: LogBook;
  setNote: (setNote: LogBook) => void;
  status: string;
};

const SelectedNote = ({ status, note, setNote }: Props) => {
  // State variables
  const [currentTitle, setCurrentTitle] = useState(note.logBookTitle);
  const [currentDescription, setCurrentDescription] = useState(note.logBookDescription);
  const [currentColor, setCurrentColor] = useState(note.logBookColor);
  const { projectId } = useParams();
  const [isDeleteConfPopupOpen, setDeleteNotePopupOpen] = useState(false);

  useEffect(() => {
    // Update the state when note changes
    setCurrentTitle(note.logBookTitle);
    setCurrentDescription(note.logBookDescription);
    setCurrentColor(note.logBookColor);
  }, [note]);

  const saveNote = async () => {
    let token = JSON.parse(sessionStorage.getItem("auth") + "").token;

    let _method = "POST";
    let link = `${BASE_URL}/add_new_logbook`;

    if (note.logBookId !== 0) {
      _method = "PUT";
      link = `${BASE_URL}/logbook/` + note.logBookId;
    }

    const requestOptions = {
      method: _method,

      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        logBookColor: currentColor,
        logBookTitle: currentTitle,
        logBookDescription: currentDescription,
        project_id: projectId,
      }),
    };

    try {
      const response = await fetch(link, requestOptions);
      if (response.ok) {
        const responseData = await response.json();
        setNote({
          ...note,
          logBookId: responseData.logBookId,
          logBookColor: currentColor,
          logBookTitle: currentTitle,
          logBookDescription: currentDescription,
        });
      } else {
        console.log("something went wrong");
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  const deleteNote = async () => {
    setDeleteNotePopupOpen(true);
  };

  const handleDeleteButtonClick = async () => {
    let token = JSON.parse(sessionStorage.getItem("auth") + "").token;
    let link = `${BASE_URL}/logbook/` + note.logBookId;

    const requestOptions = {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        logBookColor: currentColor,
        logBookTitle: currentTitle,
        logBookDescription: currentDescription,
        project_id: projectId,
      }),
    };

    try {
      const response = await fetch(link, requestOptions);
      if (response.ok) {
        setDeleteNotePopupOpen(false);
        window.location.reload();
      } else {
        console.log("something went wrong");
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  const getDisable = () => {
    // Disable textarea if status is "Finished"
    if (status !== "Finished") {
      return false;
    } else {
      return true;
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentTitle(event.target.value);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentDescription(event.target.value);
  };

  const handleCircleClick = (color: string) => {
    setCurrentColor(color);
  };

  const circleData = [
    { color: "rgba(76, 187, 113, 0.2)", color2: "rgba(76, 187, 113, 0.8)", letter: "P" },
    { color: "rgba(245, 215, 38, 0.2)", color2: "rgba(245, 215, 38, 0.8)", letter: "G" },
    { color: "rgba(231, 169, 201, 0.2)", color2: "rgba(231, 169, 201, 0.8)", letter: "S" },
    { color: "rgba(55, 180, 231, 0.2)", color2: "rgba(55, 180, 231, 0.8)", letter: "A" },
  ];

  return (
    <div style={{ display: "flex", height: "60vh", width: "100%", backgroundColor: currentColor, border: `solid 1px black`, borderRadius: "10px" }}>
      <VStack paddingTop={0} paddingLeft={5} paddingRight={5} w={"100%"}>
        <HStack spacing={0} w={"100%"}>
          <VStack alignItems={"flex"} w={"100%"}>
            {/* Title */}
            <Textarea disabled={getDisable()} w={"90%"} h={"fit-content"} resize={"none"} fontSize={"3xl"} marginTop={5} marginBottom={0} value={currentTitle} borderColor={currentColor} placeholder="Lägg till en titel..." onChange={handleTitleChange} rows={1}></Textarea>
            {/* User */}
            <Text fontSize={"1xl"} margin={0} marginLeft={5}>
              {note.user}
            </Text>
            {/* Timestamp */}
            <Text fontSize={"1xl"} margin={0} marginLeft={5}>
              {new Date(note.timeStamp).toLocaleDateString("en-GB", { year: "2-digit", month: "numeric", day: "numeric" })}
            </Text>
            <Divider width="90%" borderColor="black" my={2} />
            {/* Description */}
            <Textarea disabled={getDisable()} h={"auto"} resize={"none"} minHeight={"30vh"} maxW={"90%"} value={currentDescription} borderColor={currentColor} placeholder="Gör en anteckning..." onChange={handleDescriptionChange}></Textarea>
          </VStack>
          {/* Circle color options */}
          {status !== "Finished" ? (
            <VStack spacing={10} alignItems="center">
              {circleData.map(({ color, color2, letter }, index) => (
                <Circle key={index} size={color === currentColor ? "40px" : "30px"} bg={color2} border="2px solid black" cursor="pointer" onClick={() => handleCircleClick(color)}>
                  {letter}
                </Circle>
              ))}
            </VStack>
          ) : null}
        </HStack>
        {/* Save and Delete buttons */}
        {status !== "Finished" ? (
          <HStack w={"50%"}>
            <Button variant="darkBlueButton" w="100%" h="40px" align-items="center" margin-top="20px" onClick={saveNote}>
              Spara
            </Button>
            <Button variant="redButton" w="100%" h="40px" align-items="center" margin-top="20px" onClick={deleteNote}>
              Ta bort
            </Button>
          </HStack>
        ) : null}
      </VStack>
      {/* Delete confirmation popup */}
      <Popup
        title="Radera anteckning"
        description={"Är du säker på att du vill radera anteckningen?"}
        isOpen={isDeleteConfPopupOpen}
        onClose={() => {
          setDeleteNotePopupOpen(false);
        }}
        onButton1Click={handleDeleteButtonClick}
        button1Text="Ta bort anteckningen"
      />
    </div>
  );
};

export default SelectedNote;
