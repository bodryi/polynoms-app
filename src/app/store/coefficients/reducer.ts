import * as Action from './actions';

export interface State {
  mod: string;
  A: string;
  B: string;
  C: string;
}

const initialState: State = {
  mod: '',
  A: '',
  B: '',
  C: '',
};

export function reducer(state = initialState, action: any): State {
  switch (action.type) {
    case Action.COEFFICIENT_A_CHANGE:
      return {
        ...state,
        A: action.payload,
      };

    case Action.COEFFICIENT_B_CHANGE:
      return {
        ...state,
        B: action.payload,
      };

    case Action.COEFFICIENT_C_CHANGE:
      return {
        ...state,
        C: action.payload,
      };

    case Action.MOD_CHANGE:
      return {
        ...state,
        mod: action.payload,
      };

    default:
      return state;
  }
}

export const getMod = (state: State) => state.mod;
export const getA = (state: State) => state.A;
export const getB = (state: State) => state.B;
export const getC = (state: State) => state.C;
