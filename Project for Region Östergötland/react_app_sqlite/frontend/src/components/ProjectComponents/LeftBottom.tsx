import React from 'react'
import PGSA_Overview from './PGSA_Overview';
import { User } from "../../Types";
import MemberList from "./MemberList";

type Props = {
  startDate: string
  setStartDate: (startDate: string) => void
  status: string
  users: User[];
  setUsers: (users: User[]) => void;
  projectId: string;
}


const LeftBottom = ({startDate, setStartDate, status, users, setUsers, projectId}: Props) => {
  const teamLeaderRole = "Team-Leader";

  return (
    <div style={{ display: "flex", flexDirection: "column", marginLeft: "12px", height: "20vh", alignItems: "center" }}>
      {users.map((user, index) => (
        <React.Fragment key={index}>{user.projectRole === teamLeaderRole && <PGSA_Overview status={status} userId={user.userId} />}</React.Fragment>
      ))}
      <div style={{ height: "38vh", width: "350px", backgroundColor: "#E6F0F8", marginTop: "10px", borderRadius: "10px", paddingTop: '5px', paddingLeft: '15px' }}>
        <MemberList status = {status} height = {"100%"} users={users} setUsers={setUsers} projectId={projectId} />
      </div>
    </div>
  );
}

export default LeftBottom

