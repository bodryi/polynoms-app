import * as Action from './actions';
import * as MainAction from '../main/actions';

export interface State {
  mod: Array<string>;
  A: Array<string>;
  B: Array<string>;
  C: Array<string>;
  matrixSize: number;
  modValid: Array<boolean>;
  coefficientsValid: Array<boolean>;
  polynomTestResult: Array<boolean>;
  testLoading: Array<boolean>;
  power: Array<string>;
  multipliers: Array<string>;
}

const initialState: State = {
  mod: ['', ''],
  A: ['', ''],
  B: ['', ''],
  C: ['', ''],
  matrixSize: null,
  modValid: [false, false],
  coefficientsValid: [false, false],
  polynomTestResult: [null, null],
  testLoading: [false, false],
  power: ['', ''],
  multipliers: ['', ''],
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
    case Action.COEFFICIENT_A_CHANGE:
      return {
        ...state,
        A: setValue(state.A, action.payload, state.matrixSize),
      };

    case Action.COEFFICIENT_B_CHANGE:
      return {
        ...state,
        B: setValue(state.B, action.payload, state.matrixSize),
      };

    case Action.COEFFICIENT_C_CHANGE:
      return {
        ...state,
        C: setValue(state.C, action.payload, state.matrixSize),
      };

    case Action.MOD_CHANGE:
      return {
        ...state,
        mod: setValue(state.mod, action.payload, state.matrixSize),
      };

    case Action.MOD_POWER_CHANGE:
      return {
        ...state,
        power: setValue(state.power, action.payload, state.matrixSize),
      };

    case Action.MULTIPLIERS_CHANGE:
      return {
        ...state,
        multipliers: setValue(state.multipliers, action.payload, state.matrixSize),
      };

    case Action.SET_MOD_VALIDITY:
      return {
        ...state,
        modValid: setValue(state.modValid, action.payload, state.matrixSize),
      };

    case Action.SET_COEFFICIENTS_VALIDITY:
      return {
        ...state,
        coefficientsValid: setValue(state.coefficientsValid, action.payload, state.matrixSize),
      };

    case MainAction.SET_MATRIX_SIZE:
      return {
        ...state,
        matrixSize: action.payload,
      };

    case Action.TEST_POLYNOM_SUCCESS:
      return {
        ...state,
        polynomTestResult: setValue(
          state.polynomTestResult,
          action.payload,
          state.matrixSize,
        ),
        testLoading: setValue(state.testLoading, false, state.matrixSize),
      };

    case Action.TEST_POLYNOM_RESULT_RESET:
      return {
        ...state,
        polynomTestResult: setValue(
          state.polynomTestResult,
          null,
          state.matrixSize,
        ),
        // testLoading: setTestLoading(state.testLoading, false, state.matrixSize),
      };

    case Action.GENERATE_IRREDUCIBLE_POLYNOM_SUCCESS:
      return {
        ...state,
        mod: setValue(state.mod, action.payload, state.matrixSize),
        polynomTestResult: setValue(
          state.polynomTestResult,
          true,
          state.matrixSize,
        ),
        testLoading: setValue(state.testLoading, false, state.matrixSize),
      };

    case Action.GENERATE_IRREDUCIBLE_POLYNOM_FAILURE:
      return {
        ...state,
        mod: setValue(state.mod, '', state.matrixSize),
        polynomTestResult: setValue(
          state.polynomTestResult,
          false,
          state.matrixSize,
        ),
        testLoading: setValue(state.testLoading, false, state.matrixSize),
      };

    case Action.GENERATE_IRREDUCIBLE_POLYNOM:
    case Action.TEST_POLYNOM:
      return {
        ...state,
        testLoading: setValue(state.testLoading, true, state.matrixSize),
      };

    default:
      return state;
  }
}

export const getMod = (state: State) => state.mod[getIndex(state.matrixSize)];
export const getA = (state: State) => state.A[getIndex(state.matrixSize)];
export const getB = (state: State) => state.B[getIndex(state.matrixSize)];
export const getC = (state: State) => state.C[getIndex(state.matrixSize)];
export const getCoefficientsValid = (state: State) => state.coefficientsValid[getIndex(state.matrixSize)];
export const getModValid = (state: State) => state.modValid[getIndex(state.matrixSize)];
export const getTestLoading = (state: State) =>
  state.testLoading[getIndex(state.matrixSize)];
export const getPolynomTestResult = (state: State) =>
  state.polynomTestResult[getIndex(state.matrixSize)];
export const getMultipliers = (state: State) => state.multipliers[getIndex(state.matrixSize)];
export const getModPower = (state: State) => state.power[getIndex(state.matrixSize)];
