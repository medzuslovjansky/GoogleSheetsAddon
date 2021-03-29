import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
  FormControl,
  IconButton,
  Input,
  InputAdornment, InputLabel,
  ListItemSecondaryAction,
  makeStyles,
  TextField,
  Typography
} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  AddCircle,
  ExpandMore,
  LocationSearchingOutlined,
  Mood,
  MoodBad,
} from '@material-ui/icons';
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
}));

const TranslationsSection = () => {
  const styles = useStyles();

  return (
    <Accordion className={styles.section}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="body2">Translations</Typography>
      </AccordionSummary>
      <AccordionDetails className={styles.accordionDetails}>
        <Chip variant="outlined" label="глаз" icon={<MoodBad />} />
        <Chip variant="outlined" label="око (устар.)" icon={<Mood />} />
        <IconButton edge="end" aria-label="add">
          <AddCircle />
        </IconButton>
        <FormControl className={styles.formControl}>
          <InputLabel>Translation</InputLabel>
          <Input />
        </FormControl>
        <Autocomplete
          multiple
          options={['арх.', 'тех.', 'устар.']}
          freeSolo
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                variant="outlined"
                label={option}
                key={`tag${index}`}
                {...getTagProps({ index })}
              />
            ))
          }
          renderInput={params => (
            <TextField {...params} variant="standard" label="Annotations" />
          )}
          className={styles.line}
        />
      </AccordionDetails>
    </Accordion>
  );
};

// <InputLabel htmlFor="input-with-icon-adornment">With a start adornment</InputLabel>

export default TranslationsSection;
