import React, { useState } from "react";
import { Box, useTheme, Link } from "@mui/material";
import { tokens } from "../../../theme";
import { Routes, Route } from "react-router-dom";

//Layout Components
import Header from "./components/layout/Header"; 
import SideBar from "./components/layout/SideBar"; 
//import Topbar from "./components/layout/TopBar";

// Dashboard Components
import Dashboard from "./components/sidebar-menu-items/Dashboard/dashboard";
import Form from "./components/sidebar-menu-items/Forms/Forms";
import Profile from "./components/sidebar-menu-items/Profile/Profile";
import Settings from "./components/sidebar-menu-items/Settings/Settings";
import JobSearch from "./components/sidebar-menu-items/JobSearch/JobSearch";
import TrainingSearch from "./components/sidebar-menu-items/TrainingSearch/TrainingSearch";
import SavedJobs from "./components/sidebar-menu-items/JobSaved/SavedJobs";
import SavedTrainings from "./components/sidebar-menu-items/TrainingSaved/SavedTrainings";


const StudentDashboardScreen = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <Box
            sx={{
                display: "flex",
               // backgroundColor: colors.primary[400],
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
               {/* <Topbar />*/}
                <Box mt="20px">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/form" element={<Form />} />
                        <Route path="/job-search" element={<JobSearch isCollapsed={isCollapsed} />} />
                        <Route path="/training-search" element={<TrainingSearch isCollapsed={isCollapsed} />} />
                        <Route path="/saved-jobs" element={<SavedJobs isCollapsed={isCollapsed} />} />
                        <Route path="/saved-trainings" element={<SavedTrainings isCollapsed={isCollapsed} />} />

                        <Route path="/settings" element={
                            <Box sx={{ 
                                position: 'fixed',
                                top: 0,
                                left: isCollapsed ? '80px' : '250px',
                                right: 0,
                                height: '100vh',
                                backgroundColor: 'white',
                                zIndex: 1000,
                                overflowY: 'auto',
                                transition: 'left 0.3s' // Add transition here too
                            }}>
                                <Settings />
                            </Box>
                        } />
                        
                    </Routes>
                </Box>
            </Box>
        </Box>
    );
};

export default StudentDashboardScreen;
