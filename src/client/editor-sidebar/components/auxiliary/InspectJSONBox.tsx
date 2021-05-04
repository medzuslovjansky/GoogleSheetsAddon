import React from 'react';
import { Card } from '@material-ui/core';
import Pre from './Pre';

export default function InspectJSONBox({ contents }) {
  return (
    <Card variant="outlined">
      <Pre>{JSON.stringify(contents, null, 2)}</Pre>
    </Card>
  );
}
