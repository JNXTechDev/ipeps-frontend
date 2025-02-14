import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, useTheme, Grid, Avatar, Chip, IconButton } from '@mui/material';
import { tokens } from '../../../../../../theme';
import ScholarshipView from './ScholarshipView';
import ScholarshipSearchHeader from './ScholarshipSearchHeader';
import { School, AccessTime, Payment, BookmarkBorder, Bookmark } from '@mui/icons-material';

const ScholarshipSearch = ({ isCollapsed }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [savedScholarships, setSavedScholarships] = useState({});
  const [appliedScholarships, setAppliedScholarships] = useState({});
  const [applicationTimes, setApplicationTimes] = useState({});
  const headerHeight = '72px';

  const [scholarships] = useState([
    {
      id: 1,
      title: 'Excellence Scholarship Program 2024',
      provider: 'Global Education Foundation',
      coverage: 'Full Tuition',
      deadline: 'March 31, 2024',
      type: 'Merit-based',
      requirements: ['Minimum GPA of 3.5', 'Leadership experience', 'Community service'],
      value: '₱100,000 per year',
      duration: '4 years',
      scholarshipImage: 'https://img.freepik.com/premium-psd/scholarship-program-psd-post-social-media_1322208-245.jpg',
      description: `Full scholarship opportunity for outstanding students!...`,
    },
    // Add more scholarships as needed
  ]);

  useEffect(() => {
    // Load saved and applied scholarships from localStorage
    const savedList = JSON.parse(localStorage.getItem('savedScholarships') || '{}');
    const appliedItems = JSON.parse(localStorage.getItem('appliedItems') || '{}');
    const applicationTimesList = JSON.parse(localStorage.getItem('applicationTimes') || '{}');

    setSavedScholarships(savedList);
    setAppliedScholarships(appliedItems);
    setApplicationTimes(applicationTimesList);
  }, []);

  const handleSaveScholarship = (scholarshipId) => {
    const scholarship = scholarships.find(s => s.id === scholarshipId);
    if (!scholarship) return;

    setSavedScholarships(prev => {
      const newSaved = { ...prev, [scholarshipId]: !prev[scholarshipId] };
      
      // Update allScholarships in localStorage
      const allScholarships = JSON.parse(localStorage.getItem('allScholarships') || '[]');
      if (!allScholarships.find(s => s.id === scholarshipId)) {
        allScholarships.push(scholarship);
        localStorage.setItem('allScholarships', JSON.stringify(allScholarships));
      }
      
      // Update savedScholarships in localStorage
      localStorage.setItem('savedScholarships', JSON.stringify(newSaved));
      window.dispatchEvent(new Event('storage'));
      return newSaved;
    });
  };

  const handleApplyScholarship = (scholarshipId) => {
    const now = new Date().getTime();
    const scholarship = scholarships.find(s => s.id === scholarshipId);
    
    if (!scholarship) return;

    // Add the complete scholarship data to localStorage
    const allScholarships = JSON.parse(localStorage.getItem('allScholarships') || '[]');
    if (!allScholarships.find(s => s.id === scholarshipId)) {
      allScholarships.push({
        ...scholarship,
        applicationTime: now
      });
      localStorage.setItem('allScholarships', JSON.stringify(allScholarships));
    }

    // Update applied items
    const appliedItems = JSON.parse(localStorage.getItem('appliedItems') || '{}');
    const applicationTimes = JSON.parse(localStorage.getItem('applicationTimes') || '{}');
    
    appliedItems[`scholarship-${scholarshipId}`] = true;
    applicationTimes[`scholarship-${scholarshipId}`] = now;

    localStorage.setItem('appliedItems', JSON.stringify(appliedItems));
    localStorage.setItem('applicationTimes', JSON.stringify(applicationTimes));
    
    // Update state
    setApplicationTimes(prev => ({
      ...prev,
      [`scholarship-${scholarshipId}`]: now
    }));
    setAppliedScholarships(prev => ({
      ...prev,
      [`scholarship-${scholarshipId}`]: true
    }));

    window.dispatchEvent(new Event('storage'));
  };

  const handleWithdrawApplication = (scholarshipId) => {
    // Similar to JobSearch withdrawal logic
    const appliedItems = JSON.parse(localStorage.getItem('appliedItems') || '{}');
    const applicationTimes = JSON.parse(localStorage.getItem('applicationTimes') || '{}');

    delete appliedItems[`scholarship-${scholarshipId}`];
    delete applicationTimes[`scholarship-${scholarshipId}`];

    localStorage.setItem('appliedItems', JSON.stringify(appliedItems));
    localStorage.setItem('applicationTimes', JSON.stringify(applicationTimes));

    setAppliedScholarships(prev => {
      const newState = { ...prev };
      delete newState[`scholarship-${scholarshipId}`];
      return newState;
    });
    setApplicationTimes(prev => {
      const newState = { ...prev };
      delete newState[`scholarship-${scholarshipId}`];
      return newState;
    });
  };

  return (
    <Box>
      <ScholarshipSearchHeader 
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
        {/* Scholarship Listings Panel */}
        <Box sx={{ 
          width: '60%',
          height: '100%',
          overflowY: 'auto',
          p: 3,
          borderRight: '1px solid rgba(0, 0, 0, 0.12)',
        }}>
          <Grid container spacing={2}>
            {scholarships.map((scholarship) => (
              <Grid item xs={12} key={scholarship.id}>
                <Card
                  onClick={() => setSelectedScholarship(scholarship)}
                  sx={{
                    cursor: 'pointer',
                    '&:hover': { backgroundColor: colors.primary[400] }
                  }}
                >
                  <CardContent>
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
                      <IconButton onClick={(e) => {
                        e.stopPropagation();
                        handleSaveScholarship(scholarship.id);
                      }}>
                        {savedScholarships[scholarship.id] ? <Bookmark color="primary" /> : <BookmarkBorder />}
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
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
              isSaved={savedScholarships[selectedScholarship.id]}
              isApplied={appliedScholarships[`scholarship-${selectedScholarship.id}`]}
              applicationTime={applicationTimes[`scholarship-${selectedScholarship.id}`]}
              onSave={() => handleSaveScholarship(selectedScholarship.id)}
              onApply={() => handleApplyScholarship(selectedScholarship.id)}
              onWithdraw={() => handleWithdrawApplication(selectedScholarship.id)}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ScholarshipSearch;
