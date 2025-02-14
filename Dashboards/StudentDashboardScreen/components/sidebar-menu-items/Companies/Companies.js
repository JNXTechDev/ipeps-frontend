import React, { useState } from 'react';
import {
  Box, Grid, Paper, Typography, Avatar, Rating,
  Chip, Button, Dialog, DialogTitle, DialogContent,
  IconButton, Tabs, Tab
} from '@mui/material';
import {
  LocationOn, Language, People,
  Bookmark, BookmarkBorder, Close as CloseIcon,
  Verified
} from '@mui/icons-material';
import CompaniesHeader from './CompaniesHeader';

const Companies = ({ isCollapsed }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [followedCompanies, setFollowedCompanies] = useState({});
  const [activeTab, setActiveTab] = useState(0); // State for active tab

  const handleSearch = () => {
    console.log('Searching companies...', searchQuery);
  };

  const handleFollowCompany = (e, companyId) => {
    e.stopPropagation();
    setFollowedCompanies(prev => ({
      ...prev,
      [companyId]: !prev[companyId]
    }));
  };

  const handleCompanyClick = (company) => {
    setSelectedCompany(company);
    setIsModalOpen(true);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue); // Update active tab
  };

  const companies = [
    {
      id: 1,
      name: "Tech Solutions Inc.",
      logo: "TS",
      industry: "Information Technology",
      location: "New York, NY",
      website: "www.techsolutions.com",
      employeeCount: "1000-5000",
      rating: 4.5,
      reviews: 245,
      verified: true,
      description: "Leading provider of innovative tech solutions",
      openPositions: 15,
      specialties: ["Cloud Computing", "AI/ML", "Software Development"],
      jobs: [
        { id: 1, title: "Software Engineer", location: "New York, NY", type: "Full-time" },
        { id: 2, title: "Data Scientist", location: "Remote", type: "Contract" }
      ],
      trainings: [
        { id: 1, title: "Introduction to AI/ML", duration: "2 weeks", level: "Beginner" },
        { id: 2, title: "Advanced Cloud Computing", duration: "4 weeks", level: "Intermediate" }
      ]
    },
    {
      id: 2,
      name: "Global Innovations Ltd",
      logo: "GI",
      industry: "Technology Consulting",
      location: "San Francisco, CA",
      website: "www.globalinnovations.com",
      employeeCount: "5000-10000",
      rating: 4.3,
      reviews: 189,
      verified: true,
      description: "Global leader in technology consulting services",
      openPositions: 23,
      specialties: ["Digital Transformation", "IT Consulting", "Enterprise Solutions"],
      jobs: [
        { id: 1, title: "IT Consultant", location: "San Francisco, CA", type: "Full-time" },
        { id: 2, title: "Project Manager", location: "Remote", type: "Part-time" }
      ],
      trainings: [
        { id: 1, title: "Digital Transformation Basics", duration: "3 weeks", level: "Beginner" },
        { id: 2, title: "Enterprise Solutions Architecture", duration: "6 weeks", level: "Advanced" }
      ]
    },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <CompaniesHeader 
        isCollapsed={isCollapsed}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />

      {/* Main Content */}
      <Box 
        sx={{ 
          position: 'fixed',
          top: '72px',
          left: isCollapsed ? '80px' : '250px',
          right: 0,
          bottom: 0,
          overflowY: 'auto',
          p: 3,
          backgroundColor: '#f5f5f5',
          transition: 'left 0.3s',
          zIndex: 1
        }}
      >
        <Grid container spacing={3}>
          {companies.map(company => (
            <Grid item xs={12} md={6} key={company.id}>
              <Paper
                elevation={0}
                onClick={() => handleCompanyClick(company)}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  cursor: 'pointer',
                  '&:hover': {
                    borderColor: 'primary.main',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  }
                }}
              >
                {/* Company Card Content */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Avatar 
                      sx={{ 
                        width: 60, 
                        height: 60,
                        bgcolor: 'primary.main'
                      }}
                    >
                      {company.logo}
                    </Avatar>
                    <Box>
                      <Typography variant="h6">
                        {company.name}
                        {company.verified && (
                          <Verified sx={{ ml: 1, color: 'primary.main', fontSize: 20 }} />
                        )}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {company.industry}
                      </Typography>
                    </Box>
                  </Box>
                  <IconButton 
                    onClick={(e) => handleFollowCompany(e, company.id)}
                    size="small"
                  >
                    {followedCompanies[company.id] 
                      ? <Bookmark color="primary" />
                      : <BookmarkBorder />
                    }
                  </IconButton>
                </Box>

                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <Chip 
                    icon={<LocationOn fontSize="small" />}
                    label={company.location}
                    size="small"
                    variant="outlined"
                  />
                  <Chip 
                    icon={<Language fontSize="small" />}
                    label={company.website}
                    size="small"
                    variant="outlined"
                  />
                  <Chip 
                    icon={<People fontSize="small" />}
                    label={company.employeeCount}
                    size="small"
                    variant="outlined"
                  />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {company.description}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Rating value={company.rating} readOnly size="small" />
                    <Typography variant="body2" color="text.secondary">
                      ({company.reviews} reviews)
                    </Typography>
                  </Box>
                  <Chip 
                    label={`${company.openPositions} open positions`}
                    color="primary"
                    size="small"
                  />
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Company Detail Modal */}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedCompany && (
          <>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">Company Details</Typography>
              <IconButton onClick={() => setIsModalOpen(false)} size="small">
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent 
              dividers 
              sx={{ 
                height: '70vh',
                p: 0, // Remove default padding
              }}
            >
              {/* Tabs */}
              <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Tabs value={activeTab} onChange={handleTabChange}>
                  <Tab label="Details" />
                  <Tab label="Jobs" />
                  <Tab label="Trainings" />
                </Tabs>

                {/* Tab Content Container */}
                <Box sx={{ 
                  flex: 1,
                  overflowY: 'auto',
                  p: 3,
                }}>
                  {/* Tab Panels */}
                  <Box sx={{ 
                    display: activeTab === 0 ? 'block' : 'none',
                    height: '100%'
                  }}>
                    {/* Details Tab Content */}
                    <Box sx={{ p: 2 }}>
                      <Box sx={{ display: 'flex', gap: 3, mb: 4 }}>
                        <Avatar 
                          sx={{ 
                            width: 80, 
                            height: 80,
                            bgcolor: 'primary.main'
                          }}
                        >
                          {selectedCompany.logo}
                        </Avatar>
                        <Box>
                          <Typography variant="h5">
                            {selectedCompany.name}
                            {selectedCompany.verified && (
                              <Verified sx={{ ml: 1, color: 'primary.main' }} />
                            )}
                          </Typography>
                          <Typography color="text.secondary" gutterBottom>
                            {selectedCompany.industry}
                          </Typography>
                          <Button
                            variant="contained"
                            onClick={(e) => handleFollowCompany(e, selectedCompany.id)}
                            startIcon={followedCompanies[selectedCompany.id] ? <Bookmark /> : <BookmarkBorder />}
                          >
                            {followedCompanies[selectedCompany.id] ? 'Following' : 'Follow'}
                          </Button>
                        </Box>
                      </Box>

                      <Typography variant="h6" gutterBottom>Company Overview</Typography>
                      <Typography paragraph>{selectedCompany.description}</Typography>

                      <Typography variant="h6" gutterBottom>Specialties</Typography>
                      <Box sx={{ mb: 3 }}>
                        {selectedCompany.specialties.map(specialty => (
                          <Chip
                            key={specialty}
                            label={specialty}
                            sx={{ mr: 1, mb: 1 }}
                          />
                        ))}
                      </Box>

                      <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                          <Paper variant="outlined" sx={{ p: 2 }}>
                            <Typography variant="subtitle1" gutterBottom>Company Information</Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                              <Box sx={{ display: 'flex', gap: 1 }}>
                                <LocationOn color="action" />
                                <Typography>{selectedCompany.location}</Typography>
                              </Box>
                              <Box sx={{ display: 'flex', gap: 1 }}>
                                <Language color="action" />
                                <Typography>{selectedCompany.website}</Typography>
                              </Box>
                              <Box sx={{ display: 'flex', gap: 1 }}>
                                <People color="action" />
                                <Typography>{selectedCompany.employeeCount} employees</Typography>
                              </Box>
                            </Box>
                          </Paper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Paper variant="outlined" sx={{ p: 2 }}>
                            <Typography variant="subtitle1" gutterBottom>Statistics</Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography>Company Rating</Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <Rating value={selectedCompany.rating} readOnly size="small" />
                                  <Typography variant="body2">({selectedCompany.reviews})</Typography>
                                </Box>
                              </Box>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography>Open Positions</Typography>
                                <Typography color="primary">{selectedCompany.openPositions}</Typography>
                              </Box>
                            </Box>
                          </Paper>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>

                  <Box sx={{ 
                    display: activeTab === 1 ? 'block' : 'none',
                    height: '100%'
                  }}>
                    {/* Jobs Tab Content */}
                    <Box sx={{ p: 2 }}>
                      <Typography variant="h6" gutterBottom>Open Positions</Typography>
                      {selectedCompany.jobs.map(job => (
                        <Paper key={job.id} variant="outlined" sx={{ p: 2, mb: 2 }}>
                          <Typography variant="subtitle1">{job.title}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {job.location} • {job.type}
                          </Typography>
                        </Paper>
                      ))}
                    </Box>
                  </Box>

                  <Box sx={{ 
                    display: activeTab === 2 ? 'block' : 'none',
                    height: '100%'
                  }}>
                    {/* Trainings Tab Content */}
                    <Box sx={{ p: 2 }}>
                      <Typography variant="h6" gutterBottom>Available Trainings</Typography>
                      {selectedCompany.trainings.map(training => (
                        <Paper key={training.id} variant="outlined" sx={{ p: 2, mb: 2 }}>
                          <Typography variant="subtitle1">{training.title}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {training.duration} • {training.level}
                          </Typography>
                        </Paper>
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default Companies;