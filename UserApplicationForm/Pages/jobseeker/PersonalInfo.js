import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  FormControl,
  FormLabel,
  Checkbox,
  Switch,
  Grid,
  Typography,
  FormGroup,
  FormControlLabel,
  Select,
  MenuItem,
  InputLabel,
  Box,
  Divider,
  RadioGroup,
  Radio,
} from '@mui/material';
import { useNavigate , Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import StudentApplicationForm from '../../StudentApplicationForm';

const PersonalInfo = ({ pageData, onRefresh, selectedTab, onClickNextPage, onClickPrevPage }) => {
  const [formData, setFormData] = useState({
  //1st layer
    firstname: '',
    middlename: '',
    lastname: '',
    suffix: '',
    sex: '',
    dateofbirth: '',

    //2nd layer
    country: 'Philippines', // Set default country
    region:'',
    provinceOrCity: '',
    zipcode:'',
    streetAddress: '',
  
  //3rd layer
    religion: '',
    civilstatus: '',
    height: '',
    weight: '',
    cellphoneCountryCode: '+63', // Add default country code
    landlineno: '',
    cellphoneno: '',
    tin: '',
    sssandgsisno: '',
    pagibigno: '',
    philhealthno: '',

    //4th layer
    employmentstatus: '',
    isseekingwork: '',
    seekingwhenwork: '',
    iswillingtoworkimmediately: '',

    //5th layer
    iscurrentofw: '',
    currentofwcountry: '',
    isformerofw: '',
    lastcountrydeployment: '',
    datereturntoph: '',
    is4pbeneficiary: '',
    householdidno: '',

    // Permanent address fields
    permanentCountry: '',
    permanentProvinceOrCity: '',
    permanentMunicipality: '',
    permanentZipcode: '',
    permanentStreetAddress: '',
  });

  const [isSameAsPresentAddress, setIsSameAsPresentAddress] = useState(false);
  const [isCheckedVisual, setIsCheckedVisual] = useState(false);
  const [isCheckedHearing, setIsCheckedHearing] = useState(false);
  const [isCheckedSpeech, setIsCheckedSpeech] = useState(false);
  const [isCheckedPhysical, setIsCheckedPhysical] = useState(false);
  const [userAddedDisabilities, setUserAddedDisabilities] = useState([]);
  const [otherDisabilitiesValue, setOtherDisabilitiesValue] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);

  // Add new states for storing JSON data
  const [regions, setRegions] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [municipalities, setMunicipalities] = useState([]);
  const [barangays, setBarangays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Add new state for address type
  const [addressType, setAddressType] = useState('local'); // 'local' or 'international'

  // Load JSON data when component mounts
  useEffect(() => {
    const loadJsonData = async () => {
      try {
        // Import JSON files (using relative path from PersonalInfo.js to json folder)
        const regionsData = await import('../../json/refregion.json');
        const provincesData = await import('../../json/refprovince.json');
        const municipalitiesData = await import('../../json/refcitymun.json');
        const barangaysData = await import('../../json/refbrgy.json');

        setRegions(regionsData.RECORDS || []);
        setProvinces(provincesData.RECORDS || []);
        setMunicipalities(municipalitiesData.RECORDS || []);
        setBarangays(barangaysData.RECORDS || []);
        setLoading(false);
      } catch (error) {
        console.error('Error loading JSON data:', error);
        setError('Failed to load location data');
        setLoading(false);
      }
    };

    loadJsonData();
  }, []);

  // Filter functions for dependent dropdowns
  const getProvincesByRegion = (regionCode) => {
    return provinces.filter(province => province.regCode === regionCode);
  };

  const getMunicipalitiesByProvince = (provinceCode) => {
    return municipalities.filter(municipality => municipality.provCode === provinceCode);
  };

  const getBarangaysByMunicipality = (municipalityCode) => {
    return barangays.filter(barangay => barangay.citymunCode === municipalityCode);
  };

  const countryCodes = [
    { code: '+1', country: 'US/Canada' },
    { code: '+44', country: 'UK' },
    { code: '+63', country: 'Philippines' },
    { code: '+81', country: 'Japan' },
    { code: '+82', country: 'South Korea' },
    { code: '+86', country: 'China' },
    { code: '+91', country: 'India' },
    { code: '+61', country: 'Australia' },
    { code: '+64', country: 'New Zealand' },
    { code: '+65', country: 'Singapore' },
    { code: '+66', country: 'Thailand' },
    { code: '+84', country: 'Vietnam' },
    { code: '+60', country: 'Malaysia' },
    { code: '+62', country: 'Indonesia' },
    // Add more country codes as needed
  ];

const religions = [
  "Roman Catholic",
  "Islam",
  "Evangelical Christianity",
  "Iglesia ni Cristo",
  "Philippine Independent Church (Aglipayan)",
  "Seventh-day Adventist",
  "Bible Baptist Church",
  "United Church of Christ in the Philippines",
  "Jehovah's Witnesses",
  "Church of Christ",
  "Buddhism",
  "Hinduism",
  "Judaism",
  "Methodist",
  "Orthodox Christianity",
  "Presbyterian",
  "Anglican/Episcopal",
  "Born Again Christian",
  "Latter-day Saints (Mormon)",
  "Traditional/Indigenous Beliefs",
  "Other Christian Denominations",
  "Other Religious Beliefs",
  "None/Non-religious"
];

  // Add countries array back since it's not in JSON files
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

  // Update handleChange to sync permanent address with present address
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      
      // Sync permanent address with present address if they're not the same field
      if (!name.startsWith('permanent') && isSameAsPresentAddress) {
        // Map present address fields to permanent address fields
        const fieldMapping = {
          'country': 'permanentCountry',
          'region': 'permanentRegion',
          'provinceOrCity': 'permanentProvinceOrCity',
          'municipality': 'permanentMunicipality',
          'barangay': 'permanentBarangay',
          'zipcode': 'permanentZipcode',
          'streetAddress': 'permanentStreetAddress'
        };

        // If the changed field has a permanent counterpart, update it
        if (fieldMapping[name]) {
          newData[fieldMapping[name]] = value;
        }
      }

      // Reset child selections when parent changes
      if (name === 'region') {
        newData.provinceOrCity = '';
        newData.municipality = '';
        newData.barangay = '';
        if (isSameAsPresentAddress) {
          newData.permanentProvinceOrCity = '';
          newData.permanentMunicipality = '';
          newData.permanentBarangay = '';
        }
      } else if (name === 'provinceOrCity') {
        newData.municipality = '';
        newData.barangay = '';
        if (isSameAsPresentAddress) {
          newData.permanentMunicipality = '';
          newData.permanentBarangay = '';
        }
      } else if (name === 'municipality') {
        newData.barangay = '';
        if (isSameAsPresentAddress) {
          newData.permanentBarangay = '';
        }
      }
      
      return newData;
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('File selected:', file);
      setUploadedFile(file.name);
    }
  };

  // Update the switch handler to properly sync/unsync addresses
  const handleSameAddressToggle = (e) => {
    const checked = e.target.checked;
    setIsSameAsPresentAddress(checked);
    
    if (checked) {
      // Copy all present address fields to permanent address fields
      setFormData(prev => ({
        ...prev,
        permanentCountry: prev.country,
        permanentRegion: prev.region,
        permanentProvinceOrCity: prev.provinceOrCity,
        permanentMunicipality: prev.municipality,
        permanentBarangay: prev.barangay,
        permanentZipcode: prev.zipcode,
        permanentStreetAddress: prev.streetAddress,
        permanentCity: prev.city,
        permanentDistrict: prev.district
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    onClickNextPage(); // Call the function to go to the next step

  };

  const onAddDisabilities = () => {
    if (otherDisabilitiesValue.trim()) {
      setUserAddedDisabilities([...userAddedDisabilities, otherDisabilitiesValue]);
      setOtherDisabilitiesValue('');
    }
  };

  const onRemoveOtherDisability = (disabilityName) => {
    setUserAddedDisabilities(userAddedDisabilities.filter((disability) => disability !== disabilityName));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    onClickNextPage();
  };

  if (loading) return <div>Loading location data...</div>;
  if (error) return <div>{error}</div>;

  const renderAddressFields = (isPermanent = false) => {
    const prefix = isPermanent ? 'permanent' : '';
    const fieldNames = {
      region: `${prefix}Region`,
      provinceOrCity: `${prefix}ProvinceOrCity`,
      municipality: `${prefix}Municipality`,
      barangay: `${prefix}Barangay`
    };

    if (addressType === 'international' || formData.country !== 'Philippines') {
      // International address form with text fields
      return (
        <>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" gutterBottom>State/Region/Province</Typography>
            <TextField
              fullWidth
              name={`${prefix}Region`}
              value={formData[`${prefix}Region`]}
              onChange={handleChange}
              required
              placeholder="Enter state/region/province"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" gutterBottom>City</Typography>
            <TextField
              fullWidth
              name={`${prefix}City`}
              value={formData[`${prefix}City`]}
              onChange={handleChange}
              required
              placeholder="Enter city"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" gutterBottom>District/Area</Typography>
            <TextField
              fullWidth
              name={`${prefix}District`}
              value={formData[`${prefix}District`]}
              onChange={handleChange}
              placeholder="Enter district/area (optional)"
            />
          </Grid>
        </>
      );
    }

    // Local address form with dropdown selectors (existing code)
    return (
      <>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle1" gutterBottom>Region</Typography>
          <Select
            fullWidth
            name={fieldNames.region}
            value={formData[fieldNames.region] || ''}
            onChange={handleChange}
            required
          >
            {regions.map((region) => (
              <MenuItem key={region.regCode} value={region.regCode}>
                {region.regDesc}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle1" gutterBottom>Province</Typography>
          <Select
            fullWidth
            name={fieldNames.provinceOrCity}
            value={formData[fieldNames.provinceOrCity] || ''}
            onChange={handleChange}
            required
          >
            {getProvincesByRegion(formData[fieldNames.region]).map((province) => (
              <MenuItem key={province.provCode} value={province.provCode}>
                {province.provDesc}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle1" gutterBottom>Municipality</Typography>
          <Select
            fullWidth
            name={fieldNames.municipality}
            value={formData[fieldNames.municipality] || ''}
            onChange={handleChange}
            required
          >
            {getMunicipalitiesByProvince(formData[fieldNames.provinceOrCity]).map((municipality) => (
              <MenuItem key={municipality.citymunCode} value={municipality.citymunCode}>
                {municipality.citymunDesc}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle1" gutterBottom>Barangay</Typography>
          <Select
            fullWidth
            name={fieldNames.barangay}
            value={formData[fieldNames.barangay] || ''}
            onChange={handleChange}
            required
          >
            {getBarangaysByMunicipality(formData[fieldNames.municipality]).map((barangay) => (
              <MenuItem key={barangay.brgyCode} value={barangay.brgyCode}>
                {barangay.brgyDesc}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </>
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
           <Typography variant="h6" fontWeight="bold">
        Personal Information
       </Typography>
        <Grid container spacing={2}>
          {/* Personal Information - 3 columns */}
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" gutterBottom>First Name</Typography>
            <TextField
              fullWidth
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" gutterBottom>Middle Name</Typography>
            <TextField
              fullWidth
              name="middlename"
              value={formData.middlename}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" gutterBottom>Last Name</Typography>
            <TextField
              fullWidth
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" gutterBottom>Suffix</Typography>
            <TextField
              fullWidth
              name="suffix"
              value={formData.suffix}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" gutterBottom>Sex</Typography>
            <FormControl fullWidth>
              <Select
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                required
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" gutterBottom>Date of Birth</Typography>
            <TextField
              fullWidth
              name="dateofbirth"
              type="date"
              value={formData.dateofbirth}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>

          {/* Continue this pattern for other sections */}
          {/* Address Section */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>Address Type</Typography>
            <FormControl component="fieldset">
              <RadioGroup
                row
                value={addressType}
                onChange={(e) => {
                  setAddressType(e.target.value);
                  // Set country to Philippines for local, clear for international
                  setFormData(prev => ({
                    ...prev,
                    country: e.target.value === 'local' ? 'Philippines' : '',
                    region: '',
                    provinceOrCity: '',
                    municipality: '',
                    barangay: ''
                  }));
                }}
              >
                <FormControlLabel value="local" control={<Radio />} label="Local (Philippines)" />
                <FormControlLabel value="international" control={<Radio />} label="International" />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" gutterBottom>Country</Typography>
            <Select
              fullWidth
              name="country"
              value={formData.country}
              onChange={(e) => {
                handleChange(e);
                setAddressType(e.target.value === 'Philippines' ? 'local' : 'international');
              }}
              required
              disabled={addressType === 'local'} // Disable for local addresses
            >
              {countries.map((country, index) => (
                <MenuItem key={index} value={country}>{country}</MenuItem>
              ))}
            </Select>
          </Grid>

          {renderAddressFields()}

          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" gutterBottom>
              Zip Code/Postal Code
            </Typography>
            <TextField
              fullWidth
              name="zipcode"
              value={formData.zipcode}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" gutterBottom>
              House No./Street Village
            </Typography>
            <TextField
              fullWidth
              name="streetAddress"
              value={formData.streetAddress}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Permanent Address
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={isSameAsPresentAddress}
                  onChange={handleSameAddressToggle}
                />
              }
              label="Same as Present Address"
              style={{ marginLeft: '10px' }}
            />
          </Grid>
          {!isSameAsPresentAddress && (
            <>
            
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1" gutterBottom>
                Country
              </Typography>
              <Select
                fullWidth
                label="Country"
                name="permanentCountry"
                value={formData.permanentCountry}
                onChange={(e) => {
                  handleChange(e);
                  setAddressType(e.target.value === 'Philippines' ? 'local' : 'international');
                }}
                required
                >
                {countries.map((country, index) => (
                  <MenuItem key={index} value={country}>
                    {country}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            {renderAddressFields(true)}

            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1" gutterBottom>
                Zip Code/Postal Code
              </Typography>
              <TextField
                fullWidth
                name="permanentZipcode"
                value={formData.permanentZipcode}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1" gutterBottom>
                House No./Street Village
              </Typography>
              <TextField
                fullWidth
                name="permanentStreetAddress"
                value={formData.permanentStreetAddress}
                onChange={handleChange}
                required
              />
            </Grid>
            </>
          )}


          {/*3rd layer*/}

          <Box mt={2} />
          <Divider />
          <Box mt={2} />
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" gutterBottom>
              Religion
            </Typography>
            <Select
              fullWidth
              name="religion"
              value={formData.religion}
              onChange={handleChange}
            >
              {religions.map((religion, index) => (
                <MenuItem key={index} value={religion}>{religion}</MenuItem>
              ))}
            </Select>
          </Grid>
          <Box mt={2} />
          <Divider />
          <Box mt={2} />
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" gutterBottom>
              Civil Status
            </Typography>
            <FormControl fullWidth>
              <Select
                name="civilstatus"
                value={formData.civilstatus}
                onChange={handleChange}
                required
              >
                <MenuItem value="Single">Single</MenuItem>
                <MenuItem value="Married">Married</MenuItem>
                <MenuItem value="Divorced">Divorced</MenuItem>
                <MenuItem value="Widowed">Widowed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" gutterBottom>
              Height (cm)
            </Typography>
            <TextField
              fullWidth
              name="height"
              value={formData.height}
              onChange={handleChange}
              type="number"
              inputProps={{ 
                min: "0",
                max: "300",
                step: "0.1"
              }}
              placeholder="Enter height in centimeters"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" gutterBottom>
              Weight (kg)
            </Typography>
            <TextField
              fullWidth
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              type="number"
              inputProps={{ 
                min: "0",
                max: "500",
                step: "0.1"
              }}
              placeholder="Enter weight in kilograms"
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" gutterBottom>
              Landline Number
            </Typography>
            <TextField
              fullWidth
              name="landlineno"
              value={formData.landlineno}
              onChange={handleChange}
              placeholder="Enter landline number"
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" gutterBottom>
              Cellphone Number
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Select
                  fullWidth
                  name="cellphoneCountryCode"
                  value={formData.cellphoneCountryCode}
                  onChange={handleChange}
                  required
                >
                  {countryCodes.map((item) => (
                    <MenuItem key={item.code} value={item.code}>
                      {item.code} ({item.country})
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  name="cellphoneno"
                  value={formData.cellphoneno}
                  onChange={handleChange}
                  required
                  placeholder="Enter mobile number"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" gutterBottom>
              TIN
            </Typography>
            <TextField
              fullWidth
              name="tin"
              value={formData.tin}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" gutterBottom>
              SSS/GSIS Number
            </Typography>
            <TextField
              fullWidth
              name="sssandgsisno"
              value={formData.sssandgsisno}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" gutterBottom>
              Pag-ibig Number
            </Typography>
            <TextField
              fullWidth
              name="pagibigno"
              value={formData.pagibigno}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" gutterBottom>
              Philhealth Number
            </Typography>
            <TextField
              fullWidth
              name="philhealthno"
              value={formData.philhealthno}
              onChange={handleChange}
            />
          </Grid>
        </Grid>


        <Grid item xs={12}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Disability
          </Typography>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isCheckedVisual}
                    onChange={(e) => setIsCheckedVisual(e.target.checked)}
                  />
                }
                label="Visual"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isCheckedHearing}
                    onChange={(e) => setIsCheckedHearing(e.target.checked)}
                  />
                }
                label="Hearing"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isCheckedSpeech}
                    onChange={(e) => setIsCheckedSpeech(e.target.checked)}
                  />
                }
                label="Speech"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isCheckedPhysical}
                    onChange={(e) => setIsCheckedPhysical(e.target.checked)}
                  />
                }
                label="Physical"
              />
              {userAddedDisabilities.map((disability, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      checked
                      onChange={() => onRemoveOtherDisability(disability)}
                    />
                  }
                  label={disability}
                />
              ))}
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 3 }}>
          <TextField
            label="Other Disabilities"
            value={otherDisabilitiesValue}
            onChange={(e) => setOtherDisabilitiesValue(e.target.value)}
            sx={{ flexGrow: 1 }}
          />
          <Button 
            onClick={onAddDisabilities}
            variant="contained" 
            color="primary"
            sx={{ 
              fontWeight: 'bold',  
              fontSize: '11px',
              px: 4,
              py: 2,
              height: 'fit-content',
              backgroundColor: '#1976d2',
              '&:hover': {
                backgroundColor: '#1565c0'
              }
            }}
          >
            Add Disability
          </Button>
        </Box>

        {/*4th layer*/}

        <Grid item xs={12}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Employment Status/Type              
          </Typography>
        </Grid>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" gutterBottom>
              Employment Status
            </Typography>
            <FormControl fullWidth>
              <Select name="employmentstatus" value={formData.employmentstatus} onChange={handleChange} required>
                <MenuItem value="Employed">Employed</MenuItem>
                <MenuItem value="Unemployed">Unemployed</MenuItem>
                <MenuItem value="Self-Employed">Self-Employed</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" gutterBottom>
              Are you actively looking for work?
            </Typography>
            <FormControl fullWidth>
              <Select name="isseekingwork" value={formData.isseekingwork} onChange={handleChange} required>
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
        
      {/* Conditionally render or disable the following forms based on the user's response */}
      <Grid item xs={12} md={4} sx= {{opacity: formData.isseekingwork === "No" ? 0.5 : 1 }}>
        <Typography variant="subtitle1" gutterBottom>
          Since when have you started looking for work?
        </Typography>
        <FormControl fullWidth disabled={formData.isseekingwork === "No"}>
          <TextField
            name="seekingwhenwork"
            type="date"
            value={formData.seekingwhenwork}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            disabled={formData.isseekingwork === "No"} // Disable if user selects "No"
          />
        </FormControl>
      </Grid>

      <Grid item xs={12} md={4} sx= {{opacity: formData.isseekingwork === "No" ? 0.5 : 1 }}>
        <Typography variant="subtitle1" gutterBottom>
          Wiling to work immediately?
        </Typography>
        <FormControl fullWidth disabled={formData.isseekingwork === "No"}>
          <Select
            name="iswillingtoworkimmediately"
            value={formData.iswillingtoworkimmediately}
            onChange={handleChange}
            required
            disabled={formData.isseekingwork === "No"} // Disable if user selects "No"
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      {/*5th layer*/}

      <Grid item xs={12} md={4}>
        <Typography variant="subtitle1" gutterBottom>
          Are you an OFW?
        </Typography>
        <FormControl fullWidth>
          <Select
            name="iscurrentofw"
            value={formData.iscurrentofw}
            onChange={handleChange}
            required
            disabled={formData.currentofwcountry === "No"} // Disable if user selects "No"
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} md={4} sx= {{opacity: formData.iscurrentofw === "No" ? 0.5 : 1 }}>
        <Typography variant="subtitle1" gutterBottom>
          Specify Country
        </Typography>
        <FormControl fullWidth disabled={formData.iscurrentofw === "No"}>
          <Select
            name="iscurrentofw"
            value={formData.iscurrentofw}
            onChange={handleChange}
            required
            disabled={formData.iscurrentofw === "No"}
          >
            {countries.map((country, index) => (
              <MenuItem key={index} value={country}>
                {country}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>


      <Grid item xs={12} md={4}>
        <Typography >
          Are you a former OFW?
        </Typography>
        <FormControl fullWidth >
          <Select
            name="isformerofw"
            value={formData.isformerofw}
            onChange={handleChange}
            required
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
        </FormControl>
      </Grid>


      <Grid item xs={12} md={4} sx= {{opacity: formData.iscurrentofw === "No" ? 0.5 : 1 }}>
        <Typography>
          Latest Country of Deployment
        </Typography>
        <FormControl fullWidth disabled={formData.isformerofw === "No"}>
          <Select
            name="lastcountrydeployment"
            value={formData.lastcountrydeployment}
            onChange={handleChange}
            required
            disabled={formData.isformerofw === "No"}
          >
            {countries.map((country, index) => (
              <MenuItem key={index} value={country}>
                {country}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>


      {/* Conditionally render or disable the following forms based on the user's response */}
      <Grid item xs={12} md={4}>
        <Typography>
          Date of return to Philippines
        </Typography>
        <FormControl fullWidth disabled={formData.isformerofw === "No"}>
          <TextField
            name="datereturntoph"
            type="date"
            value={formData.datereturntoph}
            onChange={handleChange}
            disabled={formData.isformerofw === "No"}

            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
        </FormControl>
      </Grid>

      <Grid item xs={12} md={4}>
        <Typography>
          Are you a 4P's Beneficiary?
        </Typography>
        <FormControl fullWidth >
          <Select
            name="is4pbeneficiary"
            value={formData.is4pbeneficiary}
            onChange={handleChange}
            required
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
        </FormControl>
      </Grid>




      <Grid item xs={12} md={4} sx= {{opacity: formData.is4pbeneficiary === "No" ? 0.5 : 1 }}>
        <Typography>
          If yes, Household ID no.
        </Typography>
        <FormControl fullWidth disabled={formData.is4pbeneficiary === "No"}>
          <TextField
            fullWidth
            name="householdidno"
            value={formData.householdidno}
            onChange={handleChange}
            required

            disabled={formData.is4pbeneficiary === "No"}
          />
        </FormControl>
      </Grid>


        </Grid>



{/*upload jpeg or jpg file*/}

        <Grid item xs={12}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Please Upload one valid ID (required)
          </Typography>
          <FormControl fullWidth>
            <InputLabel>Choose JPEG file</InputLabel>
            <input
              type="file"
              accept=".jpeg, .jpg"
              style={{ display: 'none' }}
              id="file-upload"
              onChange={handleFileChange}
              required
            />
            <label htmlFor="file-upload">
              <Button variant="contained" component="span" fullWidth>
                Choose file...
              </Button>
            </label>
          </FormControl>
          {uploadedFile && (
            <Typography variant="body2" color="textSecondary">
              Saved Uploaded File: {uploadedFile}
            </Typography>
          )}
          <Button variant="contained" color="primary" style={{ marginTop: '8px' }}>
           
            Download File
          </Button>
        </Grid>

        <Button type="submit" variant="contained" color="primary">
          Next
        </Button>
      </form>
    </div>
  );
};

PersonalInfo.propTypes = {
  pageData: PropTypes.object,
  onRefresh: PropTypes.func,
  selectedTab: PropTypes.number,
  onClickNextPage: PropTypes.func.isRequired,
  onClickPrevPage: PropTypes.func.isRequired
};

export default PersonalInfo;
