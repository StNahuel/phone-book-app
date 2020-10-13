import { get, post, put, destroy } from './base';
import { RemoteData, done, failed, Done, Failed } from '../utils/remote-data';

export const getContacts = async (page: number): Promise<RemoteData<any>> => {
  try {
    const res = await get(`/contacts?page=${page}`);
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

export const updateContact = async (id: string, contactForm: any): Promise<Done<any> | Failed> => {
  try {
    console.log('will update with: id - ', id, contactForm);
    const res = await put(`/contacts/${id}`, contactForm);
    return done(res.data);
  } catch (err) {
    return failed(err);
  }
}

export const deleteContact = async (id: string): Promise<Done<any> | Failed> => {
  try {
    const res = await destroy(`/contacts/${id}`);
    return done(res.data);
  } catch (err) {
    return failed(err);
  }
}