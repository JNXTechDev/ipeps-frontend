import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Paper, Chip, Avatar, Button } from '@mui/material';
import { AccessTime, School, Payment } from '@mui/icons-material';
import TrainingApplicationsHeader from './TrainingApplicationsHeader';
import TrainingApplicationView from './TrainingApplicationView';

const TrainingApplications = ({ isCollapsed }) => {
  const [enrolledTrainings, setEnrolledTrainings] = useState([]);
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [enrollmentTimes, setEnrollmentTimes] = useState({});
  const headerHeight = '72px';

  useEffect(() => {
    const loadEnrollments = () => {
      const appliedItemsList = JSON.parse(localStorage.getItem('appliedItems') || '{}');
      const applicationTimesList = JSON.parse(localStorage.getItem('applicationTimes') || '{}');
      const allTrainings = JSON.parse(localStorage.getItem('allTrainings') || '[]');

      const enrolledTrainingsData = Object.keys(appliedItemsList)
        .filter(key => key.startsWith('training-') && appliedItemsList[key])
        .map(key => {
          const trainingId = parseInt(key.replace('training-', ''));
          const training = allTrainings.find(t => t.id === trainingId);
          if (training) {
            return {
              ...training,
              enrollmentTime: applicationTimesList[`training-${trainingId}`]
            };
          }
          return null;
        })
        .filter(Boolean);

      setEnrolledTrainings(enrolledTrainingsData);
      setEnrollmentTimes(applicationTimesList);
    };

    loadEnrollments();
    window.addEventListener('storage', loadEnrollments);
    return () => window.removeEventListener('storage', loadEnrollments);
  }, []);

  const handleWithdrawal = (trainingId) => {
    setEnrolledTrainings(prev => prev.filter(t => t.id !== trainingId));
    setSelectedTraining(null);

    const appliedItems = JSON.parse(localStorage.getItem('appliedItems') || '{}');
    const applicationTimes = JSON.parse(localStorage.getItem('applicationTimes') || '{}');

    delete appliedItems[`training-${trainingId}`];
    delete applicationTimes[`training-${trainingId}`];

    localStorage.setItem('appliedItems', JSON.stringify(appliedItems));
    localStorage.setItem('applicationTimes', JSON.stringify(applicationTimes));
  };

  const canWithdraw = (trainingId) => {
    const enrollmentTime = enrollmentTimes[`training-${trainingId}`];
    if (!enrollmentTime) return false;
    const now = new Date().getTime();
    const timeDiff = now - enrollmentTime;
    return timeDiff <= 24 * 60 * 60 * 1000;
  };

  const getTimeRemaining = (trainingId) => {
    const enrollmentTime = enrollmentTimes[`training-${trainingId}`];
    if (!enrollmentTime) return null;
    const now = new Date().getTime();
    const timeLeft = (enrollmentTime + 24 * 60 * 60 * 1000) - now;
    if (timeLeft <= 0) return 'Enrollment confirmed';
    
    const hours = Math.floor(timeLeft / (60 * 60 * 1000));
    const minutes = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000));
    return `${hours}h ${minutes}m remaining to withdraw`;
  };

  return (
    <Box>
      <TrainingApplicationsHeader
        isCollapsed={isCollapsed}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={() => console.log('Searching enrollments...')}
      />

      <Box 
        sx={{ 
          display: 'flex',
          position: 'fixed',
          top: headerHeight,
          left: isCollapsed ? '80px' : '250px',
          right: 0,
          bottom: 0,
          transition: 'left 0.3s'
        }}
      >
        {/* Training List Panel */}
        <Box 
          sx={{ 
            width: '60%',
            height: '100%',
            overflowY: 'auto',
            p: 3,
            borderRight: '1px solid rgba(0, 0, 0, 0.12)',
          }}
        >
          <Typography variant="h4" gutterBottom>
            Training Enrollments
          </Typography>
          <Grid container spacing={2}>
            {enrolledTrainings.map(training => (
              <Grid item xs={12} key={training.id}>
                <Paper
                  elevation={0}
                  onClick={() => setSelectedTraining(training)}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: selectedTraining?.id === training.id ? 'primary.main' : 'divider',
                    cursor: 'pointer',
                    '&:hover': {
                      borderColor: 'primary.main',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <Avatar
                      variant="rounded"
                      src={training.companyImage}
                      sx={{ width: 60, height: 60 }}
                    >
                      {training.provider[0]}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6">{training.title}</Typography>
                      <Typography color="text.secondary" gutterBottom>
                        {training.provider}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                        <Chip icon={<School />} label={training.level} size="small" />
                        <Chip icon={<AccessTime />} label={training.duration} size="small" />
                        <Chip 
                          icon={<AccessTime />} 
                          label={getTimeRemaining(training.id)}
                          size="small" 
                          color={canWithdraw(training.id) ? "error" : "success"}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            ))}
            {enrolledTrainings.length === 0 && (
              <Grid item xs={12}>
                <Paper 
                  elevation={0}
                  sx={{ 
                    p: 4,
                    textAlign: 'center',
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'divider'
                  }}
                >
                  <Typography color="text.secondary">
                    No training enrollments yet
                  </Typography>
                </Paper>
              </Grid>
            )}
          </Grid>
        </Box>

        {/* Training View Panel */}
        <Box 
          sx={{ 
            width: '40%',
            height: '100%',
            overflowY: 'auto',
            backgroundColor: 'white',
          }}
        >
          <TrainingApplicationView 
            training={selectedTraining} 
            onWithdraw={handleWithdrawal}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default TrainingApplications;
