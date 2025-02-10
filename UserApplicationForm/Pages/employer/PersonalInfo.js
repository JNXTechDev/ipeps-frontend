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
} from '@mui/material';
import { useNavigate , Link} from 'react-router-dom';

const PersonalInfo = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    middlename: '',
    lastname: '',
    suffix: '',
    sex: '',
    dateofbirth: '',
    placeofbirth: '',
    religion: '',
    designation:'',
    civilstatus: '',
    landlineno: '',
    cellphoneno: '',
    tin: '',
    sssandgsisno: '',
    pagibigno: '',
    philhealthno: '',
    cellphoneCountryCode: '+63', // Add default country code
  });



    // Add new states for storing JSON data
    const [regions, setRegions] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [municipalities, setMunicipalities] = useState([]);
    const [barangays, setBarangays] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  const [addressType, setAddressType] = useState('local'); // 'local' or 'international'

  
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
  // Add country codes array
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
  ];

  // Add religions array
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
  const fieldNames = {
    region: `Region`,
    provinceOrCity: `ProvinceOrCity`,
    municipality: `Municipality`,
    barangay: `Barangay`
  };
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

  const [isSameAsPresentAddress, setIsSameAsPresentAddress] = useState(false);
  const [isCheckedVisual, setIsCheckedVisual] = useState(false);
  const [isCheckedHearing, setIsCheckedHearing] = useState(false);
  const [isCheckedSpeech, setIsCheckedSpeech] = useState(false);
  const [isCheckedPhysical, setIsCheckedPhysical] = useState(false);
  const [userAddedDisabilities, setUserAddedDisabilities] = useState([]);
  const [otherDisabilitiesValue, setOtherDisabilitiesValue] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('File selected:', file);
      setUploadedFile(file.name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
  };


  return (
    <div>
      <h2>Please fill in the application form.</h2>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Typography>
              First Name
            </Typography>
            <TextField
              fullWidth
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography>
              Middle Name
            </Typography>
            <TextField
              fullWidth
              name="middlename"
              value={formData.middlename}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography>
              Last Name
            </Typography>
            <TextField
              fullWidth
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <Typography>Suffix</Typography>
              <Select
                name="suffix"
                value={formData.civilstatus}
                onChange={handleChange}
                required
              >
                <MenuItem value="Jr">Jr</MenuItem>
                <MenuItem value="Sr">Sr</MenuItem>
              </Select>
            </FormControl>
          </Grid>



          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <Typography>Sex</Typography>
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
            <Typography>
              Date of Birth
            </Typography>
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

          <Grid item xs={12} md={4}>
            <Typography>
              Place of Birth
            </Typography>
            <TextField
              fullWidth
              name="placeofbirth"
              value={formData.placeofbirth}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography>
              Landline Number
            </Typography>
            <TextField
              fullWidth
              name="landlineno"
              value={formData.landlineno}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={4}>
          <Typography>Cellphone Number</Typography>
          <Grid container spacing={2}> {/* Add a container for the row */}
            <Grid item xs={4}> {/* Country code takes 4 columns */}
              <Select
                fullWidth
                value={formData.cellphoneCountryCode}
                onChange={(e) =>
                  setFormData({ ...formData, cellphoneCountryCode: e.target.value })
                }
              >
                {countryCodes.map((item) => (
                  <MenuItem key={item.code} value={item.code}>
                    {item.code} ({item.country})
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={8}> {/* Phone number input takes 8 columns */}
              <TextField
                fullWidth
                name="cellphoneno"
                value={formData.cellphoneno}
                onChange={handleChange}
                placeholder="Enter phone number"
              />
            </Grid>
          </Grid>
        </Grid>

          <Grid item xs={12} md={4}>
          <Typography>
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

            <Grid item xs={12} md={4}>
                      <Typography>Region</Typography>
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
                      <Typography>Province</Typography>
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
                      <Typography>Municipality</Typography>
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
                      <Typography>Barangay</Typography>
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

            <Grid item xs={12} md={4}>
            <Typography>
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
            <Grid item xs={12} md={4} mb={4}>
              <Typography>
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
              </Grid>

            <Typography variant="h6" fontWeight="bold">
              Company / Agency Affiliation
            </Typography>
        <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
            <Typography>
              Emplolyer's Name
            </Typography>
            <TextField
              fullWidth
              name="employername"
              value={formData.employername}
              onChange={handleChange}
              required
            />
            </Grid>
              
            <Grid item xs={12} md={4}>
            <Typography>
              Emplolyer's Address
            </Typography>
            <TextField
              fullWidth
              name="employeraddress"
              value={formData.employeraddres}
              onChange={handleChange}
              required
            />
            </Grid>
            <Grid item xs={12} md={4}>
            <Typography>
             Employer's Contact Number
            </Typography>
            <TextField
              fullWidth
              name="employercontactno"
              value={formData.employeraddres}
              onChange={handleChange}
              required
            />
            </Grid>
            <Grid item xs={12} md={4} mb={4}>
            <Typography>
             Employer's Position/Designation
            </Typography>
            <TextField
              fullWidth
              name="employerposition"
              value={formData.employerposition}
              onChange={handleChange}
              required
            />
            </Grid>              


          <Grid item xs={12}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Please Upload one valid company ID (required)
            </Typography>
                       <Grid item xs={12} md={4} mb = {4}>
            <Typography fontWeight="bold">
                          ID Number            
                          </Typography>
                        <TextField
                          fullWidth
                          name="idnumber"
                          value={formData.idnumber}
                          onChange={handleChange}
                          required
                        />
                        </Grid> 
        </Grid>
        </Grid>

            <FormControl fullWidth>
              <InputLabel>Choose JPEG file</InputLabel>
              <input
                type="file"
                accept=".jpeg, .jpg"
                style={{ display: 'none' }}
                id="file-upload"
                onChange={handleFileChange}
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
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px' }}>
          Submit
        </Button>
      </form>
    </div>
    
  );
};

export default PersonalInfo;
