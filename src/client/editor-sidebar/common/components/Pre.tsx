import React from 'react';
import { Box } from '@mui/material';

function Pre({ children }) {
  return (
    <Box p={1} sx={{ whiteSpace: 'pre-wrap' }} fontFamily="Monospace">
      {children}
    </Box>
  );
}

export default React.memo(Pre);
