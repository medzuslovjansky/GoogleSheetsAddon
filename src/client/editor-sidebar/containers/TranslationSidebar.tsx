import React, { useContext } from 'react';
import { Box } from '@material-ui/core';
import RecordNavigation from '../components/RecordNavigation';
import SourceSection from '../components/SourceSection';
import SheetsPositionContext from '../contexts/SheetsPositionContext';

const TranslationSidebar = () => {
  const sheetsPosition = useContext(SheetsPositionContext);

  return (
    <Box>
      <RecordNavigation
        currentIndex={sheetsPosition.position.range?.rowIndex}
        goFirst={sheetsPosition.navigate.first}
        goPrevious={sheetsPosition.navigate.previous}
        goIndex={sheetsPosition.navigate.index}
        goNext={sheetsPosition.navigate.next}
        goLast={sheetsPosition.navigate.last}
      />
      <SourceSection
        lemma={sheetsPosition.position.isv?.lemma}
        partOfSpeech={sheetsPosition.position.isv?.partOfSpeech}
      />
    </Box>
  );
};

export default TranslationSidebar;
