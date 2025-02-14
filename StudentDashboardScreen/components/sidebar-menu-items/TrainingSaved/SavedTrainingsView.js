import React from 'react';
import { Box, Typography, Button, Divider, Stack } from '@mui/material';
import { useTheme } from '@mui/material';
import { tokens } from '../../../../../../theme';

const SavedTrainingsView = ({ 
  training, 
  isEnrolled = false,
  onEnroll = () => {},
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const buttonStyles = {
    common: {
      height: '36.5px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    enroll: {
      backgroundColor: isEnrolled ? '#218838' : '#007BFF',
      color: '#ffffff',
      '&:hover': {
        backgroundColor: isEnrolled ? '#1E7E34' : '#0056b3',
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
            src={training.companyImage} // Changed from providerImage to companyImage
            alt={training.company} // Changed from provider to company
            style={{ 
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              padding: '16px',
            }}
          />
        </Box>

        <Typography variant="h4" gutterBottom>{training.title}</Typography>
        <Typography variant="h5" color="primary" gutterBottom>{training.company}</Typography> {/* Changed from provider to company */}
        
        <Stack spacing={1} sx={{ mb: 3 }}>
          <Typography variant="body1">📍 {training.location}</Typography>
          <Typography variant="body1">⏱️ Duration: {training.duration}</Typography>
          <Typography variant="body1">📅 Start Date: {training.startDate}</Typography>
          <Typography variant="body1">💰 Cost: {training.cost}</Typography>
        </Stack>

        <Box sx={{ width: '100%', mb: 3 }}>
          <Button
            variant="contained"
            fullWidth
            onClick={onEnroll}
            sx={{ ...buttonStyles.common, ...buttonStyles.enroll }}
          >
            {isEnrolled ? 'Enrolled' : 'Enroll Now'}
          </Button>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>Course Description</Typography>
        <Typography variant="body1" style={{ whiteSpace: 'pre-line' }}>
          {training.description}
        </Typography>
      </Box>
    </Box>
  );
};

export default SavedTrainingsView;
