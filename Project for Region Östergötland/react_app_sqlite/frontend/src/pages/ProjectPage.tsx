import React from "react";
import LeftSidePanel from "../components/LeftSidePanelComponents/LeftSidePanel";
import { useParams } from "react-router-dom";
import LightBlueHeader from "../components/LightBlueHeader";
import { Outlet } from "react-router-dom"
import { useEffect } from "react";
import {BASE_URL} from "../Constants";

type Props = {};

const ProjectPage = (props : Props) => {
  const { projectId } = useParams();

  const [title, setTitle] = React.useState("");

  const [status, setStatus] = React.useState("");

  let statusProject = false;

  const getProjectTitle = async () => {
    const response = await fetch(`${BASE_URL}/project/${projectId}`);
    const data = await response.json();
    setTitle(data.title);
    

  } 

  const getProjectStatus = async () => {
    const response = await fetch(`${BASE_URL}/project/${projectId}`);
    const data = await response.json();
    setStatus(data.status);
  } 



  useEffect(() => {
    getProjectTitle();
  }, []);

  useEffect(() => {
    getProjectStatus();
    
  }, []);

  if(status === 'Finished') {
    statusProject = true;
  }

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <LeftSidePanel greenButton={2} />
      <LightBlueHeader icon="ph:squares-four" text={title} isFinishProject={statusProject}/>
      <Outlet />
    </div>
  );
};

export default ProjectPage;
