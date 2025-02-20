import React, { useState, useEffect } from 'react';
import {
    Modal,
    Box,
    Typography,
    TextField,
    Button,
    InputLabel,
    Select,
    MenuItem,
    FormControl,
    Grid,
} from '@mui/material';

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

const ApplyCompany = ({ open, onClose, formData, handleChange }) => {
    const [companyName, setCompanyName] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [industry, setIndustry] = useState('');
    const [companyType, setCompanyType] = useState('');
    const [description, setDescription] = useState('');
    const [totalWorkforce, setTotalWorkforce] = useState('');
    const [letterOfIntent, setLetterOfIntent] = useState(null);
    const [logoimage] = useState(null);
    const [businesspermit] = useState(null);
    const [birforms] = useState(null);
    const [poeafiles] = useState(null);
    const [philnetregcert] = useState(null);
    const [philnetregss] = useState(null);
    const [dolecert] = useState(null);
    const [adminrem] = useState(null);

    const [regions, setRegions] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [municipalities, setMunicipalities] = useState([]);
    const [barangays, setBarangays] = useState([]);

    const [addressType, setAddressType] = useState('local');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedMunicipality, setSelectedMunicipality] = useState('');
    const [selectedBarangay, setSelectedBarangay] = useState('');
    const [internationalAddress, setinternationalAddress] = useState('')
    const [zippostalcode, setZipPostalCode] = useState('')
    const [houseno, setHouseNo] = useState('')

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadJsonData = async () => {
            if (selectedCountry === 'Philippines') {
                setLoading(true);
                setError(null);
                try {
                    const regionsData = await import('../../../../../../UserApplicationForm/json/refregion.json');
                    const provincesData = await import('../../../../../../UserApplicationForm/json/refprovince.json');
                    const municipalitiesData = await import('../../../../../../UserApplicationForm/json/refcitymun.json');
                    const barangaysData = await import('../../../../../../UserApplicationForm/json/refbrgy.json');

                    setRegions(regionsData.RECORDS || []);
                    setProvinces(provincesData.RECORDS || []);
                    setMunicipalities(municipalitiesData.RECORDS || []);
                    setBarangays(barangaysData.RECORDS || []);
                } catch (error) {
                    console.error('Error loading JSON data:', error);
                    setError('Failed to load location data');
                } finally {
                    setLoading(false);
                }
            } else {
                setRegions([]);
                setProvinces([]);
                setMunicipalities([]);
                setBarangays([]);
            }
        };

        loadJsonData();
    }, [selectedCountry]);

    const getProvincesByRegion = (regionCode) => {
        return provinces.filter(province => province.regCode === regionCode);
    };

    const getMunicipalitiesByProvince = (provinceCode) => {
        return municipalities.filter(municipality => municipality.provCode === provinceCode);
    };

    const getBarangaysByMunicipality = (municipalityCode) => {
        return barangays.filter(barangay => barangay.citymunCode === municipalityCode);
    };

    const handleFileChange = (event) => {
        setLetterOfIntent(event.target.files[0]);
    };

    const handleSubmit = () => {
        console.log("Submitted Application");
        onClose();
    };

    return (

        <Modal open={open} onClose={onClose}>
            
            <Box sx={{ 
                p: 4, 
                backgroundColor: 'white' ,
                mr: 10,
                ml: 10,
                mt: 5,
                mb: 5,
                borderRadius: 2,
                maxHeight: 700,
                overflow:'scroll',

    
                }}>
                <Typography variant="h6" gutterBottom>
                    Company Application
                </Typography>

                {/* Company Name */}
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Company Name"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                

                {/* Email */}
                <Grid item xs={12} md={6}>

                <TextField
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    sx={{ mb: 2}}                    />
                </Grid>

                {/* Website */}
                <Grid item xs={12} md={6}>

                <TextField
                    label="Website"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    fullWidth
                    sx={{ mb: 2 }}                    />
                </Grid>

                {/* Industry */}
                <Grid item xs={12} md={6}>

                <TextField
                    label="Industry"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    fullWidth
                    sx={{ mb: 2 }}                    />
                </Grid>


                {/* Company Type */}
                <Grid item xs={12} md={6}>
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Company Type</InputLabel>
                    <Select
                        value={companyType}
                        onChange={(e) => setCompanyType(e.target.value)}
                    >
                        <MenuItem value="Private">Private</MenuItem>
                        <MenuItem value="Public">Public</MenuItem>
                    </Select>
                </FormControl>
                </Grid>

                {/* Total Workforce */}
                <Grid item xs={12} md={6}>

                <TextField
                    label="Total Workforce"
                    value={totalWorkforce}
                    onChange={(e) => setTotalWorkforce(e.target.value)}
                    fullWidth
                    sx={{ mb: 2 }}                    />
                </Grid>
                {/* Local address fields with dropdown selectors */}
                {/* Address Fields */}
                <Grid item xs={12} md={6}>

                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Country</InputLabel>
                    <Select
                        value={selectedCountry}
                        onChange={(e) => setSelectedCountry(e.target.value)}
                    >
                        {countries.map((country) => (
                            <MenuItem key={country} value={country}>
                                {country}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                </Grid>

                {loading && <Typography>Loading location data...</Typography>}
                {error && <Typography color="error">{error}</Typography>}
{/* Conditional Address Fields for the Philippines */}
{/* Conditional Address Fields for the Philippines */}
{selectedCountry === 'Philippines' ? (
<>
    {/* Region */}
    <Grid item xs={12} md={6}>
        <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Region</InputLabel>
            <Select
                value={selectedRegion}
                onChange={(e) => {
                    setSelectedRegion(e.target.value);
                    setSelectedProvince('');
                    setSelectedMunicipality('');
                    setSelectedBarangay('');
                }}
            >
                {regions.map((region) => (
                    <MenuItem key={region.regCode} value={region.regCode}>
                        {region.regDesc}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    </Grid>

    {/* Province */}
    <Grid item xs={12} md={6}>
        <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Province</InputLabel>
            <Select
                value={selectedProvince}
                onChange={(e) => {
                    setSelectedProvince(e.target.value);
                    setSelectedMunicipality('');
                    setSelectedBarangay('');
                }}
            >
                {getProvincesByRegion(selectedRegion).map((province) => (
                    <MenuItem key={province.provCode} value={province.provCode}>
                        {province.provDesc}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    </Grid>

    {/* Municipality */}
    <Grid item xs={12} md={6}>
        <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Municipality</InputLabel>
            <Select
                value={selectedMunicipality}
                onChange={(e) => {
                    setSelectedMunicipality(e.target.value);
                    setSelectedBarangay('');
                }}
            >
                {getMunicipalitiesByProvince(selectedProvince).map((municipality) => (
                    <MenuItem key={municipality.citymunCode} value={municipality.citymunCode}>
                        {municipality.citymunDesc}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    </Grid>

    {/* Barangay */}
    <Grid item xs={12} md={6}>
        <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Barangay</InputLabel>
            <Select
                value={selectedBarangay}
                onChange={(e) => setSelectedBarangay(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
            >
                {getBarangaysByMunicipality(selectedMunicipality).map((barangay) => (
                    <MenuItem key={barangay.brgyCode} value={barangay.brgyCode}>
                        {barangay.brgyDesc}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    </Grid>
</>
) : (
<Grid item xs={12} md={6}>
    <TextField
        label="Full Address"
        value={internationalAddress}
        onChange={(e) => setinternationalAddress(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
    />
</Grid>
)}

{/* Common Address Fields for Both Local and International */}
<Grid item xs={12} md={6}>
<TextField
    label="Zip Code / Postal Code"
    value={zippostalcode}
    onChange={(e) => setZipPostalCode(e.target.value)}
    fullWidth
    sx={{ mb: 2 }}
/>
</Grid>

<Grid item xs={12} md={6}>
<TextField
    label="House No. / Street Village"
    value={houseno}
    onChange={(e) => setHouseNo(e.target.value)}
    fullWidth
    sx={{ mb: 2 }}
/>
</Grid>

        
    
    </Grid>

                {/* logo img */}
                <Button
                    variant="contained"
                    component="label"
                    sx={{ fontSize: 11 , p: 1, width: 300, mb: 2, mr:2, ml:2, backgroundColor:'#00a2ed' }}
                >
                    Upload Logo Image
                    <input
                        type="file"
                        hidden
                        onChange={handleFileChange}
                    />
                </Button>
                {logoimage && (
                    <Typography variant="body2">
                        Selected file: {logoimage}
                    </Typography>
                )}

                {/* business permit registration files */}
                <Button
                    variant="contained"
                    component="label"
                    sx={{ fontSize: 11 , p: 1, width: 300, mb: 2, mr:2, ml:2, backgroundColor:'#00a2ed' }}
                >
                    Upload Business Permit Registration Files
                    <input
                        type="file"
                        hidden
                        onChange={handleFileChange}
                    />
                </Button>
                {businesspermit && (
                    <Typography variant="body2">
                        Selected file: {businesspermit}
                    </Typography>
                )}

                {/* BIR FORMs */}
                    <Button
                    variant="contained"
                    component="label"
                    sx={{ fontSize: 11 , p: 1, width: 300, mb: 2, mr:2, ml:2, backgroundColor:'#00a2ed' }}
                    >
                    Upload BIR Forms
                    <input
                        type="file"
                        hidden
                        onChange={handleFileChange}
                    />
                </Button>
                {birforms && (
                    <Typography variant="body2">
                        Selected file: {birforms}
                    </Typography>
                )}

                {/* POEA FILES */}
                <Button
                    variant="contained"
                    component="label"
                    sx={{ fontSize: 11 , p: 1, width: 300, mb: 2, mr:2, ml:2, backgroundColor:'#00a2ed' }}
                    >
                    Upload POEA Files
                    <input
                        type="file"
                        hidden
                        onChange={handleFileChange}
                    />
                </Button>
                {poeafiles && (
                    <Typography variant="body2">
                        Selected file: {poeafiles}
                    </Typography>
                )}


                {/* PHILNET REGISTRATION CERTIFICATION */}
                <Button
                    variant="contained"
                    component="label"
                    sx={{ fontSize: 11 , p: 1, width: 300, mb: 2, mr:2, ml:2, backgroundColor:'#00a2ed' }}
               >
                    Upload PHILNET Registration Certification
                    <input
                        type="file"
                        hidden
                        onChange={handleFileChange}
                    />
                </Button>
                {philnetregcert && (
                    <Typography variant="body2">
                        Selected file: {philnetregcert}
                    </Typography>
                )}
                {/* PHILNET REGISTRATION SCREENSHOT */}
                <Button
                    variant="contained"
                    component="label"
                    sx={{ fontSize: 11 , p: 1, width: 300, mb: 2, mr:2, ml:2, backgroundColor:'#00a2ed' }}
                >
                    Upload PHILNET Registration Screenshot
                    <input
                        type="file"
                        hidden
                        onChange={handleFileChange}
                    />
                </Button>
                {philnetregss && (
                    <Typography variant="body2">
                        Selected file: {philnetregss}
                    </Typography>
                )}

                {/* DOLE CERT */}
                <Button
                    variant="contained"
                    component="label"
                    sx={{ fontSize: 11 , p: 1, width: 300, mb: 2, mr:2, ml:2, backgroundColor:'#00a2ed' }}
                >
                    Upload DOLE Certificate
                    <input
                        type="file"
                        hidden
                        onChange={handleFileChange}
                    />
                </Button>
                {dolecert && (
                    <Typography variant="body2">
                        Selected file: {dolecert}
                    </Typography>
                )}

                {/* Letter of Intent */}
                <Button
                    variant="contained"
                    component="label"
                    sx={{ fontSize: 11 , p: 1, width: 300, mb: 2, mr:2, ml:2, backgroundColor:'#00a2ed' }}
                >
                    Upload Letter of Intent
                    <input
                        type="file"
                        hidden
                        onChange={handleFileChange}
                    />
                </Button>
                {letterOfIntent && (
                    <Typography variant="body2">
                        Selected file: {letterOfIntent}
                    </Typography>
                )}



                {/*Submit Application */}
                <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{ 
                        fontSize: 11, 
                        p: 1, 
                        width: 300, 
                        backgroundColor: '#00a2ed' 
                    }}
                >
                    Submit Application
                </Button>
            </Box>


            </Box>
        </Modal>
    );
};

export default ApplyCompany;