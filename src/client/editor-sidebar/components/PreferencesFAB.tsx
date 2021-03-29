import { Fab, makeStyles } from '@material-ui/core';
import { Settings } from '@material-ui/icons';
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

const PreferencesFAB = () => {
  const styles = useStyles();

  return (
    <Fab color="primary" className={styles.fab} aria-label="settings">
      <Settings />
    </Fab>
  );
};

export default PreferencesFAB;
