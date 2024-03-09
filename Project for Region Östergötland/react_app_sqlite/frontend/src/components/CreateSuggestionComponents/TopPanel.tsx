import React, { useState } from "react";
import { Input, Button } from "@chakra-ui/react";
import Popup from "../Popup"; // Import the DraftPopup component
import { useNavigate } from "react-router-dom"; // Import useNavigate
import SelectCategory from "./SelectCategory";
import {BASE_URL} from "../../Constants";

type Props = {
  invalidTitleInput?: boolean;
  onTitleChange: (value: string) => void;
  onCategoryChange: (categoryNames: { categoryId: number; categoryName: string }[]) => void;
  titleValue: string;
  categoryValue: { categoryId: number; categoryName: string }[];
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

const TopPanel = ({ invalidTitleInput = false, onTitleChange, titleValue, categoryValue, selected, submitData, onCategoryChange }: Props) => {
  const [isDraftPopupOpen, setDraftPopupOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate
  const [categoryInput, setCategoryInput] = React.useState<{ categoryId: number; categoryName: string }[]>([]);

  const handleCategoryInputChange = (categoryNames: { categoryId: number; categoryName: string }[]) => {
    setCategoryInput(categoryNames);
    onCategoryChange(categoryNames);
  };

  const handleButton1Click = () => {
    setDraftPopupOpen(false);
    navigate("/"); // Navigate to the home page
  };

  const handleButton2Click = () => {
    setDraftPopupOpen(false);
  };


  let token = JSON.parse(sessionStorage.getItem("auth") + "").token;
  const handleSaveClick = async () => {
    let _method = "POST";
    let route = "add_new_suggestion";
    if (selected !== -1) {
      _method = "PUT";
      route = "suggestion/" + selected;
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
      }),
    };
    try {
      const response = await fetch(`${BASE_URL}/${route}`, requestOptions);
      if (response.ok) {
        setDraftPopupOpen(true);
      } else {
        alert("something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };


  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100%",
        width: "85%",
      }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          width: "100%",
        }}>
        <Input
          isInvalid={invalidTitleInput}
          w={"65%"}
          variant="filled"
          bg={"var(--lightblue)"}
          placeholder="Namnge din idé här..."
          onChange={(e) => onTitleChange(e.target.value)}
          value={titleValue}
        />
        <SelectCategory fade={"Välj kategori"} multiple={true} onCategoryChange={handleCategoryInputChange} categoryValue={categoryValue} />
      </div>

      <Button
        variant="darkBlueButton"
        marginTop={"2.2%"}
        size="medium"
        onClick={() => {
          handleSaveClick();
          setDraftPopupOpen(true);
        }}>
        Spara utkast
      </Button>

      {/* Render the DraftPopup component with navigation callbacks */}
      <Popup
        isOpen={isDraftPopupOpen}
        onClose={() => {
          setDraftPopupOpen(false);
          window.location.reload();
        }}
        onButton1Click={handleButton1Click}
        onButton2Click={handleButton2Click}
      />
    </div>
  );
};

export default TopPanel;
