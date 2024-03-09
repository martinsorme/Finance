import React, { useState, useEffect } from 'react';
import Select, { StylesConfig } from 'react-select';
import { Category } from '../../Types';
import {BASE_URL} from "../../Constants";

const customStyles: StylesConfig = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: '#E5F0F8',
  }),
};

type Props = {
  header: string;
  onSelectedCategoriesChange: (selectedCategories: { value: number; label: string }[]) => void;
  categoriesValue: { value: number; label: string }[];
};

const InputCategory = ({header, onSelectedCategoriesChange, categoriesValue }: Props) => {
  //You can set intital value with  const [inputValue, setInputValue] = useState(titel); if title is a variable in props 
  const [categoryNames, setCategoryNames] = useState<{ value: number; label: string }[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
          const response = await fetch(`${BASE_URL}/get_all_categories`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }});
        const data = await response.json();

        const categories = data.map((category: Category) => ({
          value: category.categoryId,
          label: category.categoryName,
        }));
        setCategoryNames(categories);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  //handels which categories are selected 
  const handleSelectedChange = (selectedOption: any) => {
    if (selectedOption !== null && typeof selectedOption !== 'undefined') {
        onSelectedCategoriesChange([...selectedOption]);
    } else {
      onSelectedCategoriesChange([]);

    }
  };

  return (
    <div style={{ width: '540px', marginLeft: '20px', marginTop: '20px', display: 'flex', flexDirection: 'column', marginBottom:"15px" }}>
      <h3 style={{ fontSize: '20px', width: '540px', marginTop: '5px', fontWeight: 'bold' }}>{header}</h3>
      <Select
        styles={customStyles}
        options={categoryNames}
        isSearchable={true}
        isClearable={true}
        isMulti={true}
        placeholder={"Välj en eller flera kategorier"}
        maxMenuHeight={150}
        onChange={handleSelectedChange}
        value={categoriesValue}
        theme={theme => ({
          ...theme,
          borderRadius: 10,
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

export default InputCategory;
