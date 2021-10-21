import React, { useContext } from 'react';
import { Box } from '@mui/material';
import RecordNavigation from '../common/components/RecordNavigation';
import SheetsPositionContext from '../common/contexts/SheetsPositionContext';

const RulesSidebar = () => {
  const sheetsPosition = useContext(SheetsPositionContext);

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <RecordNavigation
        currentIndex={sheetsPosition.position.range?.rowIndex}
        goFirst={sheetsPosition.navigate.first}
        goPrevious={sheetsPosition.navigate.previous}
        goIndex={sheetsPosition.navigate.index}
        goNext={sheetsPosition.navigate.next}
        goLast={sheetsPosition.navigate.last}
      />
    </Box>
  );
};

export default RulesSidebar;
