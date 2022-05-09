import { all, call, put, takeLeading } from 'redux-saga/effects';

import { IFilter } from '@/interfaces/IFilter';
import { IPizza } from '@/interfaces/IPizza';

import { productsFetchFailure, productsFetchSuccess } from './products.reducer';
import { ProductsService } from '@/services/products.service';


interface FetchProductsAction {
  type: string;
  payload?: IFilter;
}


function* fetchProducts(action: FetchProductsAction) {
  try {
    const products: IPizza[] = yield call(ProductsService.getAll, action?.payload);

    yield put(productsFetchSuccess(products));
  } catch (err) {
    if (err instanceof Error) {
      yield put(productsFetchFailure(err.message));
    } else {
      yield put(productsFetchFailure('Something went wrong!'));
    }
  }
}


export function* productsSaga() {
  yield all([
    takeLeading('products/productsFetchRequest', fetchProducts),
  ]);
}
