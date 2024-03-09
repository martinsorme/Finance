import React, { useState, useEffect, CSSProperties } from 'react'
import SelectTeamBox from './SelectTeamBox'
import InputSingelProject from './InputSingelProject'
import InputTextProject from './InputTextProject'
import TimeInput from './TimeInput'
import SubmitProjectModal from './SubmitProjectModal'
import InputUnitMeasure from './InputUnitMeasure'
import InputCategory from './InputCategory'
import { useNavigate, useLocation } from 'react-router-dom'
import { Category, Measurement } from '../../Types'
import {BASE_URL} from "../../Constants";
import { Button } from '@chakra-ui/react'
import { first } from 'lodash'

type Props = {}

const InputRightProject = (props: Props) => {
  const navigate = useNavigate(); 
  const {state} = useLocation();
  const projectId = state.id;
  //set users variable (team-members)
  const [selectedUsers, setSelectedUsers] = useState<{ value: number; label: string }[]>([]);
  //set users variable (team-leader)
  const [selectedTeamLeader, setSelectedTeamLeader] = useState<{ value: number; label: string; role : string }[]>([]);
  const [isSaveModalOpen, setIsModalOpen] = useState(false);
  const [titelValue, setTitelValue] = useState("");
  const [importanceValue, setImportanceValue] = useState("");
  const [differenceValue, setdifferenceValue] = useState("");
  const [requermentsValue, setrequermentsValue] = useState("");
  const defaultMeasurement: Measurement = { name: "", unit: "", frequencyAmount: undefined, frequencyInterval: "", project_id: projectId, measurementId: -1 };
  const [newMetric, setNewMetric] = useState<Measurement>(defaultMeasurement);
  const [invalidInput, setInvalidInput] = useState(false);
  const auth = JSON.parse(sessionStorage.getItem("auth") + "");
  
  //set team members  function 
  const handleSelectedUsersChange = (newSelectedUsers: { value: number; label: string }[]) => {
  // Identify users to be added (not already in selectedUsers)
  const usersToAdd = newSelectedUsers.filter(
    (user) => !selectedUsers.some((existingUser) => existingUser.value === user.value)
  );
  
  // Identify users to be removed (present in selectedUsers but not in newSelectedUsers)
  const usersToRemove = selectedUsers.filter(
    (existingUser) => !newSelectedUsers.some((user) => user.value === existingUser.value)
  );
  
  // Update selectedUsers by removing usersToRemove and adding usersToAdd
  setSelectedUsers([...selectedUsers.filter((user) => !usersToRemove.includes(user)), ...usersToAdd]);
  };
  //set team leaders function 
  const handleSelectedTeamleaderChange = (newSelectedUsers: { value: number; label: string, role: string }[]) => {
    setSelectedTeamLeader(newSelectedUsers);
  
  };
  const [selectedCategories, setSelectedCategories] = useState<{ value: number; label: string }[]>([]);
  //set team members  function 
  const handleSelectedcategoriesChange = (newSelectedCategory: { value: number; label: string }[]) => {
    setSelectedCategories(newSelectedCategory);
  };

  const modalStyles: CSSProperties = {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  
  //Get all users 
  const fetchUser = async (user_id: number) => {
    let token = JSON.parse(sessionStorage.getItem('auth') + "").token
    try {
      const response = await fetch(`${BASE_URL}/user/${user_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token,
        },
      });

      const data = await response.json();
      if(response.ok){
        handleSelectedTeamleaderChange([{ value: data[0].userId, label: data[0].name, role: data[0].role }]);
       
      }
    }
    catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  //////////////////////////////// Add project to database ///////////////////////////////////////////////////
  
  const postDraft = async () => {
      let token = JSON.parse(sessionStorage.getItem("auth") + "").token;

    const category: number[] = selectedCategories.map((category) => category.value);
    
        const requestOptions = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            title: titelValue,
            deadline: selectedsend,
            startTime: selectedstart,
            importance: importanceValue,
            difference: differenceValue,
            requirements: requermentsValue,
            categories: category,
          }),
        };
    try {
          const response = await fetch(`${BASE_URL}/project/` + projectId, requestOptions);
          if (response.ok) {
            if (newMetric.name.length != 0) {
              let _method = null;
              let _response = null;
              let _body = null;
              if (newMetric.measurementId != -1) {
                _method = "PUT"
                _response = `${BASE_URL}/measurement/${newMetric.measurementId}`;
                _body = JSON.stringify({
                    name: newMetric.name,
                    unit: newMetric.unit,
                    frequencyAmount: newMetric.frequencyAmount,
                    frequencyInterval: newMetric.frequencyInterval,
                    project: newMetric.project_id,
                  })
              } else {
                newMetric.frequencyAmount = newMetric.frequencyAmount !== undefined ? newMetric.frequencyAmount : 0;
                _method = "POST"
                _response = `${BASE_URL}/add_new_measurement/${projectId}`;
                _body = JSON.stringify({
                  name: newMetric.name,
                  unit: newMetric.unit,
                  frequencyAmount: newMetric.frequencyAmount,
                  frequencyInterval: newMetric.frequencyInterval,
                  project: newMetric.project_id,});
              }
              try {
                const response = await fetch(_response, {
                  method: _method,
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: _body,
                });
                if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
                } else if (response.ok) {
                  const firstMeasurement = await response.json();
                  setNewMetric(firstMeasurement);
                }
              } catch (error) {
                console.error("Error fetching data:", error);
              }
            }
            openModal();
          } else {
            alert("something went wrong");
          }
        } catch (error) {
          console.error("Error", error);
        }
  };

  ////////////////////////////// Fetch project //////////////////////////////////////
  const fetchProject = async (projectId: number) => {
    let token = JSON.parse(sessionStorage.getItem('auth') + "").token
    try {
      const response = await fetch(`${BASE_URL}/project/${projectId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token,
        },
      });

      const data = await response.json();
      if(response.ok){
        setTitelValue(data.title)
        setImportanceValue(data.importance)
        setdifferenceValue(data.difference)
        setrequermentsValue(data.requirements)
        const categories = data.categories.map((category: Category) => ({
          value: category.categoryId,
          label: category.categoryName,
        }));
        setSelectedCategories(categories);
        getMeasurement();
        
        fetchUser(data.creator_id)

      }
    }
    catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const getMeasurement = async () => {
    let token = JSON.parse(sessionStorage.getItem("auth") + "").token;
    try {
      const response = await fetch(`${BASE_URL}/get_all_measurements/${projectId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (response.ok) {
        const data = await response.json();
        
        if (data.length > 0) {
          if ("frequencyAmount" in data[0]) {
            const firstMeasurement = data[0];
            if (firstMeasurement.frequencyInterval === 60) {
              firstMeasurement.frequencyInterval = 1;
            } else if (firstMeasurement.frequencyInterval === 3600) {
              firstMeasurement.frequencyInterval = 2;
            } else if (firstMeasurement.frequencyInterval === 86400) {
              firstMeasurement.frequencyInterval = 3;
            } else if (firstMeasurement.frequencyInterval === 604800) {
              firstMeasurement.frequencyInterval = 4;
            } else if (firstMeasurement.frequencyInterval === 2592000) {
              firstMeasurement.frequencyInterval = 5;
            } else if (firstMeasurement.frequencyInterval === 31536000) {
              firstMeasurement.frequencyInterval = 6;
            } else {
              firstMeasurement.frequencyInterval = "";
            }
             setNewMetric(firstMeasurement);
          }
        } else {
          // Handle the case where 'frequencyAmount' is not defined
          console.error("Measurement data is empty or 'frequencyAmount' is not defined.");
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }


  //////////////////////////////////////////////////////////////////////////
  //Start variables 
  const [selectedstart, setSelectedstart] = useState('')
  //end  variables 
  const [selectedsend, setSelectedend] = useState('')
  //set start function 
  const handleStartDateChange = (day : string, month : string, year: string) => {
    if (day.length === 0 || month.length === 0|| year.length === 0){
      setSelectedstart('inget datum')
    } else { 
      setSelectedstart(year+'-' + month+'-'+ day + ' 12:00:00')
    }
  };
  //set end function 
  const handleEndDateChange = (day : string, month : string, year: string) => {
    if (day.length === 0 || month.length === 0|| year.length === 0){
      setSelectedend('inget datum')
    } else {
      
    setSelectedend(year+'-' + month+'-'+ day + ' 12:00:00')
    }
  };

  useEffect(() => { 
    if (projectId !== undefined){
      fetchProject(projectId);
    }
  }, []);
   
  return (
    <div style={{ flexDirection: "column", display: "flex" }}>
      <div style={{ display: "flex", justifyContent: "flex-end", marginRight: "20px", marginTop: "40px" }}>
        <button style={{ backgroundColor: "#182745", color: "white", width: "170px", height: "40px", borderRadius: "10px", fontSize: "15px" }} onClick={postDraft}>
          Spara Utkast
        </button>
      </div>
      <InputSingelProject invalidInput={invalidInput} input={setTitelValue} inputValue={titelValue} subject={"Titel *"} fade={"Namnge din idé här..."} />
      <InputCategory header={"Kategori *"} categoriesValue={selectedCategories} onSelectedCategoriesChange={handleSelectedcategoriesChange} />
      <InputTextProject invalidInput={invalidInput} input={setImportanceValue} inputValue={importanceValue} subject={"Varför är den här idén viktig? *"} fade={"Den här frågan är viktig för att..."} height="200px" />
      <InputTextProject invalidInput={invalidInput} input={setdifferenceValue} inputValue={differenceValue} subject={"Hur skulle den gör skillnad för patienten? *"} fade={"Den skulle göra skillnad för att..."} height="100px" />
      <InputTextProject invalidInput={invalidInput} input={setrequermentsValue} inputValue={requermentsValue} subject={"Vad krävs för att genomföra den? *"} fade={"Det krävs att..."} height="200px" />
      <InputUnitMeasure onChange={setNewMetric} newMetric={newMetric} />
      <h3 style={{ marginLeft: "15px", fontSize: "20px", width: "150px", marginTop: "50px", fontWeight: "bold" }}>Tidsplan</h3>
      <TimeInput onDateChange={handleStartDateChange} header={"Start"} />
      <TimeInput onDateChange={handleEndDateChange} header={"Slut"} />
      <h3 style={{ marginLeft: "15px", fontSize: "20px", width: "150px", marginTop: "50px", fontWeight: "bold" }}>Medlemmar</h3>
      <SelectTeamBox v={selectedTeamLeader} onSelectedUsersChange={handleSelectedTeamleaderChange} header={"Välj Teamleader *"} fade={"Välj en Teamleader"} multiple={false} disable={auth.role === "User"} />
      <SelectTeamBox v={[]} onSelectedUsersChange={handleSelectedUsersChange} header={"Lägg till medlemmar"} fade={"Lägg till medlemmar"} multiple={true} disable={false} />
      <SubmitProjectModal t={titelValue} c={selectedCategories} i={importanceValue} d={differenceValue} r={requermentsValue} team_leader={selectedTeamLeader} measure={newMetric} u={selectedUsers} start={selectedstart} end={selectedsend} project_id={projectId} changeInvalidInput={setInvalidInput} />
      {isSaveModalOpen && (
        <div style={modalStyles}>
          <div style={{ background: "#E5EFF8", display: "flex", flexDirection: "column", height: "150px", width: "400px", borderRadius: "8px" }}>
            <div style={{ backgroundColor: "#CEE2F2", width: "400px", textAlign: "center", fontSize: "13px", height: "50px", borderRadius: "8px 8px 0px 0px" }}>
              <h3 style={{ marginTop: "10px", textAlign: "center" }}>Förbättringsarbetet är sparat!</h3>
            </div>
            <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", backgroundColor: "#E5EFF8", width: "400px", height: "100px", alignItems: "center", borderRadius: "0 0 8px 8px" }}>
              Ditt arbete är nu sparat!
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
                  }}
                >
                  Fortsätt arbeta
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InputRightProject