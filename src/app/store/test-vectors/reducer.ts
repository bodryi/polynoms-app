import * as Action from './actions';
import * as MainAction from '../main/actions';

export interface State {
  A: Array<Array<string>>;
  B: Array<Array<string>>;
  C: Array<Array<string>>;
  AValid: Array<boolean>;
  BValid: Array<boolean>;
  CValid: Array<boolean>;
  vectorBuffer: Array<Array<string>>;
  matrixSize: number;
}

const initialState: State = {
  A: [getEmptyVector(4), getEmptyVector(6)],
  B: [getEmptyVector(4), getEmptyVector(6)],
  C: [getEmptyVector(4), getEmptyVector(6)],
  AValid: [false, false],
  BValid: [false, false],
  CValid: [false, false],
  vectorBuffer: [getEmptyVector(4), getEmptyVector(6)],
  matrixSize: null,
};

function getEmptyVector(vectorSize: number): Array<string> {
  return new Array(vectorSize).fill('');
}

function getIndex(matrixSize: number): number {
  return (matrixSize - 4) / 2;
}

function setVector(
  state: Array<Array<string>>,
  payload: Array<string>,
  matrixSize: number,
): Array<Array<string>> {
  return (
    state &&
    state.map((v, index) => (index === getIndex(matrixSize) ? [...payload] : v))
  );
}

function validateTestVector(
  state: Array<boolean>,
  v: Array<string>,
  matrixSize: number,
): Array<boolean> {
  return state.map(
    (val, index) =>
      index === getIndex(matrixSize)
        ? v &&
          v.length &&
          v.reduce(
            (acc: boolean, curr: string) =>
              acc && !!curr && !!curr.match(/^[0,1]*$/),
            true,
          )
        : val,
  );
}

export function reducer(state = initialState, action: any): State {
  switch (action.type) {
    case Action.TEST_VECTOR_A_CHANGE:
      return {
        ...state,
        A: setVector(state.A, action.payload, state.matrixSize),
        AValid: validateTestVector(
          state.AValid,
          action.payload,
          state.matrixSize,
        ),
      };

    case Action.TEST_VECTOR_B_CHANGE:
      return {
        ...state,
        B: setVector(state.B, action.payload, state.matrixSize),
        BValid: validateTestVector(
          state.BValid,
          action.payload,
          state.matrixSize,
        ),
      };

    case Action.TEST_VECTOR_C_CHANGE:
      return {
        ...state,
        C: setVector(state.C, action.payload, state.matrixSize),
        CValid: validateTestVector(
          state.CValid,
          action.payload,
          state.matrixSize,
        ),
      };

    case Action.COPY:
      return {
        ...state,
        vectorBuffer: state[action.payload] && [...state[action.payload]],
      };

    case Action.PASTE:
      return {
        ...state,
        [action.payload]: setVector(
          state[action.payload],
          state.vectorBuffer[getIndex(state.matrixSize)],
          state.matrixSize,
        ),
        [`${action.payload}Valid`]: validateTestVector(
          state[`${action.payload}Valid`],
          state.vectorBuffer[getIndex(state.matrixSize)],
          state.matrixSize,
        ),
      };

    case Action.CLEAR:
      return {
        ...state,
        [action.payload]: setVector(
          state[action.payload],
          getEmptyVector(state.matrixSize),
          state.matrixSize,
        ),
        [`${action.payload}Valid`]: validateTestVector(
          state[`${action.payload}Valid`],
          getEmptyVector(state.matrixSize),
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

export const getTestVectorA = (state: State) =>
  state.A[getIndex(state.matrixSize)];
export const getTestVectorB = (state: State) =>
  state.B[getIndex(state.matrixSize)];
export const getTestVectorC = (state: State) =>
  state.C[getIndex(state.matrixSize)];
export const getIsValidTestVectorA = (state: State) =>
  state.AValid[getIndex(state.matrixSize)];
export const getIsValidTestVectorB = (state: State) =>
  state.BValid[getIndex(state.matrixSize)];
export const getIsValidTestVectorC = (state: State) =>
  state.CValid[getIndex(state.matrixSize)];
