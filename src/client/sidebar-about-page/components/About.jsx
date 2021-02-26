import React from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Link,
  TextField,
} from '@material-ui/core';
import {
  SkipPrevious,
  FastRewind,
  SkipNext,
  FastForward,
} from '@material-ui/icons';

const About = () => (
  <Box>
    <Navigation />
    <p>
      <b>☀️ React app inside a sidebar! ☀️</b>
    </p>
    <p>
      This is a very simple page demonstrating how to build a React app inside a
      sidebar.
    </p>
    <p>
      Visit the Github repo for more information on how to use this project.
    </p>
    <p>
      <Button variant="contained" color="primary" onClick={() => alert('Test')}>
        Elisha Nuchi
      </Button>
    </p>
    <Link
      href="https://www.github.com/enuchi/React-Google-Apps-Script"
      target="_blank"
      rel="noopener noreferrer"
    >
      React + Google Apps Script
    </Link>
  </Box>
);

const Navigation = () => {
  return (
    <Container>
      <ButtonGroup size="small" aria-label="small outlined button group">
        <Button>
          <SkipPrevious />
        </Button>
        <Button>
          <FastRewind />
        </Button>
        <TextField size="small" label="ID" variant="outlined" />
        <Button>
          <FastForward />
        </Button>
        <Button>
          <SkipNext />
        </Button>
      </ButtonGroup>
    </Container>
  );
};

export default About;
