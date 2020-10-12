import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { UserContext } from './contexts/user.context';
import LoginContainer from './containers/login-container';
import ContactsContainer from './containers/contacts-container';
import './styles/app.css';
import './styles/reset.css';
import PrivateRoute from './utils/private-route';

const App = () => {
  const { user } = useContext(UserContext);

  return (
    <Switch>
      <Route exact path="/login" component={LoginContainer} />
      <PrivateRoute exact path="/contacts" component={ContactsContainer} />
      <Redirect from='/' to='/login' />
    </Switch>
  );
}

export default App;
