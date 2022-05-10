import { combineReducers } from '@reduxjs/toolkit';
import { all, fork } from 'redux-saga/effects';

import productsReducer from './products/products.reducer';
import { productsSaga } from './products/products.saga';

import cartReducer from './cart/cart.reducer';
import filterReducer from './filter/filter.reducer';


export const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  filter: filterReducer,
});


export function* rootSaga() {
  yield all([
    fork(productsSaga)
  ]);
}
