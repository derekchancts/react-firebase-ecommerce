
import { useAdminAuth } from '../customHooks';

// const WithAdminAuth = props => props.children;  // immediately returning/rendering the children
const WithAdminAuth = props => useAdminAuth(props) && props.children;  // see if user exist and so, if the role is admin

export default WithAdminAuth;