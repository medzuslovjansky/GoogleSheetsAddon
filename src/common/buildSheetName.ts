import { SheetType } from './SheetType';

export default function buildSheetName(
  sheetType: SheetType,
  languageCode?: string
) {
  switch (sheetType) {
    case 'vocabulary':
      return `Vocabulary [ISV]`;
    case 'flavorization':
      return `Flavorization [${languageCode.toUpperCase()}]`;
    case 'translation':
      return `Translations [${languageCode.toUpperCase()}]`;
    case 'i18n':
      return `I18N`;
    default:
      throw new Error(
        `Cannot build sheet name for unsupported sheet type: ${sheetType}`
      );
  }
}
