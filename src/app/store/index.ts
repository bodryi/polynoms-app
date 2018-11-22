import {
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
import * as fromDigitalSignature from './digital-signature/reducer';

export interface State {
  actions: fromActions.State;
  coefficients: fromCoefficients.State;
  matrix: fromMatrix.State;
  resultVectors: fromResultVectors.State;
  testVectors: fromTestVectors.State;
  polynoms: fromPolynoms.State;
  digitalSignature: fromDigitalSignature.State;
}

export const reducers: ActionReducerMap<State> = {
  actions: fromActions.reducer,
  coefficients: fromCoefficients.reducer,
  matrix: fromMatrix.reducer,
  resultVectors: fromResultVectors.reducer,
  testVectors: fromTestVectors.reducer,
  polynoms: fromPolynoms.reducer,
  digitalSignature: fromDigitalSignature.reducer,
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
export const getPolynomsState = createFeatureSelector<fromPolynoms.State>(
  'polynoms',
);
export const getDigitalSignatureState = createFeatureSelector<
  fromDigitalSignature.State
>('digitalSignature');

export const getMod = createSelector(
  getCoefficientsState,
  fromCoefficients.getMod,
);

export const getA = createSelector(getCoefficientsState, fromCoefficients.getA);

export const getB = createSelector(getCoefficientsState, fromCoefficients.getB);

export const getC = createSelector(getCoefficientsState, fromCoefficients.getC);

export const getCoefficientsValid = createSelector(
  getCoefficientsState,
  fromCoefficients.getCoefficientsValid,
);

export const getModValid = createSelector(
  getCoefficientsState,
  fromCoefficients.getModValid,
);

export const getMultipliers = createSelector(
  getCoefficientsState,
  fromCoefficients.getMultipliers,
);

export const getModPower = createSelector(
  getCoefficientsState,
  fromCoefficients.getModPower,
);

export const getPolynomTestResult = createSelector(
  getCoefficientsState,
  fromCoefficients.getPolynomTestResult,
);

export const getTestLoading = createSelector(
  getCoefficientsState,
  fromCoefficients.getTestLoading,
);

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

export const getVectorBuffer = createSelector(
  getTestVectorsState,
  fromTestVectors.getVectorBuffer,
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

export const getPolynomA = createSelector(
  getPolynomsState,
  fromPolynoms.getPolynomA,
);

export const getPolynomB = createSelector(
  getPolynomsState,
  fromPolynoms.getPolynomB,
);

export const getPolynomC = createSelector(
  getPolynomsState,
  fromPolynoms.getPolynomC,
);

export const getPolynomResult = createSelector(
  getPolynomsState,
  fromPolynoms.getPolynomResult,
);

export const getPolynomPower = createSelector(
  getPolynomsState,
  fromPolynoms.getPolynomPower,
);

export const getPolynomAValid = createSelector(
  getPolynomsState,
  fromPolynoms.getPolynomAValid,
);

export const getPolynomBValid = createSelector(
  getPolynomsState,
  fromPolynoms.getPolynomBValid,
);

export const getPolynomCValid = createSelector(
  getPolynomsState,
  fromPolynoms.getPolynomCValid,
);

export const getPowerValid = createSelector(
  getPolynomsState,
  fromPolynoms.getPowerValid,
);

export const getMessage = createSelector(
  getDigitalSignatureState,
  fromDigitalSignature.getMessage,
);
export const getQ = createSelector(
  getDigitalSignatureState,
  fromDigitalSignature.getQ,
);
export const getNDS = createSelector(
  getDigitalSignatureState,
  fromDigitalSignature.getN,
);
export const getH1 = createSelector(
  getDigitalSignatureState,
  fromDigitalSignature.getH1,
);
export const getN1 = createSelector(
  getDigitalSignatureState,
  fromDigitalSignature.getN1,
);
export const getH2 = createSelector(
  getDigitalSignatureState,
  fromDigitalSignature.getH2,
);
export const getN2 = createSelector(
  getDigitalSignatureState,
  fromDigitalSignature.getN2,
);
export const getH3 = createSelector(
  getDigitalSignatureState,
  fromDigitalSignature.getH3,
);
export const getN3 = createSelector(
  getDigitalSignatureState,
  fromDigitalSignature.getN3,
);
export const getEr1 = createSelector(
  getDigitalSignatureState,
  fromDigitalSignature.getEr1,
);
export const getEr2 = createSelector(
  getDigitalSignatureState,
  fromDigitalSignature.getEr2,
);
export const getEr3 = createSelector(
  getDigitalSignatureState,
  fromDigitalSignature.getEr3,
);
export const getT = createSelector(
  getDigitalSignatureState,
  fromDigitalSignature.getT,
);
export const getP = createSelector(
  getDigitalSignatureState,
  fromDigitalSignature.getP,
);
export const getL = createSelector(
  getDigitalSignatureState,
  fromDigitalSignature.getL,
);
export const getY = createSelector(
  getDigitalSignatureState,
  fromDigitalSignature.getY,
);
export const getU = createSelector(
  getDigitalSignatureState,
  fromDigitalSignature.getU,
);
export const getR = createSelector(
  getDigitalSignatureState,
  fromDigitalSignature.getR,
);
export const getE = createSelector(
  getDigitalSignatureState,
  fromDigitalSignature.getE,
);
export const getS = createSelector(
  getDigitalSignatureState,
  fromDigitalSignature.getS,
);
export const getYTest = createSelector(
  getDigitalSignatureState,
  fromDigitalSignature.getYTest,
);
export const getUTest = createSelector(
  getDigitalSignatureState,
  fromDigitalSignature.getUTest,
);
export const getETest = createSelector(
  getDigitalSignatureState,
  fromDigitalSignature.getETest,
);
export const getSTest = createSelector(
  getDigitalSignatureState,
  fromDigitalSignature.getSTest,
);
export const getRWave = createSelector(
  getDigitalSignatureState,
  fromDigitalSignature.getRWave,
);
export const getEWave = createSelector(
  getDigitalSignatureState,
  fromDigitalSignature.getEWave,
);
export const getQValid = createSelector(
  getDigitalSignatureState,
  fromDigitalSignature.getQValid,
);
export const getNDSValid = createSelector(
  getDigitalSignatureState,
  fromDigitalSignature.getNValid,
);
export const getEr1Valid = createSelector(
  getDigitalSignatureState,
  fromDigitalSignature.getEr1Valid,
);
export const getEr2Valid = createSelector(
  getDigitalSignatureState,
  fromDigitalSignature.getEr2Valid,
);
export const getEr3Valid = createSelector(
  getDigitalSignatureState,
  fromDigitalSignature.getEr3Valid,
);
export const getTValid = createSelector(
  getDigitalSignatureState,
  fromDigitalSignature.getTValid,
);
export const getPValid = createSelector(
  getDigitalSignatureState,
  fromDigitalSignature.getPValid,
);
export const getLValid = createSelector(
  getDigitalSignatureState,
  fromDigitalSignature.getLValid,
);
export const getYValid = createSelector(
  getDigitalSignatureState,
  fromDigitalSignature.getYValid,
);
export const getUValid = createSelector(
  getDigitalSignatureState,
  fromDigitalSignature.getUValid,
);
export const getRValid = createSelector(
  getDigitalSignatureState,
  fromDigitalSignature.getRValid,
);
export const getYTestValid = createSelector(
  getDigitalSignatureState,
  fromDigitalSignature.getYTestValid,
);
export const getUTestValid = createSelector(
  getDigitalSignatureState,
  fromDigitalSignature.getUTestValid,
);
export const getRWaveValid = createSelector(
  getDigitalSignatureState,
  fromDigitalSignature.getRWaveValid,
);
export const getRandomX = createSelector(
  getDigitalSignatureState,
  fromDigitalSignature.getRandomX,
);
export const getRandomK = createSelector(
  getDigitalSignatureState,
  fromDigitalSignature.getRandomK,
);
export const getQMod = createSelector(
  getDigitalSignatureState,
  fromDigitalSignature.getQMod,
);
export const getDigitalSignatureBuffer = createSelector(
  getDigitalSignatureState,
  fromDigitalSignature.getDigitalSignatureBuffer,
);
