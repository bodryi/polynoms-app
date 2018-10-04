import * as Action from './actions';

export interface State {
  A: Array<string>;
  B: Array<string>;
  C: Array<string>;
  AValid: boolean;
  BValid: boolean;
  CValid: boolean;
  vectorBuffer: Array<string>;
}

const initialState: State = {
  A: [],
  B: [],
  C: [],
  AValid: false,
  BValid: false,
  CValid: false,
  vectorBuffer: [],
};

function validateTestVector(v: Array<string>): boolean {
  return (
    v &&
    v.reduce(
      (acc: boolean, curr: string) => acc && !!curr && !!curr.match(/^[0,1]*$/),
      true,
    )
  );
}

export function reducer(state = initialState, action: any): State {
  switch (action.type) {
    case Action.TEST_VECTOR_A_CHANGE:
      return {
        ...state,
        A: [...action.payload],
        AValid: validateTestVector(action.payload),
      };

    case Action.TEST_VECTOR_B_CHANGE:
      return {
        ...state,
        B: [...action.payload],
        BValid: validateTestVector(action.payload),
      };

    case Action.TEST_VECTOR_C_CHANGE:
      return {
        ...state,
        C: [...action.payload],
        CValid: validateTestVector(action.payload),
      };

    case Action.COPY:
      return {
        ...state,
        vectorBuffer: state[action.payload] && [...state[action.payload]],
      };

    case Action.PASTE:
      return {
        ...state,
        [action.payload]: state.vectorBuffer && [...state.vectorBuffer],
        [`Valid${action.payload}`]: validateTestVector(state.vectorBuffer),
      };

    case Action.CLEAR:
      return {
        ...state,
        [action.payload]: [],
        [`Valid${action.payload}`]: false,
      };

    default:
      return state;
  }
}

export const getTestVectorA = (state: State) => state.A;
export const getTestVectorB = (state: State) => state.B;
export const getTestVectorC = (state: State) => state.C;
export const getIsValidTestVectorA = (state: State) => state.AValid;
export const getIsValidTestVectorB = (state: State) => state.BValid;
export const getIsValidTestVectorC = (state: State) => state.CValid;
