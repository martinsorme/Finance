import React, {useState} from 'react'
import { Icon } from '@iconify/react';
import Select ,  { StylesConfig } from 'react-select';

type Props = {input : React.Dispatch<React.SetStateAction<string>>}
const customStyles: StylesConfig= {
    control: (provided, state) => ({
      ...provided,
      border: 'none', // Remove the border
      boxShadow: 'none', // Remove box shadow
      backgroundColor: 'transparent', // Set background color
    }),
    placeholder: (provided) => ({
        ...provided,
        color: '#000',
    }), 
    
}; 


const options = [
  { label: 'Område 1', value: 'Område 1' },
  { label: 'Område 2', value: 'Område 2' },
  { label: 'Område 3', value: 'Område 3' },
  { label: 'Område 4', value: 'Område 4' },
  { label: 'Område 5', value: 'Område 5' },
  { label: 'Område 6', value: 'Område 6' },
  { label: 'Område 7', value: 'Område 7' },
  { label: 'Område 8', value: 'Område 8' },
  { label: 'Område 9', value: 'Område 9' },
  { label: 'Område 10', value: 'Område 10' },
 
];

const SearchFilter = ({input}: Props) => {
    const [inputValue, setInputValue] = useState('');
    const handleInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        input(e.target.value); 
      };
  return (
    <div style ={{display:"flex", flexDirection:"row", backgroundColor:"white", marginTop:"10px", height:"40px", 
    marginLeft:"10px", marginRight: "10px", borderRadius:"5px", paddingLeft:"5px", width: "630px", marginBottom:"20px"}}>
    <Icon icon="gala:search" color="black" width="30" hFlip={true} />
    <input style={{marginLeft:"5px", width:"400px", padding:"5px"}}type="text" placeholder="Sök efter ett förslag..." value={inputValue} onChange={handleInputChange}/>
    <div style={{backgroundColor:"black", width:"2px", height:"40px", marginLeft:"2px"}}></div>
    <div style={{width: "200px", marginLeft: "3px", height:"35px"}}>
    <Select 

      options={options}
      isSearchable={true}
      isClearable={true}
      isMulti={false} 
      placeholder={"Välj Område"}
      maxMenuHeight={150}
      styles={customStyles}
      
    /> 
    </div>
        

    </div>
  )
}

export default SearchFilter