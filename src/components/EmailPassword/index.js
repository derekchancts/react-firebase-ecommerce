import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import './stytles.scss';
import {auth} from '../../firebase/utils';

import AuthWrapper from '../AuthWrapper';
import FormInput from '../forms/FormInput';
import Button from '../forms/Button';

const initialState = {
  email: '',
  errors: []
};

class EmailPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };


  handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const { email } = this.state;
      const config = {
        url: 'http://localhost:3000/login'
      };

      await auth.sendPasswordResetEmail(email, config)
        .then(() => {
          console.log('Password Reset');
          // window.location.replace("http://localhost:3000/login")
          this.props.history.push('/LOGIN');
        })
        .catch(() => {
          const err = ['Email not found. Please try again'];
          this.setState({
            errors: err
          })  
        });

    } catch (error) {
      console.log(error)
    }    
  }


  render() {
    const {email, errors} = this.state;

    const configAuthWrapper = {
      headline: 'Email Password',
    };


    return (
      <AuthWrapper {...configAuthWrapper}>
        <div className='formWrap'>

          {errors.length > 0 && (
            <ul>
              {errors.map((err, index) => (
                <li key={index}>
                  {err}
                </li>
              ))}
            </ul>
          )}

          <form onSubmit={this.handleSubmit}>
            <FormInput
              type='email'
              name='email'
              value={email}
              placeholder='Email'
              onChange={this.handleChange}
            />

            <Button type='submit'>Email Password</Button>
          </form>
        </div>
      </AuthWrapper>
    );
  }
}

export default withRouter(EmailPassword);
