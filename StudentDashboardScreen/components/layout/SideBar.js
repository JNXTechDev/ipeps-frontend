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
    ExpandMore,
    ExpandLess
} from "@mui/icons-material";
import Settings from "../sidebar-menu-items/Settings/Settings";

// MenuSection Component (Add this before the Item component)
const MenuSection = ({ title, children, isCollapsed, isOpen, onToggle }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <>
            {!isCollapsed ? (
                <MenuItem
                    onClick={onToggle}
                    style={{ 
                        padding: "5px 5px",
                        marginTop: "10px"
                    }}
                >
                    <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
                        <Typography sx={{ fontWeight: 'bold', fontSize: '12px', color: 'white' }}>
                            {title}
                        </Typography>
                        {isOpen ? <ExpandLess sx={{ color: 'white' }} /> : <ExpandMore sx={{ color: 'white' }} />}
                    </Box>
                </MenuItem>
            ) : null}
            {/* Show children always when collapsed, or when not collapsed and section is open */}
            {(isCollapsed || (!isCollapsed && isOpen)) && children}
        </>
    );
};

// Item Component
const Item = ({ title, to, icon, selected, setSelected, onSettingsClick, showSettings, setShowSettings, isCollapsed }) => {
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
                border: selected === title ? `2px solid ${colors.primary[700]}` : '2px solid transparent', // Add transparent border
                color: selected === title ? 'white' : 'black',
                boxSizing: 'border-box', // Include border in width calculation
                '&:hover': {
                   backgroundColor: selected === title ? colors.primary[600] : colors.grey[200],
                },
                '& .pro-inner-item': {
                    padding: '5px 5px',  // Reduced padding
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',  // Ensure inner item takes full width
                },
                '& .pro-icon-wrapper': {
                    marginRight: '5px',  // Reduce space between icon and text
                    padding: '0',
                    minWidth: '35px',    // Reduce minimum width of icon wrapper
                    display: 'flex',
                    justifyContent: 'center',
                    color: 'white', // Make icons white
                },
                '& .pro-item-content': {
                    marginLeft: '0',     // Remove default margin
                    opacity: isCollapsed ? 0 : 1, // Hide text in collapsed state
                    transition: 'opacity 0.3s',
                    flex: 1,  // Take remaining space
                },
                maxWidth: isCollapsed ? '80px' : '250px',
                minWidth: isCollapsed ? '80px' : '250px',
                '& .pro-inner-item': {
                    padding: '5px 5px',
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                },
                '& .pro-icon-wrapper': {
                    width: '35px',
                    minWidth: '35px',
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
    const [openSections, setOpenSections] = useState({
        home: true,
        jobs: true,
        trainings: true,
        scholarships: true,
        companies: true,
        settings: true
    });

    const toggleSection = (section) => {
        setOpenSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

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
                    overflowX: 'hidden', // Add this to prevent horizontal scroll
                    zIndex: 1000,
                    transition: 'width 0.3s',
                    "& .pro-sidebar-inner": {
                        backgroundColor: "#051b42",
                        width: '100%', // Ensure inner content doesn't exceed parent width
                    },
                    "& .pro-sidebar": {
                        width: '100% !important', // Force sidebar to match parent width
                        minWidth: 'unset !important', // Remove minimum width
                    },
                    "& .pro-menu": {
                        width: '100%',  // Ensure menu takes full width
                        padding: 0,     // Remove default padding
                    },
                    "& .pro-menu-item": {
                        width: '100%', // Ensure menu items don't exceed parent width
                        margin: 0,      // Remove margins
                        padding: '2px 0',  // Add consistent vertical padding
                    },
                    "& .pro-inner-list-item": {
                        width: '100%',  // Ensure dropdown items take full width
                        padding: '0 !important',  // Remove dropdown padding
                    },
                    width: isCollapsed ? '80px' : '250px',
                    minWidth: isCollapsed ? '80px' : '250px',
                    maxWidth: isCollapsed ? '80px' : '250px',
                    height: '100vh',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    zIndex: 1000,
                    transition: 'all 0.3s',
                    "& .pro-sidebar": {
                        width: '100% !important',
                        minWidth: '100% !important',
                        maxWidth: '100% !important',
                    },
                    "& .pro-sidebar-inner": {
                        backgroundColor: "#051b42",
                        width: '100%',
                        minWidth: '100%',
                        maxWidth: '100%',
                    },
                    "& .pro-menu": {
                        width: '100%',
                        padding: 0,
                    },
                    "& .pro-menu-item": {
                        width: '100%',
                        margin: 0,
                        padding: '2px 0',
                    },
                    "& .pro-inner-list-item": {
                        width: '100%',
                        padding: '0 !important',
                        "& div": {
                            width: '100%',
                        }
                    },
                    "& .pro-menu-item.pro-sub-menu": {
                        width: '100%',
                        minWidth: '100%',
                        maxWidth: '100%',
                    }
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
                        <Box paddingLeft={isCollapsed ? undefined : "2%"}>  {/* Changed from 10% to 5% */}

                            <MenuSection 
                                title="HOME" 
                                isCollapsed={isCollapsed}
                                isOpen={openSections.home}
                                onToggle={() => toggleSection('home')}
                            >
                                <Item
                                    title="Home"
                                    to="/dashboard/student"
                                    icon={<HomeOutlined />}
                                    selected={selected}
                                    setSelected={setSelected}
                                    showSettings={showSettings}
                                    setShowSettings={setShowSettings}
                                    isCollapsed={isCollapsed}  
                                />
                            </MenuSection>

                            <MenuSection 
                                title="JOBS" 
                                isCollapsed={isCollapsed}
                                isOpen={openSections.jobs}
                                onToggle={() => toggleSection('jobs')}
                            >
                                <Item
                                    title="Job Search"
                                    to="/dashboard/student/job-search"
                                    icon={<TravelExploreOutlined />}
                                    selected={selected}
                                    setSelected={setSelected}
                                    showSettings={showSettings}
                                    setShowSettings={setShowSettings}
                                    isCollapsed={isCollapsed}
                                />
                                <Item
                                    title="Saved Jobs"
                                    to="/dashboard/student/saved-jobs"
                                    icon={<BookmarksOutlined />}
                                    selected={selected}
                                    setSelected={setSelected}
                                    showSettings={showSettings}
                                    setShowSettings={setShowSettings}
                                    isCollapsed={isCollapsed}
                                />
                                <Item
                                    title="Job Applications"
                                    to="/dashboard/student/job-applications"
                                    icon={<WorkOutlineOutlined />}
                                    selected={selected}
                                    setSelected={setSelected}
                                    showSettings={showSettings}
                                    setShowSettings={setShowSettings}
                                    isCollapsed={isCollapsed}
                                />
                            </MenuSection>

                            <MenuSection 
                                title="TRAININGS" 
                                isCollapsed={isCollapsed}
                                isOpen={openSections.trainings}
                                onToggle={() => toggleSection('trainings')}
                            >
                                <Item
                                    title="Training Search"
                                    to="/dashboard/student/training-search"
                                    icon={<PageviewOutlined />}
                                    selected={selected}
                                    setSelected={setSelected}
                                    showSettings={showSettings}
                                    setShowSettings={setShowSettings}
                                    isCollapsed={isCollapsed}
                                />
                                <Item
                                    title="Saved Trainings"
                                    to="/dashboard/student/saved-trainings"
                                    icon={<BookmarksOutlined />}
                                    selected={selected}
                                    setSelected={setSelected}
                                    showSettings={showSettings}
                                    setShowSettings={setShowSettings}
                                    isCollapsed={isCollapsed}
                                />
                                <Item
                                    title="Training Applications"
                                    to="/dashboard/student/training-applications"
                                    icon={<WorkOutlineOutlined />}
                                    selected={selected}
                                    setSelected={setSelected}
                                    showSettings={showSettings}
                                    setShowSettings={setShowSettings}
                                    isCollapsed={isCollapsed}
                                />
                            </MenuSection>

                            <MenuSection 
                                title="SCHOLARSHIPS" 
                                isCollapsed={isCollapsed}
                                isOpen={openSections.scholarships}
                                onToggle={() => toggleSection('scholarships')}
                            >
                                <Item
                                    title="Scholarships Search"
                                    to="/dashboard/student/scholarship-search"
                                    icon={<SchoolOutlined />}
                                    selected={selected}
                                    setSelected={setSelected}
                                    showSettings={showSettings}
                                    setShowSettings={setShowSettings}
                                    isCollapsed={isCollapsed}
                                />
                                <Item
                                    title="Saved Scholarships"
                                    to="/dashboard/student/saved-scholarships"
                                    icon={<BookmarksOutlined />}
                                    selected={selected}
                                    setSelected={setSelected}
                                    showSettings={showSettings}
                                    setShowSettings={setShowSettings}
                                    isCollapsed={isCollapsed}
                                />
                                <Item
                                    title="Scholarship Applications"
                                    to="/dashboard/student/scholarship-applications"
                                    icon={<WorkOutlineOutlined />}
                                    selected={selected}
                                    setSelected={setSelected}
                                    showSettings={showSettings}
                                    setShowSettings={setShowSettings}
                                    isCollapsed={isCollapsed}
                                />
                            </MenuSection>

                            <MenuSection 
                                title="COMPANIES" 
                                isCollapsed={isCollapsed}
                                isOpen={openSections.companies}
                                onToggle={() => toggleSection('companies')}
                            >
                                <Item
                                    title="Companies"
                                    to="/dashboard/student/companies"
                                    icon={<BusinessOutlined/>}
                                    selected={selected}
                                    setSelected={setSelected}
                                    showSettings={showSettings}
                                    setShowSettings={setShowSettings}
                                    isCollapsed={isCollapsed}
                                />
                            </MenuSection>

                            <MenuSection 
                                title="SETTINGS" 
                                isCollapsed={isCollapsed}
                                isOpen={openSections.settings}
                                onToggle={() => toggleSection('settings')}
                            >
                                <Item
                                    title="Account Settings"    
                                    to="/dashboard/student/settings"
                                    icon={<SettingsOutlined />}
                                    selected={selected}
                                    setSelected={setSelected}
                                    onSettingsClick={handleSettingsClick}
                                    showSettings={showSettings}
                                    setShowSettings={setShowSettings}
                                    isCollapsed={isCollapsed}
                                />
                                <Item
                                    title="Logout"
                                    to="/"
                                    icon={<LogoutOutlined/>}
                                    selected={selected}
                                    setSelected={setSelected}
                                    showSettings={showSettings}
                                    setShowSettings={setShowSettings}
                                    isCollapsed={isCollapsed}
                                />
                            </MenuSection>
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
