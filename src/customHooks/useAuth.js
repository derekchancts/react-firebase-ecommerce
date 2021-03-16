import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


// React Hook "useSelector" cannot be called at the top level. React Hooks must be called in a 
// React function component or a custom React Hook function  react-hooks/rules-of-hooks

// const mapState = useSelector(({ user }) => ({
//   currentUser: user.currentUser
// }))


const mapState = ({ user }) => ({
  currentUser: user.currentUser
});

const useAuth = props => {
  const { currentUser } = useSelector(mapState);
  const history = useHistory()

  useEffect(() => {
    if(!currentUser) {
      history.push('/login');
    }
  },[currentUser]);

  return currentUser;
};

export default useAuth;


