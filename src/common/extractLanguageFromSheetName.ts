export default function extractLanguageFromSheetName(
  sheetName: string
): string | null {
  if (!sheetName) {
    return null;
  }

  const left = sheetName.indexOf('[');
  const right = sheetName.indexOf(']');
  if (right > left && left >= 0) {
    return sheetName.substring(left + 1, right).toUpperCase();
  }

  return null;
}
