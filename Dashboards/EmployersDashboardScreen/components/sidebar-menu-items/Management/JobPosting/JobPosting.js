import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Grid,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Divider,
} from '@mui/material';
import PostedJob from './PostedJob';
import Header from './Header';



const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina",
  "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados",
  "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana",
  "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon",
  "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo",
  "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica",
  "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia",
  "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana",
  "Greece", "Grenada", "Guatemala", "Guinea", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India",
  "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan",
  "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya",
  "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta",
  "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia",
  "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand",
  "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau",
  "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar",
  "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines",
  "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles",
  "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa",
  "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland",
  "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga",
  "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine",
  "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu",
  "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];


const JobPosting = ({ open, onClose, company, isCollapsed}) => {

const [jobTitle, setJobTitle] = useState("");
const [jobType, setJobType] = useState("");
const [experienceLevel, setExperienceLevel] = useState("");
const [jobDescription, setJobDescription] = useState("");
const [estimatedSalaryFrom, setEstimatedSalaryFrom] = useState("");
const [estimatedSalaryTo, setEstimatedSalaryTo] = useState("");
const [vacancies, setVacancies] = useState("");
const [lookingForJob, setLookingForJob] = useState("No");
const [jobGroup, setJobGroup] = useState("");
const [country, setCountry] = useState("");
const [citymunicipality, setCityMunicipality] = useState("");
const [degree, setDegree] = useState("");
const [educationallevel, setEducationalLevel] = useState("");
const [fieldofstudy, setFieldOfStudy] = useState("");
const [major, setMajor] = useState("");
const [ otherskills, setOtherSkills] = useState("");
const [coursename, setCourseName] = useState("");
const [traininginstitution, setTrainingInstitution] = useState("");
const [certificatereceived, setCertificateReceived] = useState("");
const headerHeight = '72px'; // Define header height

const handleSubmit = () => {
  const jobData = {
    jobTitle,
    jobType,
    experienceLevel,
    jobDescription,
    estimatedSalaryFrom,
    estimatedSalaryTo,
    vacancies,
    lookingForJob,
    jobGroup,
    country,
    citymunicipality,
  };
  console.log("Job Data:", jobData); // Log the job data
  onClose(); // Close the modal after submission
};


  return (
    <Box>
      <Header isCollapsed={isCollapsed} /> // Pass the prop
    

      {/* Main content container */}
      <Box 
        sx={{ 
          display: 'flex',
          position: 'fixed',
          top: headerHeight,
          left: isCollapsed ? '80px' : '250px',
          right: 0,
          bottom: 0,
          transition: 'left 0.3s',
          backgroundColor: 'white',
        }}
      >
        {/* Create Post Panel */}
        <Box 
          sx={{ 
            width: '60%',
            height: '100%',
            overflowY: 'auto',
            p: 3,
            borderRight: '1px solid rgba(0, 0, 0, 0.12)',
          }}
        >
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold'}}>
         Create Job Posting (Job Vacancy) 
        </Typography>
        <Grid container spacing={2}>
          {/* Left Column - Form */}
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Job Title"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <InputLabel id="job-type-label">Job Type</InputLabel>
                <Select
                  fullWidth
                  margin="normal"
                  labelId="job-type-label"
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                >
                  <MenuItem value="" disabled>
                    Select Job Type
                  </MenuItem>
                  <MenuItem value={"Full-Time"}>Full-Time</MenuItem>
                  <MenuItem value={"Part-Time"}>Part Time</MenuItem>
                  <MenuItem value={"Internship"}>Internship</MenuItem>
                </Select>
              </Grid>
     

        <Grid item xs={12} md={4}>
        <InputLabel id="experience-level-label">Experience Level</InputLabel>

        <Select
          fullWidth
          margin="normal"
     //     label="Experience Level"
          value={experienceLevel}
          onChange={(e) => setExperienceLevel(e.target.value)}
        >
        <MenuItem value="Option 1">Option 1</MenuItem>
        <MenuItem value="Option 2">Option 2</MenuItem>
        <MenuItem value="Option 3">Option 3</MenuItem>
        </Select>
        </Grid>

        <Grid item xs={12}>
        <TextField
          fullWidth
          margin="normal"
          label="Job Description"
          multiline
          rows={3}
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
        </Grid>

        <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          margin="normal"
          label="Estimated Salary From"
          type="number"
          value={estimatedSalaryFrom}
          onChange={(e) => setEstimatedSalaryFrom(e.target.value)}
        />
        </Grid>

        <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          margin="normal"
          label="Estimated Salary To"
          type="number"
          value={estimatedSalaryTo}
          onChange={(e) => setEstimatedSalaryTo(e.target.value)}
        />
        </Grid>

        <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          margin="normal"
          label="No. of Vacancies"
          type="number"
          value={vacancies}
          onChange={(e) => setVacancies(e.target.value)}
        />
        </Grid>

        <Grid item xs={12} md={4}>
        <InputLabel id="looking-label">Are you looking for?</InputLabel>
        <Select
          fullWidth
          margin="normal"
          label="Are you looking for?"
          value={lookingForJob}
          onChange={(e) => setLookingForJob(e.target.value)}
        >
          <MenuItem value="Both Male & Female">Both Male & Female</MenuItem>
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>

        </Select>
        </Grid>

        <Grid item xs={12} md={4}>
        <InputLabel id="job-group-label">Job Group</InputLabel>
        <Select
          fullWidth
          margin="normal"
          label="Job Group"
          value={jobGroup}
          onChange={(e) => setJobGroup(e.target.value)}
        >
        <MenuItem value="Option 1">Option 1</MenuItem>
        <MenuItem value="Option 2">Option 2</MenuItem>
        <MenuItem value="Option 3">Option 3</MenuItem>
        </Select>

        </Grid>

        <Grid item xs={12} md={6}>
        <InputLabel id="country-label">Select Country</InputLabel>

        <Select fullWidth margin="normal" value={country} onChange={(e) => setCountry(e.target.value)} displayEmpty>
          <MenuItem value="" disabled>Select Country</MenuItem>
          {countries.map((c) => (
            <MenuItem key={c} value={c}>{c}</MenuItem>
          ))}
        </Select>
        </Grid>

        <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          margin="normal"
          label="City / Municipality"
          value={citymunicipality}
          onChange={(e) => setCityMunicipality(e.target.value)}
        />
        </Grid>
        </Grid>

        <Typography variant="h6" sx={{ mb: 2, mt: 2 }} gutterBottom>
        Select Applicable Qualifications
        </Typography>

        <Grid container spacing={2}>

        <Grid item xs={12} md={6}>
        <InputLabel id="degree-label">Degree or Qualification</InputLabel>
        <Select
          fullWidth
          margin="normal"
          value={degree}
          onChange={(e) => setDegree(e.target.value)}
        >
        <MenuItem value="Option 1">Option 1</MenuItem>
        <MenuItem value="Option 2">Option 2</MenuItem>
        <MenuItem value="Option 3">Option 3</MenuItem>
        </Select>
        </Grid>

        <Grid item xs={12} md={6}>
        <InputLabel id="education-level">Educational Level</InputLabel>
        <Select
          fullWidth
          margin="normal"
          value={educationallevel}
          onChange={(e) => setEducationalLevel(e.target.value)}
        >
        <MenuItem value="Option 1">Option 1</MenuItem>
        <MenuItem value="Option 2">Option 2</MenuItem>
        <MenuItem value="Option 3">Option 3</MenuItem>
        </Select>
        </Grid>


        <Grid item xs={12} md={4}>
        <InputLabel id="field-of-study">Field of Study</InputLabel>
        <Select
          fullWidth
          margin="normal"
          value={fieldofstudy}
          onChange={(e) => setFieldOfStudy(e.target.value)}
        >
        <MenuItem value="Option 1">Option 1</MenuItem>
        <MenuItem value="Option 2">Option 2</MenuItem>
        <MenuItem value="Option 3">Option 3</MenuItem>
        </Select>
        </Grid>


        <Grid item xs={12} md={4}>
        <InputLabel id="major">Major</InputLabel>
        <Select
          fullWidth
          margin="normal"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
        >
        <MenuItem value="Option 1">Option 1</MenuItem>
        <MenuItem value="Option 2">Option 2</MenuItem>
        <MenuItem value="Option 3">Option 3</MenuItem>
        </Select>
        </Grid>

        <Grid item xs={12} md={4}>
        <InputLabel id="other-skills">Other Skills</InputLabel>
        <Select
          fullWidth
          margin="normal"
          value={otherskills}
          onChange={(e) => setOtherSkills(e.target.value)}
        >
        <MenuItem value="Option 1">Option 1</MenuItem>
        <MenuItem value="Option 2">Option 2</MenuItem>
        <MenuItem value="Option 3">Option 3</MenuItem>
        </Select>
        </Grid>

        </Grid>

        <Typography  sx={{ mb: 2, mt: 2 }}
        >Technical/Vocational Course & Other Training</Typography>

        <Grid container spacing={2}>

        <Grid item xs={12} md={4}>
        <TextField
        select
        label="Select or Add a Course Name"
        variant="outlined"
        value={coursename}
        onChange={(event) => setCourseName(event.target.value)}
        fullWidth
        >
        <MenuItem value="Option 1">Option 1</MenuItem>
        <MenuItem value="Option 2">Option 2</MenuItem>
        <MenuItem value="Option 3">Option 3</MenuItem>
        </TextField>
        </Grid>

        <Grid item xs={12} md={4}>
        <TextField
        select
        label="Select or Add a Training Institution"
        variant="outlined"
        value={traininginstitution}
        onChange={(event) => setTrainingInstitution(event.target.value)}
        fullWidth
        >
        <MenuItem value="Option 1">Option 1</MenuItem>
        <MenuItem value="Option 2">Option 2</MenuItem>
        <MenuItem value="Option 3">Option 3</MenuItem>
        </TextField>
        </Grid>

        <Grid item xs={12} md={4}>
        <TextField
        select
        label="Select or Add a Certificates Received"
        variant="outlined"
        value={certificatereceived}
        onChange={(event) => setCertificateReceived(event.target.value)}
        fullWidth
        >
        <MenuItem value="Option 1">Option 1</MenuItem>
        <MenuItem value="Option 2">Option 2</MenuItem>
        <MenuItem value="Option 3">Option 3</MenuItem>
        </TextField>
        </Grid>


        <Button onClick={handleSubmit} variant="contained" color="primary"sx={{ ml: 'auto', mt: 2 , backgroundColor: 'blue'}}>
            Add Training Requirement
          </Button>
        </Grid>

        {/*buttons area*/}

          <Divider />
   
            
        </Grid>
        <Box display="flex" justifyContent="flex-end" mt={2}>
        {/*  <Button onClick={onClose} sx={{ ml: 0, mt: 2 , backgroundColor: 'red', color: 'white'}}>Cancel</Button> */}
          <Button onClick={handleSubmit} variant="contained" sx={{ ml: 'auto', mt: 2 , backgroundColor: 'blue'}}>
            Create Job Post
          </Button>
          
          </Box>

        </Box>

        {/* Posted Job Panel */}
        <Box 
          sx={{ 
            width: '40%',
            height: '100%',
            overflowY: 'auto',
            backgroundColor: 'white',
          }}
        >
            <PostedJob
             />   
          
 

      </Box>
      </Box>
    </Box>
  );
};

export default JobPosting;
