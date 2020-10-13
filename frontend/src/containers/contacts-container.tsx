import React, { useState, useEffect } from 'react'
import ContactsList from '../components/contacts/contacts-list'
import { RemoteData, notAsked, loading } from '../utils/remote-data';
import { getContacts, createContact } from '../api/contact';
import LoadingSpinner from '../components/common/loading-spinner';
import AddContactModal from '../components/contacts/add-contact-modal';
import { useToasts } from 'react-toast-notifications';
import '../styles/contacts.css';
import ContactDetailsModal from '../components/contacts/contact-details-modal';

const ContactsContainer = () => {
  const { addToast } = useToasts();
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [contacts, setContacts] = useState<RemoteData<any>>(notAsked());
  const [showAddContactModal, setShowAddContactModal] = useState<boolean>(false);
  const [selectedContact, setSelectedContact] = useState<any>(undefined);

  useEffect(() => {
    if(contacts.status === 'Not Asked'){
      getContactsAction();
    }
  }, [])

  const getContactsAction = async (): Promise<void> => {
    setContacts(loading());
    const res = await getContacts();
    setContacts(res);
  }

  const createNewContactAction = async (formResult: any): Promise<void> => {
    setShowLoading(true);
    const res = await createContact(formResult);
    setShowLoading(false);

    if(res.status === 'Done') {
      getContactsAction();
      addToast(`Contact added!`, {
        appearance: 'success',
        autoDismiss: true
      });
      setShowAddContactModal(false);
    } else {
      addToast(`Error ${res.errorApi.status}: ${res.errorApi.message}`, {
        appearance: 'error',
        autoDismiss: true
      });
    }
  }

  return contacts.status !== 'Done' || showLoading ? (
    <LoadingSpinner />
  ) : (
    <div className='contents'>
      <h1>Contacts</h1>
      <ContactsList contacts={contacts.data.data} setSelectedContact={setSelectedContact} />
      <div className='add-contact-btn' onClick={() => setShowAddContactModal(true)}>
        <span>&#43;</span>
      </div>
      {showAddContactModal && <AddContactModal setShow={setShowAddContactModal} createContact={createNewContactAction} />}
      {selectedContact && <ContactDetailsModal contact={selectedContact} hide={() => setSelectedContact(undefined)} />}
    </div>
  )
}

export default ContactsContainer
