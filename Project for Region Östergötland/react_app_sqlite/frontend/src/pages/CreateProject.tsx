import React from "react";
import LeftSidePanel from "../components/LeftSidePanelComponents/LeftSidePanel";
import CreateProjectSection from "../components/CreateProjectComponents/CreateProjectSection";

type Props = {};

const CreateProject = (props: Props) => {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <LeftSidePanel greenButton={3} />
      <CreateProjectSection tab={2} timeline={2} />
    </div>
  );
};

export default CreateProject;
