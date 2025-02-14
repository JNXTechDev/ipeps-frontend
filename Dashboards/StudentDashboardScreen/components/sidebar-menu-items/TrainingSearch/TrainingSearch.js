import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, useTheme, Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import { tokens } from '../../../../../../theme';
import TrainingView from './TrainingView';
import TrainingSearchHeader from './TrainingSearchHeader';
import CloseIcon from '@mui/icons-material/Close';

const TrainingSearch = ({ isCollapsed }) => {  // Add isCollapsed prop here
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [searchQuery, setSearchQuery] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [trainingType, setTrainingType] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [selectedTraining, setSelectedTraining] = useState(null);
  const headerHeight = '72px'; // Define header height

  // Add state to track saved and enrolled status for each training
  const [savedTraining, setSavedTraining] = useState({});
  const [enrolledTraining, setEnrolledTraining] = useState({});
  const [enrollmentTimes, setEnrollmentTimes] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSaveTraining = (trainingId) => {
    setSavedTraining(prev => {
      const newSavedTrainings = {
        ...prev,
        [trainingId]: !prev[trainingId]
      };

      // Get the training details
      const trainingToSave = trainings.find(t => t.id === trainingId);
      
      // Get existing saved trainings from localStorage
      const savedTrainingsList = JSON.parse(localStorage.getItem('savedTrainings') || '[]');
      
      if (newSavedTrainings[trainingId]) {
        // Add to localStorage if not already present
        if (!savedTrainingsList.some(training => training.id === trainingId)) {
          savedTrainingsList.push(trainingToSave);
        }
      } else {
        // Remove from localStorage
        const index = savedTrainingsList.findIndex(training => training.id === trainingId);
        if (index !== -1) {
          savedTrainingsList.splice(index, 1);
        }
      }
      
      // Update localStorage
      localStorage.setItem('savedTrainings', JSON.stringify(savedTrainingsList));
      
      return newSavedTrainings;
    });
  };

  const handleEnrollTraining = (trainingId) => {
    const now = new Date().getTime();
    
    // Update local state
    setEnrollmentTimes(prev => ({
      ...prev,
      [trainingId]: now
    }));
    setEnrolledTraining(prev => ({
      ...prev,
      [trainingId]: true
    }));

    // Get the training details
    const trainingToEnroll = trainings.find(t => t.id === trainingId);

    // Update localStorage
    const appliedItems = JSON.parse(localStorage.getItem('appliedItems') || '{}');
    const applicationTimes = JSON.parse(localStorage.getItem('applicationTimes') || '{}');
    const allTrainings = JSON.parse(localStorage.getItem('allTrainings') || '[]');

    appliedItems[`training-${trainingId}`] = true;
    applicationTimes[`training-${trainingId}`] = now;

    // Update or add the training to allTrainings
    const existingTrainingIndex = allTrainings.findIndex(t => t.id === trainingId);
    if (existingTrainingIndex === -1) {
      allTrainings.push(trainingToEnroll);
    } else {
      allTrainings[existingTrainingIndex] = trainingToEnroll;
    }

    localStorage.setItem('appliedItems', JSON.stringify(appliedItems));
    localStorage.setItem('applicationTimes', JSON.stringify(applicationTimes));
    localStorage.setItem('allTrainings', JSON.stringify(allTrainings));
  };

  const handleWithdrawEnrollment = (trainingId) => {
    setEnrollmentTimes(prev => {
      const newTimes = { ...prev };
      delete newTimes[trainingId];
      return newTimes;
    });
    setEnrolledTraining(prev => {
      const newEnrolled = { ...prev };
      delete newEnrolled[trainingId];
      return newEnrolled;
    });
  };

  const canWithdraw = (trainingId) => {
    if (!enrollmentTimes[trainingId]) return false;
    const now = new Date().getTime();
    const enrollmentTime = enrollmentTimes[trainingId];
    const timeDiff = now - enrollmentTime;
    return timeDiff <= 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  };

  // Updated mock data with new image URL and detailed description
  const [trainings] = useState([
    {
      id: 1,
      title: 'Web Development Bootcamp',
      provider: 'Tech Academy',
      location: 'Online',
      type: 'Virtual Training',
      duration: '12 weeks',
      cost: '₱15,000',
      startDate: '2024-03-01',
      companyImage: 'https://bit.ly/3Qgevzn',
      description: `Complete Web Development Bootcamp...`,
    },
    {
      id: 2,  // Changed from 1 to 2
      title: 'Cloud Computing Fundamentals',
      provider: 'Tech Academy',
      location: 'Online',
      type: 'Virtual Training',
      duration: '8 weeks',
      cost: '₱12,000',
      startDate: '2024-03-15',
      companyImage: 'https://bit.ly/3Qgevzn',
      description: `Cloud Computing Fundamentals...`,
    },
    {
      id: 3,  // Changed from 2 to 3
      title: 'Data Science Essentials',
      provider: 'Data Institute',
      location: 'Hybrid',
      type: 'Blended Learning',
      duration: '16 weeks',
      cost: '₱20,000',
      startDate: '2024-04-01',
      companyImage: 'https://bit.ly/3Qgevzn',
      description: `Data Science Essentials...`,
    },
    // ... rest of the trainings with unique IDs ...
  ]);

  // Set the first trainings as selected by default
  React.useEffect(() => {
    if (trainings.length > 0 && !selectedTraining) {
      setSelectedTraining(trainings[0]);
    }
  }, [trainings]);

  const handleSearch = () => {
    // Implement search functionality
    console.log('Searching...');
  };

  const handleTrainingClick = (trainingId) => {
    const selectedTraining = trainings.find(t => t.id === trainingId);
    setSelectedTraining(selectedTraining);
    setIsModalOpen(true);
  };

  return (
    <Box>
      <TrainingSearchHeader 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        experienceLevel={experienceLevel}
        setExperienceLevel={setExperienceLevel}
        trainingType={trainingType}
        setTrainingType={setTrainingType}
        sortBy={sortBy}
        setSortBy={setSortBy}
        handleSearch={handleSearch}
        isCollapsed={isCollapsed} // Pass the prop
      />

      {/* Main content container */}
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
            Total: {trainings.length} training found
          </Typography>

          {trainings.map((training) => (
            <Card
              key={training.id}
              sx={{
                mb: 2,
                cursor: 'pointer',
                backgroundColor: selectedTraining?.id === training.id ? '#f5f5f5' : 'white',
                '&:hover': { backgroundColor: colors.primary[400] }
              }}
              onClick={() => handleTrainingClick(training.id)}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  {/* Company Image */}
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      flexShrink: 0,
                      backgroundColor: '#f5f5f5',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <img
                      src={training.companyImage}
                      alt={training.company}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        padding: '8px'
                      }}
                    />
                  </Box>

                  {/* Training Details */}
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h5" component="div" gutterBottom>
                      {training.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {training.company} • {training.location}
                    </Typography>
                    <Typography variant="body2">
                      {training.type} • {training.experience}
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
            <TrainingView 
              training={selectedTraining}
              isSaved={savedTraining[selectedTraining.id]}
              isEnrolled={enrolledTraining[selectedTraining.id]}
              canWithdraw={canWithdraw(selectedTraining.id)}
              enrollmentTime={enrollmentTimes[selectedTraining.id]}
              onSave={() => handleSaveTraining(selectedTraining.id)}
              onEnroll={() => handleEnrollTraining(selectedTraining.id)}
              onWithdraw={() => handleWithdrawEnrollment(selectedTraining.id)}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default TrainingSearch;
