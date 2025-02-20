import React, { useState } from "react";
import { Box, useTheme, Link } from "@mui/material";
import { tokens } from "../../../theme";
import { Routes, Route } from "react-router-dom";

//Layout Components
import SideBar from "./components/layout/SideBar"; 

// Dashboard Components
import Dashboard from "./components/sidebar-menu-items/Dashboard/dashboard";
import Settings from "./components/sidebar-menu-items/Settings/Settings";
import ManageEmployer from "./components/sidebar-menu-items/Management/ManageEmployer/ManageEmployer";
import JobPosting from "./components/sidebar-menu-items/Management/JobPosting/JobPosting";
import TrainingPosting from "./components/sidebar-menu-items/Management/TrainingPosting/TrainingPosting";
import ScholarshipPosting from "./components/sidebar-menu-items/Management/ScholarshipPosting/ScholarshipPosting";

const EmployersDashboardScreen = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <Box
            sx={{
                display: "flex",
                backgroundColor: colors.primary[400],
                minHeight: "100vh",
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
            }}
        >
            <SideBar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
            <Box
                sx={{
                    marginLeft: isCollapsed ? '80px' : '250px',
                    flexGrow: 1,
                    p: 3,
                    transition: 'margin-left 0.3s',
                }}
            >
         
                <Box mt="20px">
                    <Routes>
                        <Route path="manage-employers" element={<ManageEmployer isCollapsed={isCollapsed} />} />
                        <Route path="settings" element={<Settings isCollapsed={isCollapsed} />} />
                        <Route path="home" element={<Dashboard isCollapsed={isCollapsed} />} />
                        <Route path="/" element={<Dashboard isCollapsed={isCollapsed} />} />
                        <Route path="job-posting" element={<JobPosting isCollapsed={isCollapsed}/>} />
                        <Route path="training-posting" element={<TrainingPosting isCollapsed={isCollapsed} /> } />
                        <Route path="scholarship-posting" element={<ScholarshipPosting isCollapsed={isCollapsed} /> } />
                    </Routes> 
                </Box>  
            </Box>  
        </Box>  
    );      
};      
export default EmployersDashboardScreen;

