import productsTypes from './products.types';


export const addProductStart = productData => ({
  type: productsTypes.ADD_NEW_PRODUCT_START,
  payload: productData
})


export const fetchProductsStart = ( filters={} ) => ({   // if nothing is passed, then filters will be assigned an empty object
  type: productsTypes.FETCH_PRODUCTS_START,
  payload: filters
})


export const setProducts = products => ({
  type: productsTypes.SET_PRODUCTS,
  payload: products
})


export const deleteProductStart = productID => ({
  type: productsTypes.DELETE_PRODUCTS_START,
  payload: productID
})