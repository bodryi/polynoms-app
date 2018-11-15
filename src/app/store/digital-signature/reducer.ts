import * as Action from './actions';

export interface State {
  message: string;
  Q: Array<string>;
  NDS: Array<string>;
  h1: string;
  n1: string;
  h2: string;
  n2: string;
  h3: string;
  n3: string;
  Er1: Array<string>;
  Er2: Array<string>;
  Er3: Array<string>;
  T: Array<string>;
  P: Array<string>;
  L: Array<string>;
  Y: Array<string>;
  U: Array<string>;
  R: Array<string>;
  e: string;
  s: string;
  YTest: Array<string>;
  UTest: Array<string>;
  eTest: string;
  sTest: string;
  RWave: Array<string>;
  eWave: string;
  QValid: boolean;
  NDSValid: boolean;
  Er1Valid: boolean;
  Er2Valid: boolean;
  Er3Valid: boolean;
  TValid: boolean;
  PValid: boolean;
  LValid: boolean;
  YValid: boolean;
  UValid: boolean;
  RValid: boolean;
  YTestValid: boolean;
  UTestValid: boolean;
  RWaveValid: boolean;
  buffer: Array<string>;
}

const initialState: State = {
  message: '',
  Q: new Array(4).fill(''),
  NDS: new Array(4).fill(''),
  h1: '',
  n1: '',
  h2: '',
  n2: '',
  h3: '',
  n3: '',
  Er1: new Array(4).fill(''),
  Er2: new Array(4).fill(''),
  Er3: new Array(4).fill(''),
  T: new Array(4).fill(''),
  P: new Array(4).fill(''),
  L: new Array(4).fill(''),
  Y: new Array(4).fill(''),
  U: new Array(4).fill(''),
  R: new Array(4).fill(''),
  e: '',
  s: '',
  YTest: new Array(4).fill(''),
  UTest: new Array(4).fill(''),
  eTest: '',
  sTest: '',
  RWave: new Array(4).fill(''),
  eWave: '',
  QValid: false,
  NDSValid: false,
  Er1Valid: false,
  Er2Valid: false,
  Er3Valid: false,
  TValid: false,
  PValid: false,
  LValid: false,
  YValid: false,
  UValid: false,
  RValid: false,
  YTestValid: false,
  UTestValid: false,
  RWaveValid: false,
  buffer: new Array(4).fill(''),
};

function validateVector(value: Array<string>): boolean {
  return value.reduce(
    (acc: boolean, curr: string) => acc && !!curr && !!curr.match(/^[0,1]*$/),
    true,
  );
}

export function reducer(state = initialState, action: any): State {
  switch (action.type) {
    case Action.ARRAY_VALUE_CHANGE:
      return {
        ...state,
        [action.payload.key]: [...action.payload.value],
        [`${action.payload.key}Valid`]: validateVector(action.payload.value),
      };

    case Action.STRING_VALUE_CHANGE:
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };

    case Action.CLEAR_VECTOR:
      return {
        ...state,
        [action.payload]: new Array(4).fill(''),
      };

    case Action.COPY_VECTOR:
      return {
        ...state,
        buffer: [...state[action.payload]],
      };

    case Action.PASTE_VECTOR:
      return {
        ...state,
        [action.payload]: [...state.buffer],
      };

    default:
      return state;
  }
}

export const getMessage = (state: State) => state.message;
export const getQ = (state: State) => state.Q;
export const getN = (state: State) => state.NDS;
export const getH1 = (state: State) => state.h1;
export const getN1 = (state: State) => state.n1;
export const getH2 = (state: State) => state.h2;
export const getN2 = (state: State) => state.n2;
export const getH3 = (state: State) => state.h3;
export const getN3 = (state: State) => state.n3;
export const getEr1 = (state: State) => state.Er1;
export const getEr2 = (state: State) => state.Er2;
export const getEr3 = (state: State) => state.Er3;
export const getT = (state: State) => state.T;
export const getP = (state: State) => state.P;
export const getL = (state: State) => state.L;
export const getY = (state: State) => state.Y;
export const getU = (state: State) => state.U;
export const getR = (state: State) => state.R;
export const getE = (state: State) => state.e;
export const getS = (state: State) => state.s;
export const getYTest = (state: State) => state.YTest;
export const getUTest = (state: State) => state.UTest;
export const getETest = (state: State) => state.eTest;
export const getSTest = (state: State) => state.sTest;
export const getRWave = (state: State) => state.RWave;
export const getEWave = (state: State) => state.eWave;
export const getQValid = (state: State) => state.QValid;
export const getNValid = (state: State) => state.NDSValid;
export const getEr1Valid = (state: State) => state.Er1Valid;
export const getEr2Valid = (state: State) => state.Er2Valid;
export const getEr3Valid = (state: State) => state.Er3Valid;
export const getTValid = (state: State) => state.TValid;
export const getPValid = (state: State) => state.PValid;
export const getLValid = (state: State) => state.LValid;
export const getYValid = (state: State) => state.YValid;
export const getUValid = (state: State) => state.UValid;
export const getRValid = (state: State) => state.RValid;
export const getYTestValid = (state: State) => state.YTestValid;
export const getUTestValid = (state: State) => state.UTestValid;
export const getRWaveValid = (state: State) => state.RWaveValid;
