import * as Action from './actions';

export interface State {
  polynomA: string;
  polynomB: string;
  polynomC: string;
  power: string;
  result: string;
}

const initialState: State = {
  polynomA: '1',
  polynomB: '1',
  polynomC: '1',
  power: '1',
  result: '',
};

export function reducer(state = initialState, action: any): State {
  switch (action.type) {
    case Action.POLYNOM_A_CHANGE:
      return {
        ...state,
        polynomA: action.payload,
      };

    case Action.POLYNOM_B_CHANGE:
      return {
        ...state,
        polynomB: action.payload,
      };

    case Action.POLYNOM_C_CHANGE:
      return {
        ...state,
        polynomC: action.payload,
      };

    case Action.POLYNOM_RESULT_CHANGE:
      return {
        ...state,
        result: action.payload,
      };

    case Action.POLYNOM_POWER_CHANGE:
      return {
        ...state,
        power: action.payload,
      };

    default:
      return state;
  }
}

export const getPolynomA = (state: State) => state.polynomA;
export const getPolynomB = (state: State) => state.polynomB;
export const getPolynomC = (state: State) => state.polynomC;
export const getPolynomResult = (state: State) => state.result;
export const getPolynomPower = (state: State) => state.power;
