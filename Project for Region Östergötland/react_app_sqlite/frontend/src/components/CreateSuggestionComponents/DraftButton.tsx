import React, { useState } from "react";
import { Text } from "@chakra-ui/react";
import { Icon } from "@iconify/react";

type Props = {
  id: number;
  name: string;
  isSelected: boolean;
  onClick: (id: number) => void;
  icon?: string;
};

const Draft = ({ id, name, isSelected, onClick, icon }: Props) => {
  const handleClick = () => {
    onClick(id);
  };

  const style = {
    width: "100%",
    height: "60px",
    backgroundColor: isSelected ? "var(--lightblue)" : "initial",
    boxShadow: isSelected ? "0px 5px 8px -8px" : "initial",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  };
  return (
    <div style={style} onClick={handleClick}>
      {icon && (
        <Icon
          icon={icon}
          color="#182745"
          width="25"
          style={{ marginLeft: "4%" }}
        />
      )}
      <Text
        marginLeft={icon ? "10px" : "20px"}
        fontSize="xl"
        marginBottom={"5px"}
        color={icon && name === "Nytt förslag" ? "rgba(24,39,69,0.5)" : ""}
      >
        {name}
      </Text>
    </div>
  );
};

export default Draft;
