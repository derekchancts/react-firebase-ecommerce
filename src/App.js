import React, { Component } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import { auth, handleUserProfile } from './firebase/utils';

// LAYOUTS
import MainLayout from './layouts/MainLayout';
import HomepageLayout from './layouts/HomepageLayout';

// PAGES
import Homepage from './pages/Homepage';
import Registration from './pages/Registration';
import Login from './pages/Login';
import './default.scss';

const initialState = {
  currentUser: null
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState
    };
  }

  // state = {
  //   currentUser: null
  // }

  authListener = null;

  componentDidMount() {
    this.authListener = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot(snapshot => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          })
        })
      };

      this.setState({
        ...initialState
      });

      // if (!userAuth) {
      //   this.setState({
      //     ...initialState
      //   })
      //   // this.setState({
      //   //   currentUser: null
      //   // })
      // }

      // this.setState({
      //   currentUser: userAuth
      // })

    });
  }

  componentWillUnmount() {
    this.authListener();
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div className='App'>
        <Switch>
          {/* <Route exact path='/' component={Homepage} />
          <Route path='/registration' component={Registration} /> */}
          <Route
            exact
            path='/'
            render={() => !currentUser ? <Redirect to="/login" /> : (
              <HomepageLayout currentUser={currentUser}>
                <Homepage />
              </HomepageLayout>
            )}
          />
          <Route
            path='/registration'
            render={() => currentUser ? <Redirect to="/" /> : (
              <MainLayout currentUser={currentUser}>
                <Registration />
              </MainLayout>
            )}
          />
          <Route
            path='/login'
            render={() => currentUser ? <Redirect to="/" /> : (
              <MainLayout currentUser={currentUser}>
                <Login />
              </MainLayout>
            )}
          />
        </Switch>
      </div>
    );

  }
}

export default App;
