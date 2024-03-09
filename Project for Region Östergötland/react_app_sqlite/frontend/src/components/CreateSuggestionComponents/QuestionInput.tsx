import React, { ChangeEvent } from "react";
import { HStack, Textarea, Text } from "@chakra-ui/react";
import HelpButton from "../HelpButton";

type Props = {
  question: string;
  description: string;
  helpButtonDescriptions: string[];
  onInputChange: (value: string) => void;
  invalidQuestionInput?: boolean;
  value: string;
};

const helpButtonTitle: string = "Hur ska jag besvara frågan?";

// Component for a question input
const QuestionInput = ({
  question,
  description,
  helpButtonDescriptions,
  invalidQuestionInput,
  onInputChange,
  value,
}: Props) => {
  return (
    <>
      <Text as="b" mb="8px">
        {question}
      </Text>
      <HStack h="80%">
        <Textarea
          h="100%"
          w="85%"
          variant="filled"
          bg="var(--lightblue)"
          resize="none"
          placeholder={description}
          value={value}
          onChange={(e) => onInputChange(e.target.value)}
          isInvalid={invalidQuestionInput}
        />
        <div
          style={{
            width: "120px",
            height: "120px",
            margin: "auto",
            display: "flex",
            alignItems: "center",
          }}
        >
          <HelpButton
            title={helpButtonTitle}
            descriptions={helpButtonDescriptions}
          />
        </div>
      </HStack>
    </>
  );
};

export default QuestionInput;
