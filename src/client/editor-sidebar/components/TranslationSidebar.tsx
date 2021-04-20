import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import { useSelectedRecord } from '../hooks/useSelectedRecord';

// import RowNavigation from './RowNavigation';
// import SourceSection from './SourceSection';
// import IntelligibilitySection from './IntelligibilitySection';
// import PreferencesFAB from './PreferencesFAB';
// import OtherLanguagesSection from './OtherLanguagesSection';
// import TranslationsSection from './TranslationsSection';

const useStyles = makeStyles(() => ({}));

const TranslationSidebar = () => {
  useStyles();

  const { record, error } = useSelectedRecord();

  return (
    <Box>
      <pre>{JSON.stringify(record || error)}</pre>
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
