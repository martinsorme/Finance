import React from "react";
import BottomProjcet from "./BottomProjcet";
import TabsProject from "./TabsProject";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Task, User, Category} from "../../Types";
import {BASE_URL} from "../../Constants";

type Props = {};

const ProjectSection = (props: Props) => {
  const { projectId } = useParams<{ projectId: string }>();
  const [startDate, setStartDate] = React.useState("2021-05-01");
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [status, setStatus] = React.useState<string>("");
  const [users, setUsers] = React.useState<User[]>([]);
  const [ categories, setCategories ] = React.useState<Category[]>([]);


    // Provide a default value if projectId is undefined
  const safeProjectId = projectId || ""; //Is there a better way to do this?

  const handleSetStartDate = (date: string) => {
    setStartDate(date);
  };

  const handleSetTasks = (tasks: Task[]) => {
    setTasks(tasks);
    
  };

  const handleSetUsers = (users: User[]) => {
    setUsers(users);
  };


  const handleCategories=(value: Category[])=>{ 
    setCategories(value)
    
  }

  const getProject = async () => {
    setLoading(true);
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
      setStartDate(data.startTime);
      setTasks(data.tasks);
      setStatus(data.status);
      setUsers(data.users);
      setCategories(data.categories)
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProject();
  }, []); // Run only once on component mount

  return (
    <div
      style={{
        backgroundColor: "white",
        width: "100%",
        flexDirection: "column",
      }}
    >
      <TabsProject highlighted={0} />
      <BottomProjcet
        startDate={startDate}
        setStartDate={handleSetStartDate}
        tasks={tasks}
        setTasks={handleSetTasks}
        loading={loading}
        getProject ={getProject}
        status = {status}
        users={users}
        setUsers={handleSetUsers}
        projectId = {projectId!}
        categories={categories} 
        handleCategories={handleCategories}
      />
    </div>
  );
};

export default ProjectSection;
