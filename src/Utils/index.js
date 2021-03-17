
export const checkUserIsAdmin = currentUser => {
   // see if user exist. If so, does it have the userRoles array
  if(!currentUser || !Array.isArray(currentUser.userRoles)) {
    console.log('No currentUser or not include userRoles')
    return false; 
  } 


  const { userRoles } = currentUser;
  if (userRoles.includes('admin')) {
    console.log('Admin role')
    return true;  // see if user is an admin
  }

  return false;
}