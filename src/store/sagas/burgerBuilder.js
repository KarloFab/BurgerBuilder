import axios from "../../axios-order";
import { put } from "redux-saga/effects";
import * as actions from "../actions/index";

export function* initIngredientSaga(action) {
    try{
        const response = yield axios.get("/ingredients.json");
        yield put(actions.setIngredients(response.data))
    } catch(error) {
        yield put(actions.fetchIngredeintsFailed())

    }
}
