import { SheetType } from './SheetType';

export default function buildSheetName(sheetType: SheetType, arg?: string) {
  if (sheetType === 'dictionary') {
    return `words`;
  }

  if (sheetType === 'i18n') {
    return `i18n`;
  }

  if (sheetType === 'flavorization' && arg) {
    return `rules [${arg.toUpperCase()}]`;
  }

  if (sheetType === 'translation' && arg) {
    return `translations ${arg.toLowerCase()}]`;
  }

  throw new Error(`Cannot build sheet name for (${sheetType}, ${arg})`);
}
