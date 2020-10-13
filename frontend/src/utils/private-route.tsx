import React, { useContext, useEffect } from 'react'
import { UserContext } from '../contexts/user.context'
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute: React.FC<any> = (props) => {
  const { user } = useContext(UserContext);

  if(user.status === 'Done'){
    return <Route {...props} />;
  } else if (user.status === 'Failed' || user.status === 'Not Asked'){
    return <Redirect to='/login' />;
  } else {
    return null;
  }

}

export default PrivateRoute;
