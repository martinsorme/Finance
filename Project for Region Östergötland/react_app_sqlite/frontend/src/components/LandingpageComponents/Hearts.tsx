// Import necessary dependencies
import React from "react";
import { useState } from "react";
import heart from "../../images/icon _Cardiogram.png";
import heartHover from "../../images/icon _Cardiogram_Filled.png";
import { HStack } from "@chakra-ui/react";

// Define the type for the props
type Props = {
  heartClicked: number;
  setHeartClicked: (imageNumber: number) => void;
};

// Define the Hearts component
const Hearts = ({ heartClicked, setHeartClicked }: Props) => {
  // Define the style for the images
  const imageStyle = { cursor: "pointer", marginLeft: "3%", width: "13%" };

  // Create separate states for each image
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [isHovered3, setIsHovered3] = useState(false);
  const [isHovered4, setIsHovered4] = useState(false);
  const [isHovered5, setIsHovered5] = useState(false);

  // Handle mouse enter event
  const handleMouseEnter = (imageNumber: number) => {
    let imageStates = [false, false, false, false, false];
    for (let i = 0; i < heartClicked; i++) {
      imageStates[i] = true;
    }
    for (let i = heartClicked; i < imageNumber; i++) {
      imageStates[i] = true;
    }
    setIsHovered1(imageStates[0]);
    setIsHovered2(imageStates[1]);
    setIsHovered3(imageStates[2]);
    setIsHovered4(imageStates[3]);
    setIsHovered5(imageStates[4]);
  };

  // Handle mouse leave event
  const handleMouseLeave = () => {
    let imageStates = [false, false, false, false, false];
    for (let i = 0; i < heartClicked; i++) {
      imageStates[i] = true;
    }
    setIsHovered1(imageStates[0]);
    setIsHovered2(imageStates[1]);
    setIsHovered3(imageStates[2]);
    setIsHovered4(imageStates[3]);
    setIsHovered5(imageStates[4]);
  };

  // Handle heart click event
  const handleHeartClick = (imageNumber: number) => {
    setHeartClicked(imageNumber);
    let imageStates = [false, false, false, false, false];
    for (let i = 0; i < imageNumber; i++) {
      imageStates[i] = true;
    }
    setIsHovered1(imageStates[0]);
    setIsHovered2(imageStates[1]);
    setIsHovered3(imageStates[2]);
    setIsHovered4(imageStates[3]);
    setIsHovered5(imageStates[4]);
  };

  // Render the Hearts component
  return (
    <HStack margin={2} marginLeft={3} marginTop={5}>
      <img
        src={isHovered1 ? heartHover : heart}
        alt="Heart"
        onMouseEnter={() => handleMouseEnter(1)}
        onMouseLeave={() => handleMouseLeave()}
        onClick={() => handleHeartClick(1)}
        style={imageStyle}
      />
      <img
        src={isHovered2 ? heartHover : heart}
        alt="Heart"
        onMouseEnter={() => handleMouseEnter(2)}
        onMouseLeave={() => handleMouseLeave()}
        onClick={() => handleHeartClick(2)}
        style={imageStyle}
      />
      <img
        src={isHovered3 ? heartHover : heart}
        alt="Heart"
        onMouseEnter={() => handleMouseEnter(3)}
        onMouseLeave={() => handleMouseLeave()}
        onClick={() => handleHeartClick(3)}
        style={imageStyle}
      />
      <img
        src={isHovered4 ? heartHover : heart}
        alt="Heart"
        onMouseEnter={() => handleMouseEnter(4)}
        onMouseLeave={() => handleMouseLeave()}
        onClick={() => handleHeartClick(4)}
        style={imageStyle}
      />
      <img
        src={isHovered5 ? heartHover : heart}
        alt="Heart"
        onMouseEnter={() => handleMouseEnter(5)}
        onMouseLeave={() => handleMouseLeave()}
        onClick={() => handleHeartClick(5)}
        style={imageStyle}
      />
    </HStack>
  );
};

export default Hearts;
