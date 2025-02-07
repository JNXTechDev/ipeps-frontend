import React from "react";
import { Box, useTheme, Typography } from "@mui/material";
import { tokens } from "../../../theme"; // Ensure this path is correct
import Header from "./layout/Header"; // Adjust the import path as needed
import SideBar from "./layout/Sidebar"; // Adjust the import path as needed
import Topbar from "./layout/Topbar"; // Adjust the import path as needed

const JobSeekerDashboardScreen = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return React.createElement(
        Box,
        {
            sx: {
                display: "flex",
                backgroundColor: colors.primary[400],
                minHeight: "100vh",
            },
        },
        React.createElement(SideBar, null),
        React.createElement(
            Box,
            {
                sx: {
                    flexGrow: 1,
                    p: 3,
                    marginLeft: "10px", // Adjust this value based on the width of your SideBar
                },
            },
            React.createElement(Topbar, null),
            React.createElement(Header, {
                title: "Job Seeker Dashboard",
                subtitle: "Your journey to finding the perfect job starts here!",
            }),
            React.createElement(
                Box,
                { mt: "20px" },
                React.createElement(
                    Typography,
                    { variant: "h4", color: colors.grey[100] },
                    "Find Opportunities, Build Your Career"
                )
            )
        )
    );
};

export default JobSeekerDashboardScreen;
