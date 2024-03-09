import React, { useState } from "react";
import { LogBook, User } from "../../Types";
import { Button } from "@chakra-ui/react";

type Props = {
  note: LogBook; // The note object to be displayed
  onSave: (info: { note: LogBook }) => void; // Callback function to save the note
};

const dummieNote = {
  logBookId: 0,
  logBookTitle: "",
  logBookColor: "white",
  timeStamp: new Date(),
  user: "",
  logBookDescription: "",
  project_id: 0,
};

const CreateNote = ({ note, onSave }: Props) => {
  const createNote = async () => {
    onSave({ note: dummieNote }); // Save the dummy note
  };

  const [newInfoInfo, setSavedInfo] = useState({
    note, // State to store the note object
  });

  const updateRightNote = () => {
    // Open a popup with task info
    onSave(newInfoInfo); // Save the updated note
  };

  return (
    <Button variant="darkBlueButton" w="20%" h="40px" align-items="center" margin-top="20px" onClick={createNote}>
      Skapa anteckning
    </Button>
  );
};

export default CreateNote;
