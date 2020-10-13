import React, { useState, useEffect } from 'react'
import ContactsList from '../components/contacts/contacts-list'
import { RemoteData, notAsked, loading } from '../utils/remote-data';
import { getContacts, createContact, updateContact, deleteContact } from '../api/contact';
import LoadingSpinner from '../components/common/loading-spinner';
import AddContactModal from '../components/contacts/add-contact-modal';
import { useToasts } from 'react-toast-notifications';
import ContactDetailsModal from '../components/contacts/contact-details-modal';
import '../styles/contacts.css';

const ContactsContainer = () => {
  const { addToast } = useToasts();
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [contacts, setContacts] = useState<RemoteData<any>>(notAsked());
  const [showAddContactModal, setShowAddContactModal] = useState<boolean>(false);
  const [selectedContact, setSelectedContact] = useState<any>(undefined);
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    getContactsAction();
  }, [page])

  const getContactsAction = async (): Promise<void> => {
    setContacts(loading());
    const res = await getContacts(page);
    setContacts(res);

    if(res.status === 'Done'){
      const totalPages = Math.ceil(res.data.data.contacts.count / res.data.data.page_items);
      setTotalPages(totalPages);
    }
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

  const updateContactAction = async (id: string, updatedContact:any): Promise<void> => {
    setShowLoading(true);
    const res = await updateContact(id, updatedContact);
    setShowLoading(false);

    if(res.status === 'Done') {
      getContactsAction();
      addToast(`Contact updated successfully`, {
        appearance: 'success',
        autoDismiss: true
      });
    } else {
      addToast(`Error ${res.errorApi.status}: ${res.errorApi.message}`, {
        appearance: 'error',
        autoDismiss: true
      });
    }
  }

  const deleteContactAction = async (id: string): Promise<void> => {
    setShowLoading(true);
    const res = await deleteContact(id);
    setShowLoading(false);

    if(res.status === 'Done') {
      setSelectedContact(undefined);
      getContactsAction();
      addToast(`Contact deleted successfully`, {
        appearance: 'success',
        autoDismiss: true
      });
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
      <ContactsList contacts={contacts.data.data.contacts.rows} setSelectedContact={setSelectedContact} />
      <div className="pages">
        {[...Array(totalPages)].map((_, idx) => (
          <button key={idx} onClick={() => setPage(idx)}>{idx + 1}</button>
        ))}
      </div>
      <div className='add-contact-btn' onClick={() => setShowAddContactModal(true)}>
        <span>&#43;</span>
      </div>
      {showAddContactModal && <AddContactModal setShow={setShowAddContactModal} createContact={createNewContactAction} />}
      {selectedContact && 
        <ContactDetailsModal 
          contact={selectedContact} 
          closeModal={() => setSelectedContact(undefined)}
          updateContact={updateContactAction}
          deleteContact={deleteContactAction}
        />
      }
    </div>
  )
}

export default ContactsContainer
