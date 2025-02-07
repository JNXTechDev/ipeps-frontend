import React, { useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import { v4 as uuidv4 } from 'uuid';
import {
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
  Divider,
  Paper,
  Box,
} from '@mui/material';
import schools from '../../json/schools.json';


const schoolOptionTypes = schools.schools.map(school => ({
  value: school.value,
  label: school.label
}));

const degreeOrQualificationTypes2 = [
  { value: 'Associate Degree', label: 'Associate Degree' },
  { value: "Bachelor's Degree", label: "Bachelor's Degree" },
  { value: "Master's Degree", label: "Master's Degree" },
  { value: 'Doctorate/PhD', label: 'Doctorate/PhD' },
  { value: 'Diploma', label: 'Diploma' },
  { value: 'Certificate', label: 'Certificate' },
  { value: 'Professional License', label: 'Professional License' },
  { value: 'Vocational', label: 'Vocational' },
  { value: 'Technical', label: 'Technical' }
];

const educationalLevelTypes2 = [
  { value: 'Undergraduate', label: 'Undergraduate' },
  { value: 'Graduate', label: 'Graduate' },
  { value: 'Postgraduate', label: 'Postgraduate' },
  // Add more educational levels as needed
];

const fieldOfStudyTypes = [
  { value: 'Accounting', label: 'Accounting' },
  { value: 'Agriculture', label: 'Agriculture' },
  { value: 'Architecture', label: 'Architecture' },
  { value: 'Arts and Design', label: 'Arts and Design' },
  { value: 'Biology', label: 'Biology' },
  { value: 'Business Administration', label: 'Business Administration' },
  { value: 'Chemistry', label: 'Chemistry' },
  { value: 'Civil Engineering', label: 'Civil Engineering' },
  { value: 'Computer Engineering', label: 'Computer Engineering' },
  { value: 'Computer Science', label: 'Computer Science' },
  { value: 'Criminal Justice', label: 'Criminal Justice' },
  { value: 'Dentistry', label: 'Dentistry' },
  { value: 'Economics', label: 'Economics' },
  { value: 'Education', label: 'Education' },
  { value: 'Electrical Engineering', label: 'Electrical Engineering' },
  { value: 'Electronics Engineering', label: 'Electronics Engineering' },
  { value: 'Environmental Science', label: 'Environmental Science' },
  { value: 'Finance', label: 'Finance' },
  { value: 'Fine Arts', label: 'Fine Arts' },
  { value: 'Food Technology', label: 'Food Technology' },
  { value: 'Forestry', label: 'Forestry' },
  { value: 'Hotel and Restaurant Management', label: 'Hotel and Restaurant Management' },
  { value: 'Human Resource Management', label: 'Human Resource Management' },
  { value: 'Industrial Engineering', label: 'Industrial Engineering' },
  { value: 'Information Technology', label: 'Information Technology' },
  { value: 'Journalism', label: 'Journalism' },
  { value: 'Law', label: 'Law' },
  { value: 'Liberal Arts', label: 'Liberal Arts' },
  { value: 'Literature', label: 'Literature' },
  { value: 'Management', label: 'Management' },
  { value: 'Marine Engineering', label: 'Marine Engineering' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Mathematics', label: 'Mathematics' },
  { value: 'Mechanical Engineering', label: 'Mechanical Engineering' },
  { value: 'Medical Technology', label: 'Medical Technology' },
  { value: 'Medicine', label: 'Medicine' },
  { value: 'Mining Engineering', label: 'Mining Engineering' },
  { value: 'Music', label: 'Music' },
  { value: 'Nursing', label: 'Nursing' },
  { value: 'Nutrition and Dietetics', label: 'Nutrition and Dietetics' },
  { value: 'Occupational Therapy', label: 'Occupational Therapy' },
  { value: 'Pharmacy', label: 'Pharmacy' },
  { value: 'Philosophy', label: 'Philosophy' },
  { value: 'Physical Therapy', label: 'Physical Therapy' },
  { value: 'Physics', label: 'Physics' },
  { value: 'Political Science', label: 'Political Science' },
  { value: 'Psychology', label: 'Psychology' },
  { value: 'Public Administration', label: 'Public Administration' },
  { value: 'Public Health', label: 'Public Health' },
  { value: 'Radiologic Technology', label: 'Radiologic Technology' },
  { value: 'Real Estate Management', label: 'Real Estate Management' },
  { value: 'Social Work', label: 'Social Work' },
  { value: 'Sociology', label: 'Sociology' },
  { value: 'Statistics', label: 'Statistics' },
  { value: 'Tourism Management', label: 'Tourism Management' },
  { value: 'Veterinary Medicine', label: 'Veterinary Medicine' }
];

const EducationalBackground = ({ onClickNextPage, onClickPrevPage }) => {
  const [educationHistory, setEducationHistory] = useState([]);

  // Educational History Adding Fields
  const [schoolNameAddingValue, setSchoolNameAddingValue] = useState('');
  const [degreeQualificationSelectedValue, setDegreeQualificationSelectedValue] = useState('');
  const [dateFromAddingValue, setDateFromAddingValue] = useState('');
  const [dateToAddingValue, setDateToAddingValue] = useState('');
  const [isCurrentAddingValue, setIsCurrentAddingValue] = useState(false);
  const [educationalLevelSelectedValue, setEducationalLevelSelectedValue] = useState('');
  const [fieldOfStudyAddingValue, setFieldOfStudyAddingValue] = useState('');
  const [majorAddingValue, setMajorAddingValue] = useState('');
  const [programDurationAddingValue, setProgramDurationAddingValue] = useState('');

  const onAddEducationHistory = () => {
    if (educationHistory.length <= 20) {
      const educationData = {
        id: uuidv4(),
        schoolName: schoolNameAddingValue,
        degreeQualification: degreeQualificationSelectedValue,
        dateFrom: dateFromAddingValue,
        dateTo: dateToAddingValue,
        isCurrent: isCurrentAddingValue,
        educationalLevel: educationalLevelSelectedValue,
        fieldOfStudy: fieldOfStudyAddingValue,
        major: majorAddingValue,
        programDuration: programDurationAddingValue,
      };
      setEducationHistory([...educationHistory, educationData]);

      // Reset fields
      setSchoolNameAddingValue('');
      setDegreeQualificationSelectedValue('');
      setDateFromAddingValue('');
      setDateToAddingValue('');
      setIsCurrentAddingValue(false);
      setEducationalLevelSelectedValue('');
      setFieldOfStudyAddingValue('');
      setMajorAddingValue('');
      setProgramDurationAddingValue('');
    }
  };

  const onRemoveEducationHistory = (id) => {
    if (id !== '') {
      const index = educationHistory.findIndex((p) => p.id === id);
      if (index > -1) {
        let newEducationHistory = educationHistory;
        newEducationHistory.splice(index, 1);
        setEducationHistory([...newEducationHistory]);
      }
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Educational Background
      </Typography>
      <Divider sx={{ marginBottom: 3 }} />

      {/* Display existing education history */}
      {educationHistory.map((educationEntry, index) => (
        <div key={index}>
          {/* Row 1 */}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="School"
                value={educationEntry.schoolName}
                disabled
              />
            </Grid>
          </Grid>
          {/* Row 2 */}
          <Grid container spacing={2} sx={{ marginTop: 1 }}>
            <Grid item xs={12} md={5}>
              <TextField
                fullWidth
                label="Date From"
                type="date"
                value={educationEntry.dateFrom}
                disabled
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <TextField
                fullWidth
                label="Date To"
                type="date"
                value={educationEntry.dateTo}
                disabled
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={educationEntry.isCurrent}
                    disabled
                  />
                }
                label="Currently Attending"
              />
            </Grid>
          </Grid>
          {/* Row 3 */}
          <Grid container spacing={2} sx={{ marginTop: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Degree or Qualification"
                value={educationEntry.degreeQualification}
                disabled
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Educational Level"
                value={educationEntry.educationalLevel}
                disabled
              />
            </Grid>
          </Grid>
          {/* Row 4 */}
          <Grid container spacing={2} sx={{ marginTop: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Field of Study"
                value={educationEntry.fieldOfStudy}
                disabled
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Major (optional)"
                value={educationEntry.major}
                disabled
              />
            </Grid>
          </Grid>
          {/* Row 5 */}
          <Grid container spacing={2} sx={{ marginTop: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Program Duration in Years"
                type="number"
                value={educationEntry.programDuration}
                disabled
              />
            </Grid>
          </Grid>
          {/* Remove */}
          <Grid container spacing={2} sx={{ marginTop: 1 }}>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="error"
                onClick={() => onRemoveEducationHistory(educationEntry.id)}
                sx={{ float: 'right' }}
              >
                Remove Entry
              </Button>
            </Grid>
          </Grid>
          <Divider sx={{ marginTop: 3, marginBottom: 3 }} />
        </div>
      ))}

      {/* Adding Educational Entry */}
      <Typography variant="h5" gutterBottom>
        Add Entry
      </Typography>
      {/* Row 1 */}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography>School Name</Typography>
          <CreatableSelect
            isClearable
            onChange={(newValue) => {
              if (newValue?.value) {
                setSchoolNameAddingValue(newValue.value);
              }
              if (newValue === null) {
                setSchoolNameAddingValue('');
              }
            }}
            options={schoolOptionTypes}
            placeholder={'Select a school or type your own'}
            value={{
              label: schoolNameAddingValue,
              value: schoolNameAddingValue,
            }}
          />
        </Grid>
      </Grid>
      {/* Row 2 */}
      <Grid container spacing={2} sx={{ marginTop: 1 }}>
        <Grid item xs={12} md={5}>
          <Typography>Date From</Typography>
          <TextField
            fullWidth
            type="date"
            value={dateFromAddingValue}
            onChange={(e) => setDateFromAddingValue(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} md={5}>
          <Typography>Date To</Typography>
          <TextField
            fullWidth
            type="date"
            value={dateToAddingValue}
            onChange={(e) => setDateToAddingValue(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <Typography>&nbsp;</Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={isCurrentAddingValue}
                onChange={(e) => setIsCurrentAddingValue(e.target.checked)}
              />
            }
            label="Currently Attending"
          />
        </Grid>
      </Grid>
      {/* Row 3 */}
      <Grid container spacing={2} sx={{ marginTop: 1 }}>
        <Grid item xs={12} md={6}>
          <Typography>Degree or Qualification</Typography>
          <Select
            isClearable
            onChange={(newValue) => {
              if (newValue?.value) {
                setDegreeQualificationSelectedValue(newValue.value);
              }
              if (newValue === null) {
                setDegreeQualificationSelectedValue('');
              }
            }}
            options={degreeOrQualificationTypes2}
            placeholder={'Select degree or qualification'}
            value={{
              label: degreeQualificationSelectedValue,
              value: degreeQualificationSelectedValue,
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography>Educational Level</Typography>
          <Select
            isClearable
            onChange={(newValue) => {
              if (newValue?.value) {
                setEducationalLevelSelectedValue(newValue.value);
              }
              if (newValue === null) {
                setEducationalLevelSelectedValue('');
              }
            }}
            options={educationalLevelTypes2}
            placeholder={'Select educational level'}
            value={{
              label: educationalLevelSelectedValue,
              value: educationalLevelSelectedValue,
            }}
          />
        </Grid>
      </Grid>
      {/* Row 4 */}
      <Grid container spacing={2} sx={{ marginTop: 1 }}>
        <Grid item xs={12} md={6}>
          <Typography>Field of Study</Typography>
          <CreatableSelect
            isClearable
            onChange={(newValue) => {
              if (newValue?.value) {
                setFieldOfStudyAddingValue(newValue.value);
              }
            }}
            onInputChange={(newValue) => {
              if (newValue?.value) {
                setFieldOfStudyAddingValue(newValue.value);
              }
            }}
            options={fieldOfStudyTypes}
            placeholder={'Select a field of study or type your own'}
            value={{
              label: fieldOfStudyAddingValue,
              value: fieldOfStudyAddingValue,
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography>Major (optional)</Typography>
          <TextField
            fullWidth
            placeholder="Software Development, Project Management"
            value={majorAddingValue}
            onChange={(e) => setMajorAddingValue(e.target.value)}
          />
        </Grid>
      </Grid>
      {/* Row 5 */}
      <Grid container spacing={2} sx={{ marginTop: 1 }}>
        <Grid item xs={12} md={6}>
          <Typography>Program Duration in Years</Typography>
          <TextField
            fullWidth
            type="number"
            placeholder="4, 5 years etc..."
            value={programDurationAddingValue}
            onChange={(e) => setProgramDurationAddingValue(e.target.value)}
          />
        </Grid>
      </Grid>
      {/* Add Educational Entry Button */}
      <Grid container spacing={2} sx={{ marginTop: 1 }}>
        <Grid item xs={12}>
          <Button variant='contained' color='primary' onClick={onAddEducationHistory}>
          Add Entry
          </Button>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button variant="contained" onClick={onClickPrevPage}>
              Back
            </Button>
            <Button variant="contained" color="primary" onClick={onClickNextPage}>
              Next
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default EducationalBackground;