import React, { useEffect, useState } from "react";
//import logo from './logo.svg';
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar";
import IdeaForum from "./pages/IdeaForum";
import CreateSuggestion from "./pages/CreateSuggestion";
import CreateProject from "./pages/CreateProject";
import ProjectPage from "./pages/ProjectPage";
import MyProjectsPage from "./pages/MyProjectsPage";
import { stringify } from "querystring";
import ProjectOverview from "./components/ProjectComponents/ProjectOverview";
import ProjectDetails from "./components/ProjectComponents/ProjectDetails";
import ProjectLogbook from "./components/ProjectComponents/ProjectLogbook";
import ProjectResult from "./components/ProjectComponents/ProjectResult";
import AllProjectsPage from "./pages/AllProjectsPage";
import {BASE_URL} from "./Constants";
import LoginPage from "./pages/LoginPage";


export default function App() {
  const [loggingIn, setLoggingIn] = useState<boolean>();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  
  useEffect(() => {
    verifyLogin(); 
  }, []);

  const verifyLogin = async () => {
    if (sessionStorage.getItem("auth")) {
        try {
          const response = await fetch(BASE_URL + "/logged_in_user", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + JSON.parse(sessionStorage.getItem("auth") + "").token,
            },
          });

          if (!response.ok) {
            //sessionStorage.removeItem("auth");
            setIsAuthenticated(false)
          } else {
            setIsAuthenticated(true)
          }
        } catch (error) {
          //sessionStorage.removeItem("auth");
          setIsAuthenticated(false)
        }
    } else {
      setIsAuthenticated(false);
      };
    }
  


  return (
    <div style={{ marginTop: "150px", marginLeft: "250px" }}>
      <Navbar/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {isAuthenticated ? (
            <>
              <Route path="/forslagsbanken" element={<IdeaForum />} />
              <Route path="/skapaforbattringsforslag" element={<CreateSuggestion />} />
              <Route path="/allaforbattringsarbeten" element={<AllProjectsPage />}/>
              <Route path="/skapaforbattringsarbete" element={<CreateProject />} />
              <Route path="/dinaforbattringsarbeten" element={<MyProjectsPage />} />
              <Route path="/forbattringsarbete/:projectId" element={<ProjectPage />}>
                <Route path="overblick" element={<ProjectOverview />} />
                <Route path="detaljer" element={<ProjectDetails />} />
                <Route path="loggbok" element={<ProjectLogbook />} />
                <Route path="resultat" element={<ProjectResult />} />
              </Route>
            </>
          ) : (
            // Redirect to LoginPage if not authenticated
            <Route path="/login" element={<LoginPage/>} />
          )}
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}
