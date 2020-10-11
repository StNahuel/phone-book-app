import { Router } from 'express';
import { getContacts, createContact, getContactById, deleteContact } from './contact.controller';

const contactsRoute: Router = Router();

contactsRoute.post('/', createContact);
contactsRoute.get('/', getContacts);
contactsRoute.get('/:id', getContactById);
contactsRoute.delete('/:id', deleteContact);

export default contactsRoute;