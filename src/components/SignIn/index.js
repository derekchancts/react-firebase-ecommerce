import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import {Link, withRouter}from 'react-router-dom'
import { Link, useHistory }from 'react-router-dom'

// import { signInUser, signInWithGoogle, resetAllAuthForms } from '../../redux/User/user.actions';
import { emailSignInStart, signInWithGoogle, googleSignInStart } from '../../redux/User/user.actions';

import './styles.scss';
// import {auth, signInWithGoogle} from '../../firebase/utils';
// import { signInWithGoogle } from '../../firebase/utils';

import AuthWrapper from '../AuthWrapper';
import FormInput from '../forms/FormInput';
import Button from '../forms/Button';


const mapState = ({ user }) => ({
  currentUser: user.currentUser
})


const SignIn = (props) => {
  const { currentUser } = useSelector(mapState); // useSelector to subscribe to selected state in Redux
  const dispatch = useDispatch();

  const history = useHistory()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')


  useEffect(() => {
    if (currentUser ) {
      setEmail('');
      setPassword('');
      // dispatch(resetAllAuthForms());
      history.push('/');
    }
  },[currentUser]);

  
  // const handleSubmit = async (e) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    // dispatch(signInUser({email, password}));
    dispatch(emailSignInStart({email, password}));
    /*
    try {
      await auth.signInWithEmailAndPassword(email, password);
        // const { user } = await auth.signInWithEmailAndPassword(email, password);
        // console.log(user)
      setEmail('');
      setPassword('');
      props.history.push('/');
    } catch (error) {
      console.log(error);
    } */
  };


  const handleGoogleSignIn = () => {
    // dispatch(signInWithGoogle());
    dispatch(googleSignInStart());
  }


  const configAuthWrapper = {
    headline: 'Login'
  };


  return (
    // <div className='signin'>
    //   <div className='wrap'>
    //     <h2>Login</h2>

    //     <div className='formWrap'>
    //       <form onSubmit={this.handleSubmit}>

    //         <FormInput
    //           type="email"
    //           name="email"
    //           value={email}
    //           placeholder="Email"
    //           onChange={this.handleChange}
    //         />
    //         <FormInput
    //           type="password"
    //           name="password"
    //           value={password}
    //           placeholder="Password"
    //           onChange={this.handleChange}
    //         />
    //         <Button type="submit">Login</Button>

    //         <div className='socialSignin'>
    //           <div className='row'>
    //             <Button onClick={signInWithGoogle}>
    //               Sign in with Google
    //             </Button>
    //           </div>
    //         </div>
    //       </form>
    //     </div>
    //   </div>
    // </div>


    // REFACTOR THE ABOVE BY USING AN AUTHWRAPPER
    <AuthWrapper {...configAuthWrapper}>
      <div className='formWrap'>
        <form onSubmit={handleSubmit}>
          <FormInput
            type='email'
            name='email'
            value={email}
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormInput
            type='password'
            name='password'
            value={password}
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type='submit'>Login</Button>

          <div className='socialSignin'>
            <div className='row'>
              <Button type="button" onClick={handleGoogleSignIn}>Sign in with Google</Button>
            </div>
          </div>

          <div className="links">
            <Link to="/recovery">
              Reset Password
            </Link>
          </div>

        </form>
      </div>
    </AuthWrapper>
  );
  
}

export default SignIn;
