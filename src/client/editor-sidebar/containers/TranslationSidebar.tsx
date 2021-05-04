import React, { useContext } from 'react';
import { Box, makeStyles } from '@material-ui/core';
import RecordNavigation from '../components/widgets/RecordNavigation';
import SourceSection from '../components/sections/SourceSection';
import SheetsPositionContext from '../contexts/SheetsPositionContext';
import OtherLanguagesSection from '../components/sections/otherLanguages';

const useStyles = makeStyles({
  container: {
    minHeight: '100vh',
  },
});

const TranslationSidebar = () => {
  const sheetsPosition = useContext(SheetsPositionContext);
  const styles = useStyles();

  return (
    <Box className={styles.container}>
      <RecordNavigation
        currentIndex={sheetsPosition.position.range?.rowIndex}
        goFirst={sheetsPosition.navigate.first}
        goPrevious={sheetsPosition.navigate.previous}
        goIndex={sheetsPosition.navigate.index}
        goNext={sheetsPosition.navigate.next}
        goLast={sheetsPosition.navigate.last}
      />
      <SourceSection record={sheetsPosition.position.isv} />
      <OtherLanguagesSection record={sheetsPosition.position.isv} />
    </Box>
  );
};

export default TranslationSidebar;
