import React, { useContext } from "react";
import { Box, IconButton, InputBase, useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../../../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SearchIcon from "@mui/icons-material/Search";

const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    return (
        <Box 
            display="flex" 
            justifyContent="space-between" 
            alignItems="center" 
            p={2}
            sx={{ flexWrap: "wrap" }} // Make it wrap on small screens
        >
            {/* Search Box */}
            <Box
                display="flex"
                backgroundColor={colors.primary[400]}
                borderRadius="3px"
                border={`1px solid ${colors.primary[500]}`}
                sx={{ flex: 1, maxWidth: "500px", mr: 2 }} // Add max width for the search bar
            >
                <InputBase
                    sx={{ ml: 2, flex: 1 }}
                    placeholder="Search"
                />
                <IconButton type="button" sx={{ p: 1 }}>
                    <SearchIcon />
                </IconButton>
            </Box>

            {/* Right Icons Section */}
            <Box display="flex" alignItems="center">
                {/* Toggle Dark/Light Mode */}
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === "dark" ? (
                        <DarkModeOutlinedIcon />
                    ) : (
                        <LightModeOutlinedIcon />
                    )}
                </IconButton>

                {/* Notifications Icon */}
                <IconButton>
                    <NotificationsOutlinedIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

export default Topbar;
