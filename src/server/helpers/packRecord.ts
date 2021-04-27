import zipObject from 'lodash/zipObject';

export default function packRecord(
  sheet: GoogleAppsScript.Spreadsheet.Sheet,
  rowIndex: number
) {
  if (rowIndex > 1) {
    const n = sheet.getLastColumn();
    const currentRowRange = sheet.getRange(rowIndex, 1, 1, n);
    const [currentHeader] = sheet.getSheetValues(1, 1, 1, n);
    const [currentValues] = currentRowRange.getValues();
    return zipObject(currentHeader, currentValues);
  }

  return null;
}
