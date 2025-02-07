import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Schema for validation
const schema = yup.object().shape({
  industry: yup.string().required('Industry is required'),
});

const JobPreference = ({ onClickNextPage, onClickPrevPage }) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const [expectedSalaryRangeFrom, setExpectedSalaryRangeFrom] = useState(0);
  const [expectedSalaryRangeTo, setExpectedSalaryRangeTo] = useState(0);
  const [preferredOccupations, setPreferredOccupations] = useState([]);
  const [preferredWorkLocations, setPreferredWorkLocations] = useState([]);
  const [preferredOccupationValue, setPreferredOccupationValue] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('Philippines');
  const [specifyCitiesMuniciValue, setSpecifyCitiesMuniciValue] = useState('');
  const [industries, setIndustries] = useState([]);
  const [countries, setCountries] = useState([]);
  const [municipalities, setMunicipalities] = useState([]);
  const [availableCities, setAvailableCities] = useState([]);
  const [occupations, setOccupations] = useState([]);
  const [selectedOccupation, setSelectedOccupation] = useState('');

  const onAddPreferredOccupation = (occupationName) => {
    if (preferredOccupations.length <= 5 && occupationName !== '') {
      setPreferredOccupations([...preferredOccupations, occupationName]);
      setPreferredOccupationValue('');
    }
  };

  const onRemovePreferredOccupation = (occupationName) => {
    const updatedOccupations = preferredOccupations.filter((item) => item !== occupationName);
    setPreferredOccupations(updatedOccupations);
  };

  const onAddPreferredWorkLocation = ({ country, citiesOrMunicipalities }) => {
    if (preferredWorkLocations.length <= 5) {
      setPreferredWorkLocations([
        ...preferredWorkLocations,
        { country, citiesOrMunicipalities },
      ]);
      setSpecifyCitiesMuniciValue('');
    }
  };

  const onRemovePreferredWorkLocation = (index) => {
    const updatedLocations = preferredWorkLocations.filter((_, i) => i !== index);
    setPreferredWorkLocations(updatedLocations);
  };

  const onSubmit = (data) => {
    console.log('Form Data:', {
      ...data,
      preferredOccupations,
      preferredWorkLocations,
      expectedSalaryRangeFrom,
      expectedSalaryRangeTo,
    });
    onClickNextPage();
  };

  const handleCountryChange = (event) => {
    const country = event.target.value;
    setSelectedCountry(country);
    setSpecifyCitiesMuniciValue('');
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const [industriesData, countriesData, municipalitiesData, occupationsData] = await Promise.all([
          import('../../json/industries.json'),
          import('../../json/countries.json'),
          import('../../json/refcitymun.json'),
          import('../../json/occupation.json')
        ]);

        setIndustries(industriesData.industries || []);
        setCountries(countriesData.countries || []);
        setMunicipalities(municipalitiesData.RECORDS || []);
        setOccupations(occupationsData.occupations || []);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    // For Philippines, show municipalities from refcitymun.json
    // For other countries, show empty array since we don't have their cities
    if (selectedCountry === 'Philippines') {
      setAvailableCities(municipalities.map(mun => mun.citymunDesc));
    } else {
      setAvailableCities([]);
    }
  }, [selectedCountry, municipalities]);

  const handleOccupationSelect = (event) => {
    setSelectedOccupation(event.target.value);
    setPreferredOccupationValue(event.target.value);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Job Preference
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Preferred Occupation */}
        <Typography variant="h6" gutterBottom>
          Preferred Occupation
        </Typography>
        <Grid container spacing={2}>
          {preferredOccupations.map((occupation, index) => (
            <Grid item key={index}>
              <Chip
                label={occupation}
                onDelete={() => onRemovePreferredOccupation(occupation)}
              />
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Select Occupation</InputLabel>
              <Select
                value={selectedOccupation}
                onChange={handleOccupationSelect}
                label="Select Occupation"
              >
                {occupations.map((occupation, index) => (
                  <MenuItem key={index} value={occupation}>
                    {occupation}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Or Type Occupation"
              value={preferredOccupationValue}
              onChange={(e) => setPreferredOccupationValue(e.target.value)}
              placeholder="Type custom occupation here"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={() => onAddPreferredOccupation(preferredOccupationValue)}
              disabled={!preferredOccupationValue}
            >
              Add Occupation
            </Button>
          </Grid>
        </Grid>

        <hr style={{ margin: '20px 0' }} />

        {/* Preferred Work Location */}
        <Typography variant="h6" gutterBottom>
          Preferred Work Location
        </Typography>
        {preferredWorkLocations.map((location, index) => (
          <Grid container spacing={2} key={index} sx={{ marginBottom: 2 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Country"
                value={location.country}
                disabled
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Cities/Municipalities"
                value={location.citiesOrMunicipalities}
                disabled
              />
              <Button
                variant="contained"
                color="error"
                onClick={() => onRemovePreferredWorkLocation(index)}
                sx={{ marginTop: 1 }}
              >
                Remove
              </Button>
            </Grid>
          </Grid>
        ))}
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Specify Country</InputLabel>
              <Select
                value={selectedCountry}
                onChange={handleCountryChange}
                label="Specify Country"
              >
                {countries.map((country, index) => (
                  <MenuItem key={index} value={country}>
                    {country}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            {selectedCountry === 'Philippines' ? (
              <FormControl fullWidth>
                <InputLabel>Cities/Municipalities</InputLabel>
                <Select
                  value={specifyCitiesMuniciValue}
                  onChange={(e) => setSpecifyCitiesMuniciValue(e.target.value)}
                  label="Cities/Municipalities"
                >
                  {availableCities.map((city, index) => (
                    <MenuItem key={index} value={city}>
                      {city}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <TextField
                fullWidth
                label="Cities/Municipalities"
                value={specifyCitiesMuniciValue}
                onChange={(e) => setSpecifyCitiesMuniciValue(e.target.value)}
                placeholder="Type city or municipality name"
              />
            )}
            <Button
              variant="contained"
              onClick={() =>
                onAddPreferredWorkLocation({
                  country: selectedCountry,
                  citiesOrMunicipalities: specifyCitiesMuniciValue,
                })
              }
              sx={{ marginTop: 1 }}
              disabled={!specifyCitiesMuniciValue}
            >
              Add
            </Button>
          </Grid>
        </Grid>

        <hr style={{ margin: '20px 0' }} />

        {/* Industry */}
        <Typography variant="h6" gutterBottom>
          Industry
        </Typography>
        <FormControl fullWidth>
          <InputLabel>Industry</InputLabel>
          <Controller
            name="industry"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select
                {...field}
                label="Industry"
                error={!!errors.industry}
              >
                {industries.map((industry, index) => (
                  <MenuItem key={index} value={industry}>
                    {industry}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          {errors.industry && (
            <Typography color="error">{errors.industry.message}</Typography>
          )}
        </FormControl>

        <hr style={{ margin: '20px 0' }} />

        {/* Expected Salary */}
        <Typography variant="h6" gutterBottom>
          Expected Salary in PHP
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="From"
              type="number"
              value={expectedSalaryRangeFrom}
              onChange={(e) => setExpectedSalaryRangeFrom(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="To"
              type="number"
              value={expectedSalaryRangeTo}
              onChange={(e) => setExpectedSalaryRangeTo(e.target.value)}
            />
          </Grid>
        </Grid>

        {/* Buttons */}
        <Box sx={{ marginTop: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" sx={{ mr: 2 }} onClick={onClickPrevPage}>
            Back
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Next
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default JobPreference;