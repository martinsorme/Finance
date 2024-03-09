import React, { useState } from "react";
import TabsProject from "./TabsProject";
import { VStack, HStack, Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import NoteSection from "./NoteSection";
import { useEffect } from "react";
import { LogBook } from "../../Types";
import SelectedNote from "./SelectedNote";
import CreateNote from "./CreateNote";
import {BASE_URL} from "../../Constants";

type Props = {};

const dummieNote = {
  logBookId: 0,
  logBookTitle: "",
  logBookColor: "white",
  timeStamp: new Date(),
  user: "",
  logBookDescription: "",
  project_id: 0,
};

const ProjectLogbook = (props: Props) => {
  const { projectId } = useParams();
  const [notes, setNotes] = React.useState<LogBook[]>([]);
  const [status, setStatus] = React.useState<string>("");
  const [selectedNote, setSelectedNote] = useState<{
    note: LogBook;
  }>({
    note: dummieNote,
  });

  const bgColor: string = "#E6F0F8";
  const borderRadius: string = "20px";

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

  useEffect(() => {
    getProject();
  }, []); // Run only once on component mount

  const getNotes = async () => {
    try {
      const response = await fetch(BASE_URL + "/get_logbooks_on_project/" + projectId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const jsonData = await response.json();
      const data = jsonData;
      if (data.length === 0) {
        console.log("No suggestions found");
        return;
      }

      const notes: LogBook[] = [];
      for (const note in data) {
        notes.push({
          logBookId: data[note]["logBookId"],
          logBookTitle: data[note]["logBookTitle"],
          logBookColor: data[note]["logBookColor"],
          logBookDescription: data[note]["logBookDescription"],
          user: data[note]["userName"],
          timeStamp: data[note]["timeStamp"],
          project_id: data[note]["project_id"],
        });
      }
      setNotes(notes);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // Use useEffect to wait for the state to be updated before calling getNotes
    getNotes();
  }, [selectedNote]);

  const handleNote = async (selectedNoteInfo: LogBook) => {
    setSelectedNote({ note: { ...selectedNoteInfo } });

    await getNotes();
  };
  // Callback function to handle saving selected note info
  const handleNoteSelect = (selectedNoteInfo: { note: LogBook }) => {
    setSelectedNote(selectedNoteInfo);
  };


  return (
    <div
      style={{
        backgroundColor: "white",
        width: "100%",
        flexDirection: "column",
      }}
    >
      <TabsProject highlighted={2} />
      <VStack>
        <div
          style={{
            backgroundColor: "#E6F0F8",
            display: "flex",
            flexDirection: "column",
            height: "70px",
            width: "100%",
            alignItems: "center", // Horizontally center the content
            justifyContent: "center", // Vertically center the content
          }}
        >
          {status !== "Finished" ? (
          <CreateNote note={selectedNote.note} onSave={handleNoteSelect} />
          ) : null}
        </div>
        <div style={{ height: "50vh", width: "100%", marginTop: "10px", borderRadius: borderRadius }}>
          <HStack marginTop={1} spacing={6}>
            <div style={{ height: "60vh", display: "flex", justifyContent: "center", width: "40%", marginLeft: "10px", backgroundColor: bgColor, borderRadius: borderRadius }}>
              <Box overflowY={"scroll"} width={"90%"} height={"100%"} justifyContent={"center"} alignItems={"center"}>
                {notes.map((note) => (
                  <NoteSection note={note} activeNote={handleNoteSelect} selectedNote={selectedNote.note} key={note.logBookId} />
                  //
                ))}
              </Box>
            </div>

            <div style={{ height: "60vh", width: "55%", display: "flex", borderRadius: borderRadius }}>
              <SelectedNote status = {status} note={selectedNote.note} setNote={handleNote} />
            </div>
          </HStack>
        </div>
      </VStack>
    </div>
  );
};

export default ProjectLogbook;
