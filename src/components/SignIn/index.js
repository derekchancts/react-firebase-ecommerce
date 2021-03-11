import React, {useState} from 'react';
import {Link, withRouter}from 'react-router-dom'

import './styles.scss';
import {auth, signInWithGoogle} from '../../firebase/utils';

import AuthWrapper from '../AuthWrapper';
import FormInput from '../forms/FormInput';
import Button from '../forms/Button';

// const initialState = {
//   email: '',
//   password: '',
// };

const SignIn = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  // const handleChange = (e) => {
    // const {name, value} = e.target;
    // this.setState({
    //   [name]: value,
    // });
    // this.setState({
    //   [e.target.name]: e.target.value
    // })

  //   if (e.target.name === "email") {
  //     setEmail(e.target.value)
  //   }

  //   if (e.target.name === "password") {
  //     setPassword(e.target.value)
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const {email, password} = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      // const { user } = await auth.signInWithEmailAndPassword(email, password);
      // console.log(user)
      // this.setState({
      //   ...initialState,
      // });
      setEmail('');
      setPassword('');

      props.history.push('/');

    } catch (error) {
      console.log(error);
    }
  };

    // const {email, password} = this.state;

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
                <Button onClick={signInWithGoogle}>Sign in with Google</Button>
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

export default withRouter(SignIn);
