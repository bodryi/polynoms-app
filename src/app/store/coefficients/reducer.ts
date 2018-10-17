import * as Action from './actions';
import * as MainAction from '../main/actions';

export interface State {
  mod: Array<string>;
  A: Array<string>;
  B: Array<string>;
  C: Array<string>;
  matrixSize: number;
  polynomTestResult: Array<boolean>;
  testLoading: Array<boolean>;
}

const initialState: State = {
  mod: ['', ''],
  A: ['', ''],
  B: ['', ''],
  C: ['', ''],
  matrixSize: null,
  polynomTestResult: [null, null],
  testLoading: [false, false],
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

function setTestResult(
  state: Array<boolean>,
  payload: boolean,
  matrixSize: number,
) {
  return state.map(
    (r, index) => (index === getIndex(matrixSize) ? payload : r),
  );
}

function setTestLoading(
  state: Array<boolean>,
  payload: boolean,
  matrixSize: number,
) {
  return state.map(
    (r, index) => (index === getIndex(matrixSize) ? payload : r),
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

    case Action.TEST_POLYNOM_SUCCESS:
      return {
        ...state,
        polynomTestResult: setTestResult(
          state.polynomTestResult,
          action.payload,
          state.matrixSize,
        ),
        testLoading: setTestLoading(state.testLoading, false, state.matrixSize),
      };

    case Action.TEST_POLYNOM_RESULT_RESET:
      return {
        ...state,
        polynomTestResult: setTestResult(
          state.polynomTestResult,
          null,
          state.matrixSize,
        ),
        // testLoading: setTestLoading(state.testLoading, false, state.matrixSize),
      };

    case Action.GENERATE_IRREDUCIBLE_POLYNOM_SUCCESS:
      return {
        ...state,
        mod: setCoefficient(state.mod, action.payload, state.matrixSize),
        polynomTestResult: setTestResult(
          state.polynomTestResult,
          true,
          state.matrixSize,
        ),
        testLoading: setTestLoading(state.testLoading, false, state.matrixSize),
      };

    case Action.GENERATE_IRREDUCIBLE_POLYNOM_FAILURE:
      return {
        ...state,
        mod: setCoefficient(state.mod, '', state.matrixSize),
        polynomTestResult: setTestResult(
          state.polynomTestResult,
          false,
          state.matrixSize,
        ),
        testLoading: setTestLoading(state.testLoading, false, state.matrixSize),
      };

    case Action.GENERATE_IRREDUCIBLE_POLYNOM:
    case Action.TEST_POLYNOM:
      return {
        ...state,
        testLoading: setTestLoading(state.testLoading, true, state.matrixSize),
      };

    default:
      return state;
  }
}

export const getMod = (state: State) => state.mod[getIndex(state.matrixSize)];
export const getA = (state: State) => state.A[getIndex(state.matrixSize)];
export const getB = (state: State) => state.B[getIndex(state.matrixSize)];
export const getC = (state: State) => state.C[getIndex(state.matrixSize)];
export const getTestLoading = (state: State) =>
  state.testLoading[getIndex(state.matrixSize)];
export const getPolynomTestResult = (state: State) =>
  state.polynomTestResult[getIndex(state.matrixSize)];
