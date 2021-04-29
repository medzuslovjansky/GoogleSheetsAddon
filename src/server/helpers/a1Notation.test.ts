import { indexToLetter, unionColumnIndices } from './a1Notation';

describe('indexToLetter', () => {
  test.each([
    [0, ''],
    [1, 'A'],
    [2, 'B'],
    [26, 'Z'],
    [27, 'AA'],
    [52, 'AZ'],
    [53, 'BA'],
  ])('(%j) should equal %j', (input: number, expected: string) => {
    expect(indexToLetter(input)).toBe(expected);
  });
});

describe('joinColumnIndicesAsRange', () => {
  test.each([
    [[], []],
    [[1], ['A:A']],
    [
      [1, 3],
      ['A:A', 'C:C'],
    ],
  ])('(%j) should equal %j', (input: number[], expected: string[]) => {
    expect(unionColumnIndices(input)).toEqual(expected);
  });
});
