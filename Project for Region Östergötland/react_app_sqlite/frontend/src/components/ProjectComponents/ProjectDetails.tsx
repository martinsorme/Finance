import React from "react";
import TabsProject from "./TabsProject";
import { VStack, HStack } from "@chakra-ui/react";
import DetailsText from "./DetailsText";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import {Category, ProjectRole, User} from "../../Types"
import DetailsCategory from "./DetailsCategory";
import DetailsMembers from "./DetailsMembers";
import DetailsTitle from "./DetailsTitle";
import Links from "./Links";
import {BASE_URL} from "../../Constants";


type Props = {};


const ProjectDetails = (props: Props) => {
  const auth = JSON.parse(sessionStorage.getItem("auth") + "");

  const { projectId } = useParams();

  const bgColor: string = "#E6F0F8"
  const borderRadius: string = "10px"
  const [importance, setImportance] = React.useState("");
  const [difference, setDifference] = React.useState("");
  const [requirements, setRequirements] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [users, setUsers] = React.useState<User[]>([]);
  const [startTime, setstartTime] = React.useState(Date);
  const [deadLine, setdeadLine] = React.useState(Date);
  const [status, setStatus] = React.useState<string>("");

  const [parametersChanged, setParametersChanged] = React.useState<string[]>([]);
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
      setImportance(data.importance);
      setDifference(data.difference);
      setRequirements(data.requirements);
      setTitle(data.title);
      setCategories(data.categories);
      setUsers(data.users);
      setstartTime(data.startTime);
      setdeadLine(data.deadline);
      setStatus(data.status)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    getProject();
  }, []); // Run only once on component mount

  function addToArray(value: string) {
    if (!parametersChanged.includes(value)) {
        parametersChanged.push(value);
    }
  }

  const handleImportance=(value: string)=>{
    setImportance(value)
    addToArray("importance")
  }
  const handleDifference=(value: string)=>{
    setDifference(value)
    addToArray("difference")
  }
  const handleRequirements=(value: string)=>{
    setRequirements(value)
    addToArray("requirements")
  }

  const handleTitle = (value: string) => {
    setTitle(value)
    addToArray("title")
  }
  const handleCategories=(value: Category[])=>{ 
    setCategories(value)
    addToArray("categories")
  }
  const handleUsers=(value: User[])=>{  
    setUsers(value)
    addToArray("users")
  }

  const saveChanges = async () => {
    let token = JSON.parse(sessionStorage.getItem('auth') + "").token
    let put_data: { [key: string]: any } = {};
    
    if (parametersChanged.includes("importance")) {
      put_data["importance"] = importance;
    }
    if (parametersChanged.includes("difference")) {
      put_data["difference"] = difference;
    }
    if (parametersChanged.includes("requirements")) {
      put_data["requirements"] = requirements;
    }
    if (parametersChanged.includes("title")) {
      put_data["title"] = title;
    }
    if (parametersChanged.includes("categories")) {
      put_data["categories"] = categories;
    }
    if (parametersChanged.includes("users")) {
      put_data["users"] = users;
    }
    if (parametersChanged.includes("startTime")) {
      put_data["startTime"] = startTime;
    }
    if (parametersChanged.includes("deadLine")) {
      put_data["deadLine"] = deadLine;
    }
    try {
      const response = await fetch(BASE_URL + "/project/" + projectId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token,
        },
        body: JSON.stringify(put_data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        setParametersChanged([]);
      }
      const data = await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
    }

  }

  //returns true if a user can edit a project's details 
  const getEditingRights = () => {
    const loggedinUser = users.filter(user => user.userId === auth.userId);
    if (auth.role === "Admin"){
      return true;
    } else if (loggedinUser[0]?.projectRole === ProjectRole.team_Leader) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        width: "100%",
        flexDirection: "column",
        
      }}
    >
      <TabsProject highlighted={1} />
      <HStack paddingTop={'10px'} paddingX={'10px'} h={'fit-content'} alignItems={'stretch'}>
            <VStack w={'50%'} bg={bgColor} borderRadius={borderRadius} spacing={6} paddingY={'20px'}>
            <DetailsText edit = {getEditingRights()} status = {status} title={'Varför är förbättringsarbetet viktigt?'} text={importance} setText={handleImportance} saveChanges={saveChanges} />
              <DetailsText edit = {getEditingRights()} status = {status} title={'Hur skulle den göra skillnad för/i verksamheten?'} text={difference} setText={handleDifference} saveChanges={saveChanges}/>
              <DetailsText edit = {getEditingRights()} status = {status} title={'Vad krävs för att genomföra den?'} text={requirements} setText={handleRequirements} saveChanges={saveChanges}/>
            </VStack>
          
          <VStack w={'50%'}  spacing={4} marginLeft={2} marginRight={2} alignItems={'baseline'}>
              
              <DetailsTitle edit = {getEditingRights()} status = {status} title={title} setTitle={handleTitle} saveChanges={saveChanges}/>
            <DetailsCategory edit = {getEditingRights()} status = {status} categories={categories} handleCategories={handleCategories} />
            <Links edit = {getEditingRights()} status = {status} projectId={projectId} />
            <DetailsMembers status={status} users={users} handleUsers={handleUsers} projectId={projectId} />
              
            </VStack>
          
      </HStack>
    </div>
  );
};

export default ProjectDetails;
