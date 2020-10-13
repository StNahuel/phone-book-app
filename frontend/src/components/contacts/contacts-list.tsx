import React, { useMemo } from 'react'
import { useHistory } from 'react-router-dom';

type Props = {
  contacts: any[];
}

const ContactsList: React.FC<Props> = ({ contacts }) => {
  const history = useHistory();

  return (
    <div className="contacts-table">
      <ul className="columns">
        <li>Name</li>
        <li>Phone</li>
      </ul>
      { contacts.map((c, idx) => (
        /*onClick={() => history.push(`/contacts/${c.id}`)}*/
        <ul key={idx} className="row" >
          <li>{`${c.first_name} ${c.last_name}`}</li>
          <li>{c.phone}</li>
        </ul>
      ))}
    </div>
  )
}

export default ContactsList
