import { Fab } from '@mui/material';
import { Settings } from '@mui/icons-material';
import React from 'react';

const PreferencesFAB = () => {
  return (
    <Fab
      color="primary"
      sx={{
        position: 'fixed',
        bottom: '1em',
        right: '1em',
      }}
      aria-label="settings"
    >
      <Settings />
    </Fab>
  );
};

export default PreferencesFAB;
