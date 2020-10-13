import React, { useState, useEffect, useContext } from 'react'
import LoginForm from '../components/login/login-form';
import Logo from '../assets/logo-12.svg';
import '../styles/login.css';
import { UserContext } from '../contexts/user.context';
import LoadingSpinner from '../components/common/loading-spinner';
import { useToasts } from 'react-toast-notifications';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';

const LoginContainer = () => {
  const { addToast } = useToasts();
  const history = useHistory();
  const { user, setUserCredentials } = useContext(UserContext);
  const [showLoading, setShowLoading] = useState<boolean>(false);

  useEffect(() => {
    let cookies = Cookies.get('loggedUser');
    if(cookies){
      const userData = JSON.parse(cookies);
      if (userData.token){
        history.push('/contacts');
      }
    }
  }, [])


  useEffect(() => {
    if(user){
      if (user.status === 'Loading'){
        setShowLoading(true);

      } else if (user.status === 'Done') {
        setShowLoading(false);
        history.push('/contacts');

      } else if (user.status === 'Failed') {
        setShowLoading(false);
        addToast(`User not found`, {
          appearance: 'error',
          autoDismiss: true
        })
      }
    }
  }, [user])

  const onLogin = (formResult: any) => {
    if (setUserCredentials){
      setUserCredentials(formResult);
    }
  }

  return (
    <section>
      <div className="content">
        <div className="top">
          <figure>
            <img src={Logo} alt="Phone Book Logo"/>
          </figure>
          <h1>Phone Book App</h1>
        </div>
        <LoginForm onLogin={onLogin}/>
        
        <div className="bottom-buttons">
          <button type="button">
            Register
          </button>
          <button type="button">
            Forgot Password
          </button>
        </div>
      </div>

      {showLoading && <LoadingSpinner />}
    </section>
  )
}

export default LoginContainer
