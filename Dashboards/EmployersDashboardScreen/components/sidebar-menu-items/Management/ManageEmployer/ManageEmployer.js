import React, { useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    Button,
    TableContainer,
    TableHead,
    TableRow,
    Avatar,
    Chip,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Tooltip,
    IconButton,
} from '@mui/material';
import {
    CheckCircle,
    Cancel,
    AccessTime,
    HourglassEmpty,
    AddCircleOutline,
    Info,
    BusinessCenter,
    Work,
    School,
    CardGiftcard,
} from '@mui/icons-material';
import Header from './Header';
import CompanyDetailsModal from './CompanyDetailsModal'; // Import the modal component
import ApplyCompany from './ApplyCompany';


const ManageEmployer = ({ isCollapsed }) => {
    const [selectedStatus, setSelectedStatus] = useState('');
    const [openDetailsModal, setOpenDetailsModal] = useState(false);
    const [openApplyModal, setOpenApplyModal] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [formData, setFormData] = useState({
        country: 'Philippines', // Default country
        region: '',
        provinceOrCity: '',
        municipality: '',
        barangay: '',
        zipcode: '',
        streetAddress: '',
        // Add other fields as needed
    });
    const [regions, setRegions] = useState([]); // Populate this with your regions data
    const [provinces, setProvinces] = useState([]); // Populate this with your provinces data
    const [municipalities, setMunicipalities] = useState([]); // Populate this with your municipalities data
    const [barangays, setBarangays] = useState([]); // Populate this with your barangays data

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


    const companies = [
        { id: 1, logo: "MS", name: "Microsoft Corporation", status: "approved", image: "https://logo.clearbit.com/microsoft.com" },
        { id: 2, logo: "GO", name: "Google LLC", status: "pending", image: "https://logo.clearbit.com/google.com" },
        { id: 3, logo: "AP", name: "Apple Inc.", status: "rejected", image: "https://logo.clearbit.com/apple.com" },
        { id: 4, logo: "FB", name: "Meta Platforms", status: "expired", image: "https://logo.clearbit.com/meta.com" },
    ];

    const getStatusChip = (status) => {
        const statusConfigs = {
            approved: { icon: <CheckCircle />, color: 'success', label: 'Approved' },
            rejected: { icon: <Cancel />, color: 'error', label: 'Rejected' },
            pending: { icon: <AccessTime />, color: 'warning', label: 'Pending' },
            expired: { icon: <HourglassEmpty />, color: 'default', label: 'Expired' },
        };
        const config = statusConfigs[status];
        return (
            <Chip
                icon={config.icon}
                label={config.label}
                color={config.color}
                size="small"
                sx={{ textTransform: 'capitalize' }}
            />
        );
    };
    const handleChange = (event) => {
        setSelectedStatus(event.target.value);
    };

    const handleAction = (action, company) => {
        if (action === 'details') {
            setSelectedCompany(company);
            setOpenDetailsModal(true);
        }
    };

    const handleOpenApplyModal = () => {
        setOpenApplyModal(true);
    };

    const handleCloseDetailsModal = () => {
        setOpenDetailsModal(false);
        setSelectedCompany(null);
    };

    const handleCloseApplyModal = () => {
        setOpenApplyModal(false);
    };

    return (
        <Box sx={{ p: 3 }}>
            <Header isCollapsed={isCollapsed} />
            <Paper elevation={2} sx={{ p: 2, mt: 5, mb: 4, borderRadius: 2, border: '1px solid', borderColor: 'divider', backgroundColor: 'white' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h5" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                        Manage Companies
                    </Typography>
                    <Button
                        startIcon={<AddCircleOutline />}
                        variant="contained"
                        onClick={handleOpenApplyModal}
                        sx={{
                            backgroundColor: '#1976d2',
                            color: 'white',
                            px: 3,
                            py: 1,
                            borderRadius: '8px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            '&:hover': {
                                backgroundColor: '#1565c0',
                                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                            },
                        }}
                    >
                        Apply New Company
                    </Button>
                </Box>
                <FormControl fullWidth sx={{ width: '200px' }}>
                    <InputLabel id="status-label">Filter by Status</InputLabel>
                    <Select
                        labelId="status-label"
                        value={selectedStatus}
                        onChange={handleChange}
                        label="Filter by Status"
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="approved">Approved</MenuItem>
                        <MenuItem value="rejected">Rejected</MenuItem>
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="expired">Expired</MenuItem>
                    </Select>
                </FormControl>
            </Paper>
            <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 2, border: '1px solid', borderColor: 'divider', '& .MuiTableCell-head': { backgroundColor: '#f5f5f5', fontWeight: 'bold' } }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Company</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align="right">Company Detail</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {companies.map((company) => (
                            <TableRow key={company.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Avatar src={company.image} alt={company.name} sx={{ width: 40, height: 40 }}>
                                            {company.logo}
                                        </Avatar>
                                        <Typography variant="body1">{company.name}</Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>{getStatusChip(company.status)}</TableCell>
                                
                                <TableCell align="right">
                                    
                                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                                        
                                        <Tooltip title="Company Details">

                                            <IconButton color="primary" onClick={() => handleAction('details', company)}>
                                                <Info />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* Company Details Modal */}
            {selectedCompany && (
                <CompanyDetailsModal
                open={openDetailsModal}
                onClose={handleCloseDetailsModal}
                company={selectedCompany}
                    formData={formData}
                    handleChange={handleChange}
                    regions={regions}
                    provinces={provinces}
                    municipalities={municipalities}
                    barangays={barangays}
                    getProvincesByRegion={getProvincesByRegion}
                    getBarangaysByMunicipality={getBarangaysByMunicipality}
                    getMunicipalitiesByProvince={getMunicipalitiesByProvince}
                />
            )}

                {/* Apply Company Modal */}
               
                <ApplyCompany
                open={openApplyModal}
                onClose={handleCloseApplyModal}
                    formData={formData}
                    handleChange={handleChange}
                    regions={regions}
                    provinces={provinces}
                    municipalities={municipalities}
                    barangays={barangays}
                    getProvincesByRegion={getProvincesByRegion}
                    getBarangaysByMunicipality={getBarangaysByMunicipality}
                    getMunicipalitiesByProvince={getMunicipalitiesByProvince}
                />
          
        </Box>
    );
};

export default ManageEmployer;