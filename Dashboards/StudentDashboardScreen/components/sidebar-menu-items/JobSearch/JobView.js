import React from 'react';
import {
  Box,
  Typography,
  Button,
  Divider,
  Paper,
  Stack,
  IconButton,

} from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'; // Unselected state
import BookmarkIcon from '@mui/icons-material/Bookmark'; // Selected state
import { tokens } from '../../../../../../theme';
import { useTheme } from '@mui/material';

const JobView = ({
  job,
  isSaved = false,
  isApplied = false,
  canWithdraw = false,
  applicationTime = null,
  onSave = () => {},
  onApply = () => {},
  onWithdraw = () => {},
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  const getTimeRemaining = () => {
    if (!applicationTime) return null;
    const now = new Date().getTime();
    const timeLeft = (applicationTime + 24 * 60 * 60 * 1000) - now;
    if (timeLeft <= 0) return null;
    
    const hours = Math.floor(timeLeft / (60 * 60 * 1000));
    const minutes = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000));
    return `${hours}h ${minutes}m remaining to withdraw`;
  };

  const buttonStyles = {
    common: {  // Add common styles for both buttons
      height: '36.5px',  // Set same height for both buttons
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    apply: {
        backgroundColor: isApplied 
          ? canWithdraw 
            ? '#dc3545' // Red for withdraw
            : '#218838' // Green for already applied
          : '#007BFF', // Blue for apply
        color: '#ffffff',
        '&:hover': {
          backgroundColor: isApplied
            ? canWithdraw
              ? '#c82333' // Darker red
              : '#1E7E34' // Darker green
            : '#0056b3', // Darker blue
        }
      },
    save: {
      backgroundColor: 'white',
      color: isSaved ? '#007BFF' : '#000000',
      border: '1px solid #e0e0e0',
      '&:hover': {
        backgroundColor: '#E3F2FD', // Light blue background on hover
        color: '#007BFF', // Blue text on hover
        border: '1px solid #007BFF'
      }
    },
 
  };

  return (
    <Box 
      sx={{ 
        height: '100%',
        position: 'relative',
      }}
    >
      <Box 
        sx={{ 
          height: '100%',
          overflowY: 'auto',
          p: 3
        }}
      >
        {/* Company Image with fixed size and center alignment */}
        <Box 
          sx={{ 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mb: 4,
            height: '300px', // Fixed height
            width: '100%',
            overflow: 'hidden',
            backgroundColor: '#f5f5f5', // Light background for image container
            borderRadius: '8px',
          }}
        >
          <img 
            src={job.companyImage || 'default-company-image.png'} 
            alt={job.company}
            style={{ 
              width: '100%',
              height: '100%',
              objectFit: 'contain', // Maintains aspect ratio
              padding: '16px', // Add some padding inside the container
            }}
          />
        </Box>

        {/* Job Details */}
        <Typography variant="h4" gutterBottom>{job.title}</Typography>
        <Typography variant="h5" color="primary" gutterBottom>{job.company}</Typography>
        
        <Stack spacing={1} sx={{ mb: 3 }}>
          <Typography variant="body1">📍 {job.location}</Typography>
          <Typography variant="body1">💼 {job.type}</Typography>
          <Typography variant="body1">👥 Vacancies: {job.vacancies}</Typography>
          <Typography variant="body1">💰 {job.salary}</Typography>
        </Stack>

        {/* Action Buttons - Swapped order */}
        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
          <Box sx={{ flex: 1 }}> {/* Apply button now first */}
            <Button
              variant="contained"
              fullWidth
              onClick={isApplied && canWithdraw ? onWithdraw : onApply}
              sx={{ ...buttonStyles.common, ...buttonStyles.apply }}
            >
              {isApplied 
                ? canWithdraw 
                  ? 'Withdraw Application' 
                  : 'Already Applied'
                : 'Apply'}
            </Button>
            {isApplied && canWithdraw && (
              <Typography 
                variant="caption" 
                sx={{ 
                  display: 'block', 
                  textAlign: 'center', 
                  mt: 1,
                  color: '#dc3545'
                }}
              >
                {getTimeRemaining()}
              </Typography>
            )}
          </Box>
          <Box sx={{ width: '120px' }}> {/* Save button now second */}
            <Button
              variant="contained"
              fullWidth
              onClick={onSave}
              sx={{ ...buttonStyles.common, ...buttonStyles.save }}
              startIcon={isSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />} // Add icon here
              >
              {isSaved ? 'Saved' : 'Save'}
            </Button>
          </Box>
        </Stack>

        <Divider sx={{ my: 3 }} />

        {/* Job Description */}
        <Typography variant="h6" gutterBottom>Work Description</Typography>
        <Typography variant="body1">
          {job.description}
        </Typography>
      </Box>
    </Box>
  );
};

export default JobView;
