// import { useEffect } from 'react';
// import {connect} from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
// import { signoutUser } from '../../redux/User/user.actions';
import { signOutStart } from '../../redux/User/user.actions';
import './styles.scss';
import {Link} from 'react-router-dom';
import {auth} from '../../firebase/utils';

import Logo from '../../assets/logo.png';


// const mapStateToProps = ({ user }) => ({
//   currentUser: user.currentUser
// })

const mapState = ({ user }) => ({
  currentUser: user.currentUser
})


const Header = (props) => {
  // const {currentUser} = props;
  const {currentUser} = useSelector(mapState);
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

        <div className='callToActions'>
          {currentUser && (
            <ul>
              <li>
                <Link to='/dashboard'>My Account</Link>
              </li>
              <li>
                {/* <span onClick={() => auth.signOut()}>LogOut</span> */}
                {/* <span onClick={handleSignOut}>LogOut</span> */}
                <span onClick={handleSignOut}>LogOut</span>
              </li>
            </ul>
          )}

          {!currentUser && (
            <ul>
              <li>
                <Link to='/registration'>Register</Link>
              </li>
              <li>
                <Link to='/login'>Login</Link>
              </li>
            </ul>
          )}  
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
