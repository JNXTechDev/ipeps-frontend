import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Paper, Chip, Avatar, Button } from '@mui/material';
import { AccessTime, LocationOn, Payment } from '@mui/icons-material';
import JobApplicationsHeader from './JobApplicationsHeader';
import JobApplicationView from './JobApplicationView';

const JobApplications = ({ isCollapsed }) => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [applicationTimes, setApplicationTimes] = useState({});
  const headerHeight = '72px';

  useEffect(() => {
    const loadApplications = () => {
      const appliedItemsList = JSON.parse(localStorage.getItem('appliedItems') || '{}');
      const applicationTimesList = JSON.parse(localStorage.getItem('applicationTimes') || '{}');
      const allJobs = JSON.parse(localStorage.getItem('allJobs') || '[]');

      const appliedJobsData = Object.keys(appliedItemsList)
        .filter(key => key.startsWith('job-') && appliedItemsList[key])
        .map(key => {
          const jobId = parseInt(key.replace('job-', ''));
          const job = allJobs.find(job => job.id === jobId);
          if (job) {
            return {
              ...job,
              applicationTime: applicationTimesList[`job-${jobId}`]
            };
          }
          return null;
        })
        .filter(Boolean);

      setAppliedJobs(appliedJobsData);
      setApplicationTimes(applicationTimesList);
    };

    loadApplications();
    window.addEventListener('storage', loadApplications);
    return () => window.removeEventListener('storage', loadApplications);
  }, []);

  const canWithdraw = (jobId) => {
    const applicationTime = applicationTimes[`job-${jobId}`];
    if (!applicationTime) return false;
    const now = new Date().getTime();
    const timeDiff = now - applicationTime;
    return timeDiff <= 24 * 60 * 60 * 1000; // 24 hours
  };

  const getTimeRemaining = (jobId) => {
    const applicationTime = applicationTimes[`job-${jobId}`];
    if (!applicationTime) return null;
    const now = new Date().getTime();
    const timeLeft = (applicationTime + 24 * 60 * 60 * 1000) - now;
    if (timeLeft <= 0) return 'Application submitted';
    
    const hours = Math.floor(timeLeft / (60 * 60 * 1000));
    const minutes = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000));
    return `${hours}h ${minutes}m remaining to withdraw`;
  };

  const handleWithdrawal = (jobId) => {
    // Remove the job from the applied jobs list
    setAppliedJobs(prev => prev.filter(job => job.id !== jobId));
    
    // Immediately clear the selected application
    setSelectedApplication(null);
    
    // Update localStorage (if needed)
    const appliedItems = JSON.parse(localStorage.getItem('appliedItems') || '{}');
    const applicationTimes = JSON.parse(localStorage.getItem('applicationTimes') || '{}');

    delete appliedItems[`job-${jobId}`];
    delete applicationTimes[`job-${jobId}`];

    localStorage.setItem('appliedItems', JSON.stringify(appliedItems));
    localStorage.setItem('applicationTimes', JSON.stringify(applicationTimes));
  };

  return (
    <Box>
        <JobApplicationsHeader
        isCollapsed={isCollapsed}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={() => console.log('Searching applications...')}
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
        {/* Applications List Panel */}
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
            Job Applications
          </Typography>
          <Grid container spacing={2}>
            {appliedJobs.map(job => (
              <Grid item xs={12} key={job.id}>
                <Paper
                  elevation={0}
                  onClick={() => setSelectedApplication(job)}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: selectedApplication?.id === job.id ? 'primary.main' : 'divider',
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
                      src={job.companyImage}
                      sx={{ width: 60, height: 60 }}
                    >
                      {job.company[0]}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6">{job.title}</Typography>
                      <Typography color="text.secondary" gutterBottom>
                        {job.company}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                        <Chip icon={<LocationOn />} label={job.location} size="small" />
                        <Chip icon={<Payment />} label={job.salary} size="small" />
                        <Chip 
                          icon={<AccessTime />} 
                          label={getTimeRemaining(job.id)}
                          size="small" 
                          color={canWithdraw(job.id) ? "error" : "success"}
                        />
                      </Box>
                      <Box>
                        {job.skills?.map(skill => (
                          <Chip
                            key={skill}
                            label={skill}
                            size="small"
                            sx={{ mr: 1, mb: 1 }}
                          />
                        ))}
                      </Box>
                    </Box>

                  </Box>
                </Paper>
              </Grid>
            ))}
            {appliedJobs.length === 0 && (
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
                    No job applications yet
                  </Typography>
                </Paper>
              </Grid>
            )}
          </Grid>
        </Box>

        {/* Application View Panel */}
        <Box 
          sx={{ 
            width: '40%',
            height: '100%',
            overflowY: 'auto',
            backgroundColor: 'white',
          }}
        >
          <JobApplicationView 
            application={selectedApplication} 
            onWithdraw={handleWithdrawal}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default JobApplications;
