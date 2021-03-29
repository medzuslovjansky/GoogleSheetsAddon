import { Card, CardContent, makeStyles, Typography } from '@material-ui/core';
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

const SourceSection = () => {
  const styles = useStyles();
  return (
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
  );
};

export default SourceSection;
