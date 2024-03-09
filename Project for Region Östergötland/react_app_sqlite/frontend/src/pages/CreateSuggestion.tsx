import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import QuestionInput from "../components/CreateSuggestionComponents/QuestionInput";
import TopPanel from "../components/CreateSuggestionComponents/TopPanel";
import DraftsPanel from "../components/CreateSuggestionComponents/DraftsPanel";
import SubmitPanel from "../components/CreateSuggestionComponents/SubmitPanel";
import LeftSidePanel from "../components/LeftSidePanelComponents/LeftSidePanel";
import LightBlueHeader from "../components/LightBlueHeader";
import { useLocation } from "react-router-dom";

//content for help button-descriptions. Each element in one of the arrays is one bullet point
//on this page there are three help buttons, therefore this array has three array-elements
const helpButtonDescriptions = [
  ["Fundera över hur situationen är just nu och på vilket sätt ditt förslag kan förbättra denna situation. Målet är att sätta ord på varför förändringen bör genomföras och varför det är något som ska prioriteras."],
  ["På vilka sätt kommer patientupplevelsen förbättras?", "På vilka sätt kommer patienten påverkas av denna förbättringen?", "Vad är problemet för patienten idag?"],
  ["Vilka resurser behövs?", "Vilket stöd eller hjälp behöver personen som genomför förbättringen?", "Vilken kunskap behövs?"],
];

const CreateSuggestion = () => {
  const location = useLocation();
  // defeult values when entering the page
  let selectedSuggestion = -1;
  let initTitle = "";
  let initQuestion1 = "";
  let initQuestion2 = "";
  let initQuestion3 = "";
  let initCategory = [{ categoryId: -1, categoryName: "" }];

  // id of suggestion to be shown (sent from landing page)
  const suggestionId = location.state?.data;
  if (suggestionId) {
    selectedSuggestion = suggestionId;
  }

  const [titleInput, setTitleInput] = React.useState(initTitle);
  const [categoryInput, setCategoryInput] = React.useState(initCategory);
  const [question1Input, setQuestion1Input] = React.useState(initQuestion1);
  const [question2Input, setQuestion2Input] = React.useState(initQuestion2);
  const [question3Input, setQuestion3Input] = React.useState(initQuestion3);
  const [isResponsibleInput, setIsResponsibleInput] = React.useState("");
  const [checkInput, setCheckInput] = React.useState(false);
  const [selected, setSelected] = React.useState(selectedSuggestion);

  const handleTitleInputChange = (value: string) => {
    setTitleInput(value);
  };

  const handleCategoryInputChange = (
    newSelectedCategory: { categoryId: number; categoryName: string }[]
  ) => {
    setCategoryInput(newSelectedCategory);
  };

  const handleQuestion1InputChange = (value: string) => {
    setQuestion1Input(value);
  };

  const handleQuestion2InputChange = (value: string) => {
    setQuestion2Input(value);
  };

  const handleQuestion3InputChange = (value: string) => {
    setQuestion3Input(value);
  };

  const handleIsResponsibleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsResponsibleInput(event.target.value);
  };

  const handleCheckInput = (value: boolean) => {
    setCheckInput(value);
  };

  const setSelectedDraft = (id: number) => {
    setSelected(id);
    setCheckInput(false);
  };

  // function to load data from a draft into the input boxes
  const fillInputData = (
    inputValue: string,
    newSelectedCategory: { categoryId: number; categoryName: string }[],
    importanceValue: string,
    differenceValue: string,
    requirementsValue: string
  ) => {
    handleTitleInputChange(inputValue);
    handleCategoryInputChange(newSelectedCategory);
    handleQuestion1InputChange(importanceValue);
    handleQuestion2InputChange(differenceValue);
    handleQuestion3InputChange(requirementsValue);
  };

  // the data saved to a draft or a project
  const submitData = {
    titleInput,
    categoryInput,
    question1Input,
    question2Input,
    question3Input,
    isResponsibleInput,
  };

  // checks if all input boxes are filled, used when sumbitting a draft 
  const isValidInput =
    titleInput !== "" &&
    question1Input !== "" &&
    question2Input !== "" &&
    question3Input !== "";
  
  
  return (
    <div>
      <LightBlueHeader
        icon="carbon:new-tab"
        text="Skapa nytt förbättringsförslag"
        isFinishProject={false}
      />
      <LeftSidePanel greenButton={3} />
      <Grid
        h="100%"
        templateRows="repeat(1, 1fr)"
        templateColumns="repeat(3, 1fr)"
        gap={4}
      >
        <GridItem rowSpan={1} colSpan={2} style={{ marginLeft: "3%" }}>
          <Grid
            h="100%"
            templateRows="repeat(5, 1fr)"
            templateColumns="repeat(1, 1fr)"
            gap={4}
          >
            {/* Top panel - title input, category input & save button */}
            <GridItem rowSpan={1} colSpan={1}>
              <TopPanel
                invalidTitleInput={
                  submitData.titleInput === "" && checkInput === true
                }
                selected={selected}
                onTitleChange={handleTitleInputChange}
                onCategoryChange={handleCategoryInputChange}
                titleValue={titleInput}
                categoryValue={categoryInput}
                submitData={submitData}
              />
            </GridItem>

            {/* Inputboxes to questions */}
            <GridItem rowSpan={1} colSpan={1}>
              <QuestionInput
                invalidQuestionInput={
                  submitData.question1Input === "" && checkInput === true
                }
                onInputChange={handleQuestion1InputChange}
                question={"Varför är den här frågan viktig? *"}
                description={"Den här frågan är viktig för att..."}
                helpButtonDescriptions={helpButtonDescriptions[0]}
                value={question1Input}
              />
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <QuestionInput
                invalidQuestionInput={
                  submitData.question2Input === "" && checkInput === true
                }
                onInputChange={handleQuestion2InputChange}
                question={"Hur skulle den gör skillnad för patienten? *"}
                description={"Den skulle göra skillnad genom att...."}
                helpButtonDescriptions={helpButtonDescriptions[1]}
                value={question2Input}
              />
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <QuestionInput
                invalidQuestionInput={
                  submitData.question3Input === "" && checkInput === true
                }
                onInputChange={handleQuestion3InputChange}
                question={"Vad krävs för att genomföra den? *"}
                description={"Det krävs att..."}
                helpButtonDescriptions={helpButtonDescriptions[2]}
                value={question3Input}
              />
            </GridItem>

            {/* Save buttons etc. (Submit panel) */}
            <GridItem rowSpan={1} colSpan={1}>
              <SubmitPanel
                submitData={submitData}
                selected={selected}
                onChange={handleIsResponsibleInputChange}
                checkInput={handleCheckInput}
                validInput={isValidInput}
              />
            </GridItem>
          </Grid>
        </GridItem>

        {/* Drafts panel */}
        <GridItem rowSpan={1} colSpan={1} maxH={'65vh'}>
          <DraftsPanel
            newDraftTitle={titleInput}
            selected={selected}
            setSelected={setSelectedDraft}
            fillData={fillInputData}
          />
        </GridItem>
      </Grid>
    </div>
  );
};

export default CreateSuggestion;
