import { takeLatest, call, all, put } from 'redux-saga/effects';
import {auth, handleUserProfile, GoogleProvider, getCurrentUser} from '../../firebase/utils';
import userTypes from './user.types';
// import { signInSuccess, signOutSuccess, userError, resetPasswordStart, reserPasswordSuccess} from './user.actions';
import { signInSuccess, signOutSuccess, userError, reserPasswordSuccess} from './user.actions';
// import { handleResetPasswordAPI, handleGoogleSignIn } from './user.helpers';
import { handleResetPasswordAPI } from './user.helpers';


// additionalData added as an empty object if we do not provide it in the parameters
export function* getSnapshotFromUserAuth(user, additionalData={}) {
  try {
    const userRef = yield call(handleUserProfile, { userAuth: user, additionalData });
    const snapshot = yield userRef.get();
    yield put(signInSuccess({ id: snapshot.id, ...snapshot.data() }));
  } catch (error) {
    console.log(error);
  }
    // const authListener = auth.onAuthStateChanged(async (userAuth) => {
    //   if (userAuth) {
    //     const userRef = await handleUserProfile(userAuth);
    //     userRef.onSnapshot((snapshot) => {
    //       dispatch(setCurrentUser({
    //         id: snapshot.id,
    //         ...snapshot.data(),
    //       }));
    //     });
    //   }
    //   dispatch(setCurrentUser(userAuth)); // can pass userAuth object here. As by default, it will return
    //                                       // null if there's no user
    // });
}



export function* emailSignIn({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user);
    // yield put(
    //   signInSuccess()
    // )

    // await auth.signInWithEmailAndPassword(email, password);
    // dispatch({ 
    //   type: userTypes.SIGN_IN_SUCCESS,
    //   payload: true
    // })
  } catch (error) {
    console.log(error)
  }
}
export function* onEmailSignInStart() {
  yield takeLatest(userTypes.EMAIL_SIGN_IN_START, emailSignIn);
}



export function* userSignOut() {
  try {
    const userAuth = yield getCurrentUser();
    if(!userAuth) return;

    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (error) {
    console.log(error)
  }
}

export function* onSignOutStart() {
  yield takeLatest(userTypes.SIGN_OUT_START, userSignOut)
}



export function* userSignUp({ payload: { displayName, email, password, confirmPassword } }) {
  if(password !== confirmPassword) {
    const err = ["Password Don't match"];
    yield put(userError(err));
    return;
  }

  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    // yield call(handleUserProfile, {userAuth: user, additionalData: { displayName } });
    const additionalData = { displayName };
    yield getSnapshotFromUserAuth(user, additionalData);
  } catch (error) {
    console.log(error)
  }
}

export function* onSignUpStart() {
  yield takeLatest(userTypes.SIGN_UP_START, userSignUp)
}



export function* resetPassword({ payload: { email } }) {
  try {
    // yield call(handleResetPasswordAPI, email);  // yield will allow (await) our promise to be resolved/rejected
    yield handleResetPasswordAPI(email);  
    yield put(reserPasswordSuccess())

  } catch (error) {
    // console.log(error)
    yield put(userError(error));
  }
}

export function* onResetPasswordStart() {
  yield takeLatest(userTypes.RESET_PASSWORD_START, resetPassword)
}



export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if(!userAuth) return;
    yield getSnapshotFromUserAuth(userAuth);
  } catch (error) {
    // console.log(error)
    yield put(userError(error));
  }
}
export function* onCheckUserSession() {
  yield takeLatest(userTypes.CHECK_USER_SESSION, isUserAuthenticated)
}



export function* googleSignIn() {
  try {
    // yield handleGoogleSignIn();
    // const userAuth = yield getCurrentUser();
    // if(!userAuth) return;
    // yield getSnapshotFromUserAuth(userAuth);

    const { user } = yield auth.signInWithPopup(GoogleProvider);
    yield getSnapshotFromUserAuth(user);

  } catch (error) {
    // console.log(error)
    yield put(userError(error));
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(userTypes.GOOGLE_SIGN_IN_START, googleSignIn)
}


export default function* userSagas() {
  yield all([
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onResetPasswordStart),
    call(onGoogleSignInStart)
  ])
}