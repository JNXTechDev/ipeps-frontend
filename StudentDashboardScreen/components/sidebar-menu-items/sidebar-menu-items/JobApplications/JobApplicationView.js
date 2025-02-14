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

const JobApplicationView = ({ application, onWithdraw }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  if (!application) return null;

  const canWithdraw = () => {
    if (!application?.applicationTime) return false;
    const now = new Date().getTime();
    const timeLeft = (application.applicationTime + 24 * 60 * 60 * 1000) - now;
    return timeLeft > 0;
  };

  const getTimeRemaining = () => {
    if (!application?.applicationTime) return null;
    const now = new Date().getTime();
    const timeLeft = (application.applicationTime + 24 * 60 * 60 * 1000) - now;
    if (timeLeft <= 0) return 'Application confirmed';
    
    const hours = Math.floor(timeLeft / (60 * 60 * 1000));
    const minutes = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000));
    return `${hours}h ${minutes}m remaining to withdraw`;
  };

  const handleWithdraw = () => {
    if (!canWithdraw()) return;
    
    const appliedItems = JSON.parse(localStorage.getItem('appliedItems') || '{}');
    const applicationTimes = JSON.parse(localStorage.getItem('applicationTimes') || '{}');

    delete appliedItems[`job-${application.id}`];
    delete applicationTimes[`job-${application.id}`];

    localStorage.setItem('appliedItems', JSON.stringify(appliedItems));
    localStorage.setItem('applicationTimes', JSON.stringify(applicationTimes));
    
    // Call parent's onWithdraw to update the list and clear selection
    onWithdraw(application.id);
    
    // Trigger storage event to update other components
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <Box sx={{ height: '100%', position: 'relative' }}>
      <Box sx={{ height: '100%', overflowY: 'auto', p: 3 }}>
        {/* Company Image */}
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
            src={application.companyImage || 'default-company-image.png'} 
            alt={application.company}
            style={{ 
              width: '100%',
              height: '100%',
              objectFit: 'contain', // Maintains aspect ratio
              padding: '16px', // Add some padding inside the container
            }}
          />
        </Box>

        {/* Job Details */}
        <Typography variant="h4" gutterBottom>{application.title}</Typography>
        <Typography variant="h5" color="primary" gutterBottom>{application.company}</Typography>
        
        <Stack spacing={1} sx={{ mb: 3 }}>
          <Typography variant="body1">📍 {application.location}</Typography>
          <Typography variant="body1">💼 {application.type}</Typography>
          <Typography variant="body1">👥 Vacancies: {application.vacancies}</Typography>
          <Typography variant="body1">💰 {application.salary}</Typography>
        </Stack>

        {/* Action Button */}
        <Box sx={{ flex: 1, mb: 3 }}>
          <Button
            variant="contained"
            fullWidth
            onClick={handleWithdraw}
            disabled={!canWithdraw()}
            sx={{
              height: '36.5px',
              backgroundColor: canWithdraw() ? '#dc3545' : '#28a745',
              color: '#ffffff',
              '&:hover': {
                backgroundColor: canWithdraw() ? '#c82333' : '#218838',
              },
              '&.Mui-disabled': {
                backgroundColor: '#28a745',
                color: '#ffffff'
              }
            }}
          >
            {canWithdraw() ? 'Withdraw Application' : 'Application Confirmed'}
          </Button>
          {canWithdraw() && (
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

        <Divider sx={{ my: 3 }} />

        {/* Job Description */}
        <Typography variant="h6" gutterBottom>Work Description</Typography>
        <Typography variant="body1">
          {application.description}
        </Typography>
      </Box>
    </Box>
  );
};

export default JobApplicationView;
