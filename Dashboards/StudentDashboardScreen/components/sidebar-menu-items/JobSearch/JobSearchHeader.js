import React from 'react';
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  useTheme,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { tokens } from '../../../../../../theme';
import logoImage from '../../../../../../components/images/logonav.png';

const JobSearchHeader = ({ isCollapsed, ...props }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const inputStyles = {
    backgroundColor: 'rgb(213, 217, 230)',
    borderRadius: '4px',
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none'
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      border: 'none'
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: 'none'
    }
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: isCollapsed ? '80px' : '250px',
        right: 0,
        zIndex: 1100,
        backgroundColor: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        padding: '1rem',
        transition: 'left 0.3s',
      }}
    >
      {/* Single Row Layout */}
      <Box 
        sx={{ 
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          maxWidth: '1600px',
          margin: '0 auto',
        }}
      >
        {/* Logo */}
        <img 
          src={logoImage} 
          alt="Company Logo" 
          style={{ 
            height: '40px',
            width: 'auto',
          }}
        />

        {/* Search Bar */}
        <TextField
          sx={{ 
            width: '300px',
            ...inputStyles
          }}
          label="Search jobs..."
          value={props.searchQuery}
          onChange={(e) => props.setSearchQuery(e.target.value)}
          variant="outlined"
          size="small"
        />

        {/* Experience Level */}
        <FormControl 
          sx={{ 
            width: '200px',
            ...inputStyles
          }} 
          size="small"
        >
          <InputLabel>Experience Level</InputLabel>
          <Select
            value={props.experienceLevel}
            label="Experience Level"
            onChange={(e) => props.setExperienceLevel(e.target.value)}
          >
            <MenuItem value="entry">Entry Level</MenuItem>
            <MenuItem value="mid">Mid Level</MenuItem>
            <MenuItem value="senior">Senior Level</MenuItem>
          </Select>
        </FormControl>

        {/* Job Type */}
        <FormControl 
          sx={{ 
            width: '200px',
            ...inputStyles
          }} 
          size="small"
        >
          <InputLabel>Job Type</InputLabel>
          <Select
            value={props.jobType}
            label="Job Type"
            onChange={(e) => props.setJobType(e.target.value)}
          >
            <MenuItem value="full-time">Full Time</MenuItem>
            <MenuItem value="part-time">Part Time</MenuItem>
            <MenuItem value="contract">Contract</MenuItem>
            <MenuItem value="internship">Internship</MenuItem>
          </Select>
        </FormControl>

        {/* Sort By */}
        <FormControl 
          sx={{ 
            width: '200px',
            ...inputStyles
          }} 
          size="small"
        >
          <InputLabel>Sort By</InputLabel>
          <Select
            value={props.sortBy}
            label="Sort By"
            onChange={(e) => props.setSortBy(e.target.value)}
          >
            <MenuItem value="recent">Most Recent</MenuItem>
            <MenuItem value="relevant">Most Relevant</MenuItem>
            <MenuItem value="salary">Salary</MenuItem>
          </Select>
        </FormControl>

        {/* Search Button */}
        <Button
            variant="contained"
            startIcon={<SearchIcon />}
            onClick={props.handleSearch}
            sx={{
                border: '1px solid rgb(31, 53, 140)',
                color: 'blue',
                fontWeight: 'bold', // Makes text bold
                fontSize: '12px', // Increases the font size
                textTransform: 'none', // Prevents automatic uppercase transformation
                borderRadius: '20px',
                backgroundColor: 'white',
                height: '30px',
                minWidth: '70px',
                '&:hover': {
                    backgroundColor: 'rgb(227, 245, 255)', 
                    border: '2px solid rgb(31, 53, 140)',

                },
            }}
        >
            Search
        </Button>



      </Box>
    </Box>
  );
};

export default JobSearchHeader;
