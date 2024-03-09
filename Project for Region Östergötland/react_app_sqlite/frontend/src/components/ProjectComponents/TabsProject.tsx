import React from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

type Props = {
  highlighted: number;
};

const TabsProject = (highlighted: Props) => {
  const navigate = useNavigate();
  const tabs = [
    ["ph:files", "Förbättringsarbete", "#A0C7E3"],
    ["mdi:checkbox-marked-outline", "Uppgifter", "#A0C7E3"],
    ["octicon:person-fill-16", "Medlemmar", "#A0C7E3"],
  ];

  const colors = ["#A0C7E3", "#A0C7E3", "#A0C7E3", "#A0C7E3"];
  colors[highlighted.highlighted] = "#E6F0F8";

  const handleClick = (tab: string) => {
    let lastSlashIndex = window.location.pathname.lastIndexOf("/");
    let portionBeforeLastSlash = window.location.pathname.slice(1, lastSlashIndex);
    navigate(`/${portionBeforeLastSlash}/${tab}`);
  };

  return (
    <div style={{ display: "flex", flexDirection: "row", backgroundColor: "white", height: "65px" }}>
      <div onClick={() => handleClick("overblick")} style={{ display: "flex", marginTop: "5px", width: "25%", height: "60px", backgroundColor: colors[0], alignItems: "center", cursor: "pointer"}}>
        <Icon icon="iconamoon:eye" width="40" height="30" style={{ marginLeft: "25%", color: "#182745" }} />
        <div style={{ width: "110px", fontSize: "23px", color: "#182745", fontWeight: "bold", marginLeft: "5%" }}>Överblick</div>
      </div>

      <div onClick={() => handleClick("detaljer")} style={{ marginTop: "5px", width: "25%", height: "60px", backgroundColor: colors[1], marginLeft: "37px", alignItems: "center", display: "flex", cursor: "pointer" }}>
        <Icon icon="mdi:checkbox-marked-outline" width="40" height="40" style={{ marginLeft: "25%", color: "#182745" }} />
        <div style={{ width: "205px", fontSize: "23px", color: "#182745", fontWeight: "bold", marginLeft: "5%" }}>Detaljer</div>
      </div>

      <div onClick={() => handleClick("loggbok")} style={{ display: "flex", marginTop: "5px", width: "25%", height: "60px", backgroundColor: colors[2], alignItems: "center", marginLeft: "37px", cursor: "pointer" }}>
        <Icon icon="quill:compose" width="40" height="40" style={{ marginLeft: "24%", color: "#182745" }} />
        <div style={{ width: "110px", fontSize: "23px", color: "#182745", fontWeight: "bold", marginLeft: "19px" }}>Loggbok</div>
      </div>

      <div onClick={() => handleClick("resultat")} style={{ display: "flex", marginTop: "5px", width: "25%", height: "60px", backgroundColor: colors[3], alignItems: "center", marginLeft: "37px", cursor: "pointer" }}>
        <Icon icon="et:documents" width="40" height="40" style={{ marginLeft: "26%", color: "#182745" }} />
        <div style={{ width: "130px", fontSize: "23px", color: "#182745", fontWeight: "bold", marginLeft: "15px" }}>Uppföljning</div>
      </div>
    </div>
  );
};

export default TabsProject;
