import React from 'react';
import { Box, Typography, Button, Divider, Stack } from '@mui/material';
import { useTheme } from '@mui/material';
import { tokens } from '../../../../../../theme';

const ScholarshipApplicationView = ({ scholarship, onWithdraw }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Add early return if no scholarship
  if (!scholarship) {
    return (
      <Box sx={{ 
        height: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        p: 3 
      }}>
        <Typography variant="h6" color="textSecondary">
          Select a scholarship application to view details
        </Typography>
      </Box>
    );
  }

  const canWithdraw = () => {
    if (!scholarship?.applicationTime) return false;
    const now = new Date().getTime();
    const timeLeft = (scholarship.applicationTime + 24 * 60 * 60 * 1000) - now;
    return timeLeft > 0;
  };

  const getTimeRemaining = () => {
    if (!scholarship?.applicationTime) return null;
    const now = new Date().getTime();
    const timeLeft = (scholarship.applicationTime + 24 * 60 * 60 * 1000) - now;
    if (timeLeft <= 0) return null;
    
    const hours = Math.floor(timeLeft / (60 * 60 * 1000));
    const minutes = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000));
    return `${hours}h ${minutes}m remaining to withdraw`;
  };

  const handleWithdraw = () => {
    if (!canWithdraw()) return;
    if (!scholarship?.id) return;
    
    onWithdraw(scholarship.id);
  };

  return (
    <Box sx={{ height: '100%', position: 'relative' }}>
      <Box sx={{ height: '100%', overflowY: 'auto', p: 3 }}>
        {/* Scholarship Image */}
        <Box sx={{ 
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mb: 4,
          height: '300px',
          width: '100%',
          overflow: 'hidden',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
        }}>
          <img 
            src={scholarship.scholarshipImage}
            alt={scholarship.title}
            style={{ 
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              padding: '16px',
            }}
          />
        </Box>

        {/* Scholarship Details */}
        <Typography variant="h4" gutterBottom>{scholarship.title}</Typography>
        <Typography variant="h5" color="primary" gutterBottom>{scholarship.provider}</Typography>
        
        <Stack spacing={1} sx={{ mb: 3 }}>
          <Typography variant="body1">🎓 Coverage: {scholarship.coverage}</Typography>
          <Typography variant="body1">⏳ Deadline: {scholarship.deadline}</Typography>
          <Typography variant="body1">💰 Value: {scholarship.value}</Typography>
          <Typography variant="body1">⌛ Duration: {scholarship.duration}</Typography>
        </Stack>

        {/* Withdrawal Button */}
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
                  },
                  cursor: 'pointer'
                }}
              >
                Withdraw Application
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

        {/* Requirements and Description */}
        <Divider sx={{ my: 3 }} />
        <Typography variant="h6" gutterBottom>Requirements</Typography>
        <Box sx={{ mb: 3 }}>
          {scholarship.requirements?.map((req, index) => (
            <Typography key={index} variant="body1" sx={{ mb: 1 }}>
              • {req}
            </Typography>
          ))}
        </Box>

        <Typography variant="h6" gutterBottom>Description</Typography>
        <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
          {scholarship.description}
        </Typography>
      </Box>
    </Box>
  );
};

export default ScholarshipApplicationView;
