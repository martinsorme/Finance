import React, { useState, useMemo, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Text } from "@chakra-ui/react";
import { User, ProjectRole } from "../../Types";
import EditMemberModal from './EditMemberModal';
import ProfileCardModal from './ProfileCardModal'; // Your new Profile Card Modal Component

const teamLeaderRole = "Team-Leader";
const auth = JSON.parse(sessionStorage.getItem("auth") + "");
var currentUserId = 0;
if (auth) {
  currentUserId = auth.userId;
}
// Define the props for the component
type Props = {
  users: User[];
  setUsers: (users: User[]) => void;
  projectId: string;
  height: string; 
  status : string; 
};
// Define the MemberList component
const MemberList = ({status,  height, users, setUsers, projectId }: Props) => {
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [profileModalIsOpen, setProfileModalIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  //Sorting function to make sure that the teamleader always is displayed at the top of the list
  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) => {
      const isALeader = a.projectRole === ProjectRole.team_Leader;
      const isBLeader = b.projectRole === ProjectRole.team_Leader;
  
      if (isALeader && !isBLeader) {
        return -1;
      }
      if (!isALeader && isBLeader) {
        return 1;
      }
      return 0;
    });
  }, [users]);

  const toggleEditModal = () => {
    setEditModalIsOpen(!editModalIsOpen);
  };

  //Open and close function to show profilecard
  const openProfileModal = (user: User) => {
    setSelectedUser(user);
    setProfileModalIsOpen(true);
  };

  const closeProfileModal = () => {
    setProfileModalIsOpen(false);
    setSelectedUser(null);
  };
 
  //Returns true if a user can edit the members on a project 
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

    // Call the function when the component mounts or when dependencies change




  return (
    <div style={{ height: "310px"}}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
        <Text fontSize="22px" as="b">
          Team medlemmar
        </Text>
        {status !== "Finished" && getEditingRights() ? (
          <Text as="u" fontSize={"12px"} cursor={"pointer"} marginLeft={"15px"} onClick={toggleEditModal}>
            Redigera medlemmar
          </Text>
        ) : null}
      </div>

      {/* Print all the members of the project */}
      <div style={{ overflowY: "scroll", maxHeight: "200px", marginBottom: "10px" }}>
        <ol style={{ listStyleType: "none", padding: 0, maxHeight: "180px" }}>
          {sortedUsers.map((user) => (
            <li
              key={user.userId}
              style={{
                alignItems: "center",
                display: "flex",
                fontSize: "20px",
                cursor: "pointer",
                marginBottom: "15px",
              }}
              onClick={() => openProfileModal(user)}
            >
              <Icon icon="fa6-solid:user" width="30" style={{ marginLeft: "10px", marginRight: "16px", verticalAlign: "middle" }} />
              {user.userId === currentUserId ? "Du" : user.name}
              {user.projectRole === teamLeaderRole && <em> - Ansvarig</em>}{" "}
            </li>
          ))}
        </ol>
      </div>

      <EditMemberModal isOpen={editModalIsOpen} toggleModal={toggleEditModal} setUsers={setUsers} users={users} projectId={projectId} />

      {selectedUser && profileModalIsOpen && <ProfileCardModal user={selectedUser} isOpen={profileModalIsOpen} onClose={closeProfileModal} />}
    </div>
  );
};

export default MemberList;