// Importing necessary dependencies
import React from "react";
import { HStack, Text } from "@chakra-ui/react";
import { Task } from "../../Types";

// Defining the type for the component props
type Props = {
  checklist: Task[]; // An array of tasks for the checklist
  projectId: number; // The ID of the project
};

// The ChecklistImprovementWork component
const ChecklistImprovementWork = ({ checklist, projectId }: Props) => {
  return (
    <>
      {/* Mapping over the projects tasks */}
      {checklist.map((task, index) => {
        return (
          <HStack key={task.taskId} alignContent="center" spacing={0} gap={0} id={projectId.toString()}>
            {/* Displaying the task name */}
            <Text margin={0} padding={0}>
              {task.taskName}
            </Text>
          </HStack>
        );
      })}
    </>
  );
};

export default ChecklistImprovementWork;
