import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  ButtonGroup,
  Container,
  TextField,
  makeStyles,
  CardContent,
  Typography,
  FormControlLabel,
  Checkbox,
  Fab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListItemIcon,
  Slider,
} from '@material-ui/core';
import {
  SkipPrevious,
  FastRewind,
  SkipNext,
  FastForward,
  ExpandMore,
  Settings,
  Mood,
  MoodBad,
  HelpOutline,
} from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  section: {
    marginTop: '1em',
  },
  accordionDetails: {
    flexWrap: 'wrap',
  },
  formControl: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: '100%',
  },
  line: {
    width: '100%',
  },
  select: {
    display: 'flex',
    alignItems: 'center',
  },
  fab: {
    position: 'fixed',
    bottom: '1em',
    right: '1em',
  },
}));

const About = () => {
  const styles = useStyles();

  return (
    <Box>
      <Navigation />
      <Card className={styles.section}>
        <CardContent>
          <Typography variant="h6" component="h2">
            oko
          </Typography>
          <Typography variant="body2" gutterBottom color="textSecondary">
            noun <i>(neuter)</i>
          </Typography>
        </CardContent>
      </Card>
      <Accordion className={styles.section}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="body2">Intelligibility</Typography>
        </AccordionSummary>
        <AccordionDetails className={styles.accordionDetails}>
          <FormControlLabel
            className={styles.line}
            control={
              <Checkbox
                checked={true}
                onChange={() => {}}
                name="verified"
                color="primary"
              />
            }
            label="Verified"
          />
          <FormControl variant="outlined" className={styles.formControl}>
            <Select
              classes={{ select: styles.select }}
              value={'-'}
              displayEmpty
              onChange={() => {}}
            >
              <MenuItem value="">
                <ListItemIcon>
                  <HelpOutline />
                </ListItemIcon>
                <em>Unknown</em>
              </MenuItem>
              <MenuItem value={'-'}>
                <ListItemIcon>
                  <MoodBad />
                </ListItemIcon>
                Non-intelligible
              </MenuItem>
              <MenuItem value={'+'}>
                <ListItemIcon>
                  <Mood />
                </ListItemIcon>
                Intelligible
              </MenuItem>
            </Select>
          </FormControl>
          <Typography variant="body2" gutterBottom>Closest match</Typography>
          <Slider
            value={[80, 100]}
            min={0}
            max={100}
            step={null}
            marks={[{ label: '95%', value: 95 }]}
            valueLabelDisplay="auto"
            valueLabelFormat={x => `${x}%`}
            aria-labelledby="range-slider"
          />
        </AccordionDetails>
      </Accordion>
      <Fab color="primary" className={styles.fab} aria-label="settings">
        <Settings />
      </Fab>
    </Box>
  );
};

const Navigation = () => {
  return (
    <Container>
      <ButtonGroup aria-label="small outlined button group">
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

// <p>
//   <b>☀️ React app inside a sidebar! ☀️</b>
// </p>
// <p>
//   This is a very simple page demonstrating how to build a React app inside a
//   sidebar.
// </p>
// <p>
//   Visit the Github repo for more information on how to use this project.
// </p>
// <p>
//   <Button variant="contained" color="primary" onClick={() => alert('Test')}>
//     Elisha Nuchi
//   </Button>
// </p>
// <Link
//   href="https://www.github.com/enuchi/React-Google-Apps-Script"
//   target="_blank"
//   rel="noopener noreferrer"
// >
//   React + Google Apps Script
// </Link>
