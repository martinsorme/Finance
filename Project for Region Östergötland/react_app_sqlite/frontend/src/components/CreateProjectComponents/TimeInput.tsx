import { Input } from '@chakra-ui/react';
import React, { CSSProperties, useState, useEffect} from 'react';

type Props = {header : string, onDateChange: (day: string, month: string, year: string) => void;
}; 

const TimeInput = ({header, onDateChange}: Props) => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const selectStyle : CSSProperties= { display: "flex", backgroundColor: "#E5F0F8", marginRight: "20px", borderRadius:"10px", width:"125px", padding:"5px"}
  

  useEffect(() => {
    onDateChange(day, month, year);
    if (header === "Start") {
      const currDate = new Date().toISOString().split("T")[0];
      setYear(currDate.substring(0, 4));
      setMonth(currDate.substring(5, 7));
      setDay(currDate.substring(8, 10));
    }
  }, [day, month, year, onDateChange]);
  
  const fixDates = async (date: string) => {
    if (date.length !== 0 ){
      setYear(date.substring(0, 4));
      setMonth(date.substring(5, 7));
      setDay(date.substring(8, 10));
    }


  }

  return (
    <div style={{ display: "flex", flexDirection: "row", marginTop: "15px", marginLeft: "70px", alignItems: "center" }}>
      <h3 style={{ fontSize: "17px", width: "100px", marginTop: "5px", fontWeight: "bold" }}>{header}</h3>
      <Input style={selectStyle} flex={1} defaultValue={header === "Start" ? new Date().toISOString().split("T")[0] : ""} size="md" type="date" onChange={(e) => fixDates(e.target.value)} />
    </div>
  );
}

export default TimeInput




