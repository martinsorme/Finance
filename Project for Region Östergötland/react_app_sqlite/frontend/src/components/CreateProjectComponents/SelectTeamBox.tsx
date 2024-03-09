import React, { useState, useEffect } from 'react';
import Select, { StylesConfig } from 'react-select';
import { User } from '../../Types';
import {BASE_URL} from "../../Constants";

const customStyles: StylesConfig = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: '#E5F0F8',
  }),
};

type Props = {
  header: string;
  fade: string;
  multiple: boolean;
  onSelectedUsersChange: (selectedUsers: { value: number; label: string; role: string }[]) => void;
  v : {value: number, label: string }[]; 
  disable : boolean,

};

const SelectTeamBox = ({ v, onSelectedUsersChange, header, fade, multiple, disable }: Props) => {
  
  const [userNames, setUserNames] = useState<{ value: number; label: string }[]>([]);
  const [users, setUsers] = useState<{ value: number; label: string }[]>([]);

  //Get all users 
  useEffect(() => {
    const fetchData = async () => {
      try {
          const response = await fetch(`${BASE_URL}/get_all_users`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }});
        const data = await response.json();

        const names = data.map((user: User) => ({
          value: user.userId,
          label: user.name,
        }));
        setUserNames(names);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  //Handels selected users, if multiple = True you can add severak users 
  const handleSelectedChange = (selectedOption: any) => {
    if (selectedOption !== null && typeof selectedOption !== 'undefined') {
      if(multiple) {
        onSelectedUsersChange([...users, ...selectedOption]);
      } else{
        onSelectedUsersChange([{ value: selectedOption.value as number, label: selectedOption.label as string, role: selectedOption.role as string }]);
      }
    } else {
      onSelectedUsersChange([]);

    }
  };


  return (
    <div style={{ width: '520px', marginLeft: '50px', marginTop: '20px', display: 'flex', flexDirection: 'column', cursor: disable ? 'not-allowed' : 'default' }}>
      <h3 style={{ fontSize: '17px', width: '400px', marginTop: '5px', fontWeight: 'bold' }}>{header}</h3>
  
      {v.length === 0 ? (
        // Render this when v is an empty array
        <Select
          styles={customStyles}
          options={userNames}
          isSearchable={true}
          isClearable={true}
          isMulti={multiple}
          placeholder={fade}
          maxMenuHeight={150}
          onChange={handleSelectedChange}
          isDisabled={disable}
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
              neutral5: 'var(--darkblue)',
            },
          })}
        />
      ) : (
        // Render this when v is not an empty array
        <Select
          styles={customStyles}
          options={userNames}
          isSearchable={true}
          isClearable={true}
          isMulti={multiple}
          placeholder={fade}
          maxMenuHeight={150}
          value={v}
          onChange={handleSelectedChange}
          isDisabled={disable}
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
      )}
    </div>
  );
      }
  

export default SelectTeamBox;
