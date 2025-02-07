import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Import useLocation
import logoImg from './images/logonav.png';
import bannerBg from './images/banner-bg.png'; // Import the banner background image
import footerBg from './images/footer-bg.png'; // Import the footer background image

// Material-UI Components
import {
  Typography,
  Button,
  Container,
  Box,
  Grid,
  AppBar,
  Tabs,
  Tab,
  TextField,
  MenuItem,
} from '@mui/material';

const Home = () => {
  const [tabValue, setTabValue] = React.useState(0);
  const navigate = useNavigate(); // Initialize useNavigate

  // State for registration form fields
  const [userType, setUserType] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleLoginClick = () => {
    navigate('/student-application-form'); // Navigate to the UserApplicationForm route
  };

  const handleRegisterClick = () => {
    // Log the registration details to the console
    console.log('Registration Details:', {
      userType,
      username,
      email,
      password,
      confirmPassword,
    });

    // Add your registration logic here (e.g., API call, validation, etc.)
    // For now, we're just logging the data to the console.
  };

  return (
    <div>
      {/* ==================== HEADER ==================== */}
      <AppBar
        sx={{
          backgroundColor: 'rgba(224, 251, 255, 0.8)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          paddingY: '20px',
          margin: '0',
          boxShadow: 'none',
        }}
      >
        <Container
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center',
            margin: '0',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {/* Logo and Text */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={logoImg}
                alt="IPEPS Logo"
                style={{ width: '50px', height: '50px' }}
              />
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 'bold',
                  fontFamily: 'Roboto, sans-serif',
                  color: '#191a20',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontSize: '24px',
                  marginTop: '10px',
                }}
              >
                IPEPS
              </Typography>
            </Box>
          </Box>
          <Box>
            {/* Main Heading */}
            <Typography
              variant="h2"
              sx={{
                fontWeight: 'bold',
                color: '#191a20',
                lineHeight: '1.2',
                maxWidth: '500px',
                fontSize: '18px',
              }}
            >
              Iloilo Province Employment Portal and Services
            </Typography>

            {/* Subtext */}
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'light',
                color: 'gray',
                fontSize: '12px',
                textAlign: 'right',
              }}
            >
              Build career resumes. Explore jobs. Find employment match.
            </Typography>
          </Box>
        </Container>
      </AppBar>

      {/* ==================== BANNER SECTION ==================== */}
      <Box
        sx={{
          backgroundImage: `url(${bannerBg})`,
          backgroundSize: 'auto 100%',
          backgroundPosition: 'right center',
          backgroundRepeat: 'no-repeat',
          height: '100vh',
          minHeight: '793px',
          display: 'flex',
          alignItems: 'center',
          marginBottom: '50px',
        }}
      >
        <Box
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
            padding: '24px',
            borderRadius: '8px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Add shadow
            maxWidth: '700px',
            maxHeight: '600px',
            width: '100%', // Ensure the box takes full width
            marginLeft: '70px',
            marginTop: '20px',
          }}
        >
          {/* Register and Login Tab Style */}
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            centered
            sx={{
              marginBottom: '24px',
              '.MuiTabs-flexContainer': {
                justifyContent: 'space-between', // Distribute tabs equally
              },
            }}
          >
            <Tab
              label="Register"
              sx={{
                flex: 1, // Makes the tab stretch
                textAlign: 'center',
              }}
            />
            <Tab
              label="Login"
              sx={{
                flex: 1, // Equal stretch for the second tab
                textAlign: 'center',
              }}
            />
          </Tabs>

          {/* Register Tab */}
          {tabValue === 0 && (
            <Box sx={{ minHeight: '450px' }}>
              <TextField
                select
                label="Select a User"
                fullWidth
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                sx={{
                  marginBottom: '16px',
                  '& .MuiInputBase-input': {
                    fontSize: '14px',
                  },
                  '& .MuiInputLabel-root': {
                    fontSize: '14px',
                  },
                  '& .MuiMenuItem-root': {
                    fontSize: '14px',
                  },
                }}
              >
                <MenuItem value="Employer">Employer</MenuItem>
                <MenuItem value="Jobseeker">Jobseeker</MenuItem>
                <MenuItem value="Academe">Academe</MenuItem>
                <MenuItem value="Student">Student</MenuItem>
              </TextField>

              <TextField
                label="Username"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={{
                  marginBottom: '16px',
                  '& .MuiInputBase-input': {
                    fontSize: '14px',
                  },
                  '& .MuiInputLabel-root': {
                    fontSize: '14px',
                  },
                }}
              />

              <TextField
                label="Email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  marginBottom: '16px',
                  '& .MuiInputBase-input': {
                    fontSize: '14px',
                  },
                  '& .MuiInputLabel-root': {
                    fontSize: '14px',
                  },
                }}
              />

              <TextField
                label="Password"
                type="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{
                  marginBottom: '16px',
                  '& .MuiInputBase-input': {
                    fontSize: '14px',
                  },
                  '& .MuiInputLabel-root': {
                    fontSize: '14px',
                  },
                }}
              />

              <TextField
                label="Confirm Password"
                type="password"
                fullWidth
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                sx={{
                  marginBottom: '16px',
                  '& .MuiInputBase-input': {
                    fontSize: '14px',
                  },
                  '& .MuiInputLabel-root': {
                    fontSize: '14px',
                  },
                }}
              />

              <Button
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: '#00bcd4',
                  color: '#ffffff',
                  '&:hover': {
                    backgroundColor: '#008394',
                  },
                  fontSize: '14px',
                }}
                onClick={handleRegisterClick} // Add onClick handler
              >
                Register
              </Button>

              <Typography
                variant="body2"
                sx={{ marginTop: '16px', textAlign: 'center', fontSize: '14px' }}
              >
                Forget password?{' '}
                <Link to="/forgot-password" style={{ color: '#008394' }}>
                  Click here
                </Link>
              </Typography>
            </Box>
          )}

          {/* Login Tab */}
          {tabValue === 1 && (
            <Box sx={{ minHeight: '450px' }}>
              <TextField
                label="Username"
                fullWidth
                sx={{
                  marginBottom: '16px',
                  '& .MuiInputBase-input': {
                    fontSize: '14px',
                  },
                  '& .MuiInputLabel-root': {
                    fontSize: '14px',
                  },
                }}
              />

              <TextField
                label="Password"
                type="password"
                fullWidth
                sx={{
                  marginBottom: '16px',
                  '& .MuiInputBase-input': {
                    fontSize: '16px',
                  },
                  '& .MuiInputLabel-root': {
                    fontSize: '16px',
                  },
                }}
              />

              {/* Add empty space to match the Register tab height */}
              <Box sx={{ visibility: 'hidden', marginBottom: '16px' }}>
                <TextField fullWidth disabled />
              </Box>
              <Box sx={{ visibility: 'hidden', marginBottom: '16px' }}>
                <TextField fullWidth disabled />
              </Box>
              <Box sx={{ visibility: 'hidden', marginBottom: '16px' }}>
                <TextField fullWidth disabled />
              </Box>

              <Button
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: '#00bcd4',
                  color: '#ffffff',
                  '&:hover': {
                    backgroundColor: '#008394',
                  },
                  fontSize: '14px',
                  marginTop: '-380px',
                }}
                onClick={handleLoginClick}
              >
                Login
              </Button>

              <Typography
                variant="body2"
                sx={{ marginTop: '-150px', textAlign: 'center', fontSize: '14px' }}
              >
                Forget password?{' '}
                <Link to="/forgot-password" style={{ color: '#008394' }}>
                  Click here
                </Link>
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      {/* ==================== FOOTER ==================== */}
      <Box
        sx={{
          backgroundImage: `url(${footerBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          paddingBottom: '60px',
          marginTop: '100px',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 'bold',
                  color: '#ffffff',
                  marginTop: '30px',
                }}
              >
                More About <span style={{ color: '#008394' }}>IPEPS</span>
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: '#ffffff',
                  lineHeight: '1.8',
                }}
              >
                This is a job matching portal managed by the Public Employment
                Service Office (PESO) for jobseekers and employers in the
                Province of Iloilo. IPEPS features jobseeker and employer
                profiling and database, job matching, employment referral
                generation, and labor market analytics promoting online
                employment facilitation and protection and decent employment
                for all. IPEPS is the product of a collaboration between the
                Iloilo Provincial PESO and Iloilo Science and Technology
                University (ISATU) under Good Governance through Data Science
                and Decision Support System (GODDESS) with funding from the
                Department of Science and Technology (DOST) and Philippine
                Council for Industry, Energy and Emerging Technology Research
                and Development (PCIEERD).
                <br />
                <br />
                If you need to contact us directly, you may email us at
                support@ipeps.work or at our Facebook page.
              </Typography>
              <Box>
                <a
                  href="https://www.facebook.com/peso.ilo"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '44px',
                    height: '44px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #ffffff',
                    borderRadius: '50%',
                    color: '#ffffff',
                    transition: 'all 0.3s',
                    textDecoration: 'none',
                  }}
                >
                  f
                </a>
              </Box>
            </Grid>
          </Grid>
          <Box
            sx={{
              paddingTop: '60px',
              textAlign: 'center',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: '#ffffff',
                fontWeight: 'light',
              }}
            >
              Copyright &copy; 2021 IPEPS | by Public Employment Service Office (PESO)
            </Typography>
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default Home;