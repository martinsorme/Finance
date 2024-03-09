import React, { useState, ChangeEvent, useEffect } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { BASE_URL } from "../Constants";
import LoginForm from "../components/LoginForm";
import image1 from "../images/closecare2.png";
import image2 from "../images/closecare.png";

const LoginPage = () => {
  const [errorMessage, setErrorMessage] = useState(""); // State for handling error messages

  // Function to handle login
  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(BASE_URL + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        handleError(error); // Handle error messages
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        const jsonData = await response.json();
        sessionStorage.setItem("auth", JSON.stringify(jsonData));
        window.location.href = "/"; // Redirect to home page after successful login
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Function to handle errors and set error messages
  const handleError = (error: string) => {
    const errorText: { message?: string } = JSON.parse(error);

    if (errorText["message"] === "Invalid email") {
      setErrorMessage("fel email");
    } else if (errorText["message"] === "Invalid password") {
      setErrorMessage("fel lösen");
    }
  };

  return (
    <div>
      {/* Slideshow container */}
      <img style={{ position: "absolute", top: "15vh", right: "14vh", width: "35vh", height: "contain" }} src={image2}></img>
      <img style={{position: "absolute", top:"15vh", left: "14vh", width: "35vh", height:"contain"}} src={image1}></img>
      <div style={{ position: "absolute", left: "38%" }}>
        <LoginForm login={login} errorMessage={errorMessage} />
      </div>
    </div>
  );
};

export default LoginPage;
