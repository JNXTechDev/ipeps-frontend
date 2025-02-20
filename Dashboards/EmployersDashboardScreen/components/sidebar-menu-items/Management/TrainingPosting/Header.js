import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, TextField, Button, Avatar, Typography
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Timeline } from '@mui/icons-material';
// Update the import path to use the correct relative path
import logoImage from '../../../../../../../components/images/logonav.png';

const Header = ({ isCollapsed, ...props }) => {
  const navigate = useNavigate();

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
      <Box 
        sx={{ 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          maxWidth: '1600px',
          margin: '0 auto',
        }}
      >
        {/* Left section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <img src={logoImage} alt="Company Logo" style={{ height: '40px', width: 'auto' }} />

          <TextField
            sx={{ width: '300px', ...inputStyles }}
            label="Search Training"
            value={props.searchQuery}
            onChange={(e) => props.setSearchQuery(e.target.value)}
            variant="outlined"
            size="small"
          />

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

        {/* Right section - Profile Completion */}
        <Box 
          onClick={() => navigate('/dashboard/student/settings')}
          sx={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: 2,
            cursor: 'pointer',
            backgroundColor: 'rgba(0,0,0,0.02)',
            padding: '8px 16px',
            borderRadius: '20px',
            transition: 'background-color 0.2s',
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.04)',
            }
          }}
        >
          <Avatar sx={{ bgcolor: '#9c27b0', width: 32, height: 32 }}>
            <Timeline fontSize="small" />
          </Avatar>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Profile Completion
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              20%
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

// Make sure to export the component
export default Header;
