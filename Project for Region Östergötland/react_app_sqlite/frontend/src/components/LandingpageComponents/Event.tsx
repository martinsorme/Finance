// Import necessary dependencies
import React from 'react'
import {Text, HStack, VStack} from '@chakra-ui/react'
import { AdminNotification } from '../../Types';
import {BASE_URL} from "../../Constants";

// Define the Props type for the Event component
type Props = {
  notification: AdminNotification;
}

// Define the background color for the Event component
const color: string = '#F2F8FB'

// Define the Event component
const Event = ({notification}: Props) => {

  // Function to handle click event on the Event component
  const handleClick = () => {
    // Redirect to a specific page based on the notification's project ID
    if (notification.projectId) {
      window.location.href = "/forbattringsarbete/" + notification.projectId + "/overblick";
    } else if(notification.suggestionId) {
      window.location.href = "/allaforbattringsarbeten";
    }
    // Call the deleteNotification function
    deleteNotification();
  }

  // Function to delete the notification
  const deleteNotification = async() => {
    // Get the authentication token from session storage
    let token = JSON.parse(sessionStorage.getItem('auth') + "").token
    try {
      // Send a DELETE request to the API to delete the notification
      const response = await fetch(BASE_URL + "/notification/" + notification.notificationId, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token,
        },
      });

      // Throw an error if the response is not successful
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // Render the Event component
  return (
    <>
      <HStack bg={color} mb='8px' paddingLeft='10px' onClick={handleClick} cursor={'pointer'}>
        <VStack align='left' spacing='0px' marginTop='5px'>
          <Text>{notification.message}</Text>
        </VStack>
      </HStack>
    </>
  )
}

export default Event