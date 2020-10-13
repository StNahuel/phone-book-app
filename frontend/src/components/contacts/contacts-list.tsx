import React, { SetStateAction, Dispatch } from 'react'
import { useHistory } from 'react-router-dom';

type Props = {
  contacts: any[];
  setSelectedContact: Dispatch<SetStateAction<any>>;
}

const ContactsList: React.FC<Props> = ({ contacts, setSelectedContact }) => {
  return (
    <div className="contacts-table">
      <ul className="columns">
        <li>Name</li>
        <li>Phone</li>
      </ul>
      { contacts.map((contact, idx) => (
        <ul key={idx} className="row" onClick={() => setSelectedContact(contact)}>
          <li>{`${contact.first_name} ${contact.last_name}`}</li>
          <li>{contact.phone}</li>
        </ul>
      ))}
    </div>
  )
}

export default ContactsList
