export default function getSheetType(name: string | undefined) {
  if (!name) {
    return null;
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

  return null;
}
