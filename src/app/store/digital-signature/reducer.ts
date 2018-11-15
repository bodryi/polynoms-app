import * as Action from './actions';

export interface State {
  Q: Array<string>;
  N: Array<string>;
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
  NValid: boolean;
  h1Valid: boolean;
  n1Valid: boolean;
  h2Valid: boolean;
  n2Valid: boolean;
  h3Valid: boolean;
  n3Valid: boolean;
  Er1Valid: boolean;
  Er2Valid: boolean;
  Er3Valid: boolean;
  TValid: boolean;
  PValid: boolean;
  LValid: boolean;
  YValid: boolean;
  UValid: boolean;
  RValid: boolean;
  eValid: boolean;
  sValid: boolean;
  YTestValid: boolean;
  UTestValid: boolean;
  eTestValid: boolean;
  sTestValid: boolean;
  RWaveValid: boolean;
  eWaveValid: boolean;
}

const initialState: State = {
  Q: [],
  N: [],
  h1: '',
  n1: '',
  h2: '',
  n2: '',
  h3: '',
  n3: '',
  Er1: [],
  Er2: [],
  Er3: [],
  T: [],
  P: [],
  L: [],
  Y: [],
  U: [],
  R: [],
  e: '',
  s: '',
  YTest: [],
  UTest: [],
  eTest: '',
  sTest: '',
  RWave: [],
  eWave: '',
  QValid: false,
  NValid: false,
  h1Valid: false,
  n1Valid: false,
  h2Valid: false,
  n2Valid: false,
  h3Valid: false,
  n3Valid: false,
  Er1Valid: false,
  Er2Valid: false,
  Er3Valid: false,
  TValid: false,
  PValid: false,
  LValid: false,
  YValid: false,
  UValid: false,
  RValid: false,
  eValid: false,
  sValid: false,
  YTestValid: false,
  UTestValid: false,
  eTestValid: false,
  sTestValid: false,
  RWaveValid: false,
  eWaveValid: false,
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
        [`${action.payload.key}Valid`]: action.payload.valid,
      };

    default:
      return state;
  }
}

export const getQ = (state: State) => state.Q;
export const getN = (state: State) => state.N;
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
export const getNValid = (state: State) => state.NValid;
export const getH1Valid = (state: State) => state.h1Valid;
export const getN1Valid = (state: State) => state.n1Valid;
export const getH2Valid = (state: State) => state.h2Valid;
export const getN2Valid = (state: State) => state.n2Valid;
export const getH3Valid = (state: State) => state.h3Valid;
export const getN3Valid = (state: State) => state.n3Valid;
export const getEr1Valid = (state: State) => state.Er1Valid;
export const getEr2Valid = (state: State) => state.Er2Valid;
export const getEr3Valid = (state: State) => state.Er3Valid;
export const getTValid = (state: State) => state.TValid;
export const getPValid = (state: State) => state.PValid;
export const getLValid = (state: State) => state.LValid;
export const getYValid = (state: State) => state.YValid;
export const getUValid = (state: State) => state.UValid;
export const getRValid = (state: State) => state.RValid;
export const getEValid = (state: State) => state.eValid;
export const getSValid = (state: State) => state.sValid;
export const getYTestValid = (state: State) => state.YTestValid;
export const getUTestValid = (state: State) => state.UTestValid;
export const getETestValid = (state: State) => state.eTestValid;
export const getSTestValid = (state: State) => state.sTestValid;
export const getRWaveValid = (state: State) => state.RWaveValid;
export const getEWaveValid = (state: State) => state.eWaveValid;
