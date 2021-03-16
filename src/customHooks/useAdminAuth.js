import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { checkUserIsAdmin } from '../Utils';


const mapState = ({ user }) => ({
  currentUser: user.currentUser
}) 


const useAdminAuth = props => {
  const { currentUser } = useSelector(mapState);
  console.log(currentUser)
  const history = useHistory();

  useEffect(() => {
    if (!checkUserIsAdmin(currentUser)) {
      history.push('/login');
    }
  }, [currentUser]);

  return currentUser;   // otherwise, we will return the currentUser which will evaluate to TRUE
}


export default useAdminAuth;