import React from 'react';
import {
  Box,
  Typography,
  Button,
  Divider,
  Stack,
} from '@mui/material';
import { useTheme } from '@mui/material';
import { tokens } from '../../../../../../theme';

const TrainingApplicationView = ({ training, onWithdraw }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  if (!training) return null;

  const canWithdraw = () => {
    if (!training?.enrollmentTime) return false;
    const now = new Date().getTime();
    const timeLeft = (training.enrollmentTime + 24 * 60 * 60 * 1000) - now;
    return timeLeft > 0;
  };

  const getTimeRemaining = () => {
    if (!training?.enrollmentTime) return null;
    const now = new Date().getTime();
    const timeLeft = (training.enrollmentTime + 24 * 60 * 60 * 1000) - now;
    if (timeLeft <= 0) return null;
    
    const hours = Math.floor(timeLeft / (60 * 60 * 1000));
    const minutes = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000));
    return `${hours}h ${minutes}m remaining to withdraw`;
  };

  const handleWithdraw = () => {
    if (!canWithdraw()) return;
    
    const appliedItems = JSON.parse(localStorage.getItem('appliedItems') || '{}');
    const applicationTimes = JSON.parse(localStorage.getItem('applicationTimes') || '{}');

    delete appliedItems[`training-${training.id}`];
    delete applicationTimes[`training-${training.id}`];

    localStorage.setItem('appliedItems', JSON.stringify(appliedItems));
    localStorage.setItem('applicationTimes', JSON.stringify(applicationTimes));
    
    onWithdraw(training.id);
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <Box sx={{ height: '100%', position: 'relative' }}>
      <Box sx={{ height: '100%', overflowY: 'auto', p: 3 }}>
        {/* Training Image */}
        <Box sx={{ /* ...existing image box styles... */ }}>
          <img 
            src={training.companyImage || 'default-company-image.png'} 
            alt={training.provider}
            style={{ /* ...existing image styles... */ }}
          />
        </Box>

        {/* Training Details */}
        <Typography variant="h4" gutterBottom>{training.title}</Typography>
        <Typography variant="h5" color="primary" gutterBottom>{training.provider}</Typography>
        
        <Stack spacing={1} sx={{ mb: 3 }}>
          <Typography variant="body1">📍 {training.location}</Typography>
          <Typography variant="body1">⏱️ {training.duration}</Typography>
          <Typography variant="body1">💰 {training.cost}</Typography>
          <Typography variant="body1">📅 Starts: {training.startDate}</Typography>
        </Stack>

        {/* Action Button */}
        <Box sx={{ flex: 1, mb: 3 }}>
          {canWithdraw() && (
            <>
              <Button
                variant="contained"
                fullWidth
                onClick={handleWithdraw}
                sx={{
                  height: '36.5px',
                  backgroundColor: '#dc3545',
                  color: '#ffffff',
                  '&:hover': {
                    backgroundColor: '#c82333',
                  }
                }}
              >
                Withdraw Enrollment
              </Button>
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
            </>
          )}
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Training Description */}
        <Typography variant="h6" gutterBottom>Training Description</Typography>
        <Typography variant="body1">
          {training.description}
        </Typography>
      </Box>
    </Box>
  );
};

export default TrainingApplicationView;
