import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, useTheme, Button } from '@mui/material';
import { tokens } from '../../../../../../theme';
import SavedTrainingsView from './SavedTrainingsView';
import SavedTrainingsHeader from './SavedTrainingsHeader'; // Update import

const SavedTrainings = ({ isCollapsed }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTraining, setSelectedTraining] = useState(null);
  const headerHeight = '72px';
  const [enrolledTrainings, setEnrolledTrainings] = useState({});
  const [savedTrainings, setSavedTrainings] = useState([]);

  React.useEffect(() => {
    const loadSavedTrainings = () => {
      const trainings = JSON.parse(localStorage.getItem('savedTrainings') || '[]');
      setSavedTrainings(trainings);
    };

    loadSavedTrainings();

    window.addEventListener('storage', loadSavedTrainings);

    return () => window.removeEventListener('storage', loadSavedTrainings);
  }, []);

  const handleEnroll = (trainingId) => {
    setEnrolledTrainings(prev => ({
      ...prev,
      [trainingId]: true
    }));
  };

  const handleSearch = () => {
    console.log('Searching saved trainings...');
  };

  const handleRemoveFromSaved = (trainingId) => {
    const updatedTrainings = savedTrainings.filter(training => training.id !== trainingId);
    localStorage.setItem('savedTrainings', JSON.stringify(updatedTrainings));
    setSavedTrainings(updatedTrainings);
    
    // If the removed training was selected, clear the selection
    if (selectedTraining?.id === trainingId) {
      setSelectedTraining(null);
    }
  };

  return (
    <Box>
      <SavedTrainingsHeader // Replace JobSearchHeader with SavedTrainingsHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
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
        {/* Training Listings Panel */}
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
            Saved Trainings: {savedTrainings.length}
          </Typography>

          {savedTrainings.map((training) => (
            <Card
              key={training.id}
              sx={{
                mb: 2,
                cursor: 'pointer',
                backgroundColor: selectedTraining?.id === training.id ? '#f5f5f5' : 'white',
                '&:hover': { backgroundColor: colors.primary[400] }
              }}
              onClick={() => setSelectedTraining(training)}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
                  <Button
                    size="small"
                    color="error"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFromSaved(training.id);
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
                      src={training.companyImage} // Changed from providerImage to companyImage
                      alt={training.company} // Changed from provider to company
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
                      {training.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {training.company} • {training.location} {/* Changed from provider to company */}
                    </Typography>
                    <Typography variant="body2">
                      {training.type} • {training.duration}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
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
          {selectedTraining && (
            <SavedTrainingsView 
              training={selectedTraining}
              isEnrolled={enrolledTrainings[selectedTraining.id]}
              onEnroll={() => handleEnroll(selectedTraining.id)}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SavedTrainings;
