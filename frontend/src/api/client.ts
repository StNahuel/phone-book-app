import { get, post } from './base';
import { RemoteData, done, failed } from '../utils/remote-data';

export const getContacts = async (): Promise<RemoteData<any>> => {
  try {
    const res = await get(`/contacts`);
    return done(res.data);
  } catch (error) {
    return failed(error);
  }
}