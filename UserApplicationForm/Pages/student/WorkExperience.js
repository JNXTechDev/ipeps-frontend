import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Divider,
  MenuItem,
  Chip,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

const WorkExperience = ({ onClickNextPage, onClickPrevPage }) => {
  // State for Work Experience Entries
  const [workExperienceEntries, setWorkExperienceEntries] = useState([]);

  // Form Values
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [position, setPosition] = useState('');
  const [employmentStatus, setEmploymentStatus] = useState('');
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [numberOfMonths, setNumberOfMonths] = useState('');

  // Employment Status Options
  const employmentStatusOptions = [
    { value: 'Full-Time', label: 'Full-Time' },
    { value: 'Part-Time', label: 'Part-Time' },
    { value: 'Contract', label: 'Contract' },
    { value: 'Freelance', label: 'Freelance' },
  ];

  // Add Work Experience Entry
  const handleAddWorkExperience = () => {
    if (
      companyName &&
      companyAddress &&
      position &&
      employmentStatus &&
      dateStart &&
      dateEnd &&
      numberOfMonths
    ) {
      const newEntry = {
        id: uuidv4(),
        companyName,
        companyAddress,
        position,
        employmentStatus,
        dateStart,
        dateEnd,
        numberOfMonths,
      };
      setWorkExperienceEntries([...workExperienceEntries, newEntry]);

      // Clear form fields
      setCompanyName('');
      setCompanyAddress('');
      setPosition('');
      setEmploymentStatus('');
      setDateStart('');
      setDateEnd('');
      setNumberOfMonths('');
    }
  };

  // Remove Work Experience Entry
  const handleRemoveWorkExperience = (id) => {
    setWorkExperienceEntries(
      workExperienceEntries.filter((entry) => entry.id !== id)
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Work Experience
      </Typography>
      <Typography variant="body1" gutterBottom>
        Limit to 10-year period, starting with the most recent employment.
      </Typography>
      <Divider sx={{ mb: 3 }} />

      {/* Display Added Work Experience Entries */}
      {workExperienceEntries.map((entry) => (
        <Box
          key={entry.id}
          sx={{ mb: 3, p: 2, border: '1px solid #ddd', borderRadius: 1 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography><strong>Company Name:</strong> {entry.companyName}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography><strong>Company Address:</strong> {entry.companyAddress}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography><strong>Position:</strong> {entry.position}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography><strong>Employment Status:</strong> {entry.employmentStatus}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography><strong>Date Start:</strong> {entry.dateStart}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography><strong>Date End:</strong> {entry.dateEnd}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography><strong>Number of Months:</strong> {entry.numberOfMonths}</Typography>
            </Grid>
          </Grid>
          <Box sx={{ mt: 2, textAlign: 'right' }}>
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleRemoveWorkExperience(entry.id)}
            >
              Remove
            </Button>
          </Box>
        </Box>
      ))}

      {/* Add Work Experience Form */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Add Work Experience
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="body1" gutterBottom>Company Name</Typography>
          <TextField
            fullWidth
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1" gutterBottom>Company Address</Typography>
          <TextField
            fullWidth
            value={companyAddress}
            onChange={(e) => setCompanyAddress(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1" gutterBottom>Position</Typography>
          <TextField
            fullWidth
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1" gutterBottom>Employment Status</Typography>
          <TextField
            select
            fullWidth
            value={employmentStatus}
            onChange={(e) => setEmploymentStatus(e.target.value)}
          >
            {employmentStatusOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1" gutterBottom>Date Start</Typography>
          <TextField
            fullWidth
            type="date"
            InputLabelProps={{ shrink: true }}
            value={dateStart}
            onChange={(e) => setDateStart(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1" gutterBottom>Date End</Typography>
          <TextField
            fullWidth
            type="date"
            InputLabelProps={{ shrink: true }}
            value={dateEnd}
            onChange={(e) => setDateEnd(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1" gutterBottom>Number of Months</Typography>
          <TextField
            fullWidth
            type="number"
            value={numberOfMonths}
            onChange={(e) => setNumberOfMonths(e.target.value)}
          />
        </Grid>
      </Grid>
      <Box sx={{ mt: 2, textAlign: 'right' }}>
        <Button variant="contained" onClick={handleAddWorkExperience}>
          Add
        </Button>
      </Box>

      {/* Navigation Buttons */}
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" sx={{ mr: 2 }} onClick={onClickPrevPage}>
          Back
        </Button>
        <Button variant="contained" color="primary" onClick={onClickNextPage}>
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default WorkExperience;