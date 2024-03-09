import React from 'react'
import { VStack } from "@chakra-ui/react";
import { User } from "../../Types";
import MemberList from "./MemberList";
import { useParams } from "react-router-dom";

type Props = {
    users: User[]
    handleUsers : (users: User[]) => void
    status: string 
    projectId? : string

}

const DetailsMembers = ({status, users, handleUsers, projectId}: Props) => {
    const bgColor: string = "#E6F0F8";
    const borderRadius: string = "10px";
  const containerHeight = '100%'; // `${100 + users.length * 50}px`;
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: bgColor,
        height: containerHeight,
        borderRadius: borderRadius,
      }}
    >
      <VStack align={"left"} margin={5}>
        <MemberList status = {status} height = {"300px"} users={users} setUsers={handleUsers} projectId={projectId + ""} />
      </VStack>
    </div>
  );
}

export default DetailsMembers