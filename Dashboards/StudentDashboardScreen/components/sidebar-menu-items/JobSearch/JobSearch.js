import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, useTheme } from '@mui/material';
import { tokens } from '../../../../../../theme';
import JobView from './JobView';
import JobSearchHeader from './JobSearchHeader';

const JobSearch = ({ isCollapsed }) => {  // Add isCollapsed prop here
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [searchQuery, setSearchQuery] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [jobType, setJobType] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const headerHeight = '72px'; // Define header height

  // Add state to track saved and applied status for each job
  const [savedJobs, setSavedJobs] = useState({});
  const [appliedJobs, setAppliedJobs] = useState({});
  const [applicationTimes, setApplicationTimes] = useState({});

  const handleSaveJob = (jobId) => {
    setSavedJobs(prev => {
      const newSavedJobs = {
        ...prev,
        [jobId]: !prev[jobId]
      };

      // Get the job details
      const jobToSave = jobs.find(j => j.id === jobId);
      
      // Get existing saved jobs from localStorage
      const savedJobsList = JSON.parse(localStorage.getItem('savedJobs') || '[]');
      
      if (newSavedJobs[jobId]) {
        // Add to localStorage if not already present
        if (!savedJobsList.some(job => job.id === jobId)) {
          savedJobsList.push(jobToSave);
        }
      } else {
        // Remove from localStorage
        const index = savedJobsList.findIndex(job => job.id === jobId);
        if (index !== -1) {
          savedJobsList.splice(index, 1);
        }
      }
      
      // Update localStorage
      localStorage.setItem('savedJobs', JSON.stringify(savedJobsList));
      
      return newSavedJobs;
    });
  };

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
    return timeDiff <= 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  };

  // Updated mock data with new image URL and detailed description
  const [jobs] = useState([
    {
      id: 1,
      title: 'Software Engineer',
      company: 'Tech Corp',
      location: 'Manila',
      type: 'Full-time',
      experience: 'Entry Level',
      vacancies: 3,
      salary: '₱30,000 - ₱50,000 / month',
      companyImage: 'http://bit.ly/4ib59B1',
      description: `Join Our Team – Exciting Career Opportunities Await!

Are you passionate about innovation, collaboration, and making a meaningful impact? We are looking for talented and driven individuals to join our dynamic team! At Tech Corp, we believe in fostering a culture of growth, creativity, and excellence.

As a part of our team, you'll have the opportunity to work on exciting projects, collaborate with industry professionals, and contribute to groundbreaking solutions. We offer a supportive work environment, competitive compensation, and opportunities for career advancement.

Why Work With Us?
✅ Competitive salary and benefits package
✅ Career growth and professional development opportunities
✅ Inclusive and diverse workplace culture
✅ Work-life balance with flexible work arrangements
✅ Access to the latest tools and technologies

Who We're Looking For:
We welcome individuals from various backgrounds with skills in software development, cloud computing, AI/ML, and full-stack development. Whether you're an experienced professional or an ambitious newcomer, we value passion, dedication, and a willingness to learn.

If you're ready to take your career to the next level, we'd love to hear from you! Apply today and become part of a team that values innovation, teamwork, and excellence.

📩 How to Apply:
Send your resume and a brief cover letter to careers@techcorp.com or visit our careers page at techcorp.com/careers.

Join us and be a part of something great! 🚀`,
    },
    {
        id: 2,
        title: 'IT Technician',
        company: 'XYZ Solutions',
        location: 'Iloilo City',
        type: 'Full-time',
        experience: 'Senior Level',
        vacancies: 5,
        salary: '₱30,000 - ₱50,000 / month',
        companyImage: 'http://bit.ly/4ib59B1',
        description: `Join Our Team – Exciting Career Opportunities Await!`,
      },
      {
        id: 3,
        title: 'Junior Developer',
        company: 'XYZ Solutions',
        location: 'Iloilo City',
        type: 'Full-time',
        experience: 'Senior Level',
        vacancies: 5,
        salary: '₱30,000 - ₱50,000 / month',
        companyImage: 'http://bit.ly/4ib59B1',
        description: `Join Our Team – Exciting Career Opportunities Await!`,
      },
      {
        id: 4,
        title: 'Senior Developer',
        company: 'XYZ Solutions',
        location: 'Iloilo City',
        type: 'Full-time',
        experience: 'Senior Level',
        vacancies: 5,
        salary: '₱30,000 - ₱50,000 / month',
        companyImage: 'http://bit.ly/4ib59B1',
        description: `Join Our Team – Exciting Career Opportunities Await!`,
      },
      {
        id: 5,
        title: 'Data Analyst',
        company: 'XYZ Solutions',
        location: 'Iloilo City',
        type: 'Full-time',
        experience: 'Senior Level',
        vacancies: 5,
        salary: '₱30,000 - ₱50,000 / month',
        companyImage: 'http://bit.ly/4ib59B1',
        description: `Join Our Team – Exciting Career Opportunities Await!`,
      },
      {
        id: 6,
        title: 'Computer Engineer',
        company: 'XYZ Solutions',
        location: 'Iloilo City',
        type: 'Full-time',
        experience: 'Senior Level',
        vacancies: 5,
        salary: '₱30,000 - ₱50,000 / month',
        companyImage: 'http://bit.ly/4ib59B1',
        description: `Join Our Team – Exciting Career Opportunities Await!`,
      },
      {
        id: 7,
        title: 'Network Administrator',
        company: 'XYZ Solutions',
        location: 'Iloilo City',
        type: 'Full-time',
        experience: 'Senior Level',
        vacancies: 5,
        salary: '₱30,000 - ₱50,000 / month',
        companyImage: 'http://bit.ly/4ib59B1',
        description: `Join Our Team – Exciting Career Opportunities Await!`,
      },
      {
        id: 8,
        title: 'Database Administrator',
        company: 'XYZ Solutions',
        location: 'Iloilo City',
        type: 'Full-time',
        experience: 'Senior Level',
        vacancies: 5,
        salary: '₱30,000 - ₱50,000 / month',
        companyImage: 'http://bit.ly/4ib59B1',
        description: `Join Our Team – Exciting Career Opportunities Await!`,
      },

    // Add more mock jobs here
  ]);

  // Set the first job as selected by default
  React.useEffect(() => {
    if (jobs.length > 0 && !selectedJob) {
      setSelectedJob(jobs[0]);
    }
  }, [jobs]);

  const handleSearch = () => {
    // Implement search functionality
    console.log('Searching...');
  };

  const handleJobClick = (jobId) => {
    const job = jobs.find(j => j.id === jobId);
    setSelectedJob(job);
  };

  return (
    <Box>
      <JobSearchHeader 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        experienceLevel={experienceLevel}
        setExperienceLevel={setExperienceLevel}
        jobType={jobType}
        setJobType={setJobType}
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
        {/* Job Listings Panel */}
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
            Total: {jobs.length} jobs found
          </Typography>

          {jobs.map((job) => (
            <Card
              key={job.id}
              sx={{
                mb: 2,
                cursor: 'pointer',
                backgroundColor: selectedJob?.id === job.id ? '#f5f5f5' : 'white',
                '&:hover': { backgroundColor: colors.primary[400] }
              }}
              onClick={() => handleJobClick(job.id)}
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

                  {/* Job Details */}
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

        {/* Job View Panel */}
        <Box 
          sx={{ 
            width: '40%',
            height: '100%',
            overflowY: 'auto',
            backgroundColor: 'white',
          }}
        >
          {selectedJob && (
            <JobView 
              job={selectedJob}
              isSaved={savedJobs[selectedJob.id]}
              isApplied={appliedJobs[selectedJob.id]}
              canWithdraw={canWithdraw(selectedJob.id)}
              applicationTime={applicationTimes[selectedJob.id]}
              onSave={() => handleSaveJob(selectedJob.id)}
              onApply={() => handleApplyJob(selectedJob.id)}
              onWithdraw={() => handleWithdrawApplication(selectedJob.id)}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default JobSearch;
