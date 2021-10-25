export interface SheetsPositionLike {
  readonly sheet: {
    name: string;
    index: number;
  } | null;
  readonly range: {
    rowIndex: number;
    a1Notation: string;
  } | null;
  readonly record: Record<string, any> | null;
  readonly isv: {
    id: string;
    lemma: string;
    seconaryForm: string;
    partOfSpeech: string;
    etymology: string;
  } | null;
}

type MoveCursorRelativeOptions = {
  offset: number;
};

type MoveCursorToIdOptions = {
  id: string;
};

type MoveCursorToRowOptions = {
  rowIndex: number;
};

export type MoveCursorOptions = { sheetName?: string } & (
  | MoveCursorRelativeOptions
  | MoveCursorToIdOptions
  | MoveCursorToRowOptions
);

export type UpdateRowOptions = {
  sheetName?: string;
  rowIndex: number;
  record: Record<string, any>;
};

export type GetSheetRecordsOptions = {
  includeColumns?: string[];
};

export interface ServerFunctions {
  getCurrentPosition(): Promise<SheetsPositionLike>;
  moveCursor(params: MoveCursorOptions): Promise<SheetsPositionLike>;
  updateRow(params: UpdateRowOptions): Promise<void>;
  getSheetRecords(
    sheetName: string,
    options: GetSheetRecordsOptions
  ): Promise<Record<string, string>[]>;
}
