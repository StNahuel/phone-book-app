import { Router } from 'express';
import { getContacts, createContact, getContactById, deleteContact, updateContact } from './contact.controller';

const contactsRoute: Router = Router();

contactsRoute.post('/', createContact);
contactsRoute.get('/', getContacts);
contactsRoute.get('/:id', getContactById);
contactsRoute.put('/:id', updateContact);
contactsRoute.delete('/:id', deleteContact);

export default contactsRoute;