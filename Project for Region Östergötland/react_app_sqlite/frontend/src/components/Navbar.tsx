"use client";

import {
  Box,
  Flex,
  Text,
  Button,
  useColorModeValue,
  Stack,
  Center,
  HStack,
} from "@chakra-ui/react";
import logo1 from "../images/ROlogo-P-vit.png";
import { Icon } from "@iconify/react";

type Props = {
};

const Navbar = ({}: Props) => {
    
  // Function for signing out
  const signOut = () => {
    sessionStorage.clear();
    window.location.href = "/login";
  };

  return (
    <>
      <Box
        bg="#182745"
        px={4}
        height="87px"
        style={{ position: "fixed", right: 0, left: 0, top: 0, zIndex: 2 }}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box marginTop="24px">
            <a href="/">
              <img
                src={logo1}
                alt="logo"
                width="250px"
                style={{ marginLeft: "25px" }}
              />
            </a>
          </Box>
          {sessionStorage.getItem("auth") && (
            <Flex alignItems={"center"} marginTop="35px">
              <Stack direction={"row"} spacing={7} justifyItems={"center"}>
                <Center>
                  <HStack>
                    <Button bg="" style={{ padding: "0px" }} onClick={signOut}>
                      <Text textAlign="center" color="white" margin={0}>
                        Logga ut
                      </Text>
                      <Icon
                        icon="ic:baseline-log-out"
                        color="white"
                        width="20"
                        style={{ marginLeft: "5px" }}
                      />
                    </Button>
                  </HStack>
                </Center>
              </Stack>
            </Flex>
          )}
        </Flex>
      </Box>
    </>
  );
};

export default Navbar; 