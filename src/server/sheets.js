import isNumber from 'lodash/isNumber';
import zipObject from 'lodash/zipObject';
import { getSheetByName } from './helpers/getSheetByName';
import {
  findIdInFirstColumn,
  moveCursorBy,
  moveCursorToIndex,
} from './helpers/cursorHelpers';

export const getCurrentPosition = () => {
  const activeSheet = SpreadsheetApp.getActive().getActiveSheet();
  const activeRange = activeSheet.getActiveRange();
  const result = {
    sheet: {
      name: activeSheet.getSheetName(),
      index: activeSheet.getIndex(),
    },
    range: activeRange
      ? {
          rowIndex: activeRange.getRowIndex(),
          a1Notation: activeRange.getA1Notation(),
        }
      : null,
    record: null,
  };

  const rowIndex = result.range?.rowIndex;
  if (rowIndex > 1) {
    const n = activeSheet.getLastColumn();
    const currentRowRange = activeSheet.getRange(rowIndex, 1, 1, n);
    const [currentHeader] = activeSheet.getSheetValues(1, 1, 1, n);
    const [currentValues] = currentRowRange.getValues();
    result.record = zipObject(currentHeader, currentValues);
  }

  return result;
};

export const updateRow = ({ sheetName, rowIndex, record }) => {
  if (!isNumber(rowIndex)) {
    throw new Error(
      `Cannot update a row when the given row index is not a number: ${rowIndex}`
    );
  }

  if (rowIndex < 2) {
    throw new Error(`Rejected an attempt to edit a table header`);
  }

  if (!record) {
    throw new Error(`Cannot update row ${rowIndex} when no record is given`);
  }

  const sheet = getSheetByName(sheetName);
  const n = sheet.getLastColumn();
  const [sheetHeader] = sheet.getSheetValues(1, 1, 1, n);
  const rowRange = sheet.getRange(rowIndex, 1, 1, n);
  const [rowValues] = rowRange.getValues();

  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(record)) {
    const index = sheetHeader.indexOf(key);

    if (index >= 0) {
      rowValues[index] = value;
    }
  }

  rowRange.setValues([rowValues]);
};

export const moveCursor = ({ sheetName, id, rowIndex, offset }) => {
  const sheet = getSheetByName(sheetName);

  if (isNumber(rowIndex)) {
    moveCursorToIndex(sheet, rowIndex);
  } else if (isNumber(offset)) {
    moveCursorBy(sheet, offset);
  } else if (id) {
    findIdInFirstColumn(sheet, id);
  } else {
    throw new Error('Cannot move cursor when no directions were given');
  }

  return getCurrentPosition();
};
