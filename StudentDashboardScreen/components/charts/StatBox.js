import React from 'react';
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../../../theme";
import ProgressCircle from "./ProgressCircle";

const StatBox = ({ title, subtitle, icon, progress, increase }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return React.createElement(
        Box,
        { width: "100%", m: "0 30px" },
        React.createElement(
            Box,
            { display: "flex", justifyContent: "space-between" },
            React.createElement(
                Box,
                null,
                icon,
                React.createElement(
                    Typography,
                    { variant: "h4", fontWeight: "bold", sx: { color: colors.grey[100] } },
                    title
                )
            ),
            React.createElement(
                Box,
                null,
                React.createElement(ProgressCircle, { progress: progress })
            )
        ),
        React.createElement(
            Box,
            { display: "flex", justifyContent: "space-between", mt: "2px" },
            React.createElement(
                Typography,
                { variant: "h5", sx: { color: colors.greenAccent[500] } },
                subtitle
            ),
            React.createElement(
                Typography,
                { variant: "h5", fontStyle: "italic", sx: { color: colors.greenAccent[600] } },
                increase
            )
        )
    );
};

export default StatBox;
