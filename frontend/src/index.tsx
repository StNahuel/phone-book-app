import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { User } from './contexts/user.context';
import { ToastProvider } from 'react-toast-notifications';
import Toast from './components/common/toast';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastProvider components={{ Toast: Toast }}>
        <User>
          <App />
        </User>
      </ToastProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
