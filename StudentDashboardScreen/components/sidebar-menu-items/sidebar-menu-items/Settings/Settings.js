import React, { useState } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Divider,
  ListItemButton,
  Collapse,
  Dialog,
  TextField,
  Button,
  IconButton,
  Avatar,
  Select,
  MenuItem,
  Grid,
  FormControl,
  InputLabel,
  DialogTitle,
  DialogContent,
  FormControlLabel,
  Switch,
  Input,
} from '@mui/material';
import {
  AccountCircle,
  Security,
  PrivacyTip,
  Notifications,
  ExpandMore,
  ChevronRight,
  Brightness4,
  Language,
  Business,
  PersonOutline,
  Settings as SettingsIcon,
  PowerSettingsNew,
  Close,
  Close as CloseIcon,
  Edit as EditIcon,
  Save as SaveIcon,
} from '@mui/icons-material';

const Settings = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedSetting, setSelectedSetting] = useState('profile');
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState({
    personalInfo: false,
    email: false,
    username: false,
    password: false,
    validId: false,
    permanentAddress: false,
    presentAddress: false,
    credentials: false
  });

  const [profileData, setProfileData] = useState({
    companyId: 'COMP-123456',
    firstName: 'John',
    middleName: 'Doe',
    lastName: 'Smith',
    dateOfBirth: '1990-01-01',
    placeOfBirth: 'New York',
    sex: 'Male',
    suffix: 'Jr.',
    nationality: 'Filipino',
    religion: 'Catholic',
    contactNumber: '+1234567890',
    landline: '123-4567',
    civilStatus: 'Single',
    industry: 'Technology',
    email: 'john@example.com',
    username: 'johnsmith',
    // ... add other fields as needed
  });

  const [uploadedId, setUploadedId] = useState(null);
  const [addressMatchesCurrent, setAddressMatchesCurrent] = useState(false);
  
  const religions = [
    "Roman Catholic", "Islam", "Christianity", "Buddhism", "Hinduism",
    // ... add more religions
  ];

  const industries = [
    "Technology", "Healthcare", "Manufacturing", "Retail", "Education",
    // ... add more industries
  ];

  const settingsMenu = [
    {
      id: 'profile',
      title: 'Profile Information',
      icon: <PersonOutline />,
      subitems: [
        { id: 'basic-info', title: 'Name, location, and industry', icon: <ChevronRight /> },
        { id: 'demographic', title: 'Personal demographic information', icon: <ChevronRight /> }
      ]
    },
    {
      id: 'display',
      title: 'Display',
      icon: <Brightness4 />,
      subitems: [
        { id: 'dark-mode', title: 'Dark mode', icon: <ChevronRight /> }
      ]
    },
    {
      id: 'preferences',
      title: 'General Preferences',
      icon: <SettingsIcon />,
      subitems: [
        { id: 'language', title: 'Language', icon: <ChevronRight /> },
        { id: 'content-language', title: 'Content language', icon: <ChevronRight /> }
      ]
    },
    {
      id: 'partners',
      title: 'Partners & Services',
      icon: <Business />,
      subitems: [
        { id: 'xyz-company', title: 'XYZ Company', icon: <ChevronRight /> }
      ]
    },
    {
      id: 'account',
      title: 'Account Management',
      icon: <PowerSettingsNew />,
      subitems: [
        { id: 'hibernate', title: 'Hibernate account', icon: <ChevronRight /> },
        { id: 'delete', title: 'Delete account', icon: <ChevronRight /> }
      ]
    }
  ];

  const [expandedItems, setExpandedItems] = useState({});

  const handleItemClick = (itemId) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const handleSubItemClick = (itemId, subItemId) => {
    if (itemId === 'profile' && subItemId === 'basic-info') {
      setProfileDialogOpen(true);
    }
    setSelectedSetting(`${itemId}-${subItemId}`);
  };

  const handleEdit = (section) => {
    setIsEditing(prev => ({ ...prev, [section]: true }));
  };

  const handleSave = (section) => {
    setIsEditing(prev => ({ ...prev, [section]: false }));
    // Add API call to save changes
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const ProfileDialog = () => (
    <Dialog open={profileDialogOpen} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Profile Information</Typography>
        <IconButton onClick={() => setProfileDialogOpen(false)}><CloseIcon /></IconButton>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          {/* Profile Header */}
          <Grid item xs={12} sx={{ textAlign: 'center', mb: 3 }}>
            <Avatar 
              sx={{ width: 120, height: 120, margin: '0 auto', mb: 2 }}
              src={profileData.profilePicture}
            />
            <Button variant="contained" component="label">
              Update Profile Picture
              <input type="file" hidden accept="image/*" />
            </Button>
            <Typography variant="subtitle2" sx={{ mt: 1, color: 'text.secondary' }}>
              Company ID: {profileData.companyId}
            </Typography>
          </Grid>

          <Divider sx={{ width: '100%', mb: 3 }} />

          {/* Personal Information Section */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Personal Information</Typography>
              <Button 
                startIcon={isEditing.personalInfo ? <SaveIcon /> : <EditIcon />}
                onClick={() => isEditing.personalInfo ? handleSave('personalInfo') : handleEdit('personalInfo')}
              >
                {isEditing.personalInfo ? 'Save' : 'Edit'}
              </Button>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="First Name"
                  value={profileData.firstName}
                  disabled={!isEditing.personalInfo}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Middle Name"
                  value={profileData.middleName}
                  disabled={!isEditing.personalInfo}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Last Name"
                  value={profileData.lastName}
                  disabled={!isEditing.personalInfo}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Date of Birth"
                  type="date"
                  value={profileData.dateOfBirth}
                  disabled={!isEditing.personalInfo}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Place of Birth"
                  value={profileData.placeOfBirth}
                  disabled={!isEditing.personalInfo}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth disabled={!isEditing.personalInfo}>
                  <InputLabel>Sex</InputLabel>
                  <Select value={profileData.sex}>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth disabled={!isEditing.personalInfo}>
                  <InputLabel>Suffix</InputLabel>
                  <Select
                    value={profileData.suffix}
                    onChange={handleChange}
                    name="suffix"
                  >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="Jr.">Jr.</MenuItem>
                    <MenuItem value="Sr.">Sr.</MenuItem>
                    <MenuItem value="III">III</MenuItem>
                    <MenuItem value="IV">IV</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={4}>
                <FormControl fullWidth disabled={!isEditing.personalInfo}>
                  <InputLabel>Nationality</InputLabel>
                  <Select
                    value={profileData.nationality}
                    onChange={handleChange}
                    name="nationality"
                  >
                    <MenuItem value="Filipino">Filipino</MenuItem>
                    {/* Add more nationalities */}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={4}>
                <FormControl fullWidth disabled={!isEditing.personalInfo}>
                  <InputLabel>Religion</InputLabel>
                  <Select
                    value={profileData.religion}
                    onChange={handleChange}
                    name="religion"
                  >
                    {religions.map((religion) => (
                      <MenuItem key={religion} value={religion}>{religion}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Contact Number"
                  value={profileData.contactNumber}
                  onChange={handleChange}
                  name="contactNumber"
                  disabled={!isEditing.personalInfo}
                  type="number"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Landline Number"
                  value={profileData.landline}
                  onChange={handleChange}
                  name="landline"
                  disabled={!isEditing.personalInfo}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth disabled={!isEditing.personalInfo}>
                  <InputLabel>Civil Status</InputLabel>
                  <Select
                    value={profileData.civilStatus}
                    onChange={handleChange}
                    name="civilStatus"
                  >
                    <MenuItem value="Single">Single</MenuItem>
                    <MenuItem value="Married">Married</MenuItem>
                    <MenuItem value="Divorced">Divorced</MenuItem>
                    <MenuItem value="Widowed">Widowed</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth disabled={!isEditing.personalInfo}>
                  <InputLabel>Industry</InputLabel>
                  <Select
                    value={profileData.industry}
                    onChange={handleChange}
                    name="industry"
                  >
                    {industries.map((industry) => (
                      <MenuItem key={industry} value={industry}>{industry}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          <Divider sx={{ width: '100%', my: 3 }} />

          {/* Email Section */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Email Address</Typography>
              <Button 
                startIcon={isEditing.email ? <SaveIcon /> : <EditIcon />}
                onClick={() => isEditing.email ? handleSave('email') : handleEdit('email')}
              >
                {isEditing.email ? 'Save' : 'Edit'}
              </Button>
            </Box>
            <TextField
              fullWidth
              label="Email Address"
              value={profileData.email}
              disabled={!isEditing.email}
            />
          </Grid>

          {/* Add similar sections for:
              - Username 
              - Password
              - Valid ID
              - Address sections
          */}

          {/* Valid ID Section */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Valid ID</Typography>
              <Button
                variant="outlined"
                component="label"
                startIcon={<EditIcon />}
              >
                Update ID
                <input
                  type="file"
                  hidden
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={(e) => setUploadedId(e.target.files[0])}
                />
              </Button>
            </Box>
            {uploadedId && (
              <Typography variant="body2" color="text.secondary">
                Saved file: {uploadedId.name}
              </Typography>
            )}
          </Grid>

          {/* Address Section */}
          {/* ... Add address fields similar to your PersonalInfo component ... */}

          {/* Account Credentials Section */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Account Credentials</Typography>
              <Button 
                startIcon={isEditing.credentials ? <SaveIcon /> : <EditIcon />}
                onClick={() => isEditing.credentials ? handleSave('credentials') : handleEdit('credentials')}
              >
                {isEditing.credentials ? 'Save' : 'Edit'}
              </Button>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Username"
                  value={profileData.username}
                  disabled={!isEditing.credentials}
                  name="username"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="New Password"
                  type="password"
                  disabled={!isEditing.credentials}
                  name="newPassword"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Confirm Password"
                  type="password"
                  disabled={!isEditing.credentials}
                  name="confirmPassword"
                />
              </Grid>
            </Grid>
          </Grid>

        </Grid>
      </DialogContent>
    </Dialog>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Settings</Typography>
      <Divider sx={{ mb: 3 }} />
      
      <Box display="flex" gap={3}>
        {/* Settings Menu */}
        <Paper sx={{ flex: 1, p: 2 }}>
          <List>
            {settingsMenu.map((item) => (
              <React.Fragment key={item.id}>
                <ListItemButton
                  onClick={() => handleItemClick(item.id)}
                  sx={{
                    mb: 1,
                    borderRadius: 1,
                    '&:hover': { backgroundColor: '#f5f5f5' }
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.title} />
                  {expandedItems[item.id] ? <ExpandMore /> : <ChevronRight />}
                </ListItemButton>
                <Collapse in={expandedItems[item.id]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.subitems.map((subitem) => (
                      <ListItemButton
                        key={subitem.id}
                        sx={{ pl: 4 }}
                        selected={selectedSetting === `${item.id}-${subitem.id}`}
                        onClick={() => handleSubItemClick(item.id, subitem.id)}
                      >
                        <ListItemText 
                          primary={subitem.title}
                          sx={{ 
                            '& .MuiTypography-root': { 
                              fontSize: '0.9rem',
                              color: '#666'
                            }
                          }}
                        />
                        {subitem.icon}
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </Box>
      <ProfileDialog />
    </Box>
  );
};

export default Settings;
