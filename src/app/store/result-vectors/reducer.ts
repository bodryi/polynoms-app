import * as Action from './actions';
import * as MainAction from '../main/actions';

export interface State {
  result: Array<Array<Array<string>>>;
  vectorBuffer: Array<Array<string>>;
  activeResult: Array<number>;
  matrixSize: number;
}

const initialState: State = {
  result: [
    getEmptyVector(4).map(() => getEmptyVector(4)),
    getEmptyVector(6).map(() => getEmptyVector(6)),
  ],
  vectorBuffer: [getEmptyVector(4), getEmptyVector(6)],
  activeResult: [0, 0],
  matrixSize: null,
};

function getEmptyVector(vectorSize: number): Array<string> {
  return new Array(vectorSize).fill('');
}

function getIndex(matrixSize: number): number {
  return (matrixSize - 4) / 2;
}

function deepArrayCopy(arr: Array<Array<string>>): Array<Array<string>> {
  return arr && arr.map(innerArr => innerArr.slice());
}

function setVector(
  state: Array<Array<Array<string>>>,
  payload: Array<string>,
  activeResult: number,
  matrixSize: number,
): Array<Array<Array<string>>> {
  const newResult = state.map(res => deepArrayCopy(res));
  newResult[getIndex(matrixSize)][activeResult] = [...payload];
  return newResult;
}

function setBufferVector(
  state: Array<Array<string>>,
  payload: Array<string>,
  matrixSize: number,
): Array<Array<string>> {
  return state.map(
    (v, index) => (index === getIndex(matrixSize) ? [...payload] : v),
  );
}

function setActiveResult(
  state: Array<number>,
  payload: number,
  matrixSize: number,
) {
  return state.map(
    (v, index) => (index === getIndex(matrixSize) ? payload : v),
  );
}

export function reducer(state = initialState, action: any): State {
  switch (action.type) {
    case Action.SET_ACTIVE_RESULT_VECTOR:
      return {
        ...state,
        activeResult: setActiveResult(
          state.activeResult,
          action.payload,
          state.matrixSize,
        ),
      };

    case Action.SET_RESULT:
      return {
        ...state,
        result: setVector(
          state.result,
          action.payload,
          state.activeResult[getIndex(state.matrixSize)],
          state.matrixSize,
        ),
      };

    case Action.COPY:
      return {
        ...state,
        vectorBuffer: setBufferVector(
          state.vectorBuffer,
          state.result[getIndex(state.matrixSize)][action.payload],
          state.matrixSize,
        ),
      };

    case Action.PASTE:
      return {
        ...state,
        result: setVector(
          state.result,
          state.vectorBuffer[getIndex(state.matrixSize)],
          state.activeResult[getIndex(state.matrixSize)],
          state.matrixSize,
        ),
      };

    case Action.CLEAR:
      return {
        ...state,
        result: setVector(
          state.result,
          getEmptyVector(state.matrixSize),
          state.activeResult[getIndex(state.matrixSize)],
          state.matrixSize,
        ),
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

export const getResult = (state: State) =>
  state.result[getIndex(state.matrixSize)];
export const getActiveResult = (state: State) =>
  state.activeResult[getIndex(state.matrixSize)];
