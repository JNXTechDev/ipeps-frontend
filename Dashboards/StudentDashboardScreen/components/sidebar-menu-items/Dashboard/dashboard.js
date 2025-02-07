import React from 'react';
import { Box, Button, IconButton, Typography, useTheme, Link, Paper } from "@mui/material";
import { tokens } from "../../../../../../theme";

import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";

//Import Charts
import Header from "../../layout/Header";
//import LineChart from "../../charts/LineChart";
//import BarChart from "../../charts/BarChart";
//import StatBox from "../../charts/StatBox";
//import ProgressCircle from "../../charts/ProgressCircle";

const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return React.createElement(
        Box,
        { m: "20px" },
        
        React.createElement(
            Box,
            {
                display: "flex",
                flexDirection: "column",
                gap: "20px",
            },

             // Jobs Grid Section
             React.createElement(
                Box,
                {
                    sx: { 
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: 2,
                        mb: 3
                    }
                },
                [
                    // Left side - Saved Jobs
                    React.createElement(
                        Box,
                        {
                            sx: {
                                backgroundColor: "white",
                                borderRadius: '4px',
                                maxHeight: '1000px',
                                overflow: 'auto',
                                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                            }
                        },
                        [
                            React.createElement(
                                Box,
                                {
                                    sx: { 
                                        display: 'flex', 
                                        justifyContent: 'space-between', 
                                        alignItems: 'center',
                                        p: 2,
                                        position: 'sticky',
                                        top: 0,
                                        backgroundColor: 'white',
                                        marginBottom: '500px',

                                    }
                                },
                                [
                                    React.createElement(Header, { 
                                        title: "Saved Jobs", 
                                        subtitle: "No Jobs Saved" 
                                    }),
                                    React.createElement(
                                        Link,
                                        {
                                            href: "#",
                                            sx: {
                                                color: colors.greenAccent[400],
                                                textDecoration: 'none',
                                                '&:hover': {
                                                    textDecoration: 'underline'
                                                }
                                            }
                                        },
                                        "View All"
                                    )
                                ]
                            ),
                            React.createElement(Box, { sx: { p: 2 } })
                        ]
                    ),

                    // Right side - Applied Jobs
                    React.createElement(
                        Box,
                        {
                            sx: {
                                backgroundColor: "white",
                                borderRadius: '4px',
                                maxHeight: '1000px',
                                overflow: 'auto',
                                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',

                            }
                        },
                        [
                            React.createElement(
                                Box,
                                {
                                    sx: { 
                                        display: 'flex', 
                                        justifyContent: 'space-between', 
                                        alignItems: 'center',
                                        p: 2,
                                        position: 'sticky',
                                        top: 0,
                                        backgroundColor: 'white',
                                    }
                                },
                                [
                                    React.createElement(Header, { 
                                        title: "Applied Jobs", 
                                        subtitle: "No Job Applications" 
                                    }),
                                    React.createElement(
                                        Link,
                                        {
                                            href: "#",
                                            sx: {
                                                color: colors.greenAccent[400],
                                                textDecoration: 'none',
                                                '&:hover': {
                                                    textDecoration: 'underline'
                                                }
                                            }
                                        },
                                        "View All"
                                    )
                                ]
                            ),
                            React.createElement(Box, { sx: { p: 2 } })
                        ]
                    )
                ]
            ),
            // Announcements Section
            React.createElement(
                Paper,
                {
                    elevation: 0,
                    sx: {
                        backgroundColor:"white",
                        p: "30px",
                        border: "1px solid white",
                        borderRadius: "4px",
                        height: "200px",
                        overflowY: "scroll",
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // or use numbers 1-24 for predefined shadows
                        marginBottom: "50px",
                    
                    }
                },
                React.createElement(Typography, { 
                    variant: "h5", 
                    fontWeight: "600",
                    color: colors.grey[100],
                    mb: "15px"
                }, "Announcements"),
                React.createElement(Typography, { 
                    color: colors.grey[100],
                    mb: "50px"
                }, "No new announcements")
            ),

            // Recommended Jobs Section
            React.createElement(
                Paper,
                {
                    elevation: 0,
                    sx: {
                        backgroundColor:"white",
                        p: "30px",
                        border: "1px solid white",
                        borderRadius: "4px",
                        height: "700px",
                        overflowY: "scroll",
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' // or use numbers 1-24 for predefined shadows

                    }
                },
                React.createElement(Typography, { 
                    variant: "h5", 
                    fontWeight: "600",
                    color: colors.grey[100],
                    mb: "15px"
                }, "Recommended Jobs"),
                React.createElement(Typography, { 
                    color: colors.grey[100],
                    mb: "300px"
                }, "No recommended jobs available")
            ),

            // Recommended Trainings Section
            React.createElement(
                Paper,
                {
                    elevation: 0,
                    sx: {
                        backgroundColor:"white",
                        p: "30px",
                        border: "1px solid white",
                        borderRadius: "4px",
                        height: "700px",
                        overflowY: "scroll",
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' // or use numbers 1-24 for predefined shadows

                    }
                },
                React.createElement(Typography, { 
                    variant: "h5", 
                    fontWeight: "600",
                    color: colors.grey[100],
                    mb: "15px"
                }, "Recommended Trainings"),
                React.createElement(Typography, { 
                    color: colors.grey[100],
                        mb: "50px"
                }, "No recommended trainings available")
            )
        )
    );
};

export default Dashboard;
