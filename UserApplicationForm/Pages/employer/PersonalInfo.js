import React, { useState } from 'react';
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
    age: '',
    email: '',
    placeofbirth: '',
    religion: '',
    designation:'',
    civilstatus: '',
    landlineno: '',
    cellphoneno: '',
    cellphoneCountryCode: '+63',
    presentAddress: '',
    companyAddress: '',
    companyId: '',
  });

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
            <Typography>
              Suffix
            </Typography>
            <TextField
              fullWidth
              name="suffix"
              value={formData.suffix}
              onChange={handleChange}
            />
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

          <Grid item xs={12} md={4}>
            <Typography>
              Designation
            </Typography>
            <TextField
              fullWidth
              name="designation"
              value={formData.designation}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <Typography>Civil Status</Typography>
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
            <Typography>Age</Typography>
            <TextField
              fullWidth
              name="age"
              value={formData.age}
              onChange={handleChange}
              type="number"
              required
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography>Email Address</Typography>
            <TextField
              fullWidth
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              required
            />
          </Grid>

          <Grid item xs={12}>
            <Typography>Present Address</Typography>
            <TextField
              fullWidth
              name="presentAddress"
              value={formData.presentAddress}
              onChange={handleChange}
              multiline
              rows={2}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <Typography>Company Address</Typography>
            <TextField
              fullWidth
              name="companyAddress"
              value={formData.companyAddress}
              onChange={handleChange}
              multiline
              rows={2}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography>Company ID Number</Typography>
            <TextField
              fullWidth
              name="companyId"
              value={formData.companyId}
              onChange={handleChange}
              required
            />
          </Grid>

          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" fontWeight="bold">
              Please Upload one valid company ID (required)
            </Typography>
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
          </Grid>
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px' }}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default PersonalInfo;