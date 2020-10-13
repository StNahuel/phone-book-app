import { get, post } from './base';
import { RemoteData, done, failed, Done, Failed } from '../utils/remote-data';

export const getContacts = async (): Promise<RemoteData<any>> => {
  try {
    const res = await get(`/contacts`);
    return done(res.data);
  } catch (error) {
    return failed(error);
  }
}

export const createContact = async (contactForm: any): Promise<Done<any> | Failed> => {
  try {
    const res = await post(`/contacts`, contactForm);
    return done(res.data);
  } catch (err) {
    return failed(err);
  }
}