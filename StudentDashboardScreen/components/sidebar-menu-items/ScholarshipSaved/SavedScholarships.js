import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Grid, Avatar, Chip, Button, Paper } from '@mui/material';
import { School, AccessTime, Payment } from '@mui/icons-material';
import SavedScholarshipsHeader from './SavedScholarshipsHeader';
import ScholarshipView from '../ScholarshipSearch/ScholarshipView';

const SavedScholarships = ({ isCollapsed }) => {
  const [savedScholarships, setSavedScholarships] = useState([]);
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [appliedScholarships, setAppliedScholarships] = useState({});
  const [applicationTimes, setApplicationTimes] = useState({});
  const headerHeight = '72px';

  useEffect(() => {
    const loadSavedScholarships = () => {
      const savedList = JSON.parse(localStorage.getItem('savedScholarships') || '{}');
      const allScholarships = JSON.parse(localStorage.getItem('allScholarships') || '[]');

      // Get only saved scholarships
      const savedScholarshipsData = allScholarships.filter(scholarship => 
        savedList[scholarship.id]
      );

      setSavedScholarships(savedScholarshipsData);
      console.log('Loaded saved scholarships:', savedScholarshipsData); // Debug log
    };

    loadSavedScholarships();
    window.addEventListener('storage', loadSavedScholarships);
    return () => window.removeEventListener('storage', loadSavedScholarships);
  }, []);

  const handleRemoveFromSaved = (scholarshipId) => {
    const savedList = JSON.parse(localStorage.getItem('savedScholarships') || '{}');
    delete savedList[scholarshipId];
    localStorage.setItem('savedScholarships', JSON.stringify(savedList));
    
    setSavedScholarships(prev => prev.filter(s => s.id !== scholarshipId));
    if (selectedScholarship?.id === scholarshipId) {
      setSelectedScholarship(null);
    }
    
    window.dispatchEvent(new Event('storage'));
  };

  const handleApplyScholarship = (scholarshipId) => {
    // Same application logic as in ScholarshipSearch
    const now = new Date().getTime();
    const scholarship = savedScholarships.find(s => s.id === scholarshipId);
    
    if (!scholarship) return;

    const appliedItems = JSON.parse(localStorage.getItem('appliedItems') || '{}');
    const applicationTimes = JSON.parse(localStorage.getItem('applicationTimes') || '{}');
    
    appliedItems[`scholarship-${scholarshipId}`] = true;
    applicationTimes[`scholarship-${scholarshipId}`] = now;

    localStorage.setItem('appliedItems', JSON.stringify(appliedItems));
    localStorage.setItem('applicationTimes', JSON.stringify(applicationTimes));

    setAppliedScholarships(prev => ({
      ...prev,
      [`scholarship-${scholarshipId}`]: true
    }));
    setApplicationTimes(prev => ({
      ...prev,
      [`scholarship-${scholarshipId}`]: now
    }));

    window.dispatchEvent(new Event('storage'));
  };

  return (
    <Box>
      <SavedScholarshipsHeader
        isCollapsed={isCollapsed}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
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
        {/* Saved Scholarships List */}
        <Box sx={{ 
          width: '60%',
          height: '100%',
          overflowY: 'auto',
          p: 3,
          borderRight: '1px solid rgba(0, 0, 0, 0.12)',
        }}>
          <Typography variant="h4" gutterBottom>
            Saved Scholarships
          </Typography>
          <Grid container spacing={2}>
            {savedScholarships.map(scholarship => (
              <Grid item xs={12} key={scholarship.id}>
                <Card
                  onClick={() => setSelectedScholarship(scholarship)}
                  sx={{
                    cursor: 'pointer',
                    '&:hover': { backgroundColor: '#f5f5f5' }
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
                      <Button
                        size="small"
                        color="error"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveFromSaved(scholarship.id);
                        }}
                      >
                        Remove
                      </Button>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <Avatar
                        variant="rounded"
                        src={scholarship.scholarshipImage}
                        sx={{ width: 80, height: 80 }}
                      />
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6">{scholarship.title}</Typography>
                        <Typography color="text.secondary">{scholarship.provider}</Typography>
                        <Box sx={{ mt: 1 }}>
                          <Chip icon={<School />} label={scholarship.type} size="small" sx={{ mr: 1 }} />
                          <Chip icon={<Payment />} label={scholarship.value} size="small" sx={{ mr: 1 }} />
                          <Chip icon={<AccessTime />} label={scholarship.deadline} size="small" />
                        </Box>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
            {savedScholarships.length === 0 && (
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
                    No saved scholarships yet
                  </Typography>
                </Paper>
              </Grid>
            )}
          </Grid>
        </Box>

        {/* Scholarship View Panel */}
        <Box sx={{ 
          width: '40%',
          height: '100%',
          overflowY: 'auto',
          backgroundColor: 'white',
        }}>
          {selectedScholarship && (
            <ScholarshipView 
              scholarship={selectedScholarship}
              isSaved={true}
              isApplied={appliedScholarships[`scholarship-${selectedScholarship.id}`]}
              applicationTime={applicationTimes[`scholarship-${selectedScholarship.id}`]}
              onSave={() => handleRemoveFromSaved(selectedScholarship.id)}
              onApply={() => handleApplyScholarship(selectedScholarship.id)}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SavedScholarships;
