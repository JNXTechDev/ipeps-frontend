import React from 'react';
import { Box, Typography, Button, Divider, Stack } from '@mui/material';
import { useTheme } from '@mui/material';
import { tokens } from '../../../../../../theme';

const SavedJobsView = ({ 
  job, 
  isApplied = false, 
  canWithdraw = false,
  applicationTime = null,
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
    common: {
      height: '36.5px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    apply: {
      backgroundColor: isApplied 
        ? canWithdraw 
          ? '#dc3545'
          : '#218838'
        : '#007BFF',
      color: '#ffffff',
      '&:hover': {
        backgroundColor: isApplied
          ? canWithdraw
            ? '#c82333'
            : '#1E7E34'
          : '#0056b3',
      }
    }
  };

  return (
    <Box sx={{ height: '100%', position: 'relative' }}>
      <Box sx={{ height: '100%', overflowY: 'auto', p: 3 }}>
        <Box 
          sx={{ 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mb: 4,
            height: '300px',
            width: '100%',
            overflow: 'hidden',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
          }}
        >
          <img 
            src={job.companyImage} 
            alt={job.company}
            style={{ 
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              padding: '16px',
            }}
          />
        </Box>

        <Typography variant="h4" gutterBottom>{job.title}</Typography>
        <Typography variant="h5" color="primary" gutterBottom>{job.company}</Typography>
        
        <Stack spacing={1} sx={{ mb: 3 }}>
          <Typography variant="body1">📍 {job.location}</Typography>
          <Typography variant="body1">💼 {job.type}</Typography>
          <Typography variant="body1">👥 Vacancies: {job.vacancies}</Typography>
          <Typography variant="body1">💰 {job.salary}</Typography>
        </Stack>

        <Box sx={{ width: '100%', mb: 3 }}>
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

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>Work Description</Typography>
        <Typography variant="body1">
          {job.description}
        </Typography>
      </Box>
    </Box>
  );
};

export default SavedJobsView;
