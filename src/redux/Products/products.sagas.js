import { auth } from '../../firebase/utils';
import {takeLatest, put, all, call} from 'redux-saga/effects';
import productsTypes from './products.types';
import { setProducts, fetchProductsStart, setProduct } from './products.actions';
import {  
  handleAddProduct, 
  handleFetchProducts, 
  handleDeleteProduct,
  handleFetchProduct
 } from './products.helpers';


export function* addProduct({
  // payload: {productCategory, productName, productThumbnail, productPrice, productDesc},
  payload
}) {
  try {
    const timestamp = new Date();
    yield handleAddProduct({
      // productCategory,
      // productName,
      // productThumbnail,
      // productPrice,
      // productDesc,
      ...payload,
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



// export function* fetchProducts({ payload: { filterType } }) {
//   try {
//     const products =  yield handleFetchProducts({ filterType });
//     yield put(setProducts(products))
//   } catch (err) {
//     console.log(err)
//   }
// }

// We are already destructuring the payload in our helper function "handleFetchProducts"
// so, there's no need to destructure again. So, we just pass in our payload here.
export function* fetchProducts({ payload }) {  
  try {
    const products =  yield handleFetchProducts(payload);
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

 

export function* fetchProduct({ payload }) {
  try {
    const product = yield handleFetchProduct(payload);
    yield put(setProduct(product));
  } catch (err) {
    console.log(err)
  }
}

export function* onFetchProductStart() {
  yield takeLatest(productsTypes.FETCH_PRODUCT_START, fetchProduct)
}


export default function* productSagas() {
  yield all([
    call(onAddProductStart),
    call(onFetchProductsStart),
    call(onDeleteProductStart),
    call(onFetchProductStart)
  ]);
}
