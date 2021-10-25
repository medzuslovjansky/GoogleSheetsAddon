import times from 'lodash/times';
import { unionColumnIndices } from './a1Notation';
import Sheet = GoogleAppsScript.Spreadsheet.Sheet;
import Range = GoogleAppsScript.Spreadsheet.Range;

type GetSheetRecordsOptions = {
  includeColumns?: string[];
};

function isFound(index: number) {
  return index > 0;
}

function transposeRanges(
  acc: string[][],
  range: Range,
  index: number
): string[][] {
  const values: [string][] = range.getValues() as any;

  if (index === 0) {
    return values;
  }

  const R = acc.length;
  for (let i = 0; i < R; i += 1) {
    acc[i].push(values[i][0]);
  }

  return acc;
}

function getSelectedColumnsContents(
  sheet: Sheet,
  columnNames?: string[]
): string[][] {
  const columnCount = sheet.getLastColumn();
  const [header] = sheet.getSheetValues(1, 1, 1, columnCount);
  const columnMappings = columnNames
    ? columnNames.map(n => 1 + header.indexOf(n as any)).filter(isFound)
    : times(columnCount, i => i + 1);

  return sheet
    .getRangeList(unionColumnIndices(columnMappings))
    .getRanges()
    .reduce(transposeRanges, []);
}

export default function getSheetRecords(
  sheetName: string,
  options: GetSheetRecordsOptions
) {
  const sheet = SpreadsheetApp.getActive().getSheetByName(sheetName);
  const [header, ...rows] = getSelectedColumnsContents(
    sheet,
    options.includeColumns
  );
  const C = header.length;
  const R = rows.length;
  const result = [];

  for (let i = 0; i < R; i += 1) {
    const record = {};
    const row = rows[i];

    for (let j = 0; j < C; j += 1) {
      record[header[j]] = row[j];
    }

    result.push(record);
  }

  return result;
}
