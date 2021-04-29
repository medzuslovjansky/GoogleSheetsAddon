import React, { useCallback } from 'react';
import { Box, makeStyles } from '@material-ui/core';
import * as steenUtils from '@interslavic/steen-utils';
import useSheets from '../hooks/useSheets';
import server from '../../utils/server';
import getSheetType from '../../../common/getSheetType';
import useTranslations from '../hooks/useTranslations';
import extractLanguageFromSheetName from '../../../common/extractLanguageFromSheetName';

// import RowNavigation from './RowNavigation';
// import SourceSection from './SourceSection';
// import IntelligibilitySection from './IntelligibilitySection';
// import PreferencesFAB from './PreferencesFAB';
// import OtherLanguagesSection from './OtherLanguagesSection';
// import TranslationsSection from './TranslationsSection';

const { serverFunctions } = server;
const useStyles = makeStyles(() => ({}));

const TranslationSidebar = () => {
  useStyles();

  const {
    position,
    error: sheetsError,
    navigate,
    ready: sheetsReady,
  } = useSheets();
  const { i18n, error: i18nError, ready: i18nReady } = useTranslations({
    language: extractLanguageFromSheetName(position.sheet?.name),
  });
  const error = sheetsError || i18nError;
  const ready = sheetsReady && i18nReady;

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

  const sheetType = position.sheet ? getSheetType(position.sheet.name) : null;

  let lemmas: steenUtils.core.Lemma[] = [];
  if (sheetType === 'translation' && position.record && position.isv) {
    const pos = steenUtils.parse.partOfSpeech(position.isv.partOfSpeech);
    const synset = steenUtils.parse.synset(position.record.translations, {
      isPhrase: pos?.name === 'phrase',
    });

    lemmas = [...synset.lemmas()];
  }

  if (!ready || error) {
    return (
      <Box>
        <pre
          style={{
            backgroundColor: error ? 'lightpink' : 'transparent',
            whiteSpace: 'pre-wrap',
          }}
        >
          {error
            ? `${error.message}\n${error.stack}`
            : JSON.stringify(position, null, 2)}
        </pre>
      </Box>
    );
  }

  return (
    <Box>
      <h2>{i18n('UI_INTERSLAVIC_CARD_HEADER')}</h2>
      <button onClick={updateSomething}>Hoho</button>
      <button onClick={navigate.first}>First</button>
      <button onClick={navigate.previous}>Prev</button>
      <button onClick={navigate.next}>Next</button>
      <button onClick={navigate.last}>Last</button>
      <button onClick={testIndex}>42th</button>
      <button onClick={testId}>isv.id=64</button>
      <ol>
        {lemmas.map((l, i) => (
          <li key={i}>{String(l)}</li>
        ))}
      </ol>
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
