import React, {useEffect} from 'react';
// import {Route, Switch, Redirect} from 'react-router-dom';
import {Route, Switch} from 'react-router-dom';
// import {auth, handleUserProfile} from './firebase/utils';

// IMPORT REDUX
// import {connect} from 'react-redux';
// import { useSelector, useDispatch } from 'react-redux';
// import { setCurrentUser, checkUserSession } from './redux/User/user.actions';
import { useDispatch } from 'react-redux';
import { checkUserSession } from './redux/User/user.actions';

// HOC
import WithAuth from './hoc/withAuth';

// LAYOUTS
import MainLayout from './layouts/MainLayout';
import HomepageLayout from './layouts/HomepageLayout';

// PAGES
import Homepage from './pages/Homepage';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Recovery from './pages/Recovery';
import Dashboard from './pages/Dashboard'; 
import './default.scss';

const App = (props) => {
  // authListener = null;
  // const {setCurrentUser, currentUser} = props;
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(checkUserSession());
  },[])


  /*
  useEffect(() => {
    const authListener = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot((snapshot) => {
          dispatch(setCurrentUser({
            id: snapshot.id,
            ...snapshot.data(),
          }));
        });
      }
      dispatch(setCurrentUser(userAuth)); // can pass userAuth object here. As by default, it will return
                                // null if there's no user
    });

    return () => {
      authListener(); // onAuthStateChanged returns a function that we can call to unsubsribe the auth event listener
    };
  }, []);
  */


  /*
  componentDidMount() {
    const {setCurrentUser} = props;

    this.authListener = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot((snapshot) => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data(),
          });
        });
      }
      setCurrentUser(userAuth); // can pass userAuth object here. As by default, it will return
      // null if there's no user
    });
  }

  componentWillUnmount() {
    this.authListener();
  }
  */


  return (
    <div className='App'>
      <Switch>
        {/* <Route exact path='/' component={Homepage} />
          <Route path='/registration' component={Registration} /> */}

        <Route
          exact
          path='/'
          render={() => (
            <HomepageLayout>
              <Homepage />
            </HomepageLayout>
          )}
        />

        <Route
          path='/registration'
          render={() => (
            <MainLayout>
              <Registration />
            </MainLayout>
          )}
        />

        <Route
          path='/login'
          render={() => (
            <MainLayout>
              <Login />
            </MainLayout>
          )}
        />
        
        <Route
          path='/recovery'
          render={() =>
            <MainLayout>
              <Recovery />
            </MainLayout>
          }
        />
        <Route
          path='/dashboard'
          render={() =>
            <WithAuth>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </WithAuth>
          }
        />

      </Switch>
    </div>
  );
};

// const mapStateToProps = ({user}) => ({
//   currentUser: user.currentUser,
// });

// const mapDispatchToProps = (dispatch) => ({
//   setCurrentUser: (user) => dispatch(setCurrentUser(user)),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(App);
export default App;
