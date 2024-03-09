import { VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { Task, TaskStatus } from "../../Types";
import TaskColumn from "./TaskColumn";
import { HStack, Text } from "@chakra-ui/react";
import { useEffect } from "react";


type Props = {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  getProject: () => void
};

const Tasks = ({ tasks, setTasks, getProject}: Props) => {
  {
    const [notYetStarted, setNotYetStarted] = useState<Task[]>([]);
    const [ongoing, setOngoing] = useState<Task[]>([]);
    const [finished, setFinished] = useState<Task[]>([]);
    const [tempTaskId, setTempTaskId] = useState(Number);

    const sortTasks = () => {
      const notStarted = tasks.filter((t) => t.status === "Not yet Started");
      const unfinished = tasks.filter((t) => t.status === "Ongoing");
      const completed = tasks.filter((t) => t.status === "Finished");
    
      // Update the state with the new arrays of tasks for each status
      setNotYetStarted(notStarted);
      setOngoing(unfinished);
      setFinished(completed);
    };

      useEffect(() => {
        sortTasks();
      }, []); // Run only once on component mount
    
      const changeStatus = (id: number, status: TaskStatus) => {
        setTempTaskId(id);
        const newTasks : Task[] = tasks.map((t) => {
          if (t.taskId === id) {
            t.status = status;
            return t;
          } else {
            return t;
          }
          
        });
        setTasks(newTasks);
        sortTasks();
      };
  
    return (
      <div
        style={{
          height: "625px",
          width: "104vh",
          backgroundColor: "#E6F0F8",
          borderRadius: "10px",
          marginLeft: "10px",
        }}
      >
        <VStack spacing={4} margin={5} alignItems={"left"}>
          <Text as={"b"} fontSize={"3xl"}>
            Uppgifter
          </Text>
          <HStack spacing={4} margin={0}>
            <VStack>
            <TaskColumn
              height = "420px"
              changeStatus = {changeStatus}
              tempTaskId={tempTaskId}
              tasks={notYetStarted}
              setTasks={setTasks}
              title={"Att göra"}
              color="#e6f0f8"
              attributes={["button"]}
              addTask={"Skapa ny uppgift"}
              showButton={true}
              getProject = {getProject}
            />
             
            </VStack>
            <TaskColumn
              height = "460px"
              changeStatus = {changeStatus}
              tempTaskId={tempTaskId}
              tasks={ongoing}
              setTasks={setTasks}
              title={"Pågående"}
              color="#fbdbe4"
              attributes={[""]}
              addTask="Skapa ny uppgift"
              showButton={false}
              getProject = {getProject}
            />
            <TaskColumn
              height = "460px"
              changeStatus = {changeStatus}
              tempTaskId={tempTaskId}
              tasks={finished}
              setTasks={setTasks}
              title={"Avklarade"}
              color={"#cbe9e4"}
              attributes={[""]}
              addTask="Skapa ny uppgift"
              showButton={false}
              getProject = {getProject}
              />

          </HStack>
        </VStack>
      </div>
    );
  }
};
export default Tasks;
