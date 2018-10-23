import * as Action from './actions';

export interface State {
  polynomA: string;
  polynomB: string;
  polynomC: string;
  power: string;
  polynomAValid: boolean;
  polynomBValid: boolean;
  polynomCValid: boolean;
  powerValid: boolean;
  result: string;
}

const initialState: State = {
  polynomA: '1',
  polynomB: '1',
  polynomC: '1',
  power: '1',
  polynomAValid: true,
  polynomBValid: true,
  polynomCValid: true,
  powerValid: true,
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

    case Action.POLYNOM_A_VALIDITY_CHANGE:
      return {
        ...state,
        polynomAValid: action.payload,
      };

    case Action.POLYNOM_B_VALIDITY_CHANGE:
      return {
        ...state,
        polynomBValid: action.payload,
      };

    case Action.POLYNOM_C_VALIDITY_CHANGE:
      return {
        ...state,
        polynomCValid: action.payload,
      };

    case Action.POLYNOM_POWER_VALIDITY_CHANGE:
      return {
        ...state,
        powerValid: action.payload,
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
export const getPolynomAValid = (state: State) => state.polynomAValid;
export const getPolynomBValid = (state: State) => state.polynomBValid;
export const getPolynomCValid = (state: State) => state.polynomCValid;
export const getPowerValid = (state: State) => state.powerValid;
