import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';   // localStorage object from window browser
// import sessionStorage from 'redux-persist/lib/storage/session'   // sessionStorage object from window browser


import userReducer from './User/user.reducer';
import productsReducer from './Products/products.reducer';
import cartReducer from './Cart/cart.reducer';
import orderReducer from './Orders/orders.reducer';


// export default combineReducers({
//   user: userReducer,
//   productsData: productsReducer,
//   cartData: cartReducer
// });

export const rootReducer = combineReducers({
  user: userReducer,
  productsData: productsReducer,
  cartData: cartReducer,
  ordersData: orderReducer
});


const configStorage = {
  key: 'root',
  storage,
  whitelist: ['cartData']  
}


export default persistReducer(configStorage, rootReducer);