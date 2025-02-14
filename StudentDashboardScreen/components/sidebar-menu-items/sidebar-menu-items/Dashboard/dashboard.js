import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

import { 
    Box, Typography, Paper, Slide, Fab, Tooltip, Grid, 
    Card, CardContent, IconButton,
    Avatar, Tab, Tabs, Button, Divider, 
    Rating, Stack, Badge,
    Dialog, DialogContent, DialogActions, DialogTitle,
    IconButton as MuiIconButton
} from "@mui/material";
import { Fade } from '@mui/material';
import { Chip } from '@mui/material';


import CloseIcon from '@mui/icons-material/Close';

import {
    WorkOutline, School, TrendingUp, Notifications,
    AnnouncementOutlined, Announcement,
    ArrowForward, CalendarToday, BusinessCenter,
    BookmarkBorder, Timeline, NavigateNext,  
    LocationOn, AccessTime, Payment,
    Verified, Bookmark
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
                                Welcome back, Emily! 👋
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                {hasAnnouncements 
                                    ? "Your job search journey continues! Here's what's new today."
                                    : "Your job search journey continues! No news today."}
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
                {/* Quick Stats Grid */}
                <Grid container spacing={3} sx={{ mb: 3 }}>
                    {stats.map((stat, index) => (
                        <Grid item xs={12} sm={6} md={6} key={index} >                 {/* Quick Stats Grid */}
                {/* note: if gusto iresize ang width then change md only */}
                            <Card 
                                elevation={0}
                                sx={{
                                    position: 'relative',
                                    cursor: stat.action ? 'pointer' : 'default',
                                    '&:hover': stat.action ? {
                                        backgroundColor: 'rgba(0,0,0,0.02)'
                                    } : {},
                                    height: '100%' // Ensure consistent height
                                }}
                                onClick={stat.action}
                            >
                                <CardContent>
                                    <Box sx={{ 
                                        display: 'flex', 
                                        alignItems: 'flex-start',
                                        gap: 2,
                                        mb: 1 // Always show margin bottom
                                    }}>
                                        <Avatar sx={{ bgcolor: stat.color }}>
                                            {stat.icon}
                                        </Avatar>
                                        <Box>
                                            <Typography variant="h6">
                                                {stat.count}
                                                {stat.title === "Training" && Number(stat.count) > 0 && (
                                                    <Typography 
                                                        component="span" 
                                                        variant="caption" 
                                                        sx={{ ml: 1, color: 'text.secondary' }}
                                                    >
                                                        enrolled
                                                    </Typography>
                                                )}
                                                {stat.title === "Jobs" && Number(stat.count) > 0 && (
                                                    <Typography 
                                                        component="span" 
                                                        variant="caption" 
                                                        sx={{ ml: 1, color: 'text.secondary' }}
                                                    >
                                                        applied
                                                    </Typography>
                                                )}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {stat.title}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    
                                    <Box sx={{ 
                                        mt: 1,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between'
                                    }}>
                                        <Box>
                                            <Typography 
                                                variant="caption" 
                                                color="text.secondary" 
                                                display="block" 
                                                sx={{ fontSize: '10px'}}
                                            >
                                                {stat.emptyMessage}
                                            </Typography>
                                            <Typography 
                                                variant="caption" 
                                                color="primary"
                                                sx={{ 
                                                    display: 'flex', 
                                                    alignItems: 'center',
                                                    gap: 0.5,
                                                    cursor: 'pointer',
                                                    fontSize: '10px',
                                                }}
                                            >
                                                {stat.actionMessage}
                                                <NavigateNext fontSize="small" />
                                            </Typography>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Main Dashboard Grid */}
                <Grid container spacing={3}>

                    {/* Recommended Section */}
                    <Grid item xs={12}>
                        <Paper elevation={0} sx={{ borderRadius: 2 }}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 3, pt: 3 }}>
                                <Box sx={{ 
                                    display: 'flex', 
                                    justifyContent: 'space-between', 
                                    alignItems: 'center',
                                    mb: 2
                                }}>
                                    <Typography variant="h6">Recommended for You</Typography>
                                    <Button 
                                        variant="outlined" 
                                        size="small"
                                        endIcon={<ArrowForward />}
                                        onClick={() => handleViewAll(activeTab === 0 ? 'jobs' : 'trainings')}
                                    >
                                        View All
                                    </Button>
                                </Box>
                                <Tabs 
                                    value={activeTab} 
                                    onChange={(e, newValue) => setActiveTab(newValue)}
                                    sx={{ mb: -1 }}
                                >
                                    <Tab label="Jobs" />
                                    <Tab label="Trainings" />
                                </Tabs>
                            </Box>

                            <Box sx={{ p: 3 }}>
                                <Grid container spacing={2}>
                                    {activeTab === 0 ? (
                                        // Jobs Grid
                                        recommendedJobs.map(job => (
                                            <Grid item xs={12} md={6} key={job.id}>
                                                <Paper
                                                    elevation={0}
                                                    onClick={() => handleItemClick('job', job)}
                                                    sx={{
                                                        p: 2,
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
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                                                            <Avatar 
                                                                variant="rounded"
                                                                sx={{ width: 50, height: 50 }}
                                                            >
                                                                {job.company[0]}
                                                            </Avatar>
                                                            <Box>
                                                                <Typography variant="subtitle1" fontWeight="bold">
                                                                    {job.title}
                                                                    {job.verified && (
                                                                        <Verified 
                                                                            sx={{ 
                                                                                ml: 1, 
                                                                                fontSize: 16, 
                                                                                color: 'primary.main' 
                                                                            }} 
                                                                        />
                                                                    )}
                                                                </Typography>
                                                                <Typography variant="body2" color="text.secondary">
                                                                    {job.company}
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                        <IconButton 
                                                            size="small"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleSaveJob(job.id);
                                                            }}
                                                        >
                                                            {savedJobs[job.id] 
                                                                ? <Bookmark color="primary" />
                                                                : <BookmarkBorder />
                                                            }
                                                        </IconButton>
                                                    </Box>

                                                    <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                                                        <Chip 
                                                            icon={<LocationOn fontSize="small" />} 
                                                            label={job.location}
                                                            size="small"
                                                            variant="outlined"
                                                        />
                                                        <Chip 
                                                            icon={<Payment fontSize="small" />}
                                                            label={job.salary}
                                                            size="small"
                                                            variant="outlined"
                                                        />
                                                        <Chip 
                                                            icon={<AccessTime fontSize="small" />}
                                                            label={job.posted}
                                                            size="small"
                                                            variant="outlined"
                                                        />
                                                    </Stack>

                                                    <Box sx={{ mb: 2 }}>
                                                        {job.skills.map(skill => (
                                                            <Chip
                                                                key={skill}
                                                                label={skill}
                                                                size="small"
                                                                sx={{ mr: 1, mb: 1 }}
                                                            />
                                                        ))}
                                                    </Box>

                                                    <Divider sx={{ my: 2 }} />

                                                    <Box sx={{ 
                                                        display: 'flex', 
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                        flexDirection: 'column', // Change to column when showing withdrawal
                                                        gap: 1
                                                    }}>
                                                        <Box sx={{ 
                                                            width: '100%',
                                                            display: 'flex', 
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center'
                                                        }}>
                                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                <Rating value={job.rating} readOnly size="small" />
                                                                <Typography variant="body2" color="text.secondary">
                                                                    ({job.reviews})
                                                                </Typography>
                                                            </Box>
                                                            <Button 
                                                                variant="contained" 
                                                                size="small"
                                                                onClick={(e) => handleActionClick(e, 'job', job.id)}
                                                                sx={getButtonStyles('job', job.id)}
                                                            >
                                                                {appliedItems[`job-${job.id}`]
                                                                    ? canWithdraw('job', job.id)
                                                                        ? 'Withdraw Application'
                                                                        : 'Applied'
                                                                    : 'Apply Now'
                                                                }
                                                            </Button>
                                                        </Box>
                                                        {appliedItems[`job-${job.id}`] && canWithdraw('job', job.id) && (
                                                            <Typography 
                                                                variant="caption" 
                                                                sx={{ 
                                                                    color: '#dc3545',
                                                                    width: '100%',
                                                                    textAlign: 'right'
                                                                }}
                                                            >
                                                                {getTimeRemaining('job', job.id)}
                                                            </Typography>
                                                        )}
                                                    </Box>
                                                </Paper>
                                            </Grid>
                                        ))
                                    ) : (
                                        // Trainings Grid
                                        recommendedTrainings.map(training => (
                                            <Grid item xs={12} md={6} key={training.id}>
                                                <Paper
                                                    elevation={0}
                                                    onClick={() => handleItemClick('training', training)}
                                                    sx={{
                                                        p: 2,
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
                                                    {/* Similar structure to jobs, but with training-specific info */}
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                                                            <Avatar 
                                                                variant="rounded"
                                                                sx={{ width: 50, height: 50 }}
                                                            >
                                                                {training.provider[0]}
                                                            </Avatar>
                                                            <Box>
                                                                <Typography variant="subtitle1" fontWeight="bold">
                                                                    {training.title}
                                                                    {training.verified && (
                                                                        <Verified 
                                                                            sx={{ 
                                                                                ml: 1, 
                                                                                fontSize: 16, 
                                                                                color: 'primary.main' 
                                                                            }} 
                                                                        />
                                                                    )}
                                                                </Typography>
                                                                <Typography variant="body2" color="text.secondary">
                                                                    {training.provider}
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                        <IconButton 
                                                            size="small"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleSaveTraining(training.id);
                                                            }}
                                                        >
                                                            {savedTrainings[training.id]
                                                                ? <Bookmark color="primary" />
                                                                : <BookmarkBorder />
                                                            }
                                                        </IconButton>
                                                    </Box>

                                                    <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                                                        <Chip 
                                                            icon={<AccessTime fontSize="small" />}
                                                            label={training.duration}
                                                            size="small"
                                                            variant="outlined"
                                                        />
                                                        <Chip 
                                                            icon={<Payment fontSize="small" />}
                                                            label={training.price}
                                                            size="small"
                                                            variant="outlined"
                                                        />
                                                        <Chip 
                                                            label={training.level}
                                                            size="small"
                                                            color="primary"
                                                            variant="outlined"
                                                        />
                                                    </Stack>

                                                    <Box sx={{ mb: 2 }}>
                                                        {training.skills.map(skill => (
                                                            <Chip
                                                                key={skill}
                                                                label={skill}
                                                                size="small"
                                                                sx={{ mr: 1, mb: 1 }}
                                                            />
                                                        ))}
                                                    </Box>

                                                    <Divider sx={{ my: 2 }} />

                                                    <Box sx={{ 
                                                        display: 'flex', 
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                        flexDirection: 'column',
                                                        gap: 1
                                                    }}>
                                                        <Box sx={{ 
                                                            width: '100%',
                                                            display: 'flex', 
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center'
                                                        }}>
                                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                <Rating value={training.rating} readOnly size="small" />
                                                                <Typography variant="body2" color="text.secondary">
                                                                    ({training.enrolled} enrolled)
                                                                </Typography>
                                                            </Box>
                                                            <Button 
                                                                variant="contained" 
                                                                size="small"
                                                                onClick={(e) => handleActionClick(e, 'training', training.id)}
                                                                sx={getButtonStyles('training', training.id)}
                                                            >
                                                                {appliedItems[`training-${training.id}`]
                                                                    ? canWithdraw('training', training.id)
                                                                        ? 'Withdraw Enrollment'
                                                                        : 'Enrolled'
                                                                    : 'Enroll Now'
                                                                }
                                                            </Button>
                                                        </Box>
                                                        {appliedItems[`training-${training.id}`] && canWithdraw('training', training.id) && (
                                                            <Typography 
                                                                variant="caption" 
                                                                sx={{ 
                                                                    color: '#dc3545',
                                                                    width: '100%',
                                                                    textAlign: 'right'
                                                                }}
                                                            >
                                                                {getTimeRemaining('training', training.id)}
                                                            </Typography>
                                                        )}
                                                    </Box>
                                                </Paper>
                                            </Grid>
                                        ))
                                    )}
                                </Grid>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>

            {/* Item View Modal */}
            <Dialog
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                maxWidth="md"
                fullWidth
                sx={{
                    '& .MuiDialog-paper': {
                        borderRadius: 2,
                        maxHeight: '90vh'
                    }
                }}
            >
                <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6">
                        {selectedItem?.type === 'job' ? 'Job Details' : 'Training Details'}
                    </Typography>
                    <IconButton onClick={() => setIsModalOpen(false)} size="small">
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    {selectedItem && (
                        <Box sx={{ p: 2 }}>
                            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                                <Avatar 
                                    variant="rounded"
                                    sx={{ width: 60, height: 60 }}
                                >
                                    {selectedItem.type === 'job' 
                                        ? selectedItem.company[0]
                                        : selectedItem.provider[0]
                                    }
                                </Avatar>
                                <Box>
                                    <Typography variant="h5" gutterBottom>
                                        {selectedItem.title}
                                        {selectedItem.verified && (
                                            <Verified sx={{ ml: 1, color: 'primary.main' }} />
                                        )}
                                    </Typography>
                                    <Typography color="text.secondary">
                                        {selectedItem.type === 'job' 
                                            ? selectedItem.company 
                                            : selectedItem.provider
                                        }
                                    </Typography>
                                </Box>
                            </Box>

                            <Grid container spacing={2} sx={{ mb: 3 }}>
                                {selectedItem.type === 'job' ? (
                                    <>
                                        <Grid item xs={12} sm={4}>
                                            <Typography variant="body2" color="text.secondary">Location</Typography>
                                            <Typography>{selectedItem.location}</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <Typography variant="body2" color="text.secondary">Salary</Typography>
                                            <Typography>{selectedItem.salary}</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <Typography variant="body2" color="text.secondary">Type</Typography>
                                            <Typography>{selectedItem.type}</Typography>
                                        </Grid>
                                    </>
                                ) : (
                                    <>
                                        <Grid item xs={12} sm={4}>
                                            <Typography variant="body2" color="text.secondary">Duration</Typography>
                                            <Typography>{selectedItem.duration}</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <Typography variant="body2" color="text.secondary">Price</Typography>
                                            <Typography>{selectedItem.price}</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <Typography variant="body2" color="text.secondary">Level</Typography>
                                            <Typography>{selectedItem.level}</Typography>
                                        </Grid>
                                    </>
                                )}
                            </Grid>

                            <Typography variant="h6" gutterBottom>Skills Required</Typography>
                            <Box sx={{ mb: 3 }}>
                                {selectedItem.skills.map(skill => (
                                    <Chip
                                        key={skill}
                                        label={skill}
                                        sx={{ mr: 1, mb: 1 }}
                                    />
                                ))}

                                <Box sx={{ 
                                    display: 'flex', 
                                    alignItems: 'center',
                                    gap: 2,
                                    mt: 3
                                }}>
                                    <Rating value={selectedItem.rating} readOnly />
                                    <Typography variant="body2" color="text.secondary">
                                        ({selectedItem.type === 'job' 
                                            ? `${selectedItem.reviews} reviews`
                                            : `${selectedItem.enrolled} enrolled`
                                        })
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    )}
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default Dashboard;
