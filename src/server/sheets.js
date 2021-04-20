const getSheets = () => SpreadsheetApp.getActive().getSheets();

const getActiveSheetName = () => SpreadsheetApp.getActive().getSheetName();

export const getSheetsData = () => {
  const activeSheetName = getActiveSheetName();
  return getSheets().map((sheet, index) => {
    const name = sheet.getName();
    return {
      name,
      index,
      isActive: name === activeSheetName,
    };
  });
};

export const addSheet = sheetTitle => {
  SpreadsheetApp.getActive().insertSheet(sheetTitle);
  return getSheetsData();
};

export const deleteSheet = sheetIndex => {
  const sheets = getSheets();
  SpreadsheetApp.getActive().deleteSheet(sheets[sheetIndex]);
  return getSheetsData();
};

export const setActiveSheet = sheetName => {
  SpreadsheetApp.getActive()
    .getSheetByName(sheetName)
    .activate();
  return getSheetsData();
};

/**
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet
 */
const getSheetType = sheet => {
  const name = sheet.getSheetName();

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

export const getCurrentRow = () => {
  const currentSheet = SpreadsheetApp.getActive().getActiveSheet();
  const currentRowIndex = currentSheet.getCurrentCell()?.getRowIndex() ?? 0;
  const currentRow =
    currentRowIndex > 0
      ? currentSheet.getSheetValues(
          currentRowIndex,
          1,
          1,
          currentSheet.getLastColumn()
        )
      : null;

  return {
    sheet: currentSheet.getSheetName(),
    rowIndex: currentSheet.getCurrentCell()?.getRowIndex(),
    range: currentSheet.getActiveRange()?.getA1Notation() || '',
    values: currentRow,
  };
};
