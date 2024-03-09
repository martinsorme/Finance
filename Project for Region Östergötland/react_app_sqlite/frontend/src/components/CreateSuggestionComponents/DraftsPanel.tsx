import React, { useState, useEffect } from "react";
import { Center, Text, Box } from "@chakra-ui/react";
import DraftButton from "./DraftButton";
import { Suggestion } from "../../Types";
import {BASE_URL} from "../../Constants";

type Props = {
  fillData: (
    inputValue: string,
    categories: { categoryId: number; categoryName: string }[],
    importanceValue: string,
    differenceValue: string,
    requirementsValue: string
  ) => void;
  setSelected: (id: number) => void;
  selected: number;
  newDraftTitle: string;
};


const DraftsPanel = ({ newDraftTitle, fillData, setSelected, selected, }: Props) => {
  const [suggestionDrafts, setSuggestionDrafts] = useState<Suggestion[]>([]);
  const [isSuggestionSelected, setIsSuggestionSelected] = useState<boolean>(true);

  // fetch all drafts by user from db
  const fetchDrafts = async () => {
    let token = JSON.parse(sessionStorage.getItem("auth") + "").token;
    //console.log(token)
    try {
      const responseSuggestions = await fetch(
        `${BASE_URL}/get_all_utkast_by_user`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      if (!responseSuggestions.ok) {
        throw new Error(`HTTP error! Status: ${responseSuggestions.status}`);
      }

      const dataSuggestions = await responseSuggestions.json();
      if (dataSuggestions.length === 0) {
        console.log("No suggestions found");
        return;
      }

      // convert json data from request to list of Suggestion objects
      const drafts: Suggestion[] = [];
      for (const draft in dataSuggestions) {
        drafts.push({
          name: dataSuggestions[draft]["name"],
          suggestionId: dataSuggestions[draft]["suggestionId"],
          categories: dataSuggestions[draft]["categories"],
          importanceDescription: dataSuggestions[draft]["descriptionImportance"],
          differenceDescription: dataSuggestions[draft]["descriptionImpact"],
          requirementsDescription: dataSuggestions[draft]["descriptionRequirements"],
          creationTime: dataSuggestions[draft]["creationTime"],
          creator: dataSuggestions[draft]["creator"],
        });
      }

      setSuggestionDrafts(drafts);

      // fill the data from the selected draft into the input boxes
      let draft = drafts.find((draft) => draft.suggestionId === selected);
      const name = draft?.name ? draft.name : "";
      const categories = draft?.categories ? draft.categories : [];
      const importance = draft?.importanceDescription
        ? draft.importanceDescription
        : "";
      const difference = draft?.differenceDescription
        ? draft.differenceDescription
        : "";
      const requirements = draft?.requirementsDescription
        ? draft.requirementsDescription
        : "";
      fillData(name, categories, importance, difference, requirements);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSuggestionClick = (id: number) => {
    setIsSuggestionSelected(true);
    setSelected(id);
    if (id === -1) {
      fillData("", [], "", "", "");
      return;
    }
    let draft = suggestionDrafts.find((draft) => draft.suggestionId === id);
    const name = draft?.name ? draft.name : "";
    const categories = draft?.categories ? draft.categories : [];
    const importance = draft?.importanceDescription ? draft.importanceDescription : "";
    const difference = draft?.differenceDescription ? draft.differenceDescription : "";
    const requirements = draft?.requirementsDescription ? draft.requirementsDescription : "";
    fillData(name, categories, importance, difference, requirements);
  };


  useEffect(() => {
    fetchDrafts();
  }, []);

  return (
    <Center h="100%" w="100%" style={{ alignItems: "start" }}>
      <div
        style={{
          width: "90%",
          height: "100%",
          backgroundColor: "var(--lightblue)",
          borderRadius: "10px",
          marginTop: "5%",
          paddingTop: "4%",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
        }}
      >
        <DraftButton //new suggestion button
          key={-1} // set key to -1 to avoid conflict with other ids
          name={
            newDraftTitle && selected === -1
              ? newDraftTitle.substring(0, 25)
              : "Nytt förslag"
          } //Check if newDraftTitle is truthy
          isSelected={-1 === selected && isSuggestionSelected}
          id={-1}
          onClick={handleSuggestionClick}
          icon="carbon:new-tab"
        />
        <Text marginLeft={"15px"} as="b" fontSize="2xl" cursor={'default'} marginTop={"15px"}>
          Mina utkast:
        </Text>
        <Box h={"100%"} overflow={'scroll'}>
            {suggestionDrafts.map((draft) => (
              <DraftButton
                key={draft.suggestionId}
                name={draft.name}
                isSelected={draft.suggestionId === selected && isSuggestionSelected}
                id={draft.suggestionId}
                onClick={handleSuggestionClick}
              />
            ))}
        </Box>
      </div>
    </Center>
  );
};

export default DraftsPanel;
