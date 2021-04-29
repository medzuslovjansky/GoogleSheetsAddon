function divmod(y: number, x: number): [number, number] {
  const quotient = Math.floor(y / x);
  const remainder = y % x;

  return [quotient, remainder];
}

export function indexToLetter(columnIndex: number): string {
  let result = '';
  let remainder: number;
  let n = columnIndex;

  while (n > 0) {
    [n, remainder] = divmod(n - 1, 26);
    result = (remainder + 10).toString(36).toUpperCase() + result;
  }

  return result;
}

function columnLetterAsRange(columnLetter: string): string {
  return `${columnLetter}:${columnLetter}`;
}

export function unionColumnIndices(columnIndices: number[]): string[] {
  return columnIndices.map(indexToLetter).map(columnLetterAsRange);
}
