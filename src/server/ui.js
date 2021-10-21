export const onOpen = () => {
  const menu = SpreadsheetApp.getUi()
    .createMenu('Ⱄ')
    .addItem('Sidebar', 'openEditorSidebar');

  menu.addToUi();
};

export const onSelectionChange = e => {
  /** @type {GoogleAppsScript.Spreadsheet.Range} */
  const { range } = e;
  const a1 = range.getA1Notation();
  const sheetName = range.getSheet().getSheetName();
  // eslint-disable-next-line no-undef
  const userProperties = PropertiesService.getUserProperties();
  userProperties.setProperty('ISV_GAS__CURSOR_POSITION', `${sheetName}!${a1}`);
};

export const openEditorSidebar = () => {
  const html = HtmlService.createHtmlOutputFromFile('editor-sidebar').setTitle(
    'Properties'
  );

  SpreadsheetApp.getUi().showSidebar(html);
};
