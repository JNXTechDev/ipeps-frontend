import React, { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar"; // Use ProSidebar for the sidebar component
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css"; // Import ProSidebar CSS
import { tokens } from "../../../../../theme"; // Import theme tokens for dynamic styling
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
} from "@mui/icons-material"; // Import Material-UI icons for sidebar items

// Reusable component for sidebar menu items
const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <MenuItem
            active={selected === title} // Highlight the selected menu item
            style={{ color: colors.grey[100] }} // Set text color dynamically
            onClick={() => setSelected(title)} // Update selected item on click
            icon={icon} // Display the icon
            component={<Link to={to} />} // Use React Router's Link for navigation
        >
            <Typography>{title}</Typography> {/* Display the title */}
        </MenuItem>
    );
};

const SideBar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false); // State to manage sidebar collapse
    const [selected, setSelected] = useState("Dashboard"); // State to track the selected menu item

    return (
        <Box
            sx={{
                "& .pro-sidebar-inner": {
                    background: `${colors.primary[400]} !important`, // Set sidebar background color
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important", // Remove icon background
                },
                "& .pro-inner-item": {
                    padding: "5px 35px 5px 20px !important", // Adjust menu item padding
                },
                "& .pro-inner-item:hover": {
                    color: "#868dfb !important", // Change text color on hover
                },
                "& .pro-menu-item.active": {
                    color: "#6870fa !important", // Highlight active menu item
                },
            }}
        >
            {/* ProSidebar component */}
            <ProSidebar
                collapsed={isCollapsed} // Control sidebar collapse state
                style={{
                    backgroundColor: colors.primary[400], // Set dynamic background color
                }}
            >
                <Menu iconShape="square">
                    {/* Collapse/Expand Button */}
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)} // Toggle collapse state
                        icon={isCollapsed ? <MenuOutlined /> : undefined} // Show menu icon when collapsed
                        style={{
                            margin: "10px 0 20px 0",
                            color: colors.grey[100],
                        }}
                    >
                        {!isCollapsed && ( // Show title and collapse button when sidebar is expanded
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                            >
                                <Typography
                                    variant="h6"
                                    color={colors.grey[100]}
                                    sx={{ fontSize: 12 }}
                                >
                                    ADMINISTRATOR
                                </Typography>
                                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                    <MenuOutlined />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>

                    {/* Profile Section */}
                    {!isCollapsed && ( // Show profile section only when sidebar is expanded
                        <Box mb="25px">
                            <Box display="flex" justifyContent="center" alignItems="center">
                                {/* Profile Picture */}
                                <img
                                    alt="profile-user"
                                    width="100px"
                                    height="100px"
                                    src="https://image.tensorartassets.com/cdn-cgi/image/anim=true,plain=false,w=2048,f=jpeg,q=85/posts/images/628580666044332798/fb4f2a29-b249-4190-be73-047321a9d164.jpg" // Profile image URL
                                    style={{ cursor: "pointer", borderRadius: "50%" }} // Circular image
                                />
                            </Box>

                            {/* Profile Name and Title */}
                            <Box textAlign="center">
                                <Typography
                                    variant="h2"
                                    color={colors.grey[100]}
                                    fontWeight="bold"
                                    sx={{ m: "10px 0 0 0" }}
                                >
                                    Kakashi Hatake
                                </Typography>
                                <Typography variant="h5" color={colors.greenAccent[500]}>
                                    ADMIN
                                </Typography>
                            </Box>
                        </Box>
                    )}

                    {/* Sidebar Menu Items */}
                    <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                        {/* Dashboard */}
                        <Item
                            title="Dashboard"
                            to="/"
                            icon={<HomeOutlined />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        {/* Data Section */}
                        <Typography
                            variant="h6"
                            color={colors.grey[300]}
                            sx={{ m: "15px 0 5px 20px" }}
                        >
                            Data
                        </Typography>
                        <Item
                            title="Manage Team"
                            to="/team"
                            icon={<PeopleOutlined />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Contacts Information"
                            to="/contacts"
                            icon={<ContactsOutlined />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Invoices Balances"
                            to="/invoices"
                            icon={<ReceiptOutlined />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        {/* Pages Section */}
                        <Typography
                            variant="h6"
                            color={colors.grey[300]}
                            sx={{ m: "15px 0 5px 20px" }}
                        >
                            Pages
                        </Typography>
                        <Item
                            title="Profile Form"
                            to="/form"
                            icon={<PersonOutlined />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Calendar"
                            to="/calendar"
                            icon={<CalendarTodayOutlined />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="FAQ Page"
                            to="/faq"
                            icon={<HelpOutlineOutlined />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        {/* Charts Section */}
                        <Typography
                            variant="h6"
                            color={colors.grey[300]}
                            sx={{ m: "15px 0 5px 20px" }}
                        >
                            Charts
                        </Typography>
                        <Item
                            title="Bar Chart"
                            to="/bar"
                            icon={<BarChartOutlined />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Pie Chart"
                            to="/pie"
                            icon={<PieChartOutlineOutlined />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Line Chart"
                            to="/line"
                            icon={<TimelineOutlined />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Geography Chart"
                            to="/geography"
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