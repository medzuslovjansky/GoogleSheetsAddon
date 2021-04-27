export default function getSheetByName(name: string | undefined) {
  const app = SpreadsheetApp.getActive();
  if (!name) {
    return app.getActiveSheet();
  }

  const sheet = app.getSheetByName(name);
  if (!sheet) {
    throw new Error(`Failed to find sheet with the name: ${name}`);
  }

  return sheet;
}
