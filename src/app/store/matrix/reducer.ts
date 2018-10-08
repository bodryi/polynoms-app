import * as Action from './actions';
import * as MainAction from '../main/actions';

const defaultMatrix4 = [
  ['Aa', 'Bb', 'Cc', 'Ad'],
  ['Aa', 'Bb', 'Cc', 'Ad'],
  ['Aa', 'Bb', 'Cc', 'Ad'],
  ['Aa', 'Bb', 'Cc', 'Ad'],
];
const defaultMatrix6 = [
  ['a', 'b', 'c', 'd', 'e', 'f'],
  ['b', 'Bb', 'Cc', 'Ad', 'Be', 'Cf'],
  ['c', 'Bb', 'Cc', 'Ad', 'Be', 'Cf'],
  ['d', 'Bb', 'Cc', 'Ad', 'Be', 'Cf'],
  ['e', 'Bb', 'Cc', 'Ad', 'Be', 'Cf'],
  ['f', 'Bb', 'Cc', 'Ad', 'Be', 'Cf'],
];

export interface State {
  matrix: Array<Array<Array<string>>>;
  bufferMatrix: Array<Array<Array<string>>>;
  matrixValid: Array<boolean>;
  matrixSize: number;
}

const initialState: State = {
  matrix: [getDefaultMatrix(4), getDefaultMatrix(6)],
  bufferMatrix: [getEmptyMatrix(4), getEmptyMatrix(6)],
  matrixValid: [false, false],
  matrixSize: null, // 4
};

function validateMatrix(
  m: Array<Array<string>>,
  matrixValidArray: Array<boolean>,
  matrixSize: number,
): Array<boolean> {
  const newMatrixValid = [...matrixValidArray];
  newMatrixValid[getIndex(matrixSize)] = !!m; // temporary
  return newMatrixValid;
}

function setMatrixValidity(
  v: boolean,
  matrixValidArray: Array<boolean>,
  matrixSize: number,
): Array<boolean> {
  const newMatrixValid = [...matrixValidArray];
  newMatrixValid[getIndex(matrixSize)] = v;
  return newMatrixValid;
}

function getIndex(matrixSize: number): number {
  return (matrixSize - 4) / 2;
}

function deepArrayCopy(arr: Array<Array<string>>): Array<Array<string>> {
  return arr && arr.map(innerArr => innerArr.slice());
}

function getNewMatrixArray(
  payload: Array<Array<string>>,
  matrixes: Array<Array<Array<string>>>,
  matrixSize: number,
) {
  const changedIndex = getIndex(matrixSize);
  return matrixes.map(
    (matrix, index) =>
      index === changedIndex
        ? deepArrayCopy(payload)
        : deepArrayCopy(matrix),
  );
}

function getEmptyMatrix(matrixSize: number): Array<Array<string>> {
  return new Array(matrixSize)
    .fill(null)
    .map(() => new Array(matrixSize).fill(''));
}

function getDefaultMatrix(matrixSize: number): Array<Array<string>> {
  switch (matrixSize) {
    case 4:
      return defaultMatrix4;
    case 6:
      return defaultMatrix6;
    default:
      return getEmptyMatrix(matrixSize);
  }
}

export function reducer(state = initialState, action: any): State {
  switch (action.type) {
    case Action.MATRIX_CHANGE:
      return {
        ...state,
        matrix: getNewMatrixArray(
          action.payload,
          state.matrix,
          state.matrixSize,
        ),
        matrixValid: validateMatrix(
          action.payload,
          state.matrixValid,
          state.matrixSize,
        ),
      };

    case Action.SET_DEFAULT:
      return {
        ...state,
        matrix: getNewMatrixArray(
          getDefaultMatrix(state.matrixSize),
          state.matrix,
          state.matrixSize,
        ),
        matrixValid: validateMatrix(
          getDefaultMatrix(state.matrixSize),
          state.matrixValid,
          state.matrixSize,
        ),
      };

    case Action.CLEAR:
      return {
        ...state,
        matrix: getNewMatrixArray(
          getEmptyMatrix(state.matrixSize),
          state.matrix,
          state.matrixSize,
        ),
        matrixValid: setMatrixValidity(
          false,
          state.matrixValid,
          state.matrixSize,
        ),
      };

    case Action.COPY:
      return {
        ...state,
        bufferMatrix: getNewMatrixArray(
          state.matrix[getIndex(state.matrixSize)],
          state.bufferMatrix,
          state.matrixSize,
        ),
      };

    case Action.PASTE:
      return {
        ...state,
        matrix: state.bufferMatrix
          ? getNewMatrixArray(
            state.bufferMatrix[getIndex(state.matrixSize)],
            state.matrix,
            state.matrixSize,
          )
          : state.matrix,
        matrixValid: state.bufferMatrix
          ? validateMatrix(
            state.bufferMatrix[getIndex(state.matrixSize)],
            state.matrixValid,
            state.matrixSize,
          )
          : state.matrixValid,
      };

    case MainAction.SET_MATRIX_SIZE:
      return {
        ...state,
        matrixSize: action.payload,
      };

    default:
      return state;
  }
}

export const getMatrix = (state: State) =>
  state.matrix[getIndex(state.matrixSize)];
export const getIsMatrixValid = (state: State) =>
  state.matrixValid[getIndex(state.matrixSize)];
export const getMatrixSize = (state: State) => state.matrixSize;
