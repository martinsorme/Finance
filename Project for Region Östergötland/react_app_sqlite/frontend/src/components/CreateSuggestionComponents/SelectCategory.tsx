import React, { useEffect } from "react";
import Select, { StylesConfig } from "react-select";
import { Category } from "../../Types";
import {BASE_URL} from "../../Constants";

const customStyles: StylesConfig = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "var(--lightblue)",
    border: "none",
    boxShadow: "none",
  }),
};

type Props = {
  fade: String;
  multiple: boolean;
  onCategoryChange: (categoryNames: { categoryId: number; categoryName: string }[]) => void;
  categoryValue: { categoryId: number; categoryName: string }[];
};

const SelectCategory = ({ fade, multiple, onCategoryChange, categoryValue }: Props) => {
  const [categoryNames, setCategoryNames] = React.useState<{ value: number; label: string }[]>([]);
  const [selectedCategories, setSelectedCategories] = React.useState<{ value: number; label: string }[]>([]);

  //Function to get the pre-selected options from the suggestion
  function getCommonObjects(array1: { label: string; value: number }[], array2: { categoryId: number; categoryName: string }[]): { label: string; value: number }[] {
    const valuesToInclude = array2.map((obj) => obj.categoryId);
    return array1.filter((obj) => valuesToInclude.includes(obj.value));
  }

  // fetch all category options from db
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/get_all_categories`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        const categories = data.map((category: Category) => ({
          value: category.categoryId,
          label: category.categoryName,
        }));
        setCategoryNames(categories);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  // change value of categories when the chosen category is changed
  useEffect(() => {
    setSelectedCategories(getCommonObjects(categoryNames, categoryValue));
  }, [categoryValue]);

  const handleSelectedChange = (selectedOption: any) => {
    if (selectedOption !== null && typeof selectedOption !== "undefined") {
      setSelectedCategories([...selectedOption]);

      //used to change {label, value} => {categoryName, categoryId}
      onCategoryChange(
        [...selectedOption].map((item) => ({
          categoryId: item.value,
          categoryName: item.label,
        }))
      );

    } else {
      onCategoryChange([]);
    }
  };

  return (
    <div
      style={{
        width: "65%",
        marginLeft: "0px",
        marginTop: "20px",
        display: "flex",
        flexDirection: "column",
      }}>
      <Select
        styles={customStyles}
        isSearchable={true}
        isClearable={true}
        isMulti={multiple} //  Set to true if you want to allow multiple selections
        placeholder={fade}
        maxMenuHeight={150}
        value={selectedCategories}
        onChange={handleSelectedChange}
        options={categoryNames}
        theme={theme => ({
          ...theme,
          borderRadius: 5,
          colors: {
              ...theme.colors,
            neutral50: '#76859b',  // placeholder color
            neutral20: '#d0d7e0', // border color
            neutral10: '#CEE0EE', // menu arrow color
            dangerLight: '#BED5E6', // menu background color
            danger: 'var(--darkblue)',
          },
        })}
      />
    </div>
  );
};

export default SelectCategory;
