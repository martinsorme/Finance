import { LogBook } from "../../Types";
import { VStack, Text, Box } from "@chakra-ui/react";

type Props = {
  note: LogBook; // The note object containing log book information
  activeNote: (info: { note: LogBook }) => void; // Callback function to set the active note
  selectedNote: LogBook; // The currently selected note
};

const NoteSection = ({ note, activeNote, selectedNote }: Props) => {
  const updateRightNote = () => {
    activeNote({ note: note }); // Set the active note when clicked
  };

  return (
    <div style={{ backgroundColor: "white", borderRadius: "10px" }}>
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "13vh",
          backgroundColor: note.logBookColor, // Set the background color based on the note's logBookColor
          border: `solid 5px ${note.logBookColor}`, // Set the border color based on the note's logBookColor
          borderRadius: "10px",
          marginTop: "20px"
        }}
        onClick={updateRightNote} // Call the updateRightNote function when clicked
      >
        <VStack alignItems={"left"} paddingTop={0} paddingLeft={10} h={"100%"} w={"100%"} gap={0}>
          <Text fontSize={"2xl"} marginTop={1} marginBottom={0}>
            {note.logBookTitle}
          </Text>
          <Text fontSize={"s"} margin={0}>
            {note.user}
          </Text>
          <Text fontSize={"s"} margin={0}>
            {new Date(note.timeStamp).toLocaleDateString("en-GB", { year: "2-digit", month: "numeric", day: "numeric" })}
          </Text>
        </VStack>
        {selectedNote.logBookId === note.logBookId && (
          <Box h={"100%"} w={"10px"} bg={"#182745"} borderRightRadius={"5"} position={"relative"}></Box> // Display a box on the right side if the note is selected
        )}
      </div>
    </div>
  );
};

export default NoteSection;
