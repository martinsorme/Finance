// Import necessary dependencies
import React from "react";
import { Text, HStack, VStack } from "@chakra-ui/react";
import ChecklistImprovementWork from "./ChecklistImprovementWork";
import PgsaDisplay from "../PgsaDisplay";
import { Project } from "../../Types";
import { useNavigate } from "react-router-dom";

// Define the type for the component props
type Props = {
  project: Project;
  color: string;
  isDraft?: boolean;
};

const maxTitleLength = 60;

// Define the ImprovementWork component
const ImprovementWork = ({ project, color, isDraft }: Props) => {
  const navigate = useNavigate();

  // Function to handle opening the project
  const openProject = () => {
    if (isDraft) {
      // If the project is a draft, navigate to the create improvement work page
      navigate("/skapaforbattringsarbete", { state: { id: project.projectId } });
    } else {
      // If the project is not a draft, redirect to the overview page of the improvement work
      window.location.href = "/forbattringsarbete/" + project.projectId + "/overblick";
    }
  };
  
  return (
    // Container for the improvement work item
    <HStack
      height="175px"
      bg={color}
      borderRadius="10px"
      onClick={openProject}
      style={{ cursor: "pointer" }}
      justifyContent={'space-between'}
      paddingRight={'10px'}
      paddingY={'10px'}
    >
      <VStack
        align="left"
        spacing="0px"
        margin="10px"
        marginTop="5px"
        padding="8px"
      >
        {/* Display the project title */}
        <Text fontSize="xl" marginBottom={2} marginRight={2}>
          {(project.title.length > maxTitleLength) ? project.title.substring(0, maxTitleLength) + "..." : project.title}
        </Text>

        {/* Display the task status */}
        <Text fontSize="s" as="b" marginTop="0px">
          {project.tasks.length > 0
            ? "Mina pågående uppgifter"
            : "Inga pågående uppgifter"}
        </Text>

        {/* Display the checklist of tasks */}
        <VStack align="left" spacing={2} margin="0px" marginBottom="5px" maxHeight={"85px"} overflowY={'auto'}>
          <ChecklistImprovementWork
            checklist={project.tasks}
            projectId={project.projectId}
          />
        </VStack>
      </VStack>

      {/* Display the project status */}
      {/* <div style={{display: 'flex', justifyContent: 'flex-end', flexGrow:1, marginRight:"10px"}}> */}
        <PgsaDisplay status={project.status} size="130px" />
      {/* </div> */}
    </HStack>
  );
};

export default ImprovementWork;
