import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import { v4 as uuidv4 } from "uuid";
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
} from "@mui/material";

// JSON Data Imports
import schools from "../../json/schools.json";

const schoolOptionTypes = schools.schools.map((school) => ({
  value: school.value,
  label: school.label,
}));

const degreeOrQualificationTypes2 = [
  { value: "Associate Degree", label: "Associate Degree" },
  { value: "Bachelor's Degree", label: "Bachelor's Degree" },
  { value: "Master's Degree", label: "Master's Degree" },
  { value: "Doctorate/PhD", label: "Doctorate/PhD" },
  { value: "Diploma", label: "Diploma" },
  { value: "Certificate", label: "Certificate" },
  { value: "Professional License", label: "Professional License" },
  { value: "Vocational", label: "Vocational" },
  { value: "Technical", label: "Technical" },
];

const educationalLevelTypes2 = [
  { value: "Undergraduate", label: "Undergraduate" },
  { value: "Graduate", label: "Graduate" },
  { value: "Postgraduate", label: "Postgraduate" },
];

const fieldOfStudyTypes = [
  { value: "Accounting", label: "Accounting" },
  { value: "Agriculture", label: "Agriculture" },
  { value: "Architecture", label: "Architecture" },
  { value: "Arts and Design", label: "Arts and Design" },
  { value: "Biology", label: "Biology" },
  { value: "Business Administration", label: "Business Administration" },
  { value: "Chemistry", label: "Chemistry" },
  { value: "Civil Engineering", label: "Civil Engineering" },
  { value: "Computer Engineering", label: "Computer Engineering" },
  { value: "Computer Science", label: "Computer Science" },
  { value: "Criminal Justice", label: "Criminal Justice" },
  { value: "Dentistry", label: "Dentistry" },
  { value: "Economics", label: "Economics" },
  { value: "Education", label: "Education" },
  { value: "Electrical Engineering", label: "Electrical Engineering" },
  { value: "Electronics Engineering", label: "Electronics Engineering" },
  { value: "Environmental Science", label: "Environmental Science" },
  { value: "Finance", label: "Finance" },
  { value: "Fine Arts", label: "Fine Arts" },
  { value: "Food Technology", label: "Food Technology" },
  { value: "Forestry", label: "Forestry" },
  { value: "Hotel and Restaurant Management", label: "Hotel and Restaurant Management" },
  { value: "Human Resource Management", label: "Human Resource Management" },
  { value: "Industrial Engineering", label: "Industrial Engineering" },
  { value: "Information Technology", label: "Information Technology" },
  { value: "Journalism", label: "Journalism" },
  { value: "Law", label: "Law" },
  { value: "Liberal Arts", label: "Liberal Arts" },
  { value: "Literature", label: "Literature" },
  { value: "Management", label: "Management" },
  { value: "Marine Engineering", label: "Marine Engineering" },
  { value: "Marketing", label: "Marketing" },
  { value: "Mathematics", label: "Mathematics" },
  { value: "Mechanical Engineering", label: "Mechanical Engineering" },
  { value: "Medical Technology", label: "Medical Technology" },
  { value: "Medicine", label: "Medicine" },
  { value: "Mining Engineering", label: "Mining Engineering" },
  { value: "Music", label: "Music" },
  { value: "Nursing", label: "Nursing" },
  { value: "Nutrition and Dietetics", label: "Nutrition and Dietetics" },
  { value: "Occupational Therapy", label: "Occupational Therapy" },
  { value: "Pharmacy", label: "Pharmacy" },
  { value: "Philosophy", label: "Philosophy" },
  { value: "Physical Therapy", label: "Physical Therapy" },
  { value: "Physics", label: "Physics" },
  { value: "Political Science", label: "Political Science" },
  { value: "Psychology", label: "Psychology" },
  { value: "Public Administration", label: "Public Administration" },
  { value: "Public Health", label: "Public Health" },
  { value: "Radiologic Technology", label: "Radiologic Technology" },
  { value: "Real Estate Management", label: "Real Estate Management" },
  { value: "Social Work", label: "Social Work" },
  { value: "Sociology", label: "Sociology" },
  { value: "Statistics", label: "Statistics" },
  { value: "Tourism Management", label: "Tourism Management" },
  { value: "Veterinary Medicine", label: "Veterinary Medicine" },
];

const EducationalBackground = ({ onClickNextPage, onClickPrevPage }) => {
  const [educationHistory, setEducationHistory] = useState([]);
  const [schoolNameAddingValue, setSchoolNameAddingValue] = useState("");
  const [degreeQualificationSelectedValue, setDegreeQualificationSelectedValue] = useState("");
  const [dateFromAddingValue, setDateFromAddingValue] = useState("");
  const [dateToAddingValue, setDateToAddingValue] = useState("");
  const [isCurrentAddingValue, setIsCurrentAddingValue] = useState(false);
  const [educationalLevelSelectedValue, setEducationalLevelSelectedValue] = useState("");
  const [fieldOfStudyAddingValue, setFieldOfStudyAddingValue] = useState("");
  const [majorAddingValue, setMajorAddingValue] = useState("");
  const [programDurationAddingValue, setProgramDurationAddingValue] = useState("");

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
      setSchoolNameAddingValue("");
      setDegreeQualificationSelectedValue("");
      setDateFromAddingValue("");
      setDateToAddingValue("");
      setIsCurrentAddingValue(false);
      setEducationalLevelSelectedValue("");
      setFieldOfStudyAddingValue("");
      setMajorAddingValue("");
      setProgramDurationAddingValue("");
    }
  };

  const onRemoveEducationHistory = (id) => {
    if (id !== "") {
      const index = educationHistory.findIndex((p) => p.id === id);
      if (index > -1) {
        const newEducationHistory = [...educationHistory];
        newEducationHistory.splice(index, 1);
        setEducationHistory(newEducationHistory);
      }
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      {/* Title */}
      <Typography variant="h6" gutterBottom>
        Educational Background
      </Typography>

      {/* Display Existing Education History */}
      {educationHistory.map((educationEntry) => (
        <Paper key={educationEntry.id} sx={{ padding: 2, marginBottom: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle1">{educationEntry.schoolName}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">
                {educationEntry.dateFrom} - {educationEntry.isCurrent ? "Present" : educationEntry.dateTo}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">{educationEntry.degreeQualification}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">{educationEntry.fieldOfStudy}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">Duration: {educationEntry.programDuration} years</Typography>
            </Grid>
          </Grid>
          <Button
            onClick={() => onRemoveEducationHistory(educationEntry.id)}
            sx={{ float: "right", marginTop: 2 }}
          >
            Remove Entry
          </Button>
        </Paper>
      ))}

      {/* Add New Educational Entry */}
      <Typography variant="h6" gutterBottom>
        Add Entry
      </Typography>
      <Grid container spacing={2}>
        {/* School Name */}
        <Grid item xs={12}>
          <CreatableSelect
            onChange={(newValue) => {
              if (newValue?.value) {
                setSchoolNameAddingValue(newValue.value);
              }
              if (newValue === null) {
                setSchoolNameAddingValue("");
              }
            }}
            options={schoolOptionTypes}
            placeholder={"Select a school or type your own"}
            value={{
              label: schoolNameAddingValue,
              value: schoolNameAddingValue,
            }}
          />
        </Grid>

        {/* Date From and Date To */}
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Date From"
            type="date"
            value={dateFromAddingValue}
            onChange={(e) => setDateFromAddingValue(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Date To"
            type="date"
            value={dateToAddingValue}
            onChange={(e) => setDateToAddingValue(e.target.value)}
            InputLabelProps={{ shrink: true }}
            disabled={isCurrentAddingValue}
          />
        </Grid>

        {/* Currently Attending */}
        <Grid item xs={12}>
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

        {/* Degree or Qualification */}
        <Grid item xs={12}>
          <Select
            onChange={(newValue) => {
              if (newValue?.value) {
                setDegreeQualificationSelectedValue(newValue.value);
              }
              if (newValue === null) {
                setDegreeQualificationSelectedValue("");
              }
            }}
            options={degreeOrQualificationTypes2}
            placeholder={"Select degree or qualification"}
            value={{
              label: degreeQualificationSelectedValue,
              value: degreeQualificationSelectedValue,
            }}
          />
        </Grid>

        {/* Educational Level */}
        <Grid item xs={12}>
          <Select
            onChange={(newValue) => {
              if (newValue?.value) {
                setEducationalLevelSelectedValue(newValue.value);
              }
              if (newValue === null) {
                setEducationalLevelSelectedValue("");
              }
            }}
            options={educationalLevelTypes2}
            placeholder={"Select educational level"}
            value={{
              label: educationalLevelSelectedValue,
              value: educationalLevelSelectedValue,
            }}
          />
        </Grid>

        {/* Field of Study */}
        <Grid item xs={12}>
          <CreatableSelect
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
            placeholder={"Select a field of study or type your own"}
            value={{
              label: fieldOfStudyAddingValue,
              value: fieldOfStudyAddingValue,
            }}
          />
        </Grid>

        {/* Major */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Major (optional)"
            value={majorAddingValue}
            onChange={(e) => setMajorAddingValue(e.target.value)}
          />
        </Grid>

        {/* Program Duration */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Program Duration in Years"
            type="number"
            value={programDurationAddingValue}
            onChange={(e) => setProgramDurationAddingValue(e.target.value)}
          />
        </Grid>
      </Grid>

      {/* Buttons */}
      <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
        <Button variant="contained" onClick={onClickPrevPage}>
          Back
        </Button>
        <Button variant="contained" onClick={onAddEducationHistory}>
          Add Entry
        </Button>
        <Button variant="contained" onClick={onClickNextPage}>
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default EducationalBackground;
