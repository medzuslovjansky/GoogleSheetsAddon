import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  FormControl,
  FormControlLabel,
  ListItemIcon,
  makeStyles,
  MenuItem,
  Select,
  Slider,
  Typography,
} from '@material-ui/core';
import { ExpandMore, HelpOutline, Mood, MoodBad } from '@material-ui/icons';
import React from 'react';

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

const IntelligibilitySection = () => {
  const styles = useStyles();

  return (
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
        <Typography variant="body2" gutterBottom>
          Closest match
        </Typography>
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
  );
};

export default IntelligibilitySection;
