import * as Action from './actions';

export interface State {
  matrix: Array<Array<string>>;
  bufferMatrix: Array<Array<string>>;
  matrixValid: boolean;
}

const initialState: State = {
  matrix: null,
  bufferMatrix: null,
  matrixValid: false,
};

const defaultMatrix = null; // temporary

function validateMatrix(m: Array<Array<string>>) {
  return !!m; // temporary
}

export function reducer(state = initialState, action: any): State {
  switch (action.type) {
    case Action.MATRIX_CHANGE:
      return {
        ...state,
        matrix: action.payload && [...action.payload],
        matrixValid: validateMatrix(action.payload),
      };

    case Action.SET_DEFAULT:
      return {
        ...state,
        matrix: defaultMatrix,
        matrixValid: validateMatrix(defaultMatrix),
      };

    case Action.CLEAR:
      return {
        ...state,
        matrix: null,
        matrixValid: false,
      };

    case Action.PASTE:
      return {
        ...state,
        bufferMatrix: [...action.payload]
      };

    case Action.COPY:
      return {
        ...state,
        matrix: state.bufferMatrix ? [...state.bufferMatrix] : state.matrix,
        matrixValid: state.bufferMatrix
          ? validateMatrix(state.bufferMatrix)
          : state.matrixValid,
      };

    default:
      return state;
  }
}

export const getMatrix = (state: State) => state.matrix;
export const getIsMatrixValid = (state: State) => state.matrixValid;
