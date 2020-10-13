import React from 'react'
import Modal from '../common/modal';

type Props = {
  hide: () => void;
  contact: any;
}

const ContactDetailsModal: React.FC<Props> = ({ hide, contact }) => {
  return (
    <Modal>
      <p>{contact.first_name}</p>
      <p>{contact.last_name}</p>
      <p>{contact.phone}</p>
      <button onClick={() => hide()}>Close</button>
    </Modal>
  )
}

export default ContactDetailsModal
