import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
  Box,
  Typography,
  Grid,
  FormControlLabel,
  Checkbox,
  TextField,
  Button,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';

const LanguageDialectProficiency = ({ onClickNextPage, onClickPrevPage }) => {
  // State for English proficiency
  const [isCheckedEnglishRead, setCheckedEnglishRead] = useState(false);
  const [isCheckedEnglishWrite, setCheckedEnglishWrite] = useState(false);
  const [isCheckedEnglishSpeak, setCheckedEnglishSpeak] = useState(false);
  const [isCheckedEnglishUnderstand, setCheckedEnglishUnderstand] = useState(false);

  // State for Filipino proficiency
  const [isCheckedFilipinoRead, setCheckedFilipinoRead] = useState(false);
  const [isCheckedFilipinoWrite, setCheckedFilipinoWrite] = useState(false);
  const [isCheckedFilipinoSpeak, setCheckedFilipinoSpeak] = useState(false);
  const [isCheckedFilipinoUnderstand, setCheckedFilipinoUnderstand] = useState(false);

  // State for additional languages
  const [addedLanguages, setAddedLanguages] = useState([]);
  const [languageNameValue, setLanguageNameValue] = useState('');
  const [isCheckedOthersReadValue, setCheckedOthersReadValue] = useState(false);
  const [isCheckedOthersWriteValue, setCheckedOthersWriteValue] = useState(false);
  const [isCheckedOthersSpeakValue, setCheckedOthersSpeakValue] = useState(false);
  const [isCheckedOthersUnderstandValue, setCheckedOthersUnderstandValue] = useState(false);
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [languagesList, setLanguagesList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Add useEffect to load languages
  useEffect(() => {
    const loadLanguages = async () => {
      try {
        const response = await import('../../json/languages.json');
        const formattedLanguages = Object.entries(response).map(([code, name]) => ({
          code,
          name: name.toString()
        }));
        setLanguagesList(formattedLanguages);
      } catch (error) {
        console.error('Error loading languages:', error);
      }
    };
    loadLanguages();
  }, []);

  // Check if a language name is already added
  const isLangNameAdded = (langName) => {
    return addedLanguages.some((lang) => lang.languageNameValue === langName);
  };

  // Add a new language proficiency
  const onAddLanguageProficiency = () => {
    if (
      addedLanguages.length <= 10 &&
      languageNameValue !== '' &&
      !isLangNameAdded(languageNameValue)
    ) {
      setAddedLanguages([
        ...addedLanguages,
        {
          languageNameValue,
          isCheckedOthersReadValue,
          isCheckedOthersWriteValue,
          isCheckedOthersSpeakValue,
          isCheckedOthersUnderstandValue,
        },
      ]);
      setLanguageNameValue('');
      setCheckedOthersReadValue(false);
      setCheckedOthersWriteValue(false);
      setCheckedOthersSpeakValue(false);
      setCheckedOthersUnderstandValue(false);
    }
  };

  // Remove a language proficiency
  const onRemoveLanguageProficiency = (languageName) => {
    const updatedLanguages = addedLanguages.filter(
      (lang) => lang.languageNameValue !== languageName
    );
    setAddedLanguages(updatedLanguages);
  };

  // Handle form submission
  const onSubmit = () => {
    const englishProficiency = {
      isCheckedEnglishRead,
      isCheckedEnglishWrite,
      isCheckedEnglishSpeak,
      isCheckedEnglishUnderstand,
    };

    const filipinoProficiency = {
      isCheckedFilipinoRead,
      isCheckedFilipinoWrite,
      isCheckedFilipinoSpeak,
      isCheckedFilipinoUnderstand,
    };

    console.log('English Proficiency:', englishProficiency);
    console.log('Filipino Proficiency:', filipinoProficiency);
    console.log('Added Languages:', addedLanguages);
    onClickNextPage();
  };

  // Filter languages based on search term
  const filteredLanguages = languagesList.filter(lang =>
    lang.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLanguageSelect = (value) => {
    setLanguageNameValue(value);
    setSearchTerm('');
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Language Dialect Proficiency
      </Typography>

      {/* English Proficiency */}
      <Typography variant="h6" gutterBottom>
        English
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <FormControlLabel
            control={
              <Checkbox
                checked={isCheckedEnglishRead}
                onChange={(e) => setCheckedEnglishRead(e.target.checked)}
              />
            }
            label="Read"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isCheckedEnglishWrite}
                onChange={(e) => setCheckedEnglishWrite(e.target.checked)}
              />
            }
            label="Write"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isCheckedEnglishSpeak}
                onChange={(e) => setCheckedEnglishSpeak(e.target.checked)}
              />
            }
            label="Speak"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isCheckedEnglishUnderstand}
                onChange={(e) => setCheckedEnglishUnderstand(e.target.checked)}
              />
            }
            label="Understand"
          />
        </Grid>
      </Grid>

      {/* Filipino Proficiency */}
      <Typography variant="h6" gutterBottom sx={{ marginTop: 3 }}>
        Filipino
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <FormControlLabel
            control={
              <Checkbox
                checked={isCheckedFilipinoRead}
                onChange={(e) => setCheckedFilipinoRead(e.target.checked)}
              />
            }
            label="Read"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isCheckedFilipinoWrite}
                onChange={(e) => setCheckedFilipinoWrite(e.target.checked)}
              />
            }
            label="Write"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isCheckedFilipinoSpeak}
                onChange={(e) => setCheckedFilipinoSpeak(e.target.checked)}
              />
            }
            label="Speak"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isCheckedFilipinoUnderstand}
                onChange={(e) => setCheckedFilipinoUnderstand(e.target.checked)}
              />
            }
            label="Understand"
          />
        </Grid>
      </Grid>

      {/* Added Languages */}
      <Typography variant="h6" gutterBottom sx={{ marginTop: 3 }}>
        Added Languages
      </Typography>
      <Grid container spacing={2}>
        {addedLanguages.map((lang, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Box sx={{ border: '1px solid #ccc', padding: 2, borderRadius: 1 }}>
              <Typography variant="subtitle1" gutterBottom>
                {lang.languageNameValue}
              </Typography>
              <FormControlLabel
                control={<Checkbox checked={lang.isCheckedOthersReadValue} disabled />}
                label="Read"
              />
              <FormControlLabel
                control={<Checkbox checked={lang.isCheckedOthersWriteValue} disabled />}
                label="Write"
              />
              <FormControlLabel
                control={<Checkbox checked={lang.isCheckedOthersSpeakValue} disabled />}
                label="Speak"
              />
              <FormControlLabel
                control={<Checkbox checked={lang.isCheckedOthersUnderstandValue} disabled />}
                label="Understand"
              />
              <Button
                variant="contained"
                color="error"
                onClick={() => onRemoveLanguageProficiency(lang.languageNameValue)}
                sx={{ marginTop: 1 }}
              >
                Remove
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Add New Language - Modified section */}
      <Typography variant="h6" gutterBottom sx={{ marginTop: 3 }}>
        Add Other Languages
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          {/* Language Search Field - Now outside the conditional rendering */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="Search Language"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <Box sx={{ 
                maxHeight: '200px', 
                overflowY: 'auto',
                border: '1px solid #ccc',
                borderRadius: 1,
                position: 'absolute',
                top: '100%',
                width: '100%',
                backgroundColor: 'white',
                zIndex: 1000
              }}>
                {filteredLanguages.map((lang) => (
                  <MenuItem 
                    key={lang.code} 
                    value={lang.name}
                    onClick={() => handleLanguageSelect(lang.name)}
                  >
                    {lang.name}
                  </MenuItem>
                ))}
              </Box>
            )}
          </FormControl>

          <TextField
            fullWidth
            label="Or Type Custom Language"
            value={languageNameValue}
            onChange={(e) => setLanguageNameValue(e.target.value)}
            sx={{ mb: 2 }}
          />

          {/* Checkboxes moved after the text fields */}
          <FormControlLabel
            control={
              <Checkbox
                checked={isCheckedOthersReadValue}
                onChange={(e) => setCheckedOthersReadValue(e.target.checked)}
              />
            }
            label="Read"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isCheckedOthersWriteValue}
                onChange={(e) => setCheckedOthersWriteValue(e.target.checked)}
              />
            }
            label="Write"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isCheckedOthersSpeakValue}
                onChange={(e) => setCheckedOthersSpeakValue(e.target.checked)}
              />
            }
            label="Speak"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isCheckedOthersUnderstandValue}
                onChange={(e) => setCheckedOthersUnderstandValue(e.target.checked)}
              />
            }
            label="Understand"
          />

          {/* Add button - Now requires both language and at least one checkbox */}
          <Button
            variant="contained"
            onClick={onAddLanguageProficiency}
            disabled={!languageNameValue || !(
              isCheckedOthersReadValue ||
              isCheckedOthersWriteValue ||
              isCheckedOthersSpeakValue ||
              isCheckedOthersUnderstandValue
            )}
            sx={{ mt: 2 }}
          >
            Add Language
          </Button>
        </Grid>
      </Grid>

      {/* Submit Button */}
      <Box sx={{ marginTop: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" sx={{ mr: 2 }} onClick={onClickPrevPage}>
          Back
        </Button>
        <Button variant="contained" color="primary" onClick={onSubmit}>
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default LanguageDialectProficiency;