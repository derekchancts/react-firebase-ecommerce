import orderTypes from './orders.types';
import { takeLatest, put, all, call } from 'redux-saga/effects';
import { handleSaveOrder, handleGetUserOrderHistory, handleGetOrder } from './orders.helpers';
import { auth } from '../../firebase/utils';
import { clearCart } from '../Cart/cart.actions';
import { setUserOrderHistory, setOrderDetails } from './orders.actions';



export function* saveOrder({ payload }) {
  try {
    const timestamp = new Date();
    yield handleSaveOrder({
      ...payload,
      orderUserID: auth.currentUser.uid,
      orderCreatedDate: timestamp
    });
    yield put(clearCart());
  } catch (err) {
    console.log(err);
  }
};

export function* onSaveOrderHistoryStart() {
  yield takeLatest(orderTypes.SAVE_ORDER_HISTORY_START, saveOrder);
};



export function* getUserOrderHistory({ payload }) {
  try {
    const history = yield handleGetUserOrderHistory(payload);
    yield put(setUserOrderHistory(history));
    
  } catch (err) {
    console.log(err)
  }
}

export function* onGetUserOrderHistoryStart() {
  yield takeLatest(orderTypes.GET_USER_ORDER_HISTORY_START, getUserOrderHistory);
}



export function* getOrderDetails({ payload }) {
  try {
    const orderDetails = yield handleGetOrder(payload);
    yield put(setOrderDetails(orderDetails));

  } catch (err) {
    console.log(err);
  }
}


export function* onGetOrderDetailsStart() {
  yield takeLatest(orderTypes.GET_ORDER_DETAILS_START, getOrderDetails);
}



export default function* ordersSagas() {
  yield all([
    call(onSaveOrderHistoryStart),
    call(onGetUserOrderHistoryStart),
    call(onGetOrderDetailsStart),
  ])
}
