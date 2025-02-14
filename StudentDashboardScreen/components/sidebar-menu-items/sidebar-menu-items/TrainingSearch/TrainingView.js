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

const TrainingView = ({
  training,
  isSaved = false,
  isEnrolled = false,  // Changed from isApplied
  canWithdraw = false,
  enrollmentTime = null,  // Changed from applicationTime
  onSave = () => {},
  onEnroll = () => {},  // Changed from onApply
  onWithdraw = () => {},
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  const getTimeRemaining = () => {
    if (!enrollmentTime) return null;  // Changed variable name
    const now = new Date().getTime();
    const timeLeft = (enrollmentTime + 24 * 60 * 60 * 1000) - now;
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
    apply: {  // Keep name for consistency
        backgroundColor: isEnrolled  // Changed from isApplied
          ? canWithdraw 
            ? '#dc3545' // Red for withdraw
            : '#218838' // Green for already enrolled
          : '#007BFF', // Blue for enroll
        color: '#ffffff',
        '&:hover': {
          backgroundColor: isEnrolled  // Changed from isApplied
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
            src={training.companyImage || 'default-company-image.png'} 
            alt={training.company}
            style={{ 
              width: '100%',
              height: '100%',
              objectFit: 'contain', // Maintains aspect ratio
              padding: '16px', // Add some padding inside the container
            }}
          />
        </Box>

        {/* training Details */}
        <Typography variant="h4" gutterBottom>{training.title}</Typography>
        <Typography variant="h5" color="primary" gutterBottom>{training.company}</Typography>
        
        <Stack spacing={1} sx={{ mb: 3 }}>
          <Typography variant="body1">📍 {training.location}</Typography>
          <Typography variant="body1">💼 {training.type}</Typography>
          <Typography variant="body1">👥 Vacancies: {training.vacancies}</Typography>
          <Typography variant="body1">💰 {training.salary}</Typography>
        </Stack>

        {/* Action Buttons - Swapped order */}
        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
          <Box sx={{ flex: 1 }}> {/* Enroll button now first */}
            <Button
              variant="contained"
              fullWidth
              onClick={isEnrolled && canWithdraw ? onWithdraw : onEnroll}  // Changed from onApply
              sx={{ ...buttonStyles.common, ...buttonStyles.apply }}
            >
              {isEnrolled  // Changed from isApplied
                ? canWithdraw 
                  ? 'Withdraw Enrollment'  // Changed text
                  : 'Already Enrolled'  // Changed text
                : 'Enroll Now'  // Changed text
              }
            </Button>
            {isEnrolled && canWithdraw && (  // Changed from isApplied
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

        {/* Trainig Description */}
        <Typography variant="h6" gutterBottom>Training Description</Typography>
        <Typography variant="body1">
          {training.description}
        </Typography>
      </Box>
    </Box>
  );
};

export default TrainingView;
