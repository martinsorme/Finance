// Import necessary dependencies
import React from "react";
import { Text, VStack } from "@chakra-ui/react";
import Event from "./Event";
import { AdminNotification } from "../../Types";
import { useState, useEffect } from "react";
import {BASE_URL} from "../../Constants";

type Props = {};

const LatestEventsLP = (props: Props) => {
  // Define state variable to store notifications
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const apiUrl = BASE_URL;

  // Function to fetch notifications from the API
  const getNotifications = async() => {
    let notice : AdminNotification[] = []
    // Retrieve token from session storage
    let token = JSON.parse(sessionStorage.getItem('auth') + "").token
    try {
      // Send GET request to the API endpoint
      const response = await fetch(`${apiUrl}/get_notifications`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token,
        },
      });

      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse the response data and update the notifications state
      const data = await response.json();
      notice.push(...data)

      // If no notifications are found, log a message
      if (data.length === 0) {
        console.log("No improvement works found");
        return;
      }
      if (JSON.parse(sessionStorage.getItem('auth') + "").role === "Admin") {
      
        // Send GET request to the API endpoint
        const response = await fetch(`${apiUrl}/get_notifications_admin`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
          },
        });

        // Check if the response is successful
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the response data and update the notifications state
        const data = await response.json();
        notice.push(...data)

        // Sort the notifications by timestamp
        notice.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

        // If no notifications are found, log a message
        if (data.length === 0) {
          console.log("No improvement works found");
          return;
        }
      }
      setNotifications(notice);
  } catch (error) {
    // Log any errors that occur during the fetch request
    console.error("Error fetching data:", error);
  }
}

  // Fetch notifications when the component mounts
  useEffect(() => {
    getNotifications();
  }, []);

  // Render the component
  return (
    <>
      <VStack align='left' marginTop={3} maxHeight={330} marginBottom={3}>
        <Text as="b" fontSize="xl" marginLeft={4}>
          Händelser
        </Text>
        <VStack
          spacing="5px"
          align="Left"
          margin="10px"
          marginTop={0}
          overflowY="auto"
          height="380px"
        >
          {/* Render each notification as an Event component */}
          {notifications.length === 0 ? <Text marginLeft = {2}>Inga händelser</Text> :
            notifications.map((notification) => {
              return (
                <Event
                  notification={notification}
                />
              );
            })}
            
            
        </VStack>
      </VStack>
    </>
  );
};

export default LatestEventsLP;
