import React, { useEffect } from "react";
import {
  VStack,
  Text,
  UnorderedList,
  ListItem,
  HStack,
  CloseButton,
  Button,
} from "@chakra-ui/react";
import { Category } from "../../Types";
import { useParams } from "react-router-dom";
import Select, { StylesConfig } from "react-select";
import {BASE_URL} from "../../Constants";

type Props = {
  categories: Category[];
  handleCategories: (value: Category[]) => void;
  status : string; 
  edit : boolean; 
};

const DetailsCategory = ({ edit, status, categories, handleCategories }: Props) => {
  const { projectId } = useParams();

  const bgColor: string = "#E6F0F8";
  const borderRadius: string = "10px";
  const [buttonText, setButtonText] = React.useState("Redigera kategorier");
  const [changeActive, setChangeActive] = React.useState(false);
  const [allCategories, setAllCategories] = React.useState<{ value: number; label: string }[]>([]);

  //Fetches all categories 
  const getAllCategories = async () => {
    try {
      const response = await fetch(BASE_URL + "/get_all_categories", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      const fetchedCategories = data.map((category: Category) => ({
        value: category.categoryId,
        label: category.categoryName,
      }));
      setAllCategories(fetchedCategories);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    // Check if allCategories is already populated
    if (allCategories.length === 0) {
      getAllCategories();
    }
  }, [allCategories]);

  //State for handling text in component
  const setChanging = async () => {
    setChangeActive(!changeActive);
    if (!changeActive) {
      setButtonText("");
    } else {
      setButtonText("Redigera kategorier");
    }
  };

  // Removes a category
  const removeCategory = (categoryName: string) => {
    const updatedCategories = categories.filter(
      (category) => category.categoryName !== categoryName
    );
    handleCategories(updatedCategories);
  };

  // Saves any changes made to the categories
  const saveChanges = async () => {
    const updatedCategories = categories.map((category) => category.categoryId);

    try {
      const response = await fetch(
        BASE_URL + "/project/" + projectId,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            categories: updatedCategories,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setChanging();
    } catch (error) {
      console.error("Error updating categories:", error);
    }
  };

  // Updates categories in list
  const updateCategories = (selectedOptions: any) => {
  // Extract existing category names
  const existingCategoryNames = categories.map((category) => category.categoryName);

  // Filter out duplicates by checking if the category name already exists
  const uniqueSelectedOptions = selectedOptions.filter(
    (option: any) => !existingCategoryNames.includes(option.label)
  );

  // Append the newly selected categories to the existing categories
  const newCategories = uniqueSelectedOptions.map((option: any) => ({
    categoryId: option.value,
    categoryName: option.label,
  }));

  // Update the state with the combined categories
  handleCategories([...categories, ...newCategories]);
};

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: bgColor,
        borderRadius: borderRadius,
        // minHeight: "15vh",
        position: "relative",
        paddingTop: "10px",
        minHeight: "250px",
        overflowY: "auto",
      }}
    >
      <HStack marginLeft={"20px"}>
        <Text as={"b"} fontSize={"xl"}>
          Kategori
        </Text>
        {status !=="Finished" && edit ? (
        <Text
          onClick={setChanging}
          as={"u"}
          fontSize={"12px"}
          marginLeft={2}
          cursor={"pointer"}
          backgroundColor={bgColor}
        >
          {buttonText}
        </Text>
          ) : null }
      </HStack>
      {changeActive && (
        //<div style={{overflowY: "hidden"}}> 
        <Select
          options={allCategories
            .filter(
              (category) =>
                !categories.some((c) => c.categoryName === category.label)
            )
            .map((category) => ({
              value: category.value,
              label: category.label,
            }))}
          isSearchable={true}
          isClearable={true}
          isMulti={true}
          placeholder={"Välj fler kategorier"}
          hideSelectedOptions={true}
          onChange={updateCategories}
          styles={{
            control: (provided) => ({
              ...provided,
              fontSize: "smaller",
              borderRadius: "10px",
              borderColor: "var(--darkblue)",
              position: "absolute",
              top: "10px",
              right: "0px",
              marginRight: "10px",
              width: "200px",
            }),
            menu: (provided) => ({
              ...provided,
              width: "30%",
              position: "absolute",
              top: "40px",
              right: "20px",
              marginRight: "3%",
              maxHeight: "150px",
              overflowY: "auto"
            }),
            option: (provided, state) => ({
              ...provided,
              backgroundColor: state.isSelected ? "var(--darkblue)" : "white", // Set the background color for selected and non-selected options
              color: state.isSelected ? "white" : "black", // Set the text color for selected and non-selected options
              '&:hover': {
                backgroundColor: "var(--darkblue)", // Set the background color on hover
                color: "white", // Set the text color on hover
              },
            }),
          }}
          />
          //</div>
      )}
      <VStack align={"left"}>
        {categories.length > 0 ? 
        <UnorderedList marginBottom={categories.length > 1 ? '15px' : '30px'}>
          {categories.map((category) => (
            <HStack key={"category" + category.categoryId}>
              <ListItem marginTop={"10px"}>{category.categoryName}</ListItem>
              {changeActive && (
                <CloseButton
                  onClick={() => removeCategory(category.categoryName)}
                  cursor={"pointer"}
                  marginTop={"10px"}
                  size={"contain"}
                  marginLeft={"20px"}
                />
              )}
            </HStack>
          ))}
          </UnorderedList>
          : <Text marginTop={"10px"} marginLeft={'20px'} marginBottom={'30px'}>Inga kategorier valda</Text>}
      </VStack>
      {changeActive && (
        <Button
          onClick={saveChanges}
          position={"absolute"}
          top={0}
          fontSize={"15px"}
          right={0}
          marginTop={"10px"}
          marginRight={"15px"}
          cursor={"pointer"}
          variant={'darkBlueButton'}
          size={'sm'}
          paddingX={'7px'}
        >
          Spara
        </Button>
      )}
    </div>
  );
};

export default DetailsCategory;
