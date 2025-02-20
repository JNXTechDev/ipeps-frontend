import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  AppBar,
  Toolbar,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Grid,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Divider,
} from '@mui/material';
import Header from './Header';
import PostedScholarship from './PostedScholarship';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatSizeIcon from '@mui/icons-material/FormatSize';
import { CloudUpload, Close as CloseIcon } from '@mui/icons-material';




const ScholarshipPosting = ({ open, onClose, company, isCollapsed }) => { // Remove onFormatChange from props
    const [fontSize, setFontSize] = useState(16);
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const [scholarshipname, setScholarshipName] = useState("");
    const [scholarshipdescription, setScholarshipDescription] = useState("");
    const [scholarshipdata, ScholarshipData] = useState("");
    const [images, setImages] = useState([]);
    const maxImages = 3;
    const headerHeight = '72px';

    // Modified handleFormatChange to update state directly
    const handleFormatChange = (style) => {
        switch(style) {
            case 'bold':
                setIsBold(!isBold);
                break;
            case 'italic':
                setIsItalic(!isItalic);
                break;
            case 'underline':
                setIsUnderline(!isUnderline);
                break;
            default:
                break;
        }
    };

    const handleDescriptionChange = (event) => {
        setScholarshipDescription(event.target.innerHTML);
      };
    
    const handleSubmit = () => {
      const scholarshipdata = {
        scholarshipname, scholarshipdescription
      };
      console.log("Scholarship Name:", scholarshipdata); // Log the job data
      onClose(); // Close the modal after submission
    };

    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        if (images.length + files.length > maxImages) {
            alert(`You can only upload up to ${maxImages} images`);
            return;
        }

        const newImages = files.map(file => ({
            url: URL.createObjectURL(file),
            file: file
        }));

        setImages(prev => [...prev, ...newImages]);
    };

    const handleRemoveImage = (indexToRemove) => {
        setImages(prev => prev.filter((_, index) => index !== indexToRemove));
    };

  return (
    <Box>
      <Header isCollapsed={isCollapsed} /> // Pass the prop
    

      {/* Main content container */}
      <Box 
        sx={{ 
          display: 'flex',
          position: 'fixed',
          top: headerHeight,
          left: isCollapsed ? '80px' : '250px',
          right: 0,
          bottom: 0,
          transition: 'left 0.3s',
          backgroundColor: 'white',
        }}
      >
        {/* Create Post Panel */}
        <Box 
          sx={{ 
            width: '60%',
            height: '100%',
            overflowY: 'auto',
            p: 3,
            borderRight: '1px solid rgba(0, 0, 0, 0.12)',
          }}
        >   <Box>
        
  
        {/* Form Section */}
        <Grid container spacing={2} sx={{ p: 3 }}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Create Scholarship Post
            </Typography>
          </Grid>

          {/* Image Upload Section - Moved to top */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Upload Images (Max 3)
            </Typography>
            <Box sx={{ mb: 2 }}>
              <input
                accept="image/*"
                type="file"
                id="image-upload"
                multiple
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
              <label htmlFor="image-upload">
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<CloudUpload />}
                  disabled={images.length >= maxImages}
                >
                  Upload Images
                </Button>
              </label>
            </Box>
            
            {/* Image Preview */}
            <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
              {images.map((image, index) => (
                <Box
                  key={index}
                  sx={{
                    position: 'relative',
                    width: 100,
                    height: 100,
                  }}
                >
                  <img
                    src={image.url}
                    alt={`Preview ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '4px',
                    }}
                  />
                  <IconButton
                    size="small"
                    onClick={() => handleRemoveImage(index)}
                    sx={{
                      position: 'absolute',
                      top: -10,
                      right: -10,
                      backgroundColor: 'white',
                      boxShadow: '0 0 5px rgba(0,0,0,0.2)',
                      '&:hover': {
                        backgroundColor: '#f5f5f5',
                      },
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}
            </Box>
          </Grid>
  
          {/* Training Name Input */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Scholarship Name
            </Typography>
            <input
              type="text"
              placeholder="Enter Scholarship Name"
              value={scholarshipname}
              onChange={(e) => setScholarshipName(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '16px',
                border: '1px solid #ccc',
                borderRadius: '5px',
              }}
            />
          </Grid>

          {/* Formatting Toolbar - Moved between title and description */}
          <Grid item xs={12}>
            <AppBar position="static" color="default" sx={{ mb: 2 }}>
              <Toolbar>
                <Typography variant="body1" sx={{ mr: 2 }}>Font Size:</Typography>
                <Select
                  value={fontSize}
                  onChange={(e) => setFontSize(e.target.value)}
                  startAdornment={<FormatSizeIcon sx={{ mr: 1 }} />}
                >
                  {[12, 14, 16, 18, 20, 24, 28, 32, 36].map((size) => (
                    <MenuItem key={size} value={size}>{size}px</MenuItem>
                  ))}
                </Select>
      
                <IconButton onClick={() => handleFormatChange('bold')} color={isBold ? "primary" : "default"}>
                  <FormatBoldIcon />
                </IconButton>
                <IconButton onClick={() => handleFormatChange('italic')} color={isItalic ? "primary" : "default"}>
                  <FormatItalicIcon />
                </IconButton>
                <IconButton onClick={() => handleFormatChange('underline')} color={isUnderline ? "primary" : "default"}>
                  <FormatUnderlinedIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
          </Grid>
  
          {/* Scholarship Description */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Description
            </Typography>
            <Box
              sx={{
                border: '1px solid #ccc',
                borderRadius: '4px',
                overflow: 'hidden'
              }}
            >
              {/* Description Editor */}
              <div
                contentEditable
                onInput={handleDescriptionChange}
                placeholder="Enter Scholarship Description"
                style={{
                  width: '100%',
                  minHeight: '200px',
                  padding: '16px',
                  fontSize: `${fontSize}px`,
                  fontWeight: isBold ? 'bold' : 'normal',
                  fontStyle: isItalic ? 'italic' : 'normal',
                  textDecoration: isUnderline ? 'underline' : 'none',
                  outline: 'none',
                  '&:empty:before': {
                    content: 'attr(placeholder)',
                    color: '#aaa'
                  }
                }}
              />
            </Box>
            <Typography variant="caption" color="textSecondary">
              Use the toolbar above to format your description. Include training objectives, requirements, and what participants will learn.
            </Typography>
          </Grid>
        </Grid>
  
        {/*buttons area*/}

          <Divider />
   
      
        <Box display="flex" justifyContent="flex-end" mt={2}>
        {/*  <Button onClick={onClose} sx={{ ml: 0, mt: 2 , backgroundColor: 'red', color: 'white'}}>Cancel</Button> */}
          <Button onClick={handleSubmit} variant="contained" sx={{ ml: 'auto', mt: 2 , backgroundColor: 'blue'}}>
            Create Scholarship Post
          </Button>
          
          </Box>

        </Box>


      </Box>
                 {/* Posted Scholarship Panel */}
                 <Box 
                sx={{ 
                  width: '40%',
                  height: '100%',
                  overflowY: 'auto',
                  backgroundColor: 'white',
                }}
              >
               <PostedScholarship    />  

              </Box>
   
      </Box>
   

    </Box>
  );
};

export default ScholarshipPosting;
