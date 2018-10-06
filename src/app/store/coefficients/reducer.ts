import * as Action from './actions';
import * as MainAction from '../main/actions';

export interface State {
  mod: Array<string>;
  A: Array<string>;
  B: Array<string>;
  C: Array<string>;
  matrixSize: number;
}

const initialState: State = {
  mod: ['', ''],
  A: ['', ''],
  B: ['', ''],
  C: ['', ''],
  matrixSize: null,
};

function getIndex(matrixSize: number): number {
  return (matrixSize - 4) / 2;
}

function setCoefficient(
  state: Array<string>,
  payload: string,
  matrixSize: number,
) {
  return state.map(
    (c, index) => (index === getIndex(matrixSize) ? payload : c),
  );
}

export function reducer(state = initialState, action: any): State {
  switch (action.type) {
    case Action.COEFFICIENT_A_CHANGE:
      return {
        ...state,
        A: setCoefficient(state.A, action.payload, state.matrixSize),
      };

    case Action.COEFFICIENT_B_CHANGE:
      return {
        ...state,
        B: setCoefficient(state.B, action.payload, state.matrixSize),
      };

    case Action.COEFFICIENT_C_CHANGE:
      return {
        ...state,
        C: setCoefficient(state.C, action.payload, state.matrixSize),
      };

    case Action.MOD_CHANGE:
      return {
        ...state,
        mod: setCoefficient(state.mod, action.payload, state.matrixSize),
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

export const getMod = (state: State) => state.mod[getIndex(state.matrixSize)];
export const getA = (state: State) => state.A[getIndex(state.matrixSize)];
export const getB = (state: State) => state.B[getIndex(state.matrixSize)];
export const getC = (state: State) => state.C[getIndex(state.matrixSize)];
