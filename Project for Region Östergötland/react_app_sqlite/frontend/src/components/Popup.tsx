import React from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

// this popup has only support for two buttons 
// determine amount of buttons by passing in the onclick functions and button texts as props
// it is possible to not have any buttons at all by not passing any button props

type PopupProps = {
  title?: string;
  description?: string;
  isOpen: boolean;
  button1Text?: string;
  button2Text?: string;
  linkText?: string;
  onClose: () => void;
  onButton1Click?: () => void; // optional function, of not passed in, button will not be rendered
  onButton2Click?: () => void; // optional function, of not passed in, button will not be rendered
  onLinkClick?: () => void; // optional function, of not passed in, link will not be rendered, used on landingpage to pass in data to create suggestion page
  linkData?: any;
};

const Popup: React.FC<PopupProps> = ({ title = "Sparat", description = "Ditt förslag är sparat!", button1Text = "Tillbaka hem", 
  button2Text = "Fortsätt arbeta", isOpen, onClose, onButton1Click, onButton2Click, linkText, onLinkClick, linkData }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <ModalOverlay />
      <ModalContent background="#E5EFF8" borderRadius="8px">
        {/* title of popover */}
        <ModalHeader background="#CEE2F2" fontSize="10px" height="50px" borderRadius="8px 8px 0px 0px" textAlign="center">
          <h3 style={{ marginTop: "1px", textAlign: "center", marginBottom: "1px" }}>{title}</h3>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody display="flex" flexDirection="column" alignItems="center">
          {/* description text */}
          {description}
          <div style={{ display: "flex", flexDirection: "row", width: "400px", justifyContent: "center", marginTop: "30px" }}>
            {/* button1 */}
            {onButton1Click && <Button
              backgroundColor="#182745"
              color="white"
              fontSize="12px"
              fontWeight="bold"
              height="28px"
              mr={3}
              borderRadius="5px"
              onClick={() => {
                onClose();
                onButton1Click();
              }}
            >
              {button1Text}
            </Button>}
            {/* button2 */}
            {onButton2Click && <Button
              backgroundColor="#B9D87A"
              color="white"
              fontSize="12px"
              fontWeight="bold"
              height="28px"
              borderRadius="5px"
              onClick={() => {
                onClose();
                onButton2Click();
              }}
            >
              {button2Text}
            </Button>}
            {/* link */}
            {linkText && <Link 
              to="/skapaforbattringsforslag" 
              state={{ data: linkData }} 
              className="link"
              onClick={onLinkClick}
              style={{ 
                backgroundColor: "#B9D87A", 
                color: "white", 
                fontSize: "12px", 
                fontWeight: "bold", 
                height: "28px", 
                borderRadius: "5px", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                textDecoration: "none", 
                marginLeft: "10px", 
                padding: "0px 10px",
                
              }}
              >
                {linkText}
            </Link>}
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Popup;



