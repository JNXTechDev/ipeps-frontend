import React, { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../../../../theme";
import {
    HomeOutlined,
    MenuOutlined,
    MapOutlined,
    TravelExploreOutlined,
    BookmarksOutlined,
    WorkOutlineOutlined,
    PageviewOutlined,
    SchoolOutlined,
    BusinessOutlined,
    SettingsOutlined,
    LogoutOutlined,
} from "@mui/icons-material";
import Settings from "../sidebar-menu-items/Settings/Settings";

// Item Component
const Item = ({ title, to, icon, selected, setSelected, onSettingsClick, showSettings, setShowSettings }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();

    const handleClick = () => {
        setSelected(title);
        if (title === "Settings") {
            onSettingsClick?.();
            navigate('/dashboard/student/settings');
            return;
        } else {
            // Close settings when clicking other menu items
            setShowSettings(false);
        }
    };

    return (
        <MenuItem
            active={selected === title}
            onClick={handleClick}
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
                {title === "Settings" ? (
                    <span style={{ textDecoration: "none", color: "inherit" }}>{title}</span>
                ) : (
                    <Link to={to} style={{ textDecoration: "none", color: "inherit" }}>
                        {title}
                    </Link>
                )}
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
        "https://bit.ly/40SdWk7"
    );
    const [showSettings, setShowSettings] = useState(false);
    const location = useLocation();

    // Handle profile image change
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
        }
    };

    const handleSettingsClick = () => {
        setShowSettings(!showSettings);
    };

    // Check if we're on the settings page
    useEffect(() => {
        if (location.pathname === '/dashboard/student/settings') {
            setShowSettings(true);
            setSelected('Settings');
        }
    }, [location.pathname]);

    return (
        <>
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
                        backgroundColor: "#051b42"
                    },
                }}
            >
                <ProSidebar collapsed={isCollapsed}>
                    <Menu>
                        {/* Updated Sidebar Toggle Button */}
                        <MenuItem
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            icon={isCollapsed ? <MenuOutlined style={{ color: 'white' }} /> : undefined}
                            style={{
                                margin: "10px 0 20px 0",
                                color: 'white', // Ensure text color is also white

                            }}
                        >
                            {!isCollapsed && (
                                <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px"> 
                                    <IconButton 
                                        onClick={() => setIsCollapsed(!isCollapsed)}
                                        sx={{
                                            color: 'white', // Force white color
                                            '&:hover': {
                                                color: 'white', // Keep white on hover
                                            }
                                        }}
                                    >
                                        <MenuOutlined />
                                    </IconButton>
                                </Box>
                            )}
                        </MenuItem>

                        {/* Sidebar Profile Section */}
                        {!isCollapsed && (
                            <Box mb="25px">
                                <Box 
                                    display="flex" 
                                    justifyContent="center" 
                                    alignItems="center"
                                >
                                    <Box
                                        sx={{
                                            width: '100px',
                                            height: '100px',
                                            position: 'relative',
                                            borderRadius: '50%',
                                            overflow: 'hidden',
                                            backgroundColor: '#051b42', // Light background for empty state
                                        }}
                                    >
                                        <label 
                                            htmlFor="profile-upload"
                                            style={{
                                                display: 'block',
                                                width: '100%',
                                                height: '100%',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            <img
                                                alt="profile-user"
                                                src={profileImage}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover', // This ensures the image covers the area without distortion
                                                    position: 'absolute',
                                                    top: '50%',
                                                    left: '50%',
                                                    transform: 'translate(-50%, -50%)',
                                                }}
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
                                </Box>
                                <Box textAlign="center">
                                    <Typography
                                        variant="h2"
                                        color={colors.white}
                                        //fontWeight="bold"
                                        sx={{ m: "10px 0 0 0" }}
                                    >
                                        Emily Smith
                                    </Typography>


                                    <Typography variant="h5" color={colors.white}>
                                        Student
                                    </Typography>
                                </Box>
                            </Box>
                        )}


                        {/* Sidebar Menu Items */}
                        <Box paddingLeft={isCollapsed ? undefined : "10%"}>

                             {!isCollapsed && (
                                <Typography sx={{fontWeight: 'bold', fontSize: '12px'}}>
                                    Home
                                </Typography>
                            )}  
                            <Item
                                title="Home"
                                to="/dashboard/student"
                                icon={<HomeOutlined />}
                                selected={selected}
                                setSelected={setSelected}
                                showSettings={showSettings}
                                setShowSettings={setShowSettings}
                            />

                            {!isCollapsed && (
                                <Typography sx={{fontWeight: 'bold', fontSize: '12px'}}>
                                    Jobs
                                </Typography>
                            )}  
                            <Item
                                title="Job Search"
                                to="/dashboard/student/job-search"
                                icon={<TravelExploreOutlined />}
                                selected={selected}
                                setSelected={setSelected}
                                showSettings={showSettings}
                                setShowSettings={setShowSettings}
                            />

                            <Item
                                title="Saved Jobs"
                                to="/dashboard/student/saved-jobs"
                                icon={<BookmarksOutlined />}
                                selected={selected}
                                setSelected={setSelected}
                                showSettings={showSettings}
                                setShowSettings={setShowSettings}
                            />
                            <Item
                                title="Job Applications"
                                to="/dashboard/student/job-applications"
                                icon={<WorkOutlineOutlined />}
                                selected={selected}
                                setSelected={setSelected}
                                showSettings={showSettings}
                                setShowSettings={setShowSettings}
                            />
                            {!isCollapsed && (
                                <Typography sx={{fontWeight: 'bold', fontSize: '12px'}}>
                                    Training
                                </Typography>
                            )}  
                      
                            <Item
                                title="Training Search"
                                to="/dashboard/student/training-search"
                                icon={<PageviewOutlined />}
                                selected={selected}
                                setSelected={setSelected}
                                showSettings={showSettings}
                                setShowSettings={setShowSettings}
                            />
                            <Item
                                title="Saved Trainings"
                                to="/dashboard/student/saved-trainings"
                                icon={<BookmarksOutlined />}
                                selected={selected}
                                setSelected={setSelected}
                                showSettings={showSettings}
                                setShowSettings={setShowSettings}
                            />
                            {!isCollapsed && (
                                <Typography sx={{fontWeight: 'bold', fontSize: '12px'}}>
                                    Scholarships    
                                </Typography>
                            )}  

                            <Item
                                title="Scholarships Search"
                                to="/dashboard/student/scholarship-search"
                                icon={<SchoolOutlined />}
                                selected={selected}
                                setSelected={setSelected}
                                showSettings={showSettings}
                                setShowSettings={setShowSettings}
                            />
                            <Item
                                title="Saved Scholarships"
                                to="/dashboard/student/saved-scholarships"
                                icon={<BookmarksOutlined />}
                                selected={selected}
                                setSelected={setSelected}
                                showSettings={showSettings}
                                setShowSettings={setShowSettings}
                            />

                            {!isCollapsed && (
                                <Typography sx={{fontWeight: 'bold', fontSize: '12px'}}>
                                Companies
                                </Typography>
                            )}          
                            <Item
                                title="Companies"
                                to="/dashboard/student/companies"
                                icon={<BusinessOutlined/>}
                                selected={selected}
                                setSelected={setSelected}
                                showSettings={showSettings}
                                setShowSettings={setShowSettings}
                            />
                            {!isCollapsed && (
                                <Typography sx={{fontWeight: 'bold', fontSize: '12px'}}>
                                Settings
                                </Typography>
                            )}    
                            <Item
                                title="Settings"    
                                to="/dashboard/student/settings"
                                icon={<SettingsOutlined />}
                                selected={selected}
                                setSelected={setSelected}
                                onSettingsClick={handleSettingsClick}
                                showSettings={showSettings}
                                setShowSettings={setShowSettings}
                            />
                            <Item
                                title="Logout"
                                to="/dashboard/student/logout"
                                icon={<LogoutOutlined/>}
                                selected={selected}
                                setSelected={setSelected}
                                showSettings={showSettings}
                                setShowSettings={setShowSettings}
                            />
                        </Box>
                    </Menu>
                </ProSidebar>
            </Box>
            {showSettings && (
                <Box sx={{ 
                    position: 'fixed',
                    top: 0,
                    left: isCollapsed ? '80px' : '250px', // Adjust left margin based on collapse state
                    right: 0,
                    height: '100vh',
                    backgroundColor: 'white',
                    zIndex: 1000,
                    overflowY: 'auto',
                    transition: 'left 0.3s' // Add smooth transition
                }}>
                    <Settings />
                </Box>
            )}
        </>
    );
};

export default SideBar;
