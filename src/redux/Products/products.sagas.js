import { auth } from '../../firebase/utils';
import {takeLatest, put, all, call} from 'redux-saga/effects';
import productsTypes from './products.types';
import { setProducts, fetchProductsStart } from './products.actions';
import { handleAddProduct, handleFetchProducts, handleDeleteProduct } from './products.helpers';


export function* addProduct({
  payload: {productCategory, productName, productThumbnail, productPrice},
}) {
  try {
    const timestamp = new Date();
    yield handleAddProduct({
      productCategory,
      productName,
      productThumbnail,
      productPrice,
      productAdminUserUID: auth.currentUser.uid,
      createdDate: timestamp
    });
    // yield fetchProducts()
    yield put(fetchProductsStart());
  } catch (err) {
    console.log(err);
  }
}

export function* onAddProductStart() {
  yield takeLatest(productsTypes.ADD_NEW_PRODUCT_START, addProduct);
}



export function* fetchProducts({ payload: { filterType } }) {
  try {
    const products =  yield handleFetchProducts({ filterType });
    yield put(setProducts(products))
  } catch (err) {
    console.log(err)
  }
}

export function* onFetchProductsStart() {
  yield takeLatest(productsTypes.FETCH_PRODUCTS_START, fetchProducts)
}



export function* deleteProduct({ payload }) {
  try {
    yield handleDeleteProduct(payload);
    yield put(fetchProductsStart());
  } catch (err) {
    console.log(err)
  }
}

export function* onDeleteProductStart() {
  yield takeLatest(productsTypes.DELETE_PRODUCTS_START, deleteProduct)
}

 

export default function* productSagas() {
  yield all([
    call(onAddProductStart),
    call(onFetchProductsStart),
    call(onDeleteProductStart)
  ]);
}
