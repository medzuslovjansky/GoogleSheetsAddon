/**
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet
 * @param {number} rowIndex
 */
export const moveCursorToIndex = (sheet, rowIndex) => {
  const normalizedIndex = Math.max(2, Math.min(rowIndex, sheet.getLastRow()));
  sheet.getRange(normalizedIndex, 1, 1, 1).activateAsCurrentCell();
};

/**
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet
 * @param {number} rowsCount
 */
export const moveCursorBy = (sheet, rowsCount) => {
  const activeIndex = sheet.getCurrentCell()?.getRowIndex() || 1;
  moveCursorToIndex(sheet, activeIndex + rowsCount);
};

/**
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet
 * @param {id} any
 */
export const findIdInFirstColumn = (sheet, id) => {
  const range = sheet
    .getRange('A:A')
    .createTextFinder(`${id}`)
    .matchEntireCell(true)
    .findNext();

  if (range) {
    range.activateAsCurrentCell();
  }
};
