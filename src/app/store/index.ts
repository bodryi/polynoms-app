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
import * as fromPolynoms from './polynoms/reducer';

export interface State {
  actions: fromActions.State;
  coefficients: fromCoefficients.State;
  matrix: fromMatrix.State;
  resultVectors: fromResultVectors.State;
  testVectors: fromTestVectors.State;
  polynoms: fromPolynoms.State
}

export const reducers: ActionReducerMap<State> = {
  actions: fromActions.reducer,
  coefficients: fromCoefficients.reducer,
  matrix: fromMatrix.reducer,
  resultVectors: fromResultVectors.reducer,
  testVectors: fromTestVectors.reducer,
  polynoms: fromPolynoms.reducer,
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
export const getPolynomsState = createFeatureSelector<fromPolynoms.State>('polynoms');

export const getMod = createSelector(
  getCoefficientsState,
  fromCoefficients.getMod,
);

export const getA = createSelector(getCoefficientsState, fromCoefficients.getA);

export const getB = createSelector(getCoefficientsState, fromCoefficients.getB);

export const getC = createSelector(getCoefficientsState, fromCoefficients.getC);

export const getCoefficientsValid = createSelector(getCoefficientsState, fromCoefficients.getCoefficientsValid);

export const getModValid = createSelector(getCoefficientsState, fromCoefficients.getModValid);

export const getMultipliers = createSelector(getCoefficientsState, fromCoefficients.getMultipliers);

export const getModPower = createSelector(getCoefficientsState, fromCoefficients.getModPower);

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

export const getNValid = createSelector(getActionsState, fromActions.getNValid);

export const getButtonsState = createSelector(
  getActionsState,
  getIsValidTestVectorA,
  getIsValidTestVectorB,
  getIsValidTestVectorC,
  fromActions.getButtonsState,
);

export const getPolynomA = createSelector(getPolynomsState, fromPolynoms.getPolynomA);

export const getPolynomB = createSelector(getPolynomsState, fromPolynoms.getPolynomB);

export const getPolynomC = createSelector(getPolynomsState, fromPolynoms.getPolynomC);

export const getPolynomResult = createSelector(getPolynomsState, fromPolynoms.getPolynomResult);

export const getPolynomPower = createSelector(getPolynomsState, fromPolynoms.getPolynomPower);

export const getPolynomAValid = createSelector(getPolynomsState, fromPolynoms.getPolynomAValid);

export const getPolynomBValid = createSelector(getPolynomsState, fromPolynoms.getPolynomBValid);

export const getPolynomCValid = createSelector(getPolynomsState, fromPolynoms.getPolynomCValid);

export const getPowerValid = createSelector(getPolynomsState, fromPolynoms.getPowerValid);
