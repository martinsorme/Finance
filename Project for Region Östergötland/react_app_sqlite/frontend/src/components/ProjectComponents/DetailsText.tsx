import React from "react";
import { Textarea, VStack, Text, Button, Flex } from "@chakra-ui/react";

type Props = {
  title: string;
  text: string;
  setText: (text: string) => void;
  saveChanges: () => void;
  status: string; 
  edit : boolean
};

const DetailsText = ({ edit, status , title, text, setText, saveChanges }: Props) => {
    const [isEditing, setIsEditing] = React.useState(false)
    const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value)
        }
  return (
    <VStack width={"90%"} alignItems={'left'} spacing={1}>
        <Text as={'b'}>
            {title}
      </Text>
      {isEditing ? (
        
        <Textarea h="17vh"
            minHeight={0}
            variant="filled"
            resize={"none"}
            value={text}
            onChange={handleTextChange}
            bg={"#E6F0F8"}
        />
        ) : (
          <Text fontSize={"15px"}>{text}</Text>
        )}
       {isEditing ? (
        <Flex justifyContent={'end'} paddingTop={'3px'}>
          <Button size={'sm'} variant={'darkBlueButton'} fontWeight={'semibold'} minW={'fit-content'} paddingX={'8px'} onClick={() => { saveChanges(); setIsEditing(false) }}>Spara</Button>
        </Flex>
        ) : (
           status !== "Finished" && edit ? (
         <Text fontSize={"12px"} as={"u"} cursor={"pointer"} marginLeft={"90%"} onClick={() => setIsEditing(true)}>Redigera</Text>
      ) : null
        )}
    </VStack>
  );
};

export default DetailsText;
