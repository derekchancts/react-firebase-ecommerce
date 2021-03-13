import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {withRouter} from 'react-router-dom';
import { signUpUser, resetAllAuthForms } from '../../redux/User/user.actions';
import './styles.scss';

// import {auth, handleUserProfile} from '../../firebase/utils';
import AuthWrapper from '../AuthWrapper';
import FormInput from '../forms/FormInput';
import Button from '../forms/Button';


const mapState = ({ user }) => ({
  signUpSuccess: user.signUpSuccess,
  signUpError: user.signUpError
})

const Signup = (props) => {
  const { signUpSuccess, signUpError } = useSelector(mapState);
  const dispatch = useDispatch();

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const resetValues = () => {
    setDisplayName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrors([]);
  };


  useEffect(() => {
    if(signUpSuccess) {
      resetValues();
      dispatch(resetAllAuthForms());
      props.history.push('/')
    }
  }, [signUpSuccess])


  useEffect(() => {
    if (Array.isArray(signUpError) && signUpError.length > 0) {
      setErrors(signUpError)
    }
  },[signUpError])


  // const handleSubmit = async (e) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(signUpUser({displayName, email, password, confirmPassword}));
   
    // if (password !== confirmPassword) {
    //   const err = ["Password Don't match"];
    //   setErrors(err);
    //   return;
    // }

    // try {
    //   const {user} = await auth.createUserWithEmailAndPassword(email, password);

    //   await handleUserProfile(user, {displayName});
    //   resetValues();
    //   props.history.push('/')

    // } catch (err) {
    //   console.log(err);
    // }
  };

 

  const configAuthWrapper = {
    headline: 'Signup',
  };

  return (
    // <div className='signup'>
    //   <div className='wrap'>
    //     <h2>Signup</h2>

    //     {errors.length > 0 && (
    //       <ul>
    //         {errors.map((err, index) => {
    //           return (
    //             <li key={index}>
    //               {err}
    //             </li>
    //           )
    //         })}
    //       </ul>
    //     )}

    //     <div className='formWrap'>
    //       <form onSubmit={this.handleSubmit}>
    //         <FormInput
    //           type='text'
    //           name='displayName'
    //           value={displayName}
    //           placeholder='Full name'
    //           onChange={this.handleChange}
    //           // autocomplete="off"
    //         />
    //         <FormInput
    //           type='email'
    //           name='email'
    //           value={email}
    //           placeholder='Email'
    //           onChange={this.handleChange}
    //         />
    //         <FormInput
    //           type='password'
    //           name='password'
    //           value={password}
    //           placeholder='Password'
    //           onChange={this.handleChange}
    //         />
    //         <FormInput
    //           type='password'
    //           name='confirmPassword'
    //           value={confirmPassword}
    //           placeholder='Confirm Password'
    //           onChange={this.handleChange}
    //         />
    //         <Button type='submit'>Register</Button>
    //       </form>
    //     </div>
    //   </div>
    // </div>

    <AuthWrapper {...configAuthWrapper}>
      <div className='formWrap'>
        {errors.length > 0 && (
          <ul>
            {errors.map((err, index) => {
              return <li key={index}>{err}</li>;
            })}
          </ul>
        )}

        <form onSubmit={handleSubmit}>
          <FormInput
            type='text'
            name='displayName'
            value={displayName}
            placeholder='Full name'
            onChange={(e) => setDisplayName(e.target.value)}
            // autocomplete="off"
          />
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
          <FormInput
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            placeholder='Confirm Password'
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button type='submit'>Register</Button>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default withRouter(Signup);
