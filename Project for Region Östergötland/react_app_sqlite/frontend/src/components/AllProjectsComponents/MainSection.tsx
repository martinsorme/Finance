import React, { useEffect, useState } from 'react'
import Select, { StylesConfig } from 'react-select';
import { Badge, Flex, UnorderedList, ListItem } from '@chakra-ui/react'
import { Category, Project, User, ProjectStatus, Suggestion } from '../../Types';
import { useNavigate } from "react-router-dom";
import {BASE_URL} from "../../Constants";

const customStyles: StylesConfig = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: '#E5F0F8',
    width: "350px"
  }),
};
const Projectstatus = [{value: 1, label: "Förslag"}, {value: 2, label: "Pågående"}, {value: 3, label: "Avslutade"}]
const Units = [{ value: 1, label: 'Akutkliniken US' },{ value: 2, label: 'Akutkliniken ViN' },{ value: 3, label: 'Geriatriska kliniken VIN' },{ value: 4, label: 'Allergicentrum' },
  { value: 5, label: 'Allmänmedicinskt utbildningscentrum' },{ value: 6, label: 'Barnhälsovården' },{ value: 7, label: 'Anopiva US' },
  { value: 8, label: 'Anopiva VIN' },{ value: 9, label: 'Arbets- och miljömedicin' },{ value: 10, label: 'Barn- och ungdomskliniken i Norrköping' },
  { value: 11, label: 'Barn- och ungdomshälsan' },{ value: 12, label: 'Barn- och ungdomspsykiatriska kliniken US' }, { value: 13, label: 'Barn- och ungdomspsykiatriska kliniken VIN' },
  { value: 14, label: 'Bild- och funktionsmedicin: Fysiologiska kliniken Norrköping' }, { value: 15, label: 'Cancer- och lungsjukvårdsenheten' },
  { value: 16, label: 'Dagkirurgin CKOC Linköping' },{ value: 17, label: 'Dagkirurgin CKOC Norrköping' }, { value: 18, label: 'Digitala Vårdcentralen' },
  { value: 19, label: 'Endokrinmedicinska kliniken' }, { value: 20, label: 'Enheten för samordnad cancerutredning' }, { value: 21, label: 'Flyktingmedicinskt centrum' },
  { value: 22, label: 'Fysiologiska kliniken US' },
  { value: 23, label: 'H.K.H. Kronprinsessan Victorias barn- och ungdomssjukhus' },
  { value: 24, label: 'Habiliteringen' },
  { value: 25, label: 'Hand- och plastikkirurgiska kliniken' },
  { value: 26, label: 'Hematologiska kliniken Kirurgiska kliniken US' },
  { value: 27, label: 'Hjärtverksamhetens sekretariat' },
  { value: 28, label: 'Hudkliniken' },
  { value: 29, label: 'Infektionskliniken' },
  { value: 30, label: 'Kardiologiska kliniken US' },
  { value: 31, label: 'Kardiologiska kliniken VIN' },
  { value: 32, label: 'Kirurgiska kliniken ViN' },
  { value: 33, label: 'Klinisk immunologi och transfusionsmedicin' },
  { value: 34, label: 'Klinisk kemi' },
  { value: 35, label: 'Klinisk mikrobiologi' },
  { value: 36, label: 'Klinisk patologi' },
  { value: 37, label: 'Kvinnokliniken i Linköping' },
  { value: 38, label: 'Kvinnokliniken i Norrköping' },
  { value: 39, label: 'Käkkliniken Neurofysiologiska kliniken' },
  { value: 40, label: 'Laboratoriemedicin' },
  { value: 41, label: 'Laboratoriemedicin sjukhus' },
  { value: 42, label: 'LAH i Norrköping' },
  { value: 43, label: 'Lungmedicinska kliniken' },
  { value: 44, label: 'Mag-tarmmedicinska' },
  { value: 45, label: 'Medicinkliniken ViN Rehab Öst' },
  { value: 46, label: 'Medicinsk strålningsfysik Röntgenkliniken Linköping Röntgenkliniken Motala Röntgenkliniken Norrköping Laboratoriemedicin: Klinisk farmakologi Klinisk genetik' },
  { value: 47, label: 'Medicinska och geriatriska akutkliniken' },
  { value: 48, label: 'Medicinska specialistkliniken Rehab väst' },
  { value: 49, label: 'Neurokirurgiska kliniken Neurologiska kliniken Rehabiliterings- medicinska kliniken' },
  { value: 50, label: 'Njurmedicinska kliniken' },
  { value: 51, label: 'Närvårdskliniken Linköping Resurs och kompetens Rörelse och hälsa' },
  { value: 52, label: 'Onkologiska kliniken' },
  { value: 53, label: 'Ortopediska kliniken US' },
  { value: 54, label: 'Ortopediska kliniken VIN' },
  { value: 55, label: 'Urologiska kliniken' },
  { value: 56, label: 'Patientnära' },
  { value: 57, label: 'Precisionsmedicinskt' },
  { value: 58, label: 'Psykiatriska kliniken i Linköping' },
  { value: 59, label: 'Psykiatriska kliniken i Motala-Mjölby' },
  { value: 60, label: 'Psykiatriska kliniken i Norrköping' },
  { value: 61, label: 'Rehabenheten Reumatologiska kliniken' },
  { value: 62, label: 'Rättspsykiatriska regionkliniken' },
  { value: 63, label: 'Smärt- och rehabiliteringscentrum' },
  { value: 64, label: 'Thorax-kärlkliniken' },
  { value: 65, label: 'Vaccinationskliniken' },
  { value: 66, label: 'Vårdcentrum Finspång Vårdcentraler och jourcentraler' },
  { value: 67, label: 'Ögonkliniken' },
  { value: 68, label: 'Öron-, näs- och halskliniken' },
  { value: 69, label: '1177' },
];


type Props = {}

const MainSection = (props: Props) => {
  const navigate = useNavigate();
  const [categoryNames, setCategoryNames] = useState<{ value: number; label: string }[]>([]);
  //Handels which categories to filer data 
  const [selectedCategories, setSelectedCategories] = React.useState<{ value: number; label: string }[]>([]);
  const [projects, setProjects] = React.useState<{project : Project, creator : User, status : string}[]>([])
  //Handels which project to display to the right on the screen 
  const [showProject, setShowProject] = React.useState<{ project: Project; creator : User, status : string} | null>(null);
  const [suggestions, setSuggestions] = React.useState<{suggestion : Suggestion, creator : User, status : string}[]>([])
  //Handels which project to display to the right on the screen 
  const [showSuggestion, setShowSuggestion] = React.useState<{suggestion : Suggestion, creator : User, status : string} | null>(null);
  const [tempUser, settempUser] = React.useState<{ project: Project } | null>(null);
  //Handels which units to filer data 
  const [selectedunits, setselectedUnits] = React.useState<{ value: number; label: string }[]>([]);
  
  let name = JSON.parse(sessionStorage.getItem("auth") + "").unit;

   //If a project is selected another color is returned
  const getColor = (project : Project) => {
    if (showProject !== null && project === showProject.project) {
        return "#C2DCED"
    }
    return "#F2F9FB"
  }
  //If a suggestion is selected another color is returned
  const getColor1 = (suggestion : Suggestion) => {
    if (showSuggestion !== null && suggestion === showSuggestion.suggestion) {
        return "#C2DCED"
    }
    return "#F2F9FB"
  }
  //Return creator name and jobtitle of creator 
  const getText = (creator : User) => {
    return "Från: " + creator.name + " (" + creator.jobTitle + ")"; 
  }

  const getStatus = (projectStatus : string, status : string) =>{
    if (status === "Avslutade"){
      return "Avslutad"
    }else if (projectStatus === "P"){
      return "Planering"
    }else if (projectStatus === "G"){
      return "Göra"
    }else if (projectStatus === "S"){
      return "Studera"
    }else {
      return "Agera"
    }
  }
  //If create project from suggestion 
  const CreateProject = async (suggestion : Suggestion) => {
    
    let _method = "PUT";
    const requestOptions = {
      method: _method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + JSON.parse(sessionStorage.getItem("auth") + "").token,
      },
      body: JSON.stringify({
        title: suggestion.name,
        categories: suggestion.categories,
        descriptionImportance: suggestion.importanceDescription,
        descriptionImpact: suggestion.descriptionImpact,
        descriptionRequirements: suggestion.requirementsDescription,
        suggestionId: suggestion.suggestionId,
        status: "Archived",
      }),
    };
    try {
      const response = await fetch(`${BASE_URL}/start_project_from_suggestion`,
        requestOptions
      );
      const data = await response.json();
      if (response.ok) {
        navigate("/skapaforbattringsarbete", { state: { id: data.projectId } }); // Navigate to the CreateProject
      } else {
        alert("something went wrong");
      }
    } catch (error) {
      console.error("Error", error);
    }
  };
  //Get creator of the specific project 
  const getCreator = async (user_id : number) => {
    try {
        const response = await fetch(`${BASE_URL}/user/${user_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }});
      const data = await response.json();

      return data
    } catch (error) {
      console.error('Error:', error);
      return ""
    }
  };

  //Fetch all categories 
  useEffect(() => {
    const fetchCategories = async () => {
      try {
          const response = await fetch(BASE_URL + '/get_all_categories', {
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

    fetchCategories();
  }, []);


  //get all projects 
  useEffect(() => {
    const fetchData = async () => {
      try {
          const response = await fetch(BASE_URL + '/get_all_projects', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }});
        const data = await response.json();

        const proj = await Promise.all(
          data.map(async (p: Project) => {
            const creator = await getCreator(p.creator_id);
            
            let s : string = "Pågående"
             if (p.status === ProjectStatus.utkast.valueOf()){
               s = "Utkast"
             }
            if (p.status === ProjectStatus.finished.valueOf()){
               s = "Avslutade"
            }
            
            return {
              project: p,
              creator: creator[0],
              status: s 
            };
          })
        );
        setProjects(proj);
        setShowProject(proj[0])
        setShowSuggestion(null)
       
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  //get all suggestions 
  useEffect(() => {
    const fetchData = async () => {
      try {
          const response = await fetch(BASE_URL + '/get_all_published_suggestions', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }});
        const data = await response.json();

        const sug = await Promise.all(
          data.map(async (su: Suggestion) => {
            const creator = await getCreator(su.creator);
            
            
            return {
              suggestion: su,
              creator: creator[0],
              status: "Förslag"
            };
          })
        );
        setSuggestions(sug);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);



  const handleCategoryChange = (selectedOption: any) => {
    if (selectedOption !== null && typeof selectedOption !== 'undefined') {
        setSelectedCategories([...selectedOption]);
    } else {
      setSelectedCategories([]);

    }
  };

  const handleUnitChange = (selectedOption: any) => {
    if (selectedOption !== null && typeof selectedOption !== 'undefined') {
        setselectedUnits([...selectedOption]);
    } else {
      setselectedUnits([]);

    }
  };
  const [inputValue, setInputValue] = useState('');
  const [selectedstatus, setstatus] = useState<{ value: number; label: string }[]>([]);
  

  const handleInputChange = (e :React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSelectedChange = (selectedOption: any) => {
    if (selectedOption !== null && typeof selectedOption !== 'undefined') {
      setstatus([...selectedOption]);
  } else {
     setstatus([]);

  }
};

const handelSetShowSuggestion = (suggestion : Suggestion, creator: User, status :string) => {
  setShowProject(null)
  setShowSuggestion({suggestion, creator, status})

}
const handelSetProject = (project : Project, creator: User, status :string) => {
  setShowSuggestion(null)
  setShowProject({project, creator, status})

}
  
  return (
    <div style={{display: "flex", flexDirection:"row", height:"100%", width:"100%"}}>
      <div style={{display:"flex", flexDirection:"column", marginTop:"15px", marginLeft:"15px", marginRight:"10px"}}>
      <input style={{fontSize:"15px", borderRadius:"15px", backgroundColor: "#E5EFF7", width:"350px", height:"35px", paddingLeft:"20px" }} 
        type="text" placeholder="Sök på ett förbättringsarbete..." value={inputValue} onChange={handleInputChange}>
          </input>
        <div style={{marginTop:"10px"}}>
          <Select styles={customStyles} options={Projectstatus} isSearchable={true} isClearable={true} isMulti={true} placeholder={"Förslag/Pågående/Avslutade"}
            maxMenuHeight={150} onChange={handleSelectedChange}
            theme={theme => ({
              ...theme,
              borderRadius: 15,
              colors: {
                  ...theme.colors,
                neutral50: '#76859b',  // placeholder color
                neutral20: '#d0d7e0', // border color
                neutral10: '#CEE0EE', // menu arrow color
                dangerLight: '#BED5E6', // menu background color
                danger: 'var(--darkblue)',
              },
            })}/>
          
      </div>
      <div style={{marginTop:"10px"}}>
          <Select styles={customStyles} options={categoryNames} isSearchable={true} isClearable={true} isMulti={true} placeholder={"Välj kategori på arbetet"}
            maxMenuHeight={150} onChange={handleCategoryChange}
            theme={theme => ({
              ...theme,
              borderRadius: 15,
              colors: {
                  ...theme.colors,
                neutral50: '#76859b',  // placeholder color
                neutral20: '#d0d7e0', // border color
                neutral10: '#CEE0EE', // menu arrow color
                dangerLight: '#BED5E6', // menu background color
                danger: 'var(--darkblue)',
              },
            })}/>
      </div>
      <div style={{marginTop:"10px"}}>
          <Select styles={customStyles} options={Units} isSearchable={true} isClearable={true} isMulti={true} placeholder={"Välj avdelning på arbetet"}
            maxMenuHeight={150} onChange={handleUnitChange}
            theme={theme => ({
              ...theme,
              borderRadius: 15,
              colors: {
                  ...theme.colors,
                neutral50: '#76859b',  // placeholder color
                neutral20: '#d0d7e0', // border color
                neutral10: '#CEE0EE', // menu arrow color
                dangerLight: '#BED5E6', // menu background color
                danger: 'var(--darkblue)',
              },
            })}/>
      </div>
      <div style={{marginTop:"10px", height:"455px", backgroundColor:"#E5EFF7", borderRadius:"15px", overflowY:"scroll", width:"350px" }}>
      {projects
  .filter(({ project, creator, status }) => {
    const categoryMatches = selectedCategories.length === 0 ? true : selectedCategories.some(category => project.categories.some(cat => cat.categoryName.includes(category.label)));
    const statusMatches = selectedstatus.length === 0 ? true :  selectedstatus.some(selectedstatus => status.includes(selectedstatus.label));
    const titleOrNameMatches = inputValue === "" ? true : project.title.toLowerCase().includes(inputValue.toLowerCase()) || creator.name.toLowerCase().includes(inputValue.toLowerCase());
    //const unitMatches = creator.unit === name || status === "Avslutade"; 
    const UtkastMatches = status !== 'Utkast'; 
    const unit = selectedunits.length === 0 ? true : (creator.unit as string | null) !== null && (creator.unit as string | null) !== undefined ? selectedunits.some((selectedunit) =>
          selectedunit.label !== null && selectedunit.label !== undefined && (creator.unit as string).includes(selectedunit.label)
      )
    : false; 
    return categoryMatches && statusMatches && titleOrNameMatches && UtkastMatches && unit;
    //Returns projects that match the input in search feilds 
  })
  .map(({ project, creator, status }) => (
        <div key={project.projectId} style={{display:"flex", flexDirection:"column", paddingBottom:'20px', borderRadius:"15px", backgroundColor:getColor(project), width:"330px", marginTop:"5px", marginLeft:"10px", overflowY:"scroll"}} onClick={() => handelSetProject(project , creator, status )}>
        <div style={{ fontSize: "20px", marginTop: "18px", marginLeft: "25px" }}> {project.title}</div>
      <Flex>
        <Badge style={{ backgroundColor: status === "Avslutade" ? "rgba(248, 174, 159, 0.5)" : "rgba(160, 199, 227, 0.5)" }} marginLeft={'25px'} fontSize={'0.6em'}>{getStatus(project.status, status)}</Badge>
      </Flex>
        <div style={{fontSize:"12px", marginTop:"2px", marginLeft:"25px"}}> {getText(creator)}</div>
      </div> 
  ))}
  {suggestions
  .filter(({ suggestion, creator, status }) => {
    const categoryMatches = selectedCategories.length === 0 ? true : selectedCategories.some(category => suggestion.categories.some(cat => cat.categoryName.includes(category.label)));
    const statusMatches = selectedstatus.length === 0 ? true :  selectedstatus.some(selectedstatus => status.includes(selectedstatus.label));
    const titleOrNameMatches = inputValue === "" ? true : suggestion.name.toLowerCase().includes(inputValue.toLowerCase()) || creator.name.toLowerCase().includes(inputValue.toLowerCase());
    const unitMatches = creator.unit === name; 
    const unit = selectedunits.length === 0 ? true : (creator.unit as string | null) !== null && (creator.unit as string | null) !== undefined ? selectedunits.some((selectedunit) =>
          selectedunit.label !== null && selectedunit.label !== undefined && (creator.unit as string).includes(selectedunit.label)
      )
    : false;

    return categoryMatches && statusMatches && titleOrNameMatches && unitMatches && unit;
    //Returns suggestions that match the input in search feilds 
  })
  .map(({ suggestion, creator, status }) => (
        <div key={suggestion.suggestionId} style={{display:"flex", flexDirection:"column", paddingBottom:'20px', borderRadius:"15px", backgroundColor:getColor1(suggestion), width:"330px", marginTop:"5px", marginLeft:"10px", overflowY:"scroll"}} onClick={() => handelSetShowSuggestion(suggestion , creator, status )}>
      <div style={{ fontSize: "20px", marginTop: "18px", marginLeft: "25px" }}> {suggestion.name}</div>
      <Flex>
        <Badge bg={'rgba(160, 199, 227, 0.5)'} marginLeft={'25px'} fontSize={'0.6em'}>Förslag</Badge>
      </Flex>
        <div style={{fontSize:"12px", marginTop:"2px", marginLeft:"25px"}}> {getText(creator)}</div>
      </div>
      
       
  ))}
      </div>
      </div>
      <div style ={{display:"flex", width: "93vh", height:"79vh", backgroundColor: "#E5EFF7", marginTop: "15px", marginLeft:"20px", borderRadius:"15px", flexDirection:"column", overflowY:"scroll" }}>
      {showSuggestion && (
 <div>
 <div style={{ display: "flex", fontSize: "25px", fontWeight: "bold", marginTop: "30px", marginLeft: "30px" }}>{showSuggestion.suggestion.name}</div>
 <div style={{ display: "flex", flexDirection: "row" }}>
   <div style={{ display: "flex", fontSize: "15px", fontWeight: "bold", marginTop: "30px", marginLeft: "30px" }}>Sjukhus:</div>
   <div style={{ display: "flex", fontSize: "15px", marginTop: "30px", marginLeft: "5px", width:"250px"  }}>UniversitetsSjukhuset Linköping</div>
   <div style={{ display: "flex", fontSize: "15px", fontWeight: "bold", marginTop: "30px", marginLeft: "15px" }}>Inskickat av:</div>
   <div style={{ display: "flex", fontSize: "15px", marginTop: "30px", marginLeft: "5px", width:"150px" }}>{showSuggestion.creator.name}</div>
 </div>
 <div style={{ display: "flex", flexDirection: "row" }}>
   <div style={{ display: "flex", fontSize: "15px", fontWeight: "bold", marginTop: "10px", marginLeft: "30px" }}>Avdelning:</div>
   <div style={{ display: "flex", fontSize: "15px", marginTop: "10px", marginLeft: "5px", width:"250px" }}>{showSuggestion.creator.unit}</div>
   <div style={{ display: "flex", fontSize: "15px", fontWeight: "bold", marginTop: "10px", marginLeft: "7px" }}>Kontakt:</div>
   <div style={{ display: "flex", fontSize: "15px", marginTop: "10px", marginLeft: "5px", width:"250px" }}>{showSuggestion.creator.email + ", " + showSuggestion.creator.phoneNumber}</div>
   
   </div>
    <div style={{ display: "flex", flexDirection: "row" }}>
   <div style={{width:"300px", flexDirection:"row", display:"flex"}}>
   <div style={{ display: "flex", fontSize: "15px", fontWeight: "bold", marginTop: "10px", marginLeft: "32px" }}>Kategori:</div>
   
   <UnorderedList marginLeft={'5px'} marginTop={'10px'}>
   {showSuggestion.suggestion.categories.map(({ categoryId, categoryName }) => (
     <ListItem>{categoryName}</ListItem>
     ))}
    </UnorderedList> 
   </div>
  
   </div>
 
 <div style={{ display: "flex", flexDirection: "column", marginTop: "20px" }}>
   <div style={{display: "flex", fontSize: "15px", fontWeight: "bold", marginTop: "10px", marginLeft: "30px" }}>Varför är den här idén viktig?</div>
   <div style={{ width: "500px",display: "flex", fontSize: "15px", marginTop: "10px", marginLeft: "30px" }}>{showSuggestion.suggestion.descriptionImportance}</div>
 <div style={{ display: "flex", fontSize: "15px", fontWeight: "bold", marginTop: "10px", marginLeft: "30px" }}>Hur skulle den göra skillnad för patienten?</div>
 <div style={{ width: "500px",display: "flex", fontSize: "15px", marginTop: "10px", marginLeft: "30px" }}>{showSuggestion.suggestion.descriptionImpact}</div>
 <div style={{ display: "flex", fontSize: "15px", fontWeight: "bold", marginTop: "10px", marginLeft: "30px" }}>Vad krävs för att genomföra den?</div>
 <div style={{ width: "500px",display: "flex", fontSize: "15px", marginTop: "10px", marginLeft: "30px" }}>{showSuggestion.suggestion.descriptionRequirements}</div>
 </div>
    <button className="btn btn-primary btn-lg active" role="button" aria-pressed="true" style={{ backgroundColor: "#182745", color: "#182745", display: "flex", alignItems: "center", height: "40px", width: "300px", marginTop: "100px", marginLeft: "200px", marginBottom:"10px" }} onClick={() => CreateProject(showSuggestion.suggestion)}>
  <span style={{ color: "white", fontWeight: "bold", fontSize: "18px", display: "flex" }}>Skapa som Förbättringsarbete</span>
    </button>
  </div>
)}
{showProject && (
  <div>
    <div style={{ display: "flex", fontSize: "25px", fontWeight: "bold", marginTop: "30px", marginLeft: "30px" }}>{showProject.project.title}</div>
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={{ display: "flex", fontSize: "15px", fontWeight: "bold", marginTop: "30px", marginLeft: "30px" }}>Sjukhus:</div>
      <div style={{ display: "flex", fontSize: "15px", marginTop: "30px", marginLeft: "5px", width:"250px"  }}>UniversitetsSjukhuset Linköping</div>
      <div style={{ display: "flex", fontSize: "15px", fontWeight: "bold", marginTop: "30px", marginLeft: "15px" }}>Inskickat av:</div>
      <div style={{ display: "flex", fontSize: "15px", marginTop: "30px", marginLeft: "5px", width:"150px" }}>{showProject.creator.name}</div>
    </div>
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={{ display: "flex", fontSize: "15px", fontWeight: "bold", marginTop: "10px", marginLeft: "30px" }}>Avdelning:</div>
      <div style={{ display: "flex", fontSize: "15px", marginTop: "10px", marginLeft: "5px", width:"250px" }}>{showProject.creator.unit}</div>
      <div style={{ display: "flex", fontSize: "15px", fontWeight: "bold", marginTop: "10px", marginLeft: "7px" }}>Kontakt:</div>
      <div style={{ display: "flex", fontSize: "15px", marginTop: "10px", marginLeft: "5px", width:"250px" }}>{showProject.creator.email + ', ' + showProject.creator.phoneNumber}</div>
      
      </div>
       <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={{width:"300px", flexDirection:"row", display:"flex"}}>
      <div style={{ display: "flex", fontSize: "15px", fontWeight: "bold", marginTop: "10px", marginLeft: "32px" }}>Kategori:</div>
      <UnorderedList marginLeft={'5px'} marginTop={'10px'}>
      {showProject.project.categories.map(({ categoryId, categoryName }) => (
      <ListItem>{categoryName}</ListItem>
      ))}
      </UnorderedList>
      </div>
      <div style={{ display: "flex", fontSize: "15px", fontWeight: "bold", marginTop: "10px", marginLeft: "70px" }}>Status:</div>
      <div style={{ display: "flex", fontSize: "15px", marginTop: "10px", marginLeft: "5px", width:"250px" }}>{getStatus(showProject.project.status, showProject.status)}</div>
     
      </div>
    {showProject.status !== "Avslutade" ? (
    <div style={{ display: "flex", flexDirection: "column", marginTop: "20px" }}>
      <div style={{display: "flex", fontSize: "15px", fontWeight: "bold", marginTop: "10px", marginLeft: "30px" }}>Varför är det här arbetet viktig?</div>
      <div style={{ width: "500px",display: "flex", fontSize: "15px", marginTop: "10px", marginLeft: "30px" }}>{showProject.project.importance}</div>
    <div style={{ display: "flex", fontSize: "15px", fontWeight: "bold", marginTop: "10px", marginLeft: "30px" }}>Hur skulle den göra skillnad för patienten?</div>
    <div style={{ width: "500px",display: "flex", fontSize: "15px", marginTop: "10px", marginLeft: "30px" }}>{showProject.project.difference}</div>
    <div style={{ display: "flex", fontSize: "15px", fontWeight: "bold", marginTop: "10px", marginLeft: "30px" }}>Vad krävs för att genomföra den?</div>
    <div style={{ width: "500px",display: "flex", fontSize: "15px", marginTop: "10px", marginLeft: "30px" }}>{showProject.project.requirements}</div>
    </div>
 
) : (
  <div style={{ display: "flex", flexDirection: "column", marginTop: "20px" }}>
      <div style={{display: "flex", fontSize: "15px", fontWeight: "bold", marginTop: "10px", marginLeft: "30px" }}>Sammanfattning</div>
      <div style={{ width: "500px", display: "flex", fontSize: "15px", marginTop: "10px", marginLeft: "30px" }}>
  {showProject.project.evaluationSummary !== null ? (
    showProject.project.evaluationSummary
  ) : (
    "Detta är ej ifyllt för detta projekt"
  )}
</div>
    <div style={{ display: "flex", fontSize: "15px", fontWeight: "bold", marginTop: "10px", marginLeft: "30px" }}>Skulle du rekomendera andra att genomföra denna förbättring på sin arbetsplats?</div>
    <div style={{ width: "500px", display: "flex", fontSize: "15px", marginTop: "10px", marginLeft: "30px" }}>
  {showProject.project.evaluation !== null ? (
    showProject.project.evaluation
  ) : (
    "Detta är ej ifyllt för detta projekt"
  )}
</div>
    <div style={{ display: "flex", fontSize: "15px", fontWeight: "bold", marginTop: "10px", marginLeft: "30px" }}>Vad vill du skicka med till någon annan som vill genomföra denna förbättring?</div>
    <div style={{ width: "500px", display: "flex", fontSize: "15px", marginTop: "10px", marginLeft: "30px" }}>
  {showProject.project.evaluationExplanation !== null ? (
    showProject.project.evaluationExplanation
  ) : (
    "Detta är ej ifyllt för detta projekt"
  )}
</div>
    </div>

)}
    <a href={`/forbattringsarbete/${showProject?.project.projectId}/overblick`} className="btn btn-primary btn-lg active" role="button" aria-pressed="true" style={{ backgroundColor: "#182745", color: "#182745", display: "flex", alignItems: "center", height: "40px", width: "300px", marginBottom:"10px", marginTop: "30px", marginLeft: "200px" }}>
      <span style={{ color: "white", fontWeight: "bold", fontSize: "18px", display: "flex", marginLeft: "25px" }}>Gå till Förbättringsarbete</span>
    </a>
  </div>
)}
      </div>
      </div>
  )}

export default MainSection