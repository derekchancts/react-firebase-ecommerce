import React, {useState} from 'react';
import {withRouter} from 'react-router-dom';
import './stytles.scss';
import {auth} from '../../firebase/utils';

import AuthWrapper from '../AuthWrapper';
import FormInput from '../forms/FormInput';
import Button from '../forms/Button';

const EmailPassword = (props) => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // const { email } = this.state;
      const config = {
        url: 'http://localhost:3000/login',
      };

      await auth
        .sendPasswordResetEmail(email, config)
        .then(() => {
          console.log('Password Reset');
          // window.location.replace("http://localhost:3000/login")
          props.history.push('/LOGIN');
        })
        .catch(() => {
          const err = ['Email not found. Please try again'];
          setErrors(err);
          // this.setState({
          //   errors: err
          // })
        });
    } catch (error) {
      console.log(error);
    }
  };

  // const {email, errors} = this.state;

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
