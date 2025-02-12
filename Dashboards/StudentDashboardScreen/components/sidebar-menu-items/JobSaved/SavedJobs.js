import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, useTheme, Button } from '@mui/material';
import { tokens } from '../../../../../../theme';
import SavedJobsView from './SavedJobsView';
import SavedJobsHeader from './SavedJobsHeader'; // Make sure this line is correct

const SavedJobs = ({ isCollapsed }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [searchQuery, setSearchQuery] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [jobType, setJobType] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const headerHeight = '72px';
  const [appliedJobs, setAppliedJobs] = useState({});
  const [applicationTimes, setApplicationTimes] = useState({});
  const [savedJobs, setSavedJobs] = useState([]);

  React.useEffect(() => {
    const loadSavedJobs = () => {
      const jobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
      setSavedJobs(jobs);
    };

    loadSavedJobs();

    window.addEventListener('storage', loadSavedJobs);

    return () => window.removeEventListener('storage', loadSavedJobs);
  }, []);

  const handleApplyJob = (jobId) => {
    const now = new Date().getTime();
    setApplicationTimes(prev => ({
      ...prev,
      [jobId]: now
    }));
    setAppliedJobs(prev => ({
      ...prev,
      [jobId]: true
    }));
  };

  const handleWithdrawApplication = (jobId) => {
    setApplicationTimes(prev => {
      const newTimes = { ...prev };
      delete newTimes[jobId];
      return newTimes;
    });
    setAppliedJobs(prev => {
      const newApplied = { ...prev };
      delete newApplied[jobId];
      return newApplied;
    });
  };

  const canWithdraw = (jobId) => {
    if (!applicationTimes[jobId]) return false;
    const now = new Date().getTime();
    const applicationTime = applicationTimes[jobId];
    const timeDiff = now - applicationTime;
    return timeDiff <= 24 * 60 * 60 * 1000;
  };

  const handleSearch = () => {
    console.log('Searching saved jobs...');
  };

  const handleRemoveFromSaved = (jobId) => {
    const updatedJobs = savedJobs.filter(job => job.id !== jobId);
    localStorage.setItem('savedJobs', JSON.stringify(updatedJobs));
    setSavedJobs(updatedJobs);
  };

  return (
    <Box>
      <SavedJobsHeader // Replace JobSearchHeader with SavedJobsHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortBy={sortBy}
        setSortBy={setSortBy}
        handleSearch={handleSearch}
        isCollapsed={isCollapsed}
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
        <Box 
          sx={{ 
            width: '60%',
            height: '100%',
            overflowY: 'auto',
            p: 3,
            borderRight: '1px solid rgba(0, 0, 0, 0.12)',
          }}
        >
          <Typography variant="subtitle1" mb={2}>
            Saved Jobs: {savedJobs.length}
          </Typography>

          {savedJobs.map((job) => (
            <Card
              key={job.id}
              sx={{
                mb: 2,
                cursor: 'pointer',
                backgroundColor: selectedJob?.id === job.id ? '#f5f5f5' : 'white',
                '&:hover': { backgroundColor: colors.primary[400] }
              }}
              onClick={() => setSelectedJob(job)}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
                  <Button
                    size="small"
                    color="error"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFromSaved(job.id);
                    }}
                  >
                    Remove
                  </Button>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      flexShrink: 0,
                      backgroundColor: '#f5f5f5',
                      borderRadius: '8px',
                      overflow: 'hidden'
                    }}
                  >
                    <img
                      src={job.companyImage}
                      alt={job.company}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        padding: '8px'
                      }}
                    />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h5" component="div" gutterBottom>
                      {job.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {job.company} • {job.location}
                    </Typography>
                    <Typography variant="body2">
                      {job.type} • {job.experience}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Box 
          sx={{ 
            width: '40%',
            height: '100%',
            overflowY: 'auto',
            backgroundColor: 'white',
          }}
        >
          {selectedJob && (
            <SavedJobsView 
              job={selectedJob}
              isApplied={appliedJobs[selectedJob.id]}
              canWithdraw={canWithdraw(selectedJob.id)}
              applicationTime={applicationTimes[selectedJob.id]}
              onApply={() => handleApplyJob(selectedJob.id)}
              onWithdraw={() => handleWithdrawApplication(selectedJob.id)}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SavedJobs;
