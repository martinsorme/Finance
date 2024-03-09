import React from 'react'
import { Task, TaskStatus } from '../../Types'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TaskColumn from './TaskColumn';
import {BASE_URL} from "../../Constants";

type Props = {
  height?: string,
  bgColor?: string
  width?: string
  borderRadius?: string
  tempTaskId : number
}

const CompletedTasks = ({height, bgColor, width, borderRadius, tempTaskId}: Props) => {
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [finished, setFinished] = React.useState<Task[]>([]);

  const { projectId } = useParams();
  const getProject = async () => {
    try {
      const response = await fetch(
        BASE_URL + "/project/" + projectId,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const jsonData = await response.json();
      const data = jsonData;
      setTasks(data.tasks);
      sorttasks(data.tasks);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const sorttasks = (tasks: Task[]) => {
    const completed = tasks.filter((t) => {
      if (t.status === "Finished") {
        return t;
      }
    });
    setFinished(completed);
  };


  useEffect(() => {
    getProject();
  }, []); // Run only once on component mount

  const changeStatus = (id: number, status: TaskStatus) => {
    const newTasks : Task[] = tasks.map((t) => {
      if (t.taskId === id) {
        t.status = status;
        return t;
      } else {
        return t;
      }
      
    });
    setTasks(newTasks);
    sorttasks(tasks);
  };
  return (
    <TaskColumn
    height = "400px"
    getProject={getProject}
    changeStatus = {changeStatus}
    tasks={finished}
    setTasks={setFinished}
    title={"Avklarade uppgifter"}
    color={"#cbe9e4"}
    attributes={[""]}
    addTask=''
    showButton={false}
    dontShowArrows = {true}
    bgColor={bgColor}
    bgHeight={height}
    bgWidth={width}
    borderRadius={borderRadius}
    tempTaskId={tempTaskId}
  />
  )
}

<div
style={{
  marginTop: "15px",
  backgroundColor: "red",
  borderRadius: "10px",
  height: "530px",
  width: "80vh",
}}
>
</div>

export default CompletedTasks