import React from 'react'
import { RemoteData } from '../../utils/remote-data';

type Props = {
  contacts: RemoteData<any>;
}

const ContactsList: React.FC<Props> = ({ contacts }) => {
  console.log('CONTACTS: ', contacts);

  return (
    <ul>
      <li>{contacts.status}</li>
    </ul>
  )
}

export default ContactsList
