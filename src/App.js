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

// COMPONENTS
import AdminToolBar from './components/AdminToolBar';

// HOC
import WithAuth from './hoc/withAuth';
import WithAdminAuth from './hoc/withAdminAuth';

// LAYOUTS
import MainLayout from './layouts/MainLayout';
import HomepageLayout from './layouts/HomepageLayout';
import AdminLayout from './layouts/AdminLayout';
import DashBoardLayout from './layouts/DashboardLayout';

// PAGES
import Homepage from './pages/Homepage';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Recovery from './pages/Recovery';
import Dashboard from './pages/Dashboard'; 
import Admin from './pages/Admin'; 
import Search from './pages/Search'; 
import ProductDetails from './pages/ProductDetails'; 
import Cart from './pages/Cart';
import Payment from './pages/Payment';
import Order from './pages/Order';

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
      <AdminToolBar /> 
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
          exact path="/search" 
          render={() => (
            <MainLayout>
              <Search />
            </MainLayout>
          )}
        /> 

        <Route 
          path="/search/:filterType" 
          render={() => (
            <MainLayout>
              <Search />
            </MainLayout>
          )}
        /> 

        <Route 
          path="/product/:productID" 
          render={() => (
            <MainLayout>
              <ProductDetails />
            </MainLayout>
          )}
        /> 

        <Route 
          path="/cart" 
          render={() => (
            <MainLayout>
              <Cart />
            </MainLayout>
          )}
        /> 

        <Route 
          path="/payment" 
          render={() => (
            <WithAuth>
              <MainLayout>
                <Payment />
              </MainLayout>
            </WithAuth>
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
              <DashBoardLayout>
                <Dashboard />
              </DashBoardLayout>
            </WithAuth>
          }
        />

        <Route 
          path='/order/:orderID'
          render={() => 
            <WithAuth>
              <DashBoardLayout>
                <Order />
              </DashBoardLayout>
            </WithAuth>
          }
        />


         <Route
          path='/admin'
          render={() =>
            <WithAdminAuth>
              <AdminLayout>
                <Admin />
              </AdminLayout>
            </WithAdminAuth>
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
