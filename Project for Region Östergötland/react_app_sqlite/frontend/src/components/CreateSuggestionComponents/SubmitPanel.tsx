import React, { ChangeEvent, useState } from "react";
import HelpButton from "../HelpButton";
import {
  HStack,
  VStack,
  Button,
  Text,
  Radio,
  RadioGroup,
  Center
} from "@chakra-ui/react";
import Popup from "../Popup";
import { useNavigate } from "react-router-dom";
import {BASE_URL} from "../../Constants";

type Props = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  checkInput: (value: boolean) => void;
  validInput: boolean;
  selected: number;
  submitData: {
    titleInput: string;
    categoryInput: { categoryId: number; categoryName: string }[];
    question1Input: string;
    question2Input: string;
    question3Input: string;
    isResponsibleInput: string;
  };
};

const helpButtonTitle: string =
  "Vad betyder det att ansvara över en förbättring?";
const helpButtonDescriptions: string[] = [
  "Har du tid?",
  "Har du rätt befogenhet?",
  "Har du rätt resurser?",
];

const SubmitPanel = ({
  onChange,
  checkInput,
  validInput,
  selected,
  submitData,
}: Props) => {
  
  const [responsibilityValue, setResponsibilityValue] = React.useState("2"); // change to 1 if you want the first radio to be checked as default
  const [isDraftPopupOpen, setDraftPopupOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleButton1Click = () => {
    setDraftPopupOpen(false);
    navigate("/forbattringsarbete"); // Navigate to the home page
  };


  let token = JSON.parse(sessionStorage.getItem("auth") + "").token;

  // called when submitting suggestion (not making it a project)
  const handleSubmitClick = async () => {
    let _method = "POST";
    let route = "/add_new_suggestion";
    if (selected !== -1) {
      _method = "PUT";
      route = "/suggestion/" + selected;
    }
    const requestOptions = {
      method: _method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        title: submitData.titleInput,
        categories: submitData.categoryInput,
        descriptionImportance: submitData.question1Input,
        descriptionImpact: submitData.question2Input,
        descriptionRequirements: submitData.question3Input,
        suggestionId: selected,
        status: "Published",
      }),
    };
    checkInput(true);
    if (validInput !== false) {
      try {
        const response = await fetch(
          BASE_URL + route,
          requestOptions
        );
        if (response.ok) {
          setDraftPopupOpen(true);
        } else {
          alert("something went wrong");
        }
      } catch (error) {
        console.error("Error", error);
      }
    }
  };

  // called when making suggestion a project
  const handleBeginProjectClick = async () => {
    let _method = "POST";
    // if selected is not -1, then the suggestion is already in the db and we want to update it
    if (selected !== -1) {
      _method = "PUT";
    }
    const requestOptions = {
      method: _method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        title: submitData.titleInput,
        categories: submitData.categoryInput,
        descriptionImportance: submitData.question1Input,
        descriptionImpact: submitData.question2Input,
        descriptionRequirements: submitData.question3Input,
        suggestionId: selected,
        status: "Archived",
      }),
    };
    try {
      const response = await fetch(
        `${BASE_URL}/start_project_from_suggestion`,
        requestOptions
      );
      const data = await response.json();
      if (response.ok) {
        navigate("/skapaforbattringsarbete", { state: { id: data.projectId } }); // Navigate to the CreateProject
      } else {
        alert("something went wrong");
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <>
      <VStack align="left">
        <Text as="b">Hade du sjäv velat ansvara för förbättringen?</Text>
        <HStack spacing={14}>
          {/* Creating a div including the radios */}
          <div
            style={{
              width: "420px",
              height: "80px",
              backgroundColor: "var(--lightblue)",
              borderRadius: "10px",
              display: "flex",
            }}
          >
            {/* Creating radios that can be checked */}
            <RadioGroup
              width={"100%"}
              onChange={setResponsibilityValue}
              value={responsibilityValue}
            >
              <Center height={"100%"} width={"100%"}>
                <HStack spacing={5} direction="row">
                  <Radio
                    colorScheme="facebook"
                    value="1"
                    borderColor={"#1A365D"}
                    onChange={onChange}
                  >
                    Ja, det vill jag!
                  </Radio>
                  <Radio
                    colorScheme="facebook"
                    value="2"
                    borderColor={"#1A365D"}
                    onChange={onChange}
                  >
                    Nej, det vill jag inte!
                  </Radio>
                </HStack>
              </Center>
            </RadioGroup>
          </div>

          {/* Creating div for HelpButton */}
          <div
            style={{
              width: "120px",
              height: "90px",
            }}
          >
            <HelpButton
              title={helpButtonTitle}
              descriptions={helpButtonDescriptions}
              textWidth={"100%"}
            />
          </div>

          {/* Creating a VStack för the buttons */}
          <VStack>
            <Button
              size="sm"
              variant="darkBlueButton"
              w="120px"
              h="40px"
              isDisabled={responsibilityValue === "1"}
              onClick={handleSubmitClick}
            >
              Skicka in
            </Button>
            <Button
              size="xs"
              variant="greenButton"
              w="120px"
              h="40px"
              isDisabled={responsibilityValue === "2"}
              style={{ whiteSpace: "initial" }}
              onClick={handleBeginProjectClick}
            >
              Påbörja förbättringsarbete
            </Button>
          </VStack>
        </HStack>
      </VStack>
      {/* Render the DraftPopup component with navigation callbacks */}
      <Popup
        title="Bra förslag!"
        description={
          'Ditt förslag "' + submitData.titleInput + '" är nu inskickat!'
        }
        isOpen={isDraftPopupOpen}
        onClose={() => {
          window.location.reload();
          setDraftPopupOpen(false);
        }}
        onButton1Click={handleButton1Click}
        button1Text="Fortsätt"
      />
    </>
  );
};

export default SubmitPanel;
