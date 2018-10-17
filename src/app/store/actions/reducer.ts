import { IBtnsState } from '../../models/btns-state.model';
import * as Action from './actions';
import * as MainAction from '../main/actions';

export interface State {
  n: Array<string>;
  matrixSize: number;
  nValid: Array<boolean>;
}

const initialState: State = {
  n: ['', ''],
  matrixSize: null,
  nValid: [false, false],
};

function getIndex(matrixSize: number): number {
  return (matrixSize - 4) / 2;
}

function setValue(
  state: Array<any>,
  payload: any,
  matrixSize: number,
) {
  return state.map(
    (c, index) => (index === getIndex(matrixSize) ? payload : c),
  );
}

export function reducer(state = initialState, action: any): State {
  switch (action.type) {
    case Action.SET_N:
      return {
        ...state,
        n: setValue(state.n, action.payload, state.matrixSize),
      };

    case MainAction.SET_MATRIX_SIZE:
      return {
        ...state,
        matrixSize: action.payload,
      };

    case Action.SET_N_VALIDITY:
      return {
        ...state,
        nValid: setValue(state.nValid, action.payload, state.matrixSize),
      };

    default:
      return state;
  }
}

export const getN = (state: State) => state.n[getIndex(state.matrixSize)];
export const getNValid = (state: State) => state.nValid[getIndex(state.matrixSize)];
export const getButtonsState = (
  state: State,
  testVectorAValid: boolean,
  testVectorBValid: boolean,
  testVectorCValid: boolean,
): IBtnsState => ({
  ABOperations: testVectorAValid && testVectorBValid,
  BCOperations: testVectorBValid && testVectorCValid,
  ABCOperations: testVectorAValid && testVectorBValid && testVectorCValid,
  APower: testVectorAValid && !!state.n,
});
