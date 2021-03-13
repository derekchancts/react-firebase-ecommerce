import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {withRouter} from 'react-router-dom';
import { resetPassword, resetAllAuthForms } from '../../redux/User/user.actions';
import './stytles.scss';
// import {auth} from '../../firebase/utils';

import AuthWrapper from '../AuthWrapper';
import FormInput from '../forms/FormInput';
import Button from '../forms/Button';


const mapState = ({ user }) => ({
  resetPasswordSuccess: user.resetPasswordSuccess,
  resetPasswordError: user.resetPasswordError
})

const EmailPassword = (props) => {
  const { resetPasswordSuccess, resetPasswordError} = useSelector(mapState);
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState([]);


  useEffect(() => {
    if (resetPasswordSuccess) {
      console.log('Password Reset');
      dispatch(resetAllAuthForms());
      props.history.push('/login');
    }
  },[resetPasswordSuccess])


  useEffect(() => {
    if (Array.isArray(resetPasswordError) && resetPasswordError.length > 0) {
      setErrors(resetPasswordError)
    }
  },[resetPasswordError])


  // const handleSubmit = async (e) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(resetPassword({ email }));

    // try {
    //   const config = {
    //     url: 'http://localhost:3000/login',
    //   };

    //   await auth
    //     .sendPasswordResetEmail(email, config)
    //     .then(() => {
    //       console.log('Password Reset');
    //       // window.location.replace("http://localhost:3000/login")
    //       props.history.push('/login');
    //     })
    //     .catch(() => {
    //       const err = ['Email not found. Please try again'];
    //       setErrors(err);
    //     });
    // } catch (error) {
    //   console.log(error);
    // }
  };


  const configAuthWrapper = {
    headline: 'Email Password',
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className='formWrap'>
        {errors.length > 0 && (
          <ul>
            {errors.map((err, index) => (
              <li key={index}>{err}</li>
            ))}
          </ul>
        )}

        <form onSubmit={handleSubmit}>
          <FormInput
            type='email'
            name='email'
            value={email}
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button type='submit'>Email Password</Button>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default withRouter(EmailPassword);
