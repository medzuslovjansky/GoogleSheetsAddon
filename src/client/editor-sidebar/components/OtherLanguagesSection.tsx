import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { ExpandMore, LocationSearchingOutlined } from '@material-ui/icons';
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
  automaticTranslation: {
    color: 'red',
  },
}));

const Translation = ({ automatic = false, lang, text }) => {
  const styles = useStyles();

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <Typography>{lang}</Typography>
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={text || "N/A"}
        className={automatic && styles.automaticTranslation}
      />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="locate">
          <LocationSearchingOutlined />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

const OtherLanguagesSection = () => {
  const styles = useStyles();

  return (
    <Accordion className={styles.section}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="body2">In other languages</Typography>
      </AccordionSummary>
      <AccordionDetails className={styles.accordionDetails}>
        <List dense={true}>
          <Translation lang="en" text="eye" />
          <Translation lang="ru" text="глаз, око (устар.)" />
          <Translation lang="be" automatic text="вачэй, вока (устар.)" />
          <Translation lang="uk" text="око" />
          <Translation lang="pl" text="oko" />
          <Translation lang="cs" text="oko" />
          <Translation lang="sk" text="oko" />
          <Translation lang="bg" automatic text="очите" />
          <Translation lang="mk" text="око" />
          <Translation lang="sr" text="око" />
          <Translation lang="hr" automatic text="oko" />
          <Translation lang="sl" automatic text="oko" />
          <Translation lang="cu" automatic text="" />
          <Translation lang="de" text="Auge" />
          <Translation lang="nl" text="oog" />
          <Translation lang="eo" automatic text="okulo" />
        </List>
      </AccordionDetails>
    </Accordion>
  );
};

export default OtherLanguagesSection;
