import firebase from 'firebase/app';   // inport the firebase utility library
import 'firebase/firestore';
import 'firebase/auth';
import { firebaseConfig } from './config';

firebase.initializeApp(firebaseConfig);   // connect to our Firebase App

export const auth = firebase.auth();
export const firestore = firebase.firestore();


// SIGN IN WITH GOOGLE OAUTH
export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
// GoogleProvider.setCustomParameters({ prompt: 'select_account' });
// export const signInWithGoogle = () => auth.signInWithPopup(GoogleProvider);


// STORE USER PROFILE TO DATABASE
// export const handleUserProfile = async (userAuth, additionalData) => {
export const handleUserProfile = async ({ userAuth, additionalData }) => {
  if (!userAuth) return;  // invalid user

  const { uid } = userAuth;
  const userRef = firestore.doc(`users/${uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const timestamp = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt: timestamp,
        ...additionalData
      });
    } catch (error) {
      console.log(error)
    }
  }
  return userRef;  // need to return the user ref object at the end 
                   // so that we can update the local state of application
};


export const getCurrentUser = () => {
  // without an eventlistener, we will have to use a Promise to get the current user
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  })
}