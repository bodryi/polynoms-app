import { IBtnsState } from '../../models/btns-state.model';
import * as Action from './actions';

export interface State {
  n: number;
}

const initialState: State = {
  n: null,
};

export function reducer(state = initialState, action: any): State {
  switch (action.type) {
    case Action.SET_N:
      return {
        ...state,
        n: action.payload,
      };
    default:
      return state;
  }
}

export const getN = (state: State) => state.n;
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
