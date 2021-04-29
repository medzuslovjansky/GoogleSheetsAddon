import { SheetType } from './SheetType';

export default function getSheetType(name: string): SheetType {
  if (!name) {
    throw new Error('Cannot get sheet type if no name is given');
  }

  if (name.startsWith('Translations ')) {
    return 'translation';
  }

  if (name.startsWith('Vocabulary ')) {
    return 'vocabulary';
  }

  if (name.startsWith('Flavorization ')) {
    return 'flavorization';
  }

  if (name === 'I18N') {
    return 'i18n';
  }

  return 'other';
}
