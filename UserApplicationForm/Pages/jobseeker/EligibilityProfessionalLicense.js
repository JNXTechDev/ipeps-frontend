import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Divider,
  Chip,
  MenuItem,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

const EligibilityProfessionalLicense = ({ onClickNextPage, onClickPrevPage }) => {
  // State for Civil Service Eligibilities
  const [civilServiceEligibilities, setCivilServiceEligibilities] = useState([]);
  const [civilServiceName, setCivilServiceName] = useState('');
  const [civilServiceDate, setCivilServiceDate] = useState('');
  const [civilServiceRating, setCivilServiceRating] = useState('');

  // State for PRC Professional Licenses
  const [prcLicenses, setPrcLicenses] = useState([]);
  const [prcLicenseName, setPrcLicenseName] = useState('');
  const [prcLicenseValidity, setPrcLicenseValidity] = useState('');

  // Constants for dropdown options
  const civilServiceOptions = [
    { value: 'Civil Service Exam', label: 'Civil Service Exam' },
    { value: 'Professional Exam', label: 'Professional Exam' },
  ];

  const prcLicenseOptions = [
    { value: 'PRC License 1', label: 'PRC License 1' },
    { value: 'PRC License 2', label: 'PRC License 2' },
  ];

  // Add Civil Service Eligibility
  const handleAddCivilService = () => {
    if (civilServiceName && civilServiceDate && civilServiceRating) {
      const newEligibility = {
        id: uuidv4(),
        name: civilServiceName,
        date: civilServiceDate,
        rating: civilServiceRating,
      };
      setCivilServiceEligibilities([...civilServiceEligibilities, newEligibility]);
      setCivilServiceName('');
      setCivilServiceDate('');
      setCivilServiceRating('');
    }
  };

  // Remove Civil Service Eligibility
  const handleRemoveCivilService = (id) => {
    setCivilServiceEligibilities(
      civilServiceEligibilities.filter((item) => item.id !== id)
    );
  };

  // Add PRC License
  const handleAddPrcLicense = () => {
    if (prcLicenseName && prcLicenseValidity) {
      const newLicense = {
        id: uuidv4(),
        name: prcLicenseName,
        validity: prcLicenseValidity,
      };
      setPrcLicenses([...prcLicenses, newLicense]);
      setPrcLicenseName('');
      setPrcLicenseValidity('');
    }
  };

  // Remove PRC License
  const handleRemovePrcLicense = (id) => {
    setPrcLicenses(prcLicenses.filter((item) => item.id !== id));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Eligibility & Professional License
      </Typography>
      <Divider sx={{ mb: 3 }} />

      {/* Civil Service Section */}
      <Typography variant="h5" gutterBottom>
        Civil Service Eligibility
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" gutterBottom>
            Eligibility Name
          </Typography>
          <TextField
            select
            fullWidth
            value={civilServiceName}
            onChange={(e) => setCivilServiceName(e.target.value)}
          >
            {civilServiceOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" gutterBottom>
            Date of Examination
          </Typography>
          <TextField
            fullWidth
            type="date"
            InputLabelProps={{ shrink: true }}
            value={civilServiceDate}
            onChange={(e) => setCivilServiceDate(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" gutterBottom>
            Rating
          </Typography>
          <TextField
            fullWidth
            value={civilServiceRating}
            onChange={(e) => setCivilServiceRating(e.target.value)}
          />
        </Grid>
      </Grid>
      <Box sx={{ mt: 2, textAlign: 'right' }}>
        <Button variant="contained" onClick={handleAddCivilService}>
          Add
        </Button>
      </Box>

      {/* Display Added Civil Service Eligibilities */}
      <Box sx={{ mt: 3 }}>
        {civilServiceEligibilities.map((item) => (
          <Box key={item.id} sx={{ mb: 2, p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Typography><strong>Name:</strong> {item.name}</Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography><strong>Date:</strong> {item.date}</Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography><strong>Rating:</strong> {item.rating}</Typography>
              </Grid>
            </Grid>
            <Box sx={{ mt: 1, textAlign: 'right' }}>
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleRemoveCivilService(item.id)}
              >
                Remove
              </Button>
            </Box>
          </Box>
        ))}
      </Box>

      {/* PRC Professional License Section */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Professional License (PRC)
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" gutterBottom>
            License Name
          </Typography>
          <TextField
            select
            fullWidth
            value={prcLicenseName}
            onChange={(e) => setPrcLicenseName(e.target.value)}
          >
            {prcLicenseOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" gutterBottom>
            Valid Until
          </Typography>
          <TextField
            fullWidth
            type="date"
            InputLabelProps={{ shrink: true }}
            value={prcLicenseValidity}
            onChange={(e) => setPrcLicenseValidity(e.target.value)}
          />
        </Grid>
      </Grid>
      <Box sx={{ mt: 2, textAlign: 'right' }}>
        <Button variant="contained" onClick={handleAddPrcLicense}>
          Add
        </Button>
      </Box>

      {/* Display Added PRC Licenses */}
      <Box sx={{ mt: 3 }}>
        {prcLicenses.map((item) => (
          <Box key={item.id} sx={{ mb: 2, p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography><strong>License:</strong> {item.name}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography><strong>Valid Until:</strong> {item.validity}</Typography>
              </Grid>
            </Grid>
            <Box sx={{ mt: 1, textAlign: 'right' }}>
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleRemovePrcLicense(item.id)}
              >
                Remove
              </Button>
            </Box>
          </Box>
        ))}
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

export default EligibilityProfessionalLicense;