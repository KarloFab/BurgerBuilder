import {
  logoutSaga,
  checkAuthTimeoutSaga,
  authUserSaga,
  authCheckStateSaga
} from "./auth";
import * as actionTypes from "../actions/actionTypes";
import { takeEvery } from "redux-saga/effects";
import { initIngredientSaga } from "./burgerBuilder";
import { purchaseBurgerSaga } from "./order";

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
  yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga);
}

export function* watchBugerBuilder() {
  yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientSaga);
}

export function* watchOrder() {
  yield takeEvery(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
}
