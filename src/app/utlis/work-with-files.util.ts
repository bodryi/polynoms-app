import { saveAs } from 'file-saver';

const SPACE_BETWEEN_CELLS = 2;

function getLongestCell(matrix: Array<Array<string>>): number {
  return matrix.reduce((acc: number, curr: Array<string>) => {
    const maxLengthInRow = Math.max(...curr.map(c => c.length));
    acc = maxLengthInRow > acc ? maxLengthInRow : acc;
    return acc;
  }, 0);
}

function formatMatrixToString(matrix: Array<Array<string>>): string {
  const maxCellLength = getLongestCell(matrix);
  return matrix.reduce(
    (acc: string, curr: Array<string>, indexRow: number) =>
      acc +
      `${curr.reduce((str: string, cell: string, index: number) => {
        if (index === curr.length - 1) {
          str += cell ? cell : '_';
        } else {
          str +=
            (cell ? cell : '_') +
            ' '.repeat(SPACE_BETWEEN_CELLS + maxCellLength - cell.length);
        }
        return str;
      }, '')}${indexRow === matrix.length - 1 ? '' : '\n'}`,
    '',
  );
}

export function saveToFile(matrix: Array<Array<string>>) {
  return new Promise(resolve => {
    saveAs(
      new Blob([formatMatrixToString(matrix)], {
        type: 'text/plain;charset=utf-8',
      }),
      'matrix.txt',
    );
    resolve();
  });
}
