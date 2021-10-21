import { SheetType } from './SheetType';

export default function getSheetType(name: string): SheetType {
  if (!name) {
    throw new Error('Cannot get sheet type if no name is given');
  }

  if (name === 'words') {
    return 'dictionary';
  }

  if (name.startsWith('rules ')) {
    return 'flavorization';
  }

  if (name.startsWith('translations ')) {
    return 'translation';
  }

  if (name === 'I18N') {
    return 'i18n';
  }

  return 'other';
}
