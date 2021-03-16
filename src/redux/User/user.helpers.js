import { auth, GoogleProvider } from '../../firebase/utils';


export const handleResetPasswordAPI = (email) => {
  const config = {
    url: 'http://localhost:3000/login',
  };

  return new Promise((resolve, reject) => {
    auth.sendPasswordResetEmail(email, config)
    .then(() => {
        // dispatch({
        //   type: userTypes.RESET_PASSWORD_SUCCESS,
        //   payload: true
        // })
        resolve();
      })
      .catch(() => {
        const err = ['Email not found. Please try again'];
        // dispatch({
        //   type: userTypes.RESET_PASSWORD_ERROR,
        //   payload: err
        // })
        reject(err);
    });
  });
}



export const handleGoogleSignIn = () => {

  return new Promise((resolve, reject) => {
    auth.signInWithPopup(GoogleProvider)
    .then(() => {
      resolve()
      // dispatch({ 
      //   type: userTypes.SIGN_IN_SUCCESS,
      //   payload: true
      // })
    }).catch((err) => {
      // console.log(error)
      reject(err)
    })
  })

  // try {
  //   await auth.signInWithPopup(GoogleProvider)
  //     .then(() => {
  //       dispatch({ 
  //         type: userTypes.SIGN_IN_SUCCESS,
  //         payload: true
  //       })
  //     })
    
  // } catch (error) {
  //   console.log(error)
  // }
}