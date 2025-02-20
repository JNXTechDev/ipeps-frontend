import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

import { 
    Box, Typography, Paper, Fab, Tooltip, Grid, 
   IconButton,
    Avatar,  Button,
   
    IconButton as MuiIconButton
} from "@mui/material";
import { Fade } from '@mui/material';
import { Chip } from '@mui/material';


import CloseIcon from '@mui/icons-material/Close';

import {
  School,  
    AnnouncementOutlined, 
 BusinessCenter, CalendarToday,
    LocationOn, AccessTime, Payment,
    Verified, Share, Comment, ThumbUp, 
    WorkOutlineOutlined, SchoolOutlined, 
    CardGiftcardOutlined
} from '@mui/icons-material';

import { tokens } from "../../../../../../theme";
import DashboardHeader from './DashboardHeader';

const Dashboard = ({ isCollapsed }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const colors = tokens(theme.palette.mode);
    const [searchQuery, setSearchQuery] = useState('');
    const headerHeight = '72px';
    const [showAnnouncement, setShowAnnouncement] = useState(false);
    const [isAnnouncementVisible, setIsAnnouncementVisible] = useState(true);
    const [showAnnouncementButton, setShowAnnouncementButton] = useState(false);
    const [showWelcome, setShowWelcome] = useState(true);
    const [hasAnnouncements] = useState(false); // Add this state to track if there are announcements
    const [activeTab, setActiveTab] = useState(0);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [appliedItems, setAppliedItems] = useState({});
    const [applicationTimes, setApplicationTimes] = useState({});
    const [savedJobs, setSavedJobs] = useState({});
    const [savedTrainings, setSavedTrainings] = useState({});
    const [applicationCounts, setApplicationCounts] = useState({
        jobs: 0,
        trainings: 0
    });

    const handleSearch = () => {
        console.log('Searching dashboard...');
    };

    // Add effect to trigger animation after component mounts
    useEffect(() => {
        // Small delay to ensure transition is visible
        const timer = setTimeout(() => {
            setShowAnnouncement(true);
        }, 300);

        // Reset visibility on component mount
        setIsAnnouncementVisible(true);

        return () => clearTimeout(timer);
    }, []);

    const handleCloseAnnouncement = () => {
        setIsAnnouncementVisible(false);
        setShowAnnouncementButton(true); // Show the floating button when announcement is closed
    };

    const handleShowAnnouncement = () => {
        setIsAnnouncementVisible(true);
        setShowAnnouncementButton(false); // Hide the floating button when announcement is shown
    };

    const handleCloseWelcome = () => {
        setShowWelcome(false);
        setShowAnnouncementButton(true);
    };

    const handleShowWelcome = () => {
        setShowWelcome(true);
        setShowAnnouncementButton(false);
    };

    const stats = [
        { 
            icon: <BusinessCenter />, 
            title: "Jobs", 
            count: applicationCounts.jobs.toString(), 
            color: "#1976d2",
            //emptyMessage: "View your job applications", // Changed this line
            actionMessage: "Browse available jobs",
            action: () => navigate('/dashboard/student/job-search')
        },
        { 
            icon: <School />, 
            title: "Training", 
            count: `${applicationCounts.trainings}`, 
            color: "#ed6c02",
       //     emptyMessage: "View your training enrollments", // Changed this line
            actionMessage: "Browse available trainings",
            action: () => navigate('/dashboard/student/training-search')
        }
    ];

    const recommendedJobs = [
        {
            id: 1,
            title: "Senior Frontend Developer",
            company: "Tech Solutions Inc.",
            logo: "https://logo.example.com/techsolutions",
            location: "New York, NY (Hybrid)",
            salary: "$90,000 - $120,000",
            posted: "2 days ago",
            type: "Full-time",
            verified: true,
            skills: ["React", "TypeScript", "Node.js"],
            rating: 4.5,
            reviews: 245
        },
        {
            id: 2,
            title: "Full Stack Engineer",
            company: "Innovation Labs",
            logo: "https://logo.example.com/innovationlabs",
            location: "Remote",
            salary: "$85,000 - $115,000",
            posted: "1 day ago",
            type: "Full-time",
            verified: true,
            skills: ["Python", "React", "AWS"],
            rating: 4.2,
            reviews: 189
        },
    ];

    const recommendedTrainings = [
        {
            id: 1,
            title: "Advanced React Development",
            provider: "CodeMaster Academy",
            logo: "https://logo.example.com/codemaster",
            duration: "12 weeks",
            startDate: "Flexible",
            price: "$499",
            level: "Advanced",
            verified: true,
            rating: 4.8,
            enrolled: 1234,
            skills: ["React", "Redux", "Next.js"]
        },
        {
            id: 2,
            title: "Cloud Engineering with AWS",
            provider: "Cloud Institute",
            logo: "https://logo.example.com/cloudinstitute",
            duration: "8 weeks",
            startDate: "Feb 15, 2024",
            price: "$699",
            level: "Intermediate",
            verified: true,
            rating: 4.6,
            enrolled: 892,
            skills: ["AWS", "DevOps", "Kubernetes"]
        },
    ];

    const handleSaveJob = (jobId) => {
        setSavedJobs(prev => {
            const newSavedJobs = {
                ...prev,
                [jobId]: !prev[jobId]
            };

            // Get the job details
            const jobToSave = recommendedJobs.find(j => j.id === jobId);
            
            // Get existing saved jobs from localStorage
            const savedJobsList = JSON.parse(localStorage.getItem('savedJobs') || '[]');
            
            if (newSavedJobs[jobId]) {
                if (!savedJobsList.some(job => job.id === jobId)) {
                    savedJobsList.push(jobToSave);
                }
            } else {
                const index = savedJobsList.findIndex(job => job.id === jobId);
                if (index !== -1) {
                    savedJobsList.splice(index, 1);
                }
            }
            
            localStorage.setItem('savedJobs', JSON.stringify(savedJobsList));
            return newSavedJobs;
        });
    };

    const handleSaveTraining = (trainingId) => {
        setSavedTrainings(prev => {
            const newSavedTrainings = {
                ...prev,
                [trainingId]: !prev[trainingId]
            };

            // Get the training details
            const trainingToSave = recommendedTrainings.find(t => t.id === trainingId);
            
            // Get existing saved trainings from localStorage
            const savedTrainingsList = JSON.parse(localStorage.getItem('savedTrainings') || '[]');
            
            if (newSavedTrainings[trainingId]) {
                if (!savedTrainingsList.some(training => training.id === trainingId)) {
                    savedTrainingsList.push(trainingToSave);
                }
            } else {
                const index = savedTrainingsList.findIndex(training => training.id === trainingId);
                if (index !== -1) {
                    savedTrainingsList.splice(index, 1);
                }
            }
            
            localStorage.setItem('savedTrainings', JSON.stringify(savedTrainingsList));
            return newSavedTrainings;
        });
    };

    // Load saved items from localStorage on component mount
    useEffect(() => {
        const savedJobsList = JSON.parse(localStorage.getItem('savedJobs') || '[]');
        const savedTrainingsList = JSON.parse(localStorage.getItem('savedTrainings') || '[]');

        const jobsState = savedJobsList.reduce((acc, job) => {
            acc[job.id] = true;
            return acc;
        }, {});

        const trainingsState = savedTrainingsList.reduce((acc, training) => {
            acc[training.id] = true;
            return acc;
        }, {});

        setSavedJobs(jobsState);
        setSavedTrainings(trainingsState);
    }, []);

    // Load applied items from localStorage on mount
    useEffect(() => {
        // Load saved items
        const savedJobsList = JSON.parse(localStorage.getItem('savedJobs') || '[]');
        const savedTrainingsList = JSON.parse(localStorage.getItem('savedTrainings') || '[]');

        // Load applied/enrolled items
        const appliedItemsList = JSON.parse(localStorage.getItem('appliedItems') || '{}');
        const applicationTimesList = JSON.parse(localStorage.getItem('applicationTimes') || '{}');

        // Set states
        setAppliedItems(appliedItemsList);
        setApplicationTimes(applicationTimesList);
        setSavedJobs(savedJobsList.reduce((acc, job) => ({ ...acc, [job.id]: true }), {}));
        setSavedTrainings(savedTrainingsList.reduce((acc, training) => ({ ...acc, [training.id]: true }), {}));
    }, []);

    // Update localStorage when applied items change
    useEffect(() => {
        localStorage.setItem('appliedItems', JSON.stringify(appliedItems));
        localStorage.setItem('applicationTimes', JSON.stringify(applicationTimes));
    }, [appliedItems, applicationTimes]);

    // Function to handle job/training click
    const handleItemClick = (type, item) => {
        setSelectedItem({ ...item, type });
        setIsModalOpen(true);
    };

    // Add these new functions to handle applications/enrollments
    const handleApplyItem = (e, type, id) => {
        e.stopPropagation();
        const now = new Date().getTime();
        
        const newApplicationTimes = {
            ...applicationTimes,
            [`${type}-${id}`]: now
        };
        
        const newAppliedItems = {
            ...appliedItems,
            [`${type}-${id}`]: true
        };

        setApplicationTimes(newApplicationTimes);
        setAppliedItems(newAppliedItems);

        // Update localStorage
        localStorage.setItem('appliedItems', JSON.stringify(newAppliedItems));
        localStorage.setItem('applicationTimes', JSON.stringify(newApplicationTimes));
    };

    const handleWithdrawItem = (e, type, id) => {
        e.stopPropagation();
        
        const newApplicationTimes = { ...applicationTimes };
        const newAppliedItems = { ...appliedItems };
        
        delete newApplicationTimes[`${type}-${id}`];
        delete newAppliedItems[`${type}-${id}`];

        setApplicationTimes(newApplicationTimes);
        setAppliedItems(newAppliedItems);

        // Update localStorage
        localStorage.setItem('appliedItems', JSON.stringify(newAppliedItems));
        localStorage.setItem('applicationTimes', JSON.stringify(newApplicationTimes));
    };

    const canWithdraw = (type, id) => {
        const applicationTime = applicationTimes[`${type}-${id}`];
        if (!applicationTime) return false;
        const now = new Date().getTime();
        const timeDiff = now - applicationTime;
        return timeDiff <= 24 * 60 * 60 * 1000; // 24 hours
    };

    const getTimeRemaining = (type, id) => {
        const applicationTime = applicationTimes[`${type}-${id}`];
        if (!applicationTime) return null;
        const now = new Date().getTime();
        const timeLeft = (applicationTime + 24 * 60 * 60 * 1000) - now;
        if (timeLeft <= 0) return null;
        
        const hours = Math.floor(timeLeft / (60 * 60 * 1000));
        const minutes = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000));
        return `${hours}h ${minutes}m remaining to withdraw`;
    };

    // Update the button styles
    const getButtonStyles = (type, id) => ({
        backgroundColor: appliedItems[`${type}-${id}`]
            ? canWithdraw(type, id)
                ? '#dc3545' // Red for withdraw
                : '#218838' // Green for already applied/enrolled
            : '#007BFF', // Blue for apply/enroll
        color: '#ffffff',
        textTransform: 'none',
        '&:hover': {
            backgroundColor: appliedItems[`${type}-${id}`]
                ? canWithdraw(type, id)
                    ? '#c82333' // Darker red
                    : '#1E7E34' // Darker green
                : '#0056b3', // Darker blue
        }
    });

    // Replace the existing handleActionClick with this:
    const handleActionClick = (e, type, id) => {
        e.stopPropagation();
        if (appliedItems[`${type}-${id}`] && canWithdraw(type, id)) {
            handleWithdrawItem(e, type, id);
        } else if (!appliedItems[`${type}-${id}`]) {
            handleApplyItem(e, type, id);
        }
    };

    // Update the counts whenever appliedItems changes
    useEffect(() => {
        const jobCount = Object.entries(appliedItems)
            .filter(([key, value]) => key.startsWith('job-') && value)
            .length;

        const trainingCount = Object.entries(appliedItems)
            .filter(([key, value]) => key.startsWith('training-') && value)
            .length;

        setApplicationCounts({
            jobs: jobCount,
            trainings: trainingCount
        });
    }, [appliedItems]);

    const handleViewAll = (type) => {
        if (type === 'jobs') {
            navigate('/dashboard/student/job-search');
        } else {
            navigate('/dashboard/student/training-search');
        }
    };

    const feedItems = [
        {
            id: 1,
            type: 'job',
            author: 'Microsoft Corporation',
            avatar: 'MS',
            verified: true,
            timestamp: '2 hours ago',
            content: 'We are looking for passionate Software Engineers to join our Azure Cloud team! Remote work available.',
            position: 'Senior Software Engineer',
            salary: '$120,000 - $180,000',
            location: 'Remote / Redmond, WA',
            likes: 324,
            comments: 45,
            shares: 89
        },
        {
            id: 2,
            type: 'training',
            author: 'Google Developer Academy',
            avatar: 'GD',
            verified: true,
            timestamp: '5 hours ago',
            content: 'Free Android Development Course starting next month! Limited slots available.',
            courseName: 'Android Development with Kotlin',
            duration: '3 months',
            startDate: 'Feb 1, 2024',
            likes: 892,
            comments: 156,
            shares: 234
        },
        {
            id: 3,
            type: 'scholarship',
            author: 'AWS Education',
            avatar: 'AWS',
            verified: true,
            timestamp: '1 day ago',
            content: 'Full scholarship opportunity for Cloud Computing certification! Applications are now open.',
            programName: 'AWS Certified Solutions Architect',
            value: '$2,000',
            deadline: 'Jan 30, 2024',
            likes: 1205,
            comments: 328,
            shares: 567
        }
    ];

    // Add interaction states
    const [likedPosts, setLikedPosts] = useState({});

    const handleLike = (postId) => {
        setLikedPosts(prev => ({
            ...prev,
            [postId]: !prev[postId]
        }));
    };

    return (
        <Box>
            <DashboardHeader 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleSearch={handleSearch}
                isCollapsed={isCollapsed}
            />
                   
            {/* Welcome Message Popup */}
                        <Paper elevation={3} 
                        sx={{ 
                            p: 3, 
                            borderRadius: 2,       
                            marginTop: '67px', 
                            zIndex: 1000,
                            backgroundColor: 'white',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            transition: 'top 0.3s',
                            display: showWelcome ? 'block' : 'none'
                            
                            }}>
                            <Box sx={{ 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                alignItems: 'center',
                               // mb: 2
                            }}>
                            <Box sx={{
                                flex: 1
                            }}>
                            <Typography variant="h4" gutterBottom>
                                Welcome back, John! 👋
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                {hasAnnouncements 
                                    ? "Your hiring journey continues! Here's what's new today."
                                    : "Your hiring journey continues! No news today."}
                            </Typography>                            
                            </Box>
                            <IconButton 
                            onClick={handleCloseWelcome}
                            sx={{ 
                                color: 'rgba(0, 0, 0, 0.54)',
                                padding: '4px',
                                marginTop: '-8px',
                                marginRight: '-8px'
                            }}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                        </Box>
                    </Paper>
           
                
           
            {/* Floating Announcement Button */}
            {showAnnouncementButton && (
                <Tooltip title="Show Announcement" placement="left">
                    <Fab
                        size="medium"
                        onClick={handleShowWelcome}
                        sx={{
                            position: 'fixed',
                            right: 20,
                            top: `calc(${headerHeight} + 20px)`,
                            zIndex: 1200,
                            backgroundColor: 'white',
                            '&:hover': {
                                backgroundColor: '#f5f5f5',
                            },
                            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <AnnouncementOutlined color="primary" />
                    </Fab>
                </Tooltip>
            )}
            
            {/* Main Content - Adjusted top position to account for announcement section */}
            <Box 
                sx={{ 
                    position: 'fixed',
                    top: showWelcome ? `calc(${headerHeight} + 116px)` : headerHeight, // Header height + Announcement height
                    left: isCollapsed ? '80px' : '250px',
                    right: 0,
                    bottom: 0,
                    transition: 'top 0.3s, left 0.3s', // Add transition for top property
                    overflowY: 'auto',
                    p: 3,
                    backgroundColor: '#f5f5f5'
                }}
            >
                    
             
                {/* Main Dashboard Grid */}
                <Grid container spacing={3}>

                    {/* Home */}
                    <Grid item xs={12}>
                        <Paper elevation={0} sx={{ borderRadius: 2 }}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 3, pt: 3 }}>
                                <Box sx={{ 
                                    display: 'flex', 
                                    justifyContent: 'space-between', 
                                    alignItems: 'center',
                                    mb: 2,
                                    height: '30px'
                                }}>
                                    <Typography variant="h6">Feed</Typography>
                                </Box>
                                
                                {/* Home Content */}
                                <Box sx={{ mb: 3 }}>
                                    {feedItems.map((item) => (
                                        <Paper
                                            key={item.id}
                                            elevation={0}
                                            sx={{
                                                p: 3,
                                                mb: 2,
                                                borderRadius: 2,
                                                border: '1px solid',
                                                borderColor: 'divider',
                                            }}
                                        >
                                            {/* Post Header */}
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>{item.avatar}</Avatar>
                                                <Box sx={{ flex: 1 }}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <Typography variant="subtitle1" fontWeight="bold">
                                                            {item.author}
                                                        </Typography>
                                                        {item.verified && (
                                                            <Verified sx={{ fontSize: 16, color: 'primary.main' }} />
                                                        )}
                                                    </Box>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {item.timestamp}
                                                    </Typography>
                                                </Box>
                                                <Chip
                                                    icon={
                                                        item.type === 'job' ? <WorkOutlineOutlined /> :
                                                        item.type === 'training' ? <SchoolOutlined /> :
                                                        <CardGiftcardOutlined />
                                                    }
                                                    label={item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                                                    size="small"
                                                    color={
                                                        item.type === 'job' ? 'primary' :
                                                        item.type === 'training' ? 'secondary' :
                                                        'success'
                                                    }
                                                />
                                            </Box>

                                            {/* Post Content */}
                                            <Typography paragraph>{item.content}</Typography>

                                            {/* Post Details */}
                                            <Paper
                                                variant="outlined"
                                                sx={{ p: 2, mb: 2, bgcolor: 'background.default' }}
                                            >
                                                {item.type === 'job' && (
                                                    <Box>
                                                        <Typography variant="h6">{item.position}</Typography>
                                                        <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                                                            <Chip icon={<Payment />} label={item.salary} size="small" />
                                                            <Chip icon={<LocationOn />} label={item.location} size="small" />
                                                        </Box>
                                                    </Box>
                                                )}
                                                {item.type === 'training' && (
                                                    <Box>
                                                        <Typography variant="h6">{item.courseName}</Typography>
                                                        <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                                                            <Chip icon={<AccessTime />} label={item.duration} size="small" />
                                                            <Chip icon={<CalendarToday />} label={item.startDate} size="small" />
                                                        </Box>
                                                    </Box>
                                                )}
                                                {item.type === 'scholarship' && (
                                                    <Box>
                                                        <Typography variant="h6">{item.programName}</Typography>
                                                        <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                                                            <Chip icon={<Payment />} label={`Value: ${item.value}`} size="small" />
                                                            <Chip icon={<CalendarToday />} label={`Deadline: ${item.deadline}`} size="small" />
                                                        </Box>
                                                    </Box>
                                                )}
                                            </Paper>

                                            {/* Post Actions */}
                                            <Box sx={{ display: 'flex', gap: 2, pt: 1 }}>
                                                <Button
                                                    startIcon={<ThumbUp color={likedPosts[item.id] ? "primary" : "action"} />}
                                                    onClick={() => handleLike(item.id)}
                                                    sx={{ flex: 1 }}
                                                >
                                                    {item.likes}
                                                </Button>
                                                <Button startIcon={<Comment />} sx={{ flex: 1 }}>
                                                    {item.comments}
                                                </Button>
                                                <Button startIcon={<Share />} sx={{ flex: 1 }}>
                                                    {item.shares}
                                                </Button>
                                            </Box>
                                        </Paper>
                                    ))}
                                </Box>


                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
            

        </Box>
    );
};

export default Dashboard;
