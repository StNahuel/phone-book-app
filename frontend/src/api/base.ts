import axios from 'axios';
import Cookie from 'js-cookie';

const apiClient = axios.create({
  baseURL: 'http://localhost:5400',
});

apiClient.interceptors.request.use((config: any) => {
  const userData = Cookie.getJSON('loggedUser');
  let token;
  if(userData){
    token = userData.token;
  }
  return ({
  ...config,
    headers: token ? {
      'Authorization': token,
      'Content-Type': 'application/json'
    } : {
      'Content-Type': 'application/json'
    } 
  })

})

const { get, post, put, delete: destroy } = apiClient;
export { get, post, put, destroy };