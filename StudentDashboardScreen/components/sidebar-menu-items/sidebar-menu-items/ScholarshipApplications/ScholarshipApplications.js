import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Paper, Chip, Avatar } from '@mui/material';
import { School, AccessTime, Payment } from '@mui/icons-material';
import ScholarshipApplicationsHeader from './ScholarshipApplicationsHeader';
import ScholarshipApplicationView from './ScholarshipApplicationView';

const ScholarshipApplications = ({ isCollapsed }) => {
  const [appliedScholarships, setAppliedScholarships] = useState([]);
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [applicationTimes, setApplicationTimes] = useState({});
  const headerHeight = '72px';

  useEffect(() => {
    const loadApplications = () => {
      const appliedItemsList = JSON.parse(localStorage.getItem('appliedItems') || '{}');
      const applicationTimesList = JSON.parse(localStorage.getItem('applicationTimes') || '{}');
      const allScholarships = JSON.parse(localStorage.getItem('allScholarships') || '[]');

      const appliedScholarshipsData = Object.keys(appliedItemsList)
        .filter(key => key.startsWith('scholarship-') && appliedItemsList[key])
        .map(key => {
          const scholarshipId = parseInt(key.replace('scholarship-', ''));
          const scholarship = allScholarships.find(s => s.id === scholarshipId);
          if (scholarship) {
            return {
              ...scholarship,
              applicationTime: applicationTimesList[`scholarship-${scholarshipId}`]
            };
          }
          return null;
        })
        .filter(Boolean);

      setAppliedScholarships(appliedScholarshipsData);
      setApplicationTimes(applicationTimesList);
    };

    loadApplications();
    window.addEventListener('storage', loadApplications);
    return () => window.removeEventListener('storage', loadApplications);
  }, []);

  const handleWithdrawal = (scholarshipId) => {
    // Remove from local state first
    setAppliedScholarships(prev => prev.filter(s => s.id !== scholarshipId));
    setSelectedScholarship(null);

    // Update localStorage
    const appliedItems = JSON.parse(localStorage.getItem('appliedItems') || '{}');
    const applicationTimes = JSON.parse(localStorage.getItem('applicationTimes') || '{}');
    const allScholarships = JSON.parse(localStorage.getItem('allScholarships') || '[]');

    // Remove from applied items
    delete appliedItems[`scholarship-${scholarshipId}`];
    delete applicationTimes[`scholarship-${scholarshipId}`];

    // Update localStorage
    localStorage.setItem('appliedItems', JSON.stringify(appliedItems));
    localStorage.setItem('applicationTimes', JSON.stringify(applicationTimes));
    
    // Trigger update
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <Box>
      <ScholarshipApplicationsHeader
        isCollapsed={isCollapsed}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={() => console.log('Searching scholarships...')}
      />

      <Box sx={{ 
        display: 'flex',
        position: 'fixed',
        top: headerHeight,
        left: isCollapsed ? '80px' : '250px',
        right: 0,
        bottom: 0,
        transition: 'left 0.3s'
      }}>
        {/* Applications List Panel */}
        <Box sx={{ 
          width: '60%',
          height: '100%',
          overflowY: 'auto',
          p: 3,
          borderRight: '1px solid rgba(0, 0, 0, 0.12)',
        }}>
          <Typography variant="h4" gutterBottom>
            Scholarship Applications
          </Typography>
          <Grid container spacing={2}>
            {appliedScholarships.map(scholarship => (
              <Grid item xs={12} key={scholarship.id}>
                <Paper
                  elevation={0}
                  onClick={() => setSelectedScholarship(scholarship)}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: selectedScholarship?.id === scholarship.id ? 'primary.main' : 'divider',
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
                      src={scholarship.scholarshipImage}
                      sx={{ width: 60, height: 60 }}
                    >
                      {scholarship.provider[0]}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6">{scholarship.title}</Typography>
                      <Typography color="text.secondary" gutterBottom>
                        {scholarship.provider}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                        <Chip icon={<School />} label={scholarship.type} size="small" />
                        <Chip icon={<Payment />} label={scholarship.value} size="small" />
                        <Chip icon={<AccessTime />} label={scholarship.deadline} size="small" />
                      </Box>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            ))}
            {appliedScholarships.length === 0 && (
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
                    No scholarship applications yet
                  </Typography>
                </Paper>
              </Grid>
            )}
          </Grid>
        </Box>

        {/* Application View Panel */}
        <Box sx={{ 
          width: '40%',
          height: '100%',
          overflowY: 'auto',
          backgroundColor: 'white',
        }}>
          <ScholarshipApplicationView 
            scholarship={selectedScholarship} 
            onWithdraw={handleWithdrawal}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ScholarshipApplications;
