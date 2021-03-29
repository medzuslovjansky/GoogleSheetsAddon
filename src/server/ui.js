export const onOpen = () => {
  const menu = SpreadsheetApp.getUi()
    .createMenu('Ⱄ')
    .addItem('Sidebar', 'openEditorSidebar');

  menu.addToUi();
};

export const openEditorSidebar = () => {
  const html = HtmlService.createHtmlOutputFromFile('editor-sidebar').setTitle(
    'Properties'
  );

  SpreadsheetApp.getUi().showSidebar(html);
};
