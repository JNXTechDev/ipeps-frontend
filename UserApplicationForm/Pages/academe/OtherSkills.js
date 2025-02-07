import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  FormControlLabel,
  Checkbox,
  TextField,
  Button,
  Chip,
  Divider,
} from '@mui/material';

const OtherSkills = ({ onClickNextPage, onClickPrevPage }) => {
  // State for checkboxes
  const [skills, setSkills] = useState({
    autoMechanic: false,
    beautician: false,
    carpentry: false,
    computerLiterate: false,
    domesticChores: false,
    driver: false,
    electrician: false,
    embroidery: false,
    gardening: false,
    masonry: false,
    painterOrArtist: false,
    paintingJobs: false,
    photography: false,
    plumbing: false,
    sewingDresses: false,
    stenography: false,
    tailoring: false,
  });

  // State for additional skills
  const [otherSkills, setOtherSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');

  // Handle checkbox changes
  const handleSkillChange = (skill) => (event) => {
    setSkills({ ...skills, [skill]: event.target.checked });
  };

  // Add a new skill
  const handleAddSkill = () => {
    if (newSkill.trim() !== '' && otherSkills.length < 50) {
      setOtherSkills([...otherSkills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  // Remove a skill
  const handleRemoveSkill = (skillToRemove) => {
    setOtherSkills(otherSkills.filter((skill) => skill !== skillToRemove));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Other Skills Acquired Without Formal Training
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={3}>
        {/* First Column */}
        <Grid item xs={12} md={4}>
          <FormControlLabel
            control={
              <Checkbox
                checked={skills.autoMechanic}
                onChange={handleSkillChange('autoMechanic')}
              />
            }
            label="Auto Mechanic"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={skills.beautician}
                onChange={handleSkillChange('beautician')}
              />
            }
            label="Beautician"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={skills.carpentry}
                onChange={handleSkillChange('carpentry')}
              />
            }
            label="Carpentry Work"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={skills.computerLiterate}
                onChange={handleSkillChange('computerLiterate')}
              />
            }
            label="Computer Literate"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={skills.domesticChores}
                onChange={handleSkillChange('domesticChores')}
              />
            }
            label="Domestic Chores"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={skills.driver}
                onChange={handleSkillChange('driver')}
              />
            }
            label="Driver"
          />
        </Grid>

        {/* Second Column */}
        <Grid item xs={12} md={4}>
          <FormControlLabel
            control={
              <Checkbox
                checked={skills.electrician}
                onChange={handleSkillChange('electrician')}
              />
            }
            label="Electrician"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={skills.embroidery}
                onChange={handleSkillChange('embroidery')}
              />
            }
            label="Embroidery"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={skills.gardening}
                onChange={handleSkillChange('gardening')}
              />
            }
            label="Gardening"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={skills.masonry}
                onChange={handleSkillChange('masonry')}
              />
            }
            label="Masonry"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={skills.painterOrArtist}
                onChange={handleSkillChange('painterOrArtist')}
              />
            }
            label="Painter/Artist"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={skills.paintingJobs}
                onChange={handleSkillChange('paintingJobs')}
              />
            }
            label="Painting Jobs"
          />
        </Grid>

        {/* Third Column */}
        <Grid item xs={12} md={4}>
          <FormControlLabel
            control={
              <Checkbox
                checked={skills.photography}
                onChange={handleSkillChange('photography')}
              />
            }
            label="Photography"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={skills.plumbing}
                onChange={handleSkillChange('plumbing')}
              />
            }
            label="Plumbing"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={skills.sewingDresses}
                onChange={handleSkillChange('sewingDresses')}
              />
            }
            label="Sewing Dresses"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={skills.stenography}
                onChange={handleSkillChange('stenography')}
              />
            }
            label="Stenography"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={skills.tailoring}
                onChange={handleSkillChange('tailoring')}
              />
            }
            label="Tailoring"
          />
        </Grid>
      </Grid>

      {/* Additional Skills Section */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Add Other Skills
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={8}>
            <TextField
              fullWidth
              label="Add other skills..."
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              onClick={handleAddSkill}
              disabled={newSkill.trim() === '' || otherSkills.length >= 50}
            >
              Add
            </Button>
          </Grid>
        </Grid>

        {/* Display Added Skills */}
        <Box sx={{ mt: 2 }}>
          {otherSkills.map((skill, index) => (
            <Chip
              key={index}
              label={skill}
              onDelete={() => handleRemoveSkill(skill)}
              sx={{ m: 0.5 }}
            />
          ))}
        </Box>
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

export default OtherSkills;