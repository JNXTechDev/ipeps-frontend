import React from "react";
import { Box, useTheme, Typography } from "@mui/material";
import { tokens } from "../../../../theme"; // Ensure this path is correct
import Header from "../AdministratorDashboardScreen/components/Header"; // Adjust the import path as needed
import SideBar from "../AdministratorDashboardScreen/components/SideBar"; // Adjust the import path as needed
import Topbar from "../AdministratorDashboardScreen/components/TopBar"; // Adjust the import path as needed

const AdministratorDashboardScreen = () => {
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
                title: "Administrator Dashboard",
                subtitle: "Welcome to your dashboard",
            }),
            React.createElement(
                Box,
                { mt: "20px" },
                React.createElement(
                    Typography,
                    { variant: "h4", color: colors.grey[100] },
                    "Your Content Goes Here"
                )
            )
        )
    );
};

export default AdministratorDashboardScreen;