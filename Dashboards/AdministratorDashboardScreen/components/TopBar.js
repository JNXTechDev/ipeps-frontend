import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../../../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";

const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    return React.createElement(
        Box,
        { display: "flex", justifyContent: "space-between", p: 2 },
        React.createElement(
            Box,
            {
                display: "flex",
                backgroundColor: colors.primary[400],
                borderRadius: "3px"
            },
            React.createElement(InputBase, {
                sx: { ml: 2, flex: 1 },
                placeholder: "Search"
            }),
            React.createElement(
                IconButton,
                { type: "button", sx: { p: 1 } },
                React.createElement(SearchIcon, null)
            )
        ),
        React.createElement(
            Box,
            { display: "flex" },
            React.createElement(
                IconButton,
                { onClick: colorMode.toggleColorMode },
                theme.palette.mode === "dark"
                    ? React.createElement(DarkModeOutlinedIcon, null)
                    : React.createElement(LightModeOutlinedIcon, null)
            ),
            React.createElement(IconButton, null, React.createElement(NotificationsOutlinedIcon, null)),
        )
    );
};

export default Topbar;
