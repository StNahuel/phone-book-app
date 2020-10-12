import { post } from './base';
import { RemoteData, done, failed } from '../utils/remote-data';

export const login = async (userCredentials: any): Promise<RemoteData<any>> => {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };
    const res = await post(`/user/authenticate`, userCredentials, { headers });
    return done(res.data);
  } catch (err) {
    return failed(err);
  }
}