import React from 'react';
import { Box, Typography, Button, Divider, Stack } from '@mui/material';
import { useTheme } from '@mui/material';
import { tokens } from '../../../../../../theme';

const SavedScholarshipView = ({ scholarship, onApply, onRemove }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
          Select a scholarship to view details
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ height: '100%', position: 'relative' }}>
      <Box sx={{ height: '100%', overflowY: 'auto', p: 3 }}>
        {/* Scholarship Image */}
        <Box sx={{ /* ...existing image box styles... */ }}>
          <img 
            src={scholarship.scholarshipImage}
            alt={scholarship.title}
            style={{ /* ...existing image styles... */ }}
          />
        </Box>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <Button
            variant="contained"
            fullWidth
            onClick={() => onApply(scholarship.id)}
            sx={{
              height: '36.5px',
              backgroundColor: '#007bff',
              color: '#ffffff',
              '&:hover': {
                backgroundColor: '#0056b3',
              }
            }}
          >
            Apply Now
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => onRemove(scholarship.id)}
            sx={{ width: '120px' }}
          >
            Remove
          </Button>
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

        <Divider sx={{ my: 3 }} />

        {/* Requirements */}
        <Typography variant="h6" gutterBottom>Requirements</Typography>
        <Box sx={{ mb: 3 }}>
          {scholarship.requirements?.map((req, index) => (
            <Typography key={index} variant="body1" sx={{ mb: 1 }}>
              • {req}
            </Typography>
          ))}
        </Box>

        {/* Description */}
        <Typography variant="h6" gutterBottom>Description</Typography>
        <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
          {scholarship.description}
        </Typography>
      </Box>
    </Box>
  );
};

export default SavedScholarshipView;
