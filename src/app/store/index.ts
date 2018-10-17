import {
  Action,
  ActionReducerMap,
  createSelector,
  createFeatureSelector,
} from '@ngrx/store';
import * as fromActions from './actions/reducer';
import * as fromCoefficients from './coefficients/reducer';
import * as fromMatrix from './matrix/reducer';
import * as fromResultVectors from './result-vectors/reducer';
import * as fromTestVectors from './test-vectors/reducer';

export interface State {
  actions: fromActions.State;
  coefficients: fromCoefficients.State;
  matrix: fromMatrix.State;
  resultVectors: fromResultVectors.State;
  testVectors: fromTestVectors.State;
}

export const reducers: ActionReducerMap<State> = {
  actions: fromActions.reducer,
  coefficients: fromCoefficients.reducer,
  matrix: fromMatrix.reducer,
  resultVectors: fromResultVectors.reducer,
  testVectors: fromTestVectors.reducer,
};

export const getActionsState = createFeatureSelector<fromActions.State>(
  'actions',
);
export const getCoefficientsState = createFeatureSelector<
  fromCoefficients.State
>('coefficients');
export const getMatrixState = createFeatureSelector<fromMatrix.State>('matrix');
export const getResultVectorsState = createFeatureSelector<
  fromResultVectors.State
>('resultVectors');
export const getTestVectorsState = createFeatureSelector<fromTestVectors.State>(
  'testVectors',
);

export const getMod = createSelector(
  getCoefficientsState,
  fromCoefficients.getMod,
);

export const getA = createSelector(getCoefficientsState, fromCoefficients.getA);

export const getB = createSelector(getCoefficientsState, fromCoefficients.getB);

export const getC = createSelector(getCoefficientsState, fromCoefficients.getC);

export const getPolynomTestResult = createSelector(getCoefficientsState, fromCoefficients.getPolynomTestResult);

export const getTestLoading = createSelector(getCoefficientsState, fromCoefficients.getTestLoading);

export const getMatrix = createSelector(getMatrixState, fromMatrix.getMatrix);

export const getIsMatrixValid = createSelector(
  getMatrixState,
  fromMatrix.getIsMatrixValid,
);

export const getMatrixSize = createSelector(
  getMatrixState,
  fromMatrix.getMatrixSize,
);

export const getResult = createSelector(
  getResultVectorsState,
  fromResultVectors.getResult,
);

export const getActiveResult = createSelector(
  getResultVectorsState,
  fromResultVectors.getActiveResult,
);

export const getTestVectorA = createSelector(
  getTestVectorsState,
  fromTestVectors.getTestVectorA,
);

export const getTestVectorB = createSelector(
  getTestVectorsState,
  fromTestVectors.getTestVectorB,
);

export const getTestVectorC = createSelector(
  getTestVectorsState,
  fromTestVectors.getTestVectorC,
);

export const getIsValidTestVectorA = createSelector(
  getTestVectorsState,
  fromTestVectors.getIsValidTestVectorA,
);

export const getIsValidTestVectorB = createSelector(
  getTestVectorsState,
  fromTestVectors.getIsValidTestVectorB,
);

export const getIsValidTestVectorC = createSelector(
  getTestVectorsState,
  fromTestVectors.getIsValidTestVectorC,
);

export const getN = createSelector(getActionsState, fromActions.getN);

export const getButtonsState = createSelector(
  getActionsState,
  getIsValidTestVectorA,
  getIsValidTestVectorB,
  getIsValidTestVectorC,
  fromActions.getButtonsState,
);
