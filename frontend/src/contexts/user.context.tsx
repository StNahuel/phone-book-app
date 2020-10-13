import React, { useState, useEffect, createContext, Dispatch, SetStateAction } from 'react'
import { RemoteData, notAsked, loading, done } from '../utils/remote-data';
import { login } from '../api/user';
import Cookies from 'js-cookie';

type UserContextProps = {
  user: RemoteData<any>;
  setUserCredentials: Dispatch<SetStateAction<any>> | undefined;
}

const UserContext = createContext<UserContextProps>
({ 
  user: notAsked(), 
  setUserCredentials: undefined 
});

const User: React.FC<any> = (props) => {
  const [user, setUser] = useState<RemoteData<any>>(notAsked());
  const [userCredentials, setUserCredentials] = useState(undefined);

  useEffect(() => {
    const userData: any = Cookies.getJSON('loggedUser');
    if(userData){
      if(userData){
        setUser(done(userData))
      }
    }
  }, [])

  useEffect(() => {
    if(userCredentials) {
      fetchUserData(userCredentials);
    }
  }, [userCredentials])
  
  const fetchUserData = async (userCredentials: any): Promise<void> => {
    setUser(loading());
    const res = await login(userCredentials);
    if(res.status === 'Done'){
      const now = new Date();
      const ms = 36000;
      Cookies.set('loggedUser', JSON.stringify(res.data.data), { expires: now.getTime() + (ms*1000) });
    }
    setUser(res);
  }

  return (
    <UserContext.Provider value={{ user, setUserCredentials }}>
      {props.children}
    </UserContext.Provider>
  )
};

export { User, UserContext };