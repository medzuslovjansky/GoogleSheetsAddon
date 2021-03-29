import { Button, ButtonGroup, Container, TextField } from '@material-ui/core';
import {
  FastForward,
  FastRewind,
  SkipNext,
  SkipPrevious,
} from '@material-ui/icons';
import React from 'react';

const RowNavigation = () => {
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

export default RowNavigation;
