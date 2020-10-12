import React, { useState, useEffect } from 'react'
import ContactsList from '../components/contacts/contacts-list'
import { RemoteData, notAsked, loading } from '../utils/remote-data';
import { getContacts } from '../api/client';

const ContactsContainer = () => {
  const [contacts, setContacts] = useState<RemoteData<any>>(notAsked());
  
  useEffect(() => {
    getContactsAction();
  }, [])

  const getContactsAction = async () => {
    setContacts(loading());
    const res = await getContacts();
    setContacts(res);
  }

  return (
    <div>
      <ContactsList contacts={contacts} />
    </div>
  )
}

export default ContactsContainer
