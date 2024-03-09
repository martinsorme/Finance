import React from "react";
import { Icon } from "@iconify/react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Center,
  UnorderedList,
  ListItem,
  Box,
} from "@chakra-ui/react";

type Props = {
  title: String;
  descriptions: String[];
  textWidth?: React.CSSProperties["width"];
};

// component for questionmark with popover to show help text when answering questions, used in create suggestion page
const HelpButton = ({ title, descriptions, textWidth='70%' }: Props) => {
  return (
    <div>
      <Popover closeOnBlur={false}> 
        <PopoverTrigger>
          {/* questionmark icon */}
          <Center w="100%">
            <Icon icon="ph:question-light" width="40" />
          </Center>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          {/* title of popover */}
          <PopoverHeader >Det du ska tänka på är följande:</PopoverHeader>
          <PopoverBody>
            {/* body of popover. List of points */}
            <UnorderedList spacing={2} paddingLeft={"0"}>
              {descriptions.map((description) => (
                <ListItem key={crypto.randomUUID()}>{description}</ListItem>
              ))}
            </UnorderedList>
          </PopoverBody>
        </PopoverContent>
        {/* text below questionmark */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          width={'100%'}
        >
          <Box width={textWidth} as='b' fontSize={'10px'}>
            {title}
          </Box>
        </Box>
      </Popover>
    </div>
  );
};

export default HelpButton;
