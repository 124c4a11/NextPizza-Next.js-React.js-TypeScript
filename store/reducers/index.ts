import { combineReducers } from '@reduxjs/toolkit';
import { all, fork } from 'redux-saga/effects';

import productsReducer from './products/products.reducer';
import { productsSaga } from './products/products.saga';


export const rootReducer = combineReducers({
  products: productsReducer,
});


export function* rootSaga() {
  yield all([
    fork(productsSaga)
  ]);
}
