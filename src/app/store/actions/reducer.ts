import { IBtnsState } from '../../models/btns-state.model';
import * as Action from './actions';
import * as MainAction from '../main/actions';

export interface State {
  n: Array<string>;
  matrixSize: number;
}

const initialState: State = {
  n: ['', ''],
  matrixSize: null,
};

function getIndex(matrixSize: number): number {
  return (matrixSize - 4) / 2;
}

export function reducer(state = initialState, action: any): State {
  switch (action.type) {
    case Action.SET_N:
      return {
        ...state,
        n: state.n.map(
          (c, index) =>
            index === getIndex(state.matrixSize) ? action.payload : c,
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

export const getN = (state: State) => state.n[getIndex(state.matrixSize)];
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
