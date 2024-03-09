// Import necessary dependencies
import React from "react";
import { Center, Text, VStack } from "@chakra-ui/react";
import ImprovementWork from "./ImprovementWork";
import { useState, useEffect } from "react";
import { Project, Task, TaskStatus, User } from "../../Types";
import {BASE_URL} from "../../Constants";
import { on } from "events";

// Define the props for the component
type Props = {
  showTitle?: boolean;
  color?: string;
  draft?: boolean;
  height?: string;
  marginBottom?: string;
};

// Define the OngoingImprovementsLP component
const OngoingImprovementsLP = ({
  showTitle = true,
  color = "#F2F8FB",
  draft = false,
  height = "350px",
}: Props = {}) => {
  // Define the state variables
  const [draftProjects, setDraftProjects] = useState<Project[]>([]);
  const [ongoingProjects, setOngoingProjects] = useState<Project[]>([]);
  const [user, setUser] = useState<User | undefined>();
  const apiUrl = BASE_URL;

  // Fetch the logged-in user
  const fetchUser = async () => {
    let auth = JSON.parse(sessionStorage.getItem("auth") + "");
    let token = auth.token;

    try {
      const response = await fetch(`${apiUrl}/logged_in_user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const user = await response.json();
      return user;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch projects by the logged-in user
  const fetchProjectsByUser = async () => {
    let auth = JSON.parse(sessionStorage.getItem("auth") + "");
    let token = auth.token;

    try {
      const response = await fetch(`${apiUrl}/get_all_projects_by_user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      let projectData: Project[] = data;

      // Filter tasks based on user and status
      for (let project of projectData) {
        project.tasks = project.tasks.filter(
          (task) =>
            task.users.some((user) => user.userId === auth.userId) &&
            (task.status === "Ongoing" || task.status === TaskStatus.notYetStarted)
        );
      }

      setDraftProjects(
        projectData.filter(
          (project) =>
            project.status === "Utkast" && project.creator_id == auth.userId
        )
      );
      setOngoingProjects(
        projectData.filter((project) =>
          ["P", "D", "S", "A"].includes(project.status)
        )
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch projects by unit
  const fetchProjectsByUnit = async (unit: string | undefined) => {
    let auth = JSON.parse(sessionStorage.getItem("auth") + "");
    let token = auth.token;

    try {
      const response = await fetch(
        `${apiUrl}/get_all_projects_in_unit/${unit}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      let projectData: Project[] = data;

      // Filter tasks based on user and status
      for (let project of projectData) {
        project.tasks = project.tasks.filter(
          (task) =>
            task.users.some((user) => user.userId === auth.userId) &&
            task.status === "Ongoing"
        );
      }

      setDraftProjects(
        projectData.filter(
          (project) =>
            project.status === "Utkast" && project.creator_id == auth.userId
        )
      );
      setOngoingProjects(
        projectData.filter((project) =>
          ["P", "D", "S", "A"].includes(project.status)
        )
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Load the user
  const loadUser = async () => {
    try {
      const loadedUser = await fetchUser();
      setUser(loadedUser);
      return loadedUser;
    } catch (error) {
      console.error("Error loading user:", error);
      throw error;
    }
  };
  
  // Fetches personal projects or the units project depending on user role
  useEffect(() => {
    const fetchData = async () => {
      try {
        const loadedUser = await loadUser();

        // Fetch projects based on user role
        if (loadedUser?.role === "Admin") {
          fetchProjectsByUnit(loadedUser.unit);
        } else {
          fetchProjectsByUser();
        }
      } catch (error) {
        console.error("Error loading user:", error);
      }
    };

    fetchData();
  }, []); // Run only once on component mount

  return (
    <VStack align="left" marginTop={3}>
      {showTitle && (
        <Text as="b" fontSize="xl" marginLeft={6}>
          {user?.role === "Admin"
            ? "Avdelningens pågående förbättringsarbeten"
            : "Mina pågående förbättringsarbeten"}
        </Text>
      )}
      <VStack
        spacing="5px"
        align="Left"
        margin="7px"
        marginTop={0}
        overflowY="auto"
        height= {height}
      >
        {(draft ? draftProjects : ongoingProjects).length < 1 ? (
          <Center>
            <Text>Inga förbättringsarbeten</Text>
          </Center>
        ) : (
          (draft ? draftProjects : ongoingProjects).map((project) => {
            return (
              <ImprovementWork
                key={project.projectId}
                project={project}
                color={color}
                isDraft={draft}
              />
            );
          })
        )}
      </VStack>
    </VStack>
  );
};

export default OngoingImprovementsLP;
