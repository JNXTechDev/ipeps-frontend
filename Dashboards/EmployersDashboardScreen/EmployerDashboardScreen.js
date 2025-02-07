import React, { useState } from "react";
import { Box, useTheme, Link } from "@mui/material";
import { tokens } from "../../../theme";
import { Routes, Route } from "react-router-dom";

//Layout Components
import Header from "./components/layout/Header"; 
import SideBar from "./components/layout/SideBar"; 
import Topbar from "./components/layout/TopBar";

// Dashboard Components
import Dashboard from "./components/sidebar-menu-items/Dashboard/dashboard";
import Form from "./components/sidebar-menu-items/Forms/Forms";
import Profile from "./components/sidebar-menu-items/Profile/Profile";
import Contacts from "./components/sidebar-menu-items/Contacts/Contacts";
import Invoices from "./components/sidebar-menu-items/Invoices/Invoices";
import Calendar from "./components/sidebar-menu-items/Calendar/Calendar";
import FAQ from "./components/sidebar-menu-items/FAQ/FAQ";
import Bar from "./components/sidebar-menu-items/Bar/Bar";
import Pie from "./components/sidebar-menu-items/Pie/Pie";
import Line from "./components/sidebar-menu-items/Line/Line";
import Geography from "./components/sidebar-menu-items/Geography/Geography";

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
                <Topbar />
                <Box mt="20px">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/form" element={<Form />} />
                    </Routes>
                </Box>
            </Box>
        </Box>
    );
};

export default EmployersDashboardScreen;
