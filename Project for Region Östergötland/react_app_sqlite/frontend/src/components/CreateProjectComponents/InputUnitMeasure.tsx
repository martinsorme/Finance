import { FormControl, FormLabel, HStack, Input, VStack, Text } from '@chakra-ui/react';
import React, { useState } from 'react'
import Select, { StylesConfig } from "react-select";
import { Measurement } from '../../Types';

type Props = {
  newMetric: Measurement;
  onChange: (updatedMetric: Measurement) => void;
};

// Define the available intervals for measurement
const Intervals = [
  { value: 1, label: "minut" },
  { value: 2, label: "timme" },
  { value: 3, label: "dag" },
  { value: 4, label: "vecka" },
  { value: 5, label: "månad" },
  { value: 6, label: "år" },
];

const InputUnitMeasure = ({newMetric, onChange}: Props) => {
  // Get the value of the frequency amount or set it to an empty string
  const amountValue = newMetric.frequencyAmount === undefined ? "" : newMetric.frequencyAmount;

  // Define the styles for the input and select components
  const inputStyle = {
    paddingLeft: "20px",
    marginLeft: "20px",
    backgroundColor: "#E5EFF7",
    borderRadius: "10px",
    height: "40px",
  };
  const selectStyle: StylesConfig = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#E5EFF7",
      width: "100%",
      minWidth: "180px",
    }),
  };

  // Handle the change of the selected interval
  const handleIntervalChange = (selectedOption: any) => {
    if (selectedOption === null || selectedOption === undefined) return;
    onChange({ ...newMetric, frequencyInterval: selectedOption.label });
  };

  return (
    <div>
      {/* Label for the input */}
      <FormLabel fontSize={"20px"} marginLeft={"20px"} fontWeight={"bold"}>
        Vad och hur vill du mäta under arbetet?
      </FormLabel>

      {/* Input for the metric name */}
      <Input
        style={inputStyle}
        marginLeft={"20px"}
        width={"88%"}
        placeholder="Lägg till ett utfallsmått..."
        value={newMetric.name}
        onChange={(e) => {
          onChange({ ...newMetric, name: e.target.value });
        }}
      />

      {/* Container for the unit measurement */}
      <VStack alignItems={"baseline"}>
        <HStack>
          <FormControl>
            {/* Label for the unit measurement */}
            <FormLabel marginLeft={"20px"} marginTop={"5px"} fontWeight={"bold"}>
              Måttenhet:
            </FormLabel>

            {/* Input for the unit measurement */}
            <Input
              style={inputStyle}
              width={"50%"}
              placeholder="st, min..."
              value={newMetric.unit}
              onChange={(e) => {
                onChange({ ...newMetric, unit: e.target.value });
              }}
            ></Input>
          </FormControl>
        </HStack>

        {/* Container for the measurement frequency */}
        <HStack alignItems={"end"}>
          <FormControl marginRight={"30px"}>
            {/* Label for the measurement frequency */}
            <FormLabel marginLeft={"20px"} fontWeight={"bold"}>
              Mätfrekvens
            </FormLabel>

            {/* Input for the measurement frequency amount */}
            <HStack>
              <Input
                placeholder="1, 10..."
                style={inputStyle}
                width={"50%"}
                value={amountValue}
                onChange={(e) => {
                  if (isNaN(parseInt(e.target.value))) {
                    onChange({ ...newMetric, frequencyAmount: undefined });
                  } else {
                    onChange({ ...newMetric, frequencyAmount: parseInt(e.target.value) });
                  }
                }}
              ></Input>

              {/* Text for "gång(er) varje" */}
              <Text whiteSpace={"nowrap"} width={"50%"} fontWeight={"bold"} marginBottom={0}>
                gång(er) varje
              </Text>

              {/* Select for the measurement frequency interval */}
              <Select
                styles={selectStyle}
                options={Intervals}
                isSearchable={true}
                isClearable={true}
                isMulti={false}
                placeholder={"dag, vecka..."}
                value={Intervals[parseInt(newMetric.frequencyInterval)-1]}
                onChange={handleIntervalChange}
                maxMenuHeight={150}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 10,
                  colors: {
                    ...theme.colors,
                    primary: "var(--darkblue)",
                    neutral50: "#76859b", // placeholder color
                    neutral20: "#d0d7e0", // border color
                    neutral10: "#CEE0EE", // menu arrow color
                    dangerLight: "#BED5E6", // menu background color
                    danger: "var(--darkblue)",
                  },
                })}
              />
            </HStack>
          </FormControl>
        </HStack>
      </VStack>
    </div>
  );
}

export default InputUnitMeasure