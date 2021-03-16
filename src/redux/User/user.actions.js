import userTypes from './user.types';
// import {auth, handleUserProfile, GoogleProvider} from '../../firebase/utils';


export const emailSignInStart = userCredentials => ({
  type: userTypes.EMAIL_SIGN_IN_START,
  payload: userCredentials
});


export const signInSuccess = user => ({
  type: userTypes.SIGN_IN_SUCCESS,
  payload: user
});


export const checkUserSession = () => ({
  type: userTypes.CHECK_USER_SESSION
})


export const signOutStart = () => ({
  type: userTypes.SIGN_OUT_START
})


export const signOutSuccess = () => ({
  type: userTypes.SIGN_OUT_SUCCESS,
  // payload: null
})


export const signUpStart = userCredentials => ({
  type: userTypes.SIGN_UP_START,
  payload: userCredentials
})


export const userError = error => ({
  type: userTypes.USER_ERROR,
  payload: error
})
 

export const resetPasswordStart = userCredentials => ({
  type: userTypes.RESET_PASSWORD_START,
  payload: userCredentials
})


export const reserPasswordSuccess = () => ({
  type: userTypes.RESET_PASSWORD_SUCCESS,
  payload: true
})


export const resetUserState = () => ({
  type: userTypes.RESET_USER_STATE
})


export const googleSignInStart = () => ({
  type: userTypes.GOOGLE_SIGN_IN_START
})









// export const setCurrentUser = (user) => ({
//   type: userTypes.SET_CURRENT_USER,
//   payload: user
// }); 


// export const signInUser = ({ email, password }) => async dispatch => {
//   try {
//     await auth.signInWithEmailAndPassword(email, password);
//     dispatch({ 
//       type: userTypes.SIGN_IN_SUCCESS,
//       payload: true
//     })
//   } catch (error) {
//     console.log(error)
//   }
// };

 
// export const resetAllAuthForms = () => ({
//   type: userTypes.RESET_AUTH_FORMS
// })


// export const signoutUser = () => async dispatch => {
//   try {
//     await auth.signOut();
//     dispatch({
//       type: userTypes.SIGN_OUT_SUCCESS,
//       payload: false
//     })
    
//   } catch (error) {
//     console.log(error)
//   }
// }


/*
export const signUpUser = ({ displayName, email, password, confirmPassword }) => async dispatch => {
  if (password !== confirmPassword) {
    const err = ["Password Don't match"];
    // setErrors(err);
    dispatch({
      type: userTypes.SIGN_UP_ERROR,
      payload: err
    })
    return;
  }

  try {
    const {user} = await auth.createUserWithEmailAndPassword(email, password);

    await handleUserProfile(user, {displayName});
    // resetValues();
    // props.history.push('/')
    dispatch({
      type: userTypes.SIGN_UP_SUCCESS,
      payload: true
    })

    // dispatch({ 
    //   type: userTypes.SIGN_IN_SUCCESS,
    //   payload: true
    // })

  } catch (err) {
    console.log(err);
  }
}
*/

/*
export const resetPassword =({ email }) => async dispatch => {
  const config = {
    url: 'http://localhost:3000/login',
  };
  
  try {
    await auth.sendPasswordResetEmail(email, config)
      .then(() => {
        //   console.log('Password Reset');
        //   props.history.push('/login');
        dispatch({
          type: userTypes.RESET_PASSWORD_SUCCESS,
          payload: true
        })

        })
        .catch(() => {
          const err = ['Email not found. Please try again'];
        //   setErrors(err);
        dispatch({
          type: userTypes.RESET_PASSWORD_ERROR,
          payload: err
        })
      });

  } catch (error) {
    console.log(error);
  }
}
*/


/*
export const signInWithGoogle = () => async dispatch => {
  try {
    await auth.signInWithPopup(GoogleProvider)
      .then(() => {
        dispatch({ 
          type: userTypes.SIGN_IN_SUCCESS,
          payload: true
        })
      })
    
  } catch (error) {
    console.log(error)
  }

};
*/