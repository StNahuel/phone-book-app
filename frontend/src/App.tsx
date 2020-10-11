import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import LoginContainer from './containers/login-container';
import './styles/app.css';
import './styles/reset.css';

const App = () => {
  return (
    <Switch>
      <Route exact path="/login" component={LoginContainer} />
      {/* <Route exact path="/contacts" component={ContactsContainer} /> */}
      {/* <Route exact path="/contacts/:id" component={ContactDetails} /> */}
      <Redirect from='/' to='/login' />
    </Switch>
  );
}

export default App;
