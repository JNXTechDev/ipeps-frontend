import React, { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../../../../theme";
import {
    HomeOutlined,
    PeopleOutlined,
    ContactsOutlined,
    ReceiptOutlined,
    PersonOutlined,
    CalendarTodayOutlined,
    HelpOutlineOutlined,
    BarChartOutlined,
    PieChartOutlineOutlined,
    TimelineOutlined,
    MenuOutlined,
    MapOutlined,
} from "@mui/icons-material";

// Item Component
const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <MenuItem
            active={selected === title}
            onClick={() => setSelected(title)}
            icon={icon}
            sx={{
                backgroundColor: selected === title ? colors.primary[500] : 'transparent',
                border: selected === title ? `2px solid ${colors.primary[700]}` : 'none',
                color: selected === title ? 'white' : 'black',
                '&:hover': {
                   backgroundColor: selected === title ? colors.primary[600] : colors.grey[200],
                },
            }}
        >
            <Typography variant="body1" sx={{ fontSize: '14px' }}>
                <Link to={to} style={{ textDecoration: "none", color: "inherit" }}>
                    {title}
                </Link>
            </Typography>
        </MenuItem>
    );
};

// SideBar Component
const SideBar = ({ isCollapsed, setIsCollapsed }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [selected, setSelected] = useState("Dashboard");
    const [profileImage, setProfileImage] = useState(
        "https://cdn.talkie-ai.com/talkie-user-img/92960754851952/125252975517773-2.jpeg"
    );

    // Handle profile image change
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
        }
    };

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: isCollapsed ? '80px' : '250px',
                height: '100vh',
                overflowY: 'auto',
                zIndex: 1000,
                transition: 'width 0.3s',
                "& .pro-sidebar-inner": {
                    backgroundColor: "#28375c"
                },
            }}
        >
            <ProSidebar collapsed={isCollapsed}>
                <Menu>
                    {/* Sidebar Toggle Button */}
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlined /> : undefined}
                        style={{
                            margin: "10px 0 20px 0",
                            //color: colors.white,
                       //     color: colors.grey[100],
                        }}
                    >
                        {!isCollapsed && (
                            <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px"> 
                                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                    <MenuOutlined />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>

                    {/* Sidebar Profile Section */}
                    {!isCollapsed && (
                        <Box mb="25px">
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <label htmlFor="profile-upload">
                                    <img
                                        alt="profile-user"
                                        width="100px"
                                        height="100px"
                                        src={profileImage}
                                        style={{ cursor: "pointer", borderRadius: "50%" }}
                                    />
                                </label>
                                <input
                                    id="profile-upload"
                                    type="file"
                                    accept="image/*"
                                    style={{ display: "none" }}
                                    onChange={handleImageChange}
                                />
                            </Box>
                            <Box textAlign="center">
                                <Typography
                                    variant="h2"
                                    color={colors.white}
                                    fontWeight="bold"
                                    sx={{ m: "10px 0 0 0" }}
                                >
                                    Angel Janica
                                </Typography>
                                <Typography variant="h5" color={colors.white}>
                                    Student
                                </Typography>
                            </Box>
                        </Box>
                    )}

                    {/* Sidebar Menu Items */}
                    <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                        <Item
                            title="Feed"
                            to="/dashboard/student"
                            icon={<HomeOutlined />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Student Profile"
                            to="/dashboard/student/profile"
                            icon={<PeopleOutlined />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Settings"
                            to="/dashboard/student/settings"
                            icon={<ContactsOutlined />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Job Search"
                            to="/dashboard/student/job-search"
                            icon={<ReceiptOutlined />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Typography variant="h6" sx={{ m: "15px 0 5px 20px" }}>
                            Jobs
                        </Typography>
                        <Item
                            title="Saved Jobs"
                            to="/dashboard/student/saved-jobs"
                            icon={<PersonOutlined />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Job Applications"
                            to="/dashboard/student/job-applications"
                            icon={<CalendarTodayOutlined />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Typography variant="h6" sx={{ m: "15px 0 5px 20px" }}>
                            Training
                        </Typography>
                        <Item
                            title="Training Search"
                            to="/dashboard/student/training-search"
                            icon={<HelpOutlineOutlined />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Saved Trainings"
                            to="/dashboard/student/saved-trainings"
                            icon={<BarChartOutlined />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Typography variant="h6"  sx={{ m: "15px 0 5px 20px" }}>
                         Scholarships
                        </Typography>

                        <Item
                            title="Scholarships Search"
                            to="/dashboard/student/scholarship-search"
                            icon={<PieChartOutlineOutlined />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Saved Scholarships"
                            to="/dashboard/student/saved-scholarships"
                            icon={<TimelineOutlined />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>
                            Companies
                        </Typography>
                        <Item
                            title="Companies"
                            to="/dashboard/student/companies"
                            icon={<MapOutlined />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Logout"
                            to="/dashboard/student/logout"
                            icon={<MapOutlined />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    );
};

export default SideBar;
