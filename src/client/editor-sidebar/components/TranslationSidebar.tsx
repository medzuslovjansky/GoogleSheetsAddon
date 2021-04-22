import React, { useCallback } from 'react';
import { Box, makeStyles } from '@material-ui/core';
import useSheets from '../hooks/useSheets';
import server from '../../utils/server';

// import RowNavigation from './RowNavigation';
// import SourceSection from './SourceSection';
// import IntelligibilitySection from './IntelligibilitySection';
// import PreferencesFAB from './PreferencesFAB';
// import OtherLanguagesSection from './OtherLanguagesSection';
// import TranslationsSection from './TranslationsSection';

const { serverFunctions } = server;
const useStyles = makeStyles(() => ({}));

const getSheetType = (name: string | undefined) => {
  if (!name) {
    return null;
  }

  if (name.startsWith('Translations ')) {
    return 'translation';
  }

  if (name.startsWith('Vocabulary ')) {
    return 'vocabulary';
  }

  if (name.startsWith('Flavorization ')) {
    return 'flavorization';
  }

  return null;
};

const TranslationSidebar = () => {
  useStyles();

  const { position, error, navigate } = useSheets();

  const updateSomething = useCallback(async () => {
    if (position.record) {
      await serverFunctions.updateRow({
        rowIndex: position.range.rowIndex,
        record: {
          helperWords: 'hoho',
        },
      });
    }
  }, [position]);

  const testIndex = useCallback(() => {
    navigate.index(42);
  }, [navigate.index]);

  const testId = useCallback(() => {
    navigate.id('Vocabulary [ISV]', '64');
  }, [navigate.id]);

  return (
    <Box>
      <h2>{getSheetType(position.sheet?.name)}</h2>
      <button onClick={updateSomething}>Hoho</button>
      <button onClick={navigate.first}>First</button>
      <button onClick={navigate.previous}>Prev</button>
      <button onClick={navigate.next}>Next</button>
      <button onClick={navigate.last}>Last</button>
      <button onClick={testIndex}>42th</button>
      <button onClick={testId}>isv.id=64</button>
      <pre
        style={{
          backgroundColor: error ? 'lightpink' : 'transparent',
          whiteSpace: 'pre-wrap',
        }}
      >
        {error ? error.toString() : JSON.stringify(position, null, 2)}
      </pre>
      {/* <RowNavigation /> */}
      {/* <SourceSection /> */}
      {/* <IntelligibilitySection /> */}
      {/* <TranslationsSection /> */}
      {/* <OtherLanguagesSection /> */}
      {/* <PreferencesFAB /> */}
    </Box>
  );
};

export default TranslationSidebar;

// <p>
//   <b>☀️ React app inside a sidebar! ☀️</b>
// </p>
// <p>
//   This is a very simple page demonstrating how to build a React app inside a
//   sidebar.
// </p>
// <p>
//   Visit the Github repo for more information on how to use this project.
// </p>
// <p>
//   <Button variant="contained" color="primary" onClick={() => alert('Test')}>
//     Elisha Nuchi
//   </Button>
// </p>
// <Link
//   href="https://www.github.com/enuchi/React-Google-Apps-Script"
//   target="_blank"
//   rel="noopener noreferrer"
// >
//   React + Google Apps Script
// </Link>
