import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Divider,
  Paper,
  Stack,
  IconButton,
  Avatar
} from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'; // Unselected state
import BookmarkIcon from '@mui/icons-material/Bookmark'; // Selected state
import { useTheme } from '@mui/material';

const sampleJobs = [
  {
    id: 1,
    company: 'Google',
    title: 'Software Engineer',
    location: 'Mountain View, CA',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
  },
  {
    id: 2,
    company: 'Microsoft',
    title: 'Frontend Developer',
    location: 'Redmond, WA',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
  },
  {
    id: 3,
    company: 'Amazon',
    title: 'Data Scientist',
    location: 'Seattle, WA',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
  },
];

const PostedScholarship = () => {
  const [bookmarked, setBookmarked] = useState({});
  
  const handleBookmark = (id) => {
    setBookmarked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Box sx={{ height: '100%', position: 'relative' }}>



      <Box sx={{ height: '100%', overflowY: 'auto', p: 3 }}>

      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold'}}>Scholarship Posted</Typography>
        {sampleJobs.map((job) => (

          <Paper key={job.id} sx={{ p: 2, display: 'flex', alignItems: 'center', mb: 2 }}> 

            <Avatar src={job.logo} alt={job.company} sx={{ width: 56, height: 56, mr: 2 }} />
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6">{job.title}</Typography>
              <Typography variant="body2" color="text.secondary">{job.company} - {job.location}</Typography>
            </Box>
            <IconButton onClick={() => handleBookmark(job.id)}>
              {bookmarked[job.id] ? <BookmarkIcon color="primary" /> : <BookmarkBorderIcon />}
            </IconButton>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default PostedScholarship;
