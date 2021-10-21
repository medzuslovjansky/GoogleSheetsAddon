import React, { useMemo } from 'react';
import useSheets from './hooks/useSheets';
import getSheetType from '../../../common/getSheetType';
import useTranslations from './hooks/useTranslations';
import extractLanguageFromSheetName from '../../../common/extractLanguageFromSheetName';
import SheetsPositionContext, {
  SheetsPositionContextData,
} from './contexts/SheetsPositionContext';
import CircularProgressBox from './components/CircularProgressBox';
import InspectJSONBox from './components/InspectJSONBox';
import RulesSidebar from '../rules/sidebar';
import DictionarySidebar from '../dictionary/sidebar';

const Sidebar = () => {
  const {
    position,
    navigate,
    error: sheetsError,
    ready: sheetsReady,
  } = useSheets();

  if (sheetsError) {
    throw sheetsError;
  }

  const { i18n, error: i18nError, ready: i18nReady } = useTranslations({
    language: extractLanguageFromSheetName(position.sheet?.name),
  });

  if (i18nError) {
    throw i18nError;
  }

  const contextValue = useMemo<SheetsPositionContextData>(
    () => ({
      i18n,
      position,
      navigate,
    }),
    [i18n, position, navigate]
  );

  const ready = sheetsReady && i18nReady;

  if (!ready) {
    return <CircularProgressBox />;
  }

  const sheetType = position.sheet ? getSheetType(position.sheet.name) : null;

  if (sheetType === 'flavorization') {
    return (
      <SheetsPositionContext.Provider value={contextValue}>
        <RulesSidebar />
      </SheetsPositionContext.Provider>
    );
  }

  if (sheetType === 'dictionary') {
    return (
      <SheetsPositionContext.Provider value={contextValue}>
        <DictionarySidebar />
      </SheetsPositionContext.Provider>
    );
  }

  return <InspectJSONBox contents={position} />;
};

export default Sidebar;
