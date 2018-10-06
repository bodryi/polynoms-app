import * as Action from './actions';
import * as MainAction from '../main/actions';

export interface State {
  matrix: Array<Array<Array<string>>>;
  bufferMatrix: Array<Array<Array<string>>>;
  matrixValid: Array<boolean>;
  matrixSize: number;
}

const initialState: State = {
  matrix: [getEmptyMatrix(4), getEmptyMatrix(6)],
  bufferMatrix: [null, null],
  matrixValid: [false, false],
  matrixSize: null, // 4
};

const defaultMatrix = null; // temporary

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
  return changedIndex || changedIndex === 0
    ? matrixes.map(
        (matrix, index) =>
          index === changedIndex
            ? deepArrayCopy(payload)
            : deepArrayCopy(matrix),
      )
    : matrixes;
}

function getEmptyMatrix(matrixSize: number): Array<Array<string>> {
  return new Array(matrixSize)
    .fill(null)
    .map(() => new Array(matrixSize).fill(''));
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
          defaultMatrix,
          state.matrix,
          state.matrixSize,
        ),
        matrixValid: validateMatrix(
          defaultMatrix,
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
          action.payload,
          state.matrix,
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
