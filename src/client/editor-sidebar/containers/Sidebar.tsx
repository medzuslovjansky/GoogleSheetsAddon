import React, { useMemo } from 'react';
import {
  Box,
  Card,
  CircularProgress,
  makeStyles,
  Typography,
} from '@material-ui/core';
import useSheets from '../hooks/useSheets';
import getSheetType from '../../../common/getSheetType';
import useTranslations from '../hooks/useTranslations';
import extractLanguageFromSheetName from '../../../common/extractLanguageFromSheetName';
import SheetsPositionContext, {
  SheetsPositionContextData,
} from '../contexts/SheetsPositionContext';
import TranslationSidebar from './TranslationSidebar';
import Pre from '../components/Pre';

const Sidebar = () => {
  const {
    position,
    navigate,
    error: sheetsError,
    ready: sheetsReady,
  } = useSheets();

  const { i18n, error: i18nError, ready: i18nReady } = useTranslations({
    language: extractLanguageFromSheetName(position.sheet?.name),
  });

  const contextValue = useMemo<SheetsPositionContextData>(
    () => ({
      i18n,
      position,
      navigate,
    }),
    [i18n, position, navigate]
  );

  const error = sheetsError || i18nError;
  const ready = sheetsReady && i18nReady;

  if (!ready) {
    return (
      <Box>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Card variant="outlined" color="error">
        <Pre>
          {error.message}
          {'\n'}
          {error.stack}
        </Pre>
      </Card>
    );
  }

  const sheetType = position.sheet ? getSheetType(position.sheet.name) : null;
  if (sheetType === 'translation') {
    return (
      <SheetsPositionContext.Provider value={contextValue}>
        <TranslationSidebar />
      </SheetsPositionContext.Provider>
    );
  }

  return (
    <Card variant="outlined">
      <Pre>{JSON.stringify(position, null, 2)}</Pre>
    </Card>
  );
};

export default Sidebar;
