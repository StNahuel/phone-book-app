import axios from 'axios';
import Cookie from 'js-cookie';

const apiClient = axios.create({
  baseURL: 'http://localhost:5400',
});

apiClient.interceptors.request.use((config: any) => {
  const userData = Cookie.getJSON('loggedUser');
  if(userData){
    console.log('interceptor has token', userData);
    const token = userData.token;
    return ({
      ...config,
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      }
    })
  }

})

const { get, post, delete: destroy } = apiClient;
export { get, post, destroy };