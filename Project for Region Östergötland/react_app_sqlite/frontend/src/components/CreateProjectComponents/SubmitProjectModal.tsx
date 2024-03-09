import React, {CSSProperties, useState} from 'react'
import { useNavigate } from "react-router-dom";
import { Button } from '@chakra-ui/react';
import { Measurement } from '../../Types';
import Popup from "../Popup";
import {BASE_URL} from "../../Constants";

type Props = {t : string, c : { value: number; label: string }[], i: string, d: string, r: string, 
            team_leader : { value: number; label: string }[], u : { value: number; label: string }[]
            start : string, end : string, project_id : number, measure : Measurement,
            changeInvalidInput: (value: boolean) =>  void
          }


const SubmitProjectModal = ({t, c, i, d, r, team_leader, u, start, end, measure, project_id, changeInvalidInput}: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFaultModalOpen, setIsFaultModalOpen] = useState(false);
    const [isproject, setisproject] = useState(project_id);
    const [faultModalDescription, setFaultModalDescription] = useState("");

    const navigate = useNavigate();

    const openModal = () => {
      setIsModalOpen(true);
    };

    const openFaultModal = (description : string) => {
      setIsFaultModalOpen(true);
      setFaultModalDescription(description);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };

    const handleButton1Click = () => {
      setIsFaultModalOpen(false);
    };

    const modalStyles: CSSProperties= {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    };
     //////////////////////////////// Add teamleader to project  ///////////////////////////////////////////////////
     const addTeam = async (projectID: number, userID : number, r: string) => {
      try {
        const response = await fetch(`${BASE_URL}/add_user_to_project/${projectID}/${userID}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ role: r }),
        });
  
        if (response.ok) {
          console.log("added user to team"); 
        } else {
          
         alert('Fill all the information');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    //////////////////////////////// Add project to database ///////////////////////////////////////////////////
    const handleSubmit = async () => {

      const category: number[] = c.map((category) => category.value);

      try {
        const response = await fetch(`${BASE_URL}/project/${project_id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          //Add correct creator ID 
          body: JSON.stringify({title : t, categories : category , importance : i, requirements : r,
                            startTime : start, deadline : end, difference : d, status:"P"}),
        });
  
        if (response.ok) {
          const data = await response.json();
          setisproject(project_id) 
          addMetric();


          addTeam(project_id, team_leader[0].value, "Team-Leader"); 
          for (const user of u){
            addTeam(project_id, user.value, "Team-Member"); 
          }
          
        } else {
          
          alert('Fill all the information');
        }
      } catch (error) {
       
        console.error('Error:', error);
      }
    };
  
  // Adds metric to database 
  const addMetric = async () => {
    if (measure.measurementId === -1) {
        try {
          const response = await fetch(`${BASE_URL}/add_new_measurement/${project_id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...measure }),
          });
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          } else if (response.ok) {
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
    } else {
      try {
          const response = await fetch(`${BASE_URL}/measurement/${measure.measurementId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({                     
              name: measure.name,
              unit: measure.unit,
              frequencyAmount: measure.frequencyAmount,
              frequencyInterval: measure.frequencyInterval,
              project: measure.project_id,}),
          });
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          } else if (response.ok) {
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
    };
  };

    //////////////////////////////////////////////////////////////////////////

    const handleClick = () => { 
      if (t === "" || i === "" || d === "" || r === "" ) {
        changeInvalidInput(true);
        openFaultModal("Vänligen fyll i alla fält med en *"); 
      } else if (c.length === 0){
        openFaultModal("Vänligen kontrollera att fyllt i minst en kategori."); 
      } else if (team_leader.length === 0) {
        openFaultModal("Vänligen välj en teamleader."); 
      } else if ((measure.name.length !== 0 && (measure.unit.length === 0 || measure.frequencyAmount === undefined || measure.frequencyInterval.length === 0)) || (measure.name.length === 0 && (measure.unit.length !== 0 || measure.frequencyAmount !== undefined || measure.frequencyInterval.length !== 0))) {
        openFaultModal("Om du vill lägga till ett utfallsmått behöver du fylla i vad du ska mäta, hur ofta det ska mätas samt måttenhet.");
      } else {
        handleSubmit();
        openModal();
      }
  };
  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "70px" }}>
        <Button variant={'greenButton'} w={'170px'} h={'45px'} whiteSpace={'break-spaces'} fontSize={'14px'} marginRight={'15px'} onClick={handleClick}>Påbörja förbättringsarbetet</Button>
      </div>
      {isModalOpen && (
        <div style={modalStyles}>
          <div style={{ background: "#E5EFF8", display: "flex", flexDirection: "column", height: "150px", width: "400px", borderRadius: "8px" }}>
            <div style={{ backgroundColor: "#CEE2F2", width: "400px", textAlign: "center", fontSize: "13px", height: "50px", borderRadius: "8px 8px 0px 0px" }}>
              <h3 style={{ marginTop: "10px", textAlign: "center" }}>Förbättringsarbetet är igång!</h3>
            </div>
            <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", backgroundColor: "#E5EFF8", width: "400px", height: "100px", alignItems: "center", borderRadius: "0 0 8px 8px" }}>
              Du kan nu påbörja arbetet med ditt förbättringsarbete!
              <div style={{ display: "flex", flexDirection: "row", width: "400px", justifyContent: "center", marginTop: "20px" }}>
                <button
                  style={{ backgroundColor: "#182745", color: "white", fontSize: "12px", fontWeight: "bold", height: "28px", width: "100px", marginRight: "30px", borderRadius: "5px" }}
                  onClick={() => {
                    closeModal();
                    navigate("/");
                  }}
                >
                  {" "}
                  Tillbaka Hem
                </button>

                <button
                  style={{ backgroundColor: "#B9D87A", color: "white", fontSize: "12px", fontWeight: "bold", height: "28px", width: "100px", borderRadius: "5px" }}
                  onClick={() => {
                    closeModal();
                    navigate("/forbattringsarbete/" + isproject + "/overblick");
                  }}
                >
                  Fortsätt arbeta
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Popup
        title="Kontrollera att du fyllt i alla obligatoriska fält!"
        description={`${faultModalDescription}`}
        isOpen={isFaultModalOpen}
        onClose={() => {
          setIsFaultModalOpen(false);
        }}
        onButton1Click={handleButton1Click}
        button1Text="Okej"
      />
    </>
  );
}

export default SubmitProjectModal