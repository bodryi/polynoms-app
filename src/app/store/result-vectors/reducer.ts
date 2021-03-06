import * as Action from './actions';
import * as MainAction from '../main/actions';
import { RESULTS_COUNT } from '../../constants/app.constants';

export interface State {
  result: Array<Array<Array<string>>>;
  activeResult: Array<number>;
  matrixSize: number;
}


const initialState: State = {
  result: [
    getEmptyVector(RESULTS_COUNT).map(() => getEmptyVector(4)),
    getEmptyVector(RESULTS_COUNT).map(() => getEmptyVector(6)),
  ],
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
          action.payload.vector,
          action.payload.index,
          state.matrixSize,
        ),
      };

    case Action.CLEAR:
      return {
        ...state,
        result: setVector(
          state.result,
          getEmptyVector(state.matrixSize),
          action.payload,
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
