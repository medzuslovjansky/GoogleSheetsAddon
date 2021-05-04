import { Box, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(theme => ({
  style: {
    padding: theme.spacing(1),
    whiteSpace: 'pre-wrap',
  },
}));

function Pre({ children }) {
  const { style } = useStyles();

  return (
    <Box className={style} fontFamily="Monospace">
      {children}
    </Box>
  );
}

export default React.memo(Pre);
