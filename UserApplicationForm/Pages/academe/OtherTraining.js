import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Card, CardContent, IconButton, Box, Chip } from '@mui/material';
import { Add, Delete, AddCircle } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';

const OtherTraining = ({ onClickNextPage, onClickPrevPage }) => {
  const [trainingHistory, setTrainingHistory] = useState([]);
  const [skillInput, setSkillInput] = useState('');
  const [newEntry, setNewEntry] = useState({
    courseName: '',
    dateStart: '',
    dateEnd: '',
    trainingInstitution: '',
    certificatesReceived: '',
    hoursOfTraining: '',
    skillsAcquired: [],
    credentialID: '',
    credentialURL: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEntry((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSkill = () => {
    if (skillInput.trim()) {
      setNewEntry(prev => ({
        ...prev,
        skillsAcquired: [...prev.skillsAcquired, skillInput.trim()]
      }));
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setNewEntry(prev => ({
      ...prev,
      skillsAcquired: prev.skillsAcquired.filter(skill => skill !== skillToRemove)
    }));
  };

  const addTrainingHistory = () => {
    if (newEntry.courseName && newEntry.dateStart) {
      setTrainingHistory([...trainingHistory, { id: uuidv4(), ...newEntry }]);
      setNewEntry({
        courseName: '', dateStart: '', dateEnd: '', trainingInstitution: '',
        certificatesReceived: '', hoursOfTraining: '', skillsAcquired: [], credentialID: '', credentialURL: ''
      });
    }
  };

  const removeTrainingHistory = (id) => {
    setTrainingHistory(trainingHistory.filter((entry) => entry.id !== id));
  };

  return (
    <div>
      <Typography variant='h5' gutterBottom>
        Technical/Vocational Course & Other Training
      </Typography>

      {trainingHistory.map((entry) => (
        <Card key={entry.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography><strong>Course:</strong> {entry.courseName}</Typography>
            <Typography><strong>Start:</strong> {entry.dateStart}</Typography>
            <Typography><strong>End:</strong> {entry.dateEnd}</Typography>
            <Typography><strong>Institution:</strong> {entry.trainingInstitution}</Typography>
            <Typography><strong>Certificate:</strong> {entry.certificatesReceived}</Typography>
            <Typography><strong>Hours:</strong> {entry.hoursOfTraining}</Typography>
            <Typography><strong>Skills:</strong> {entry.skillsAcquired.join(', ')}</Typography>
            <Typography><strong>Credential ID:</strong> {entry.credentialID}</Typography>
            <Typography><strong>Credential URL:</strong> {entry.credentialURL}</Typography>
            <IconButton color='error' onClick={() => removeTrainingHistory(entry.id)}>
              <Delete />
            </IconButton>
          </CardContent>
        </Card>
      ))}

      <Typography variant='h6'>Add Entry</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1" gutterBottom>Course Name</Typography>
          <TextField label='Course Name' name='courseName' fullWidth value={newEntry.courseName} onChange={handleChange} />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1" gutterBottom>Start Date</Typography>
          <TextField type='date' label='Start Date' name='dateStart' fullWidth InputLabelProps={{ shrink: true }} value={newEntry.dateStart} onChange={handleChange} />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1" gutterBottom>End Date</Typography>
          <TextField type='date' label='End Date' name='dateEnd' fullWidth InputLabelProps={{ shrink: true }} value={newEntry.dateEnd} onChange={handleChange} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" gutterBottom>Training Institution</Typography>
          <TextField label='Training Institution' name='trainingInstitution' fullWidth value={newEntry.trainingInstitution} onChange={handleChange} />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1" gutterBottom>Certificates Received</Typography>
          <TextField label='Certificates Received' name='certificatesReceived' fullWidth value={newEntry.certificatesReceived} onChange={handleChange} />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1" gutterBottom>Hours of Training</Typography>
          <TextField type='number' label='Hours of Training' name='hoursOfTraining' fullWidth value={newEntry.hoursOfTraining} onChange={handleChange} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" gutterBottom>Skills Acquired</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <TextField
              label='Add Skill'
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              fullWidth
            />
            <Button
              variant='contained'
              color='primary'
              startIcon={<AddCircle />}
              onClick={handleAddSkill}
              sx={{ minWidth: '120px' }}
            >
              Add Skill
            </Button>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {newEntry.skillsAcquired.map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                onDelete={() => handleRemoveSkill(skill)}
                color="primary"
                variant="outlined"
              />
            ))}
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1" gutterBottom>Credential ID</Typography>
          <TextField label='Credential ID' name='credentialID' fullWidth value={newEntry.credentialID} onChange={handleChange} />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1" gutterBottom>Credential URL</Typography>
          <TextField label='Credential URL' name='credentialURL' fullWidth value={newEntry.credentialURL} onChange={handleChange} />
        </Grid>
        <Grid item xs={12}>
          <Button variant='contained' color='primary' startIcon={<Add />} onClick={addTrainingHistory}>
            Add Entry
          </Button>
        </Grid>
      </Grid>
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" sx={{ mr: 2 }} onClick={onClickPrevPage}>
          Back
        </Button>
        <Button variant="contained" color="primary" onClick={onClickNextPage}>
          Next
        </Button>
      </Box>
    </div>
  );
};

export default OtherTraining;
