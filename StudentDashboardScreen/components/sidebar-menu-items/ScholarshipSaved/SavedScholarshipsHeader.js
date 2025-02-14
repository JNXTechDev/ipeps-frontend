import React from 'react';
import { Box, TextField, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import logoImage from '../../../../../../components/images/logonav.png';

const SavedScholarshipsHeader = ({ isCollapsed, searchQuery, setSearchQuery }) => {
  const inputStyles = {
    backgroundColor: 'rgb(213, 217, 230)',
    borderRadius: '4px',
    '& .MuiOutlinedInput-notchedOutline': {
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
      <Box sx={{ 
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        maxWidth: '1600px',
        margin: '0 auto',
      }}>
        <img src={logoImage} alt="Logo" style={{ height: '40px' }} />
        <TextField
          sx={{ width: '300px', ...inputStyles }}
          label="Search saved scholarships..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          variant="outlined"
          size="small"
        />
        <Button
          variant="contained"
          startIcon={<SearchIcon />}
          sx={{
            border: '1px solid rgb(31, 53, 140)',
            color: 'blue',
            fontWeight: 'bold',
            fontSize: '12px',
            textTransform: 'none',
            borderRadius: '20px',
            backgroundColor: 'white',
            height: '30px',
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

export default SavedScholarshipsHeader;
