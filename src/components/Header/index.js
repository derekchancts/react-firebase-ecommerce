// import { useEffect } from 'react';
// import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import { signoutUser } from '../../redux/User/user.actions';
import { signOutStart } from '../../redux/User/user.actions';
import { selectCartItemsCount } from '../../redux/Cart/cart.selectors';
import './styles.scss';
// import {auth} from '../../firebase/utils';
import Logo from '../../assets/logo.png';


// const mapStateToProps = ({ user }) => ({
//   currentUser: user.currentUser
// })

// const mapState = ({ user, cartData }) => ({
const mapState = (state) => ({
  currentUser: state.user.currentUser,
  totalNumCartItems: selectCartItemsCount(state)
})


const Header = (props) => {
  // const {currentUser} = props;
  const { currentUser, totalNumCartItems } = useSelector(mapState);
  const dispatch = useDispatch();


  const handleSignOut = () => {
    // dispatch(signoutUser())
    dispatch(signOutStart())
  }


  return (
    <header className='header'>
      <div className='wrap'>
        <div className='logo'>
          <Link to='/'>
            <img src={Logo} alt='SimpleTut LOGO' />
          </Link>
        </div>

        <nav>
          <ul>
            <li>
              <Link to="/">
                Home
              </Link>
            </li>
            <li>
              <Link to="/search">
                Search
              </Link>
            </li>
          </ul>
        </nav>

        <div className='callToActions'>


        <ul>

          <li>
            <Link>
              Your Cart ({totalNumCartItems})
            </Link>
          </li>

          {currentUser && [
            <li>
              <Link to='/dashboard'>My Account</Link>
            </li>,
            <li>
              <span onClick={handleSignOut}>LogOut</span>
            </li>
          ]}

          {!currentUser && [
            <li>
              <Link to='/registration'>Register</Link>
            </li>,
            <li>
              <Link to='/login'>Login</Link>
            </li>
          ]}  

        </ul>


        {/* {currentUser && (
            <ul>
              <li>
                <Link to='/dashboard'>My Account</Link>
              </li>
              <li>
                <span onClick={handleSignOut}>LogOut</span>
              </li>
            </ul>
          )} */}


          {/* {!currentUser && (
            <ul>
              <li>
                <Link to='/registration'>Register</Link>
              </li>
              <li>
                <Link to='/login'>Login</Link>
              </li>
            </ul>
          )}   */}


        </div>
      </div>
    </header>
  );
};

// Header.defaultProps = {
//   currentUser: null,
// };

// const mapStateToProps = ({ user }) => ({
//   currentUser: user.currentUser
// })

// export default connect(mapStateToProps, null)(Header);
export default Header;
