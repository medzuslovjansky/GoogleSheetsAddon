import isNumber from 'lodash/isNumber';
import getSheetByName from './helpers/getSheetByName';
import packRecord from './helpers/packRecord';
import {
  moveCursorBy,
  moveCursorToIndex,
  findRowIndexByIdColumn,
} from './helpers/cursorHelpers';
import getSheetType from '../common/getSheetType';
import buildSheetName from '../common/buildSheetName';
import getSheetRecords from './helpers/getSheetRecords';

export const getCurrentPosition = () => {
  const before = Date.now();
  const app = SpreadsheetApp.getActive();
  const activeSheet = app.getActiveSheet();
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
    isv: null,
    duration: NaN,
  };

  if (result.range?.rowIndex) {
    result.record = packRecord(activeSheet, result.range.rowIndex);
  }

  if (result.record && getSheetType(result.sheet.name) === 'translation') {
    const dictionarySheet = app.getSheetByName(buildSheetName('dictionary'));
    result.isv = packRecord(
      dictionarySheet,
      findRowIndexByIdColumn(dictionarySheet, result.record.id)
    );
  }

  result.duration = Date.now() - before;
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
  const [sheetHeader] = (sheet.getSheetValues(
    1,
    1,
    1,
    n
  ) as unknown) as string[][];
  const rowRange = sheet.getRange(rowIndex, 1, 1, n);
  const [rowValues] = rowRange.getValues() as any[];

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
    moveCursorToIndex(sheet, findRowIndexByIdColumn(sheet, id));
  } else {
    throw new Error('Cannot move cursor when no directions were given');
  }

  return getCurrentPosition();
};

export { getSheetRecords };
