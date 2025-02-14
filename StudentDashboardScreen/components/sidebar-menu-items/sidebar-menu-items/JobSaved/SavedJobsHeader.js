import React from 'react';
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { tokens } from '../../../../../../theme';
import logoImage from '../../../../../../components/images/logonav.png';

const SavedJobsHeader = ({ isCollapsed, ...props }) => {
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
        transition: 'left 0.3s', // Ensure smooth transition
      }}
    >
      <Box 
        sx={{ 
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          maxWidth: '1600px',
          margin: '0 auto',
        }}
      >
        <img src={logoImage} alt="Company Logo" style={{ height: '40px', width: 'auto' }} />

        <TextField
          sx={{ width: '300px', ...inputStyles }}
          label="Search saved jobs..."
          value={props.searchQuery}
          onChange={(e) => props.setSearchQuery(e.target.value)}
          variant="outlined"
          size="small"
        />

        <FormControl sx={{ width: '200px', ...inputStyles }} size="small">
          <InputLabel>Sort By</InputLabel>
          <Select
            value={props.sortBy}
            label="Sort By"
            onChange={(e) => props.setSortBy(e.target.value)}
          >
            <MenuItem value="recent">Most Recent</MenuItem>
            <MenuItem value="relevant">Most Relevant</MenuItem>
            <MenuItem value="company">Company Name</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          startIcon={<SearchIcon />}
          onClick={props.handleSearch}
          sx={{
            border: '1px solid rgb(31, 53, 140)',
            color: 'blue',
            fontWeight: 'bold',
            fontSize: '12px',
            textTransform: 'none',
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

export default SavedJobsHeader;
