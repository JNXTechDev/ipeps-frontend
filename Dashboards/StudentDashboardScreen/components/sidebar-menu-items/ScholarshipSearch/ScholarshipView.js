import React from 'react';
import { Box, Typography, Button, Divider, Stack, IconButton } from '@mui/material';
import { School, AccessTime, Payment, BookmarkBorder, Bookmark } from '@mui/icons-material';

const ScholarshipView = ({ 
  scholarship,
  isSaved,
  isApplied,
  applicationTime,
  onSave,
  onApply,
  onWithdraw 
}) => {
  const canWithdraw = () => {
    if (!applicationTime) return false;
    const now = new Date().getTime();
    const timeLeft = (applicationTime + 24 * 60 * 60 * 1000) - now;
    return timeLeft > 0;
  };

  const getTimeRemaining = () => {
    if (!applicationTime) return null;
    const now = new Date().getTime();
    const timeLeft = (applicationTime + 24 * 60 * 60 * 1000) - now;
    if (timeLeft <= 0) return null;
    
    const hours = Math.floor(timeLeft / (60 * 60 * 1000));
    const minutes = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000));
    return `${hours}h ${minutes}m remaining to withdraw`;
  };

  return (
    <Box sx={{ height: '100%', position: 'relative' }}>
      <Box sx={{ height: '100%', overflowY: 'auto', p: 3 }}>
        {/* Scholarship Image */}
        <Box sx={{ /* ... image container styles ... */ }}>
          <img 
            src={scholarship.scholarshipImage}
            alt={scholarship.title}
            style={{ /* ... image styles ... */ }}
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

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <Button
            variant="contained"
            fullWidth
            onClick={isApplied ? (canWithdraw() ? onWithdraw : null) : onApply}
            sx={{
              height: '36.5px',
              backgroundColor: isApplied 
                ? canWithdraw() ? '#dc3545' : '#28a745'
                : '#007bff',
              color: '#ffffff',
              '&:hover': {
                backgroundColor: isApplied
                  ? canWithdraw() ? '#c82333' : '#218838'
                  : '#0056b3',
              },
            }}
          >
            {isApplied 
              ? (canWithdraw() ? 'Withdraw Application' : 'Applied')
              : 'Apply Now'
            }
          </Button>
          <Button
            variant="outlined"
            onClick={onSave}
            startIcon={isSaved ? <Bookmark /> : <BookmarkBorder />}
            sx={{ width: '120px' }}
          >
            {isSaved ? 'Saved' : 'Save'}
          </Button>
        </Box>

        {/* Withdrawal Timer */}
        {isApplied && canWithdraw() && (
          <Typography 
            variant="caption" 
            sx={{ 
              display: 'block', 
              textAlign: 'center', 
              mt: -2,
              mb: 3,
              color: '#dc3545'
            }}
          >
            {getTimeRemaining()}
          </Typography>
        )}

        <Divider sx={{ my: 3 }} />

        {/* Requirements */}
        <Typography variant="h6" gutterBottom>Requirements</Typography>
        <Box sx={{ mb: 3 }}>
          {scholarship.requirements.map((req, index) => (
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

export default ScholarshipView;
