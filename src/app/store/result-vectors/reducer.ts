import * as Action from './actions';

export interface State {
  result: Array<Array<string>>;
  vectorBuffer: Array<string>;
  activeResult: number;
}

const initialState: State = {
  result: [],
  vectorBuffer: [],
  activeResult: 0,
};

function setResult(
  state: Array<Array<string>>,
  newRes: Array<string>,
  activeResult: number,
): Array<Array<string>> {
  return state.reduce(
    (acc: Array<Array<string>>, curr: Array<string>, index: number) => {
      acc.push(index === activeResult ? [...newRes] : [...curr]);
      return acc;
    },
    [],
  );
}

export function reducer(state = initialState, action: any): State {
  switch (action.type) {
    case Action.SET_ACTIVE_RESULT_VECTOR:
      return {
        ...state,
        activeResult: action.payload,
      };

    case Action.SET_RESULT:
      return {
        ...state,
        result: setResult(state.result, action.payload, state.activeResult),
      };

    case Action.COPY:
      return {
        ...state,
        vectorBuffer: state[action.payload] && [...state[action.payload]],
      };

    case Action.PASTE:
      return {
        ...state,
        result:
          state.vectorBuffer &&
          setResult(state.result, state.vectorBuffer, state.activeResult),
      };

    case Action.CLEAR:
      return {
        ...state,
        result: setResult(state.result, [], state.activeResult),
      };

    default:
      return state;
  }
}

export const getResult = (state: State) => state.result;
export const getActiveResult = (state: State) => state.activeResult;
