import extractLanguageFromSheetName from './extractLanguageFromSheetName';

test.each([
  ['', null],
  ['][', null],
  ['[]', ''],
  ['A [] Z', ''],
  ['A [Z]', 'Z'],
  ['A [DE] Z', 'DE'],
  ['Translations [pl]', 'PL'],
])('extractLanguageFromSheetName(%j) should == %j', (input, expected) => {
  expect(extractLanguageFromSheetName(input)).toBe(expected);
});
