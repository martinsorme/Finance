import React, { ChangeEvent, useState } from 'react'
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

type Props = {
    login: (email: string, password: string) => void; 
    errorMessage: string; 
}

const LoginForm = ({login, errorMessage}: Props) => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //Used for checking email
    const [validEmail, setValidEmail] = useState(false);
    const [emailEdited, setEmailEdited] = useState(false);

    //Used for checking password
    const [validPassword, setValidPassword] = useState(false);
    const [passwordEdited, setPasswordEdited] = useState(false);

    //Regex for password and email
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
    const passwordRegex = /^.{3,}$/;

     const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
       setEmailEdited(true);
       setValidEmail(emailRegex.test(event.target.value));
       setEmail(event.target.value);
     };

     // Function to handle password input changes
     const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
       setPasswordEdited(true);
       setValidPassword(passwordRegex.test(event.target.value));
       setPassword(event.target.value);
     };



  return (
    <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
      <Box
        rounded={"xl"}
        //bg="gray.50"
        //bg={useColorModeValue("white", "gray.100")}
        boxShadow={"lg"}
        p={8}
      >
        <Stack spacing={4}>
           <Heading fontSize="4xl" color="#182745">Välkommen!</Heading> 
          {/* Email input field */}
          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={handleEmailChange}
              borderBottomColor={
                emailEdited
                  ? validEmail
                    ? "green.500"
                    : "red.500"
                  : "defaultBorderColor"
              }
            />
          </FormControl>
          {/* Password input field */}
          <FormControl id="password">
            <FormLabel>Lösenord</FormLabel>
            <HStack>
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                borderBottomColor={
                  passwordEdited
                    ? validPassword && validEmail
                      ? "green.500"
                      : "red.500"
                    : "defaultBorderColor"
                }
              />
              {/* TODO: Add functionality to show/hide password */}
            </HStack>
          </FormControl>
          <Stack spacing={5}>
            <Stack
              direction={{ base: "column", sm: "row" }}
              align={"start"}
              justify={"space-between"}
            >
              <Checkbox>Kom ihåg mig</Checkbox>
            </Stack>
            <Text>{errorMessage}</Text>
            <Button
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
              onClick={() => login(email, password)}
              isDisabled={!validEmail || !validPassword}
            >
              Logga in
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
}

export default LoginForm