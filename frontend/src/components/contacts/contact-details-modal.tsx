import React from 'react'
import Modal from '../common/modal';
import { Formik, Form } from 'formik';
import { newContactValidationSchema } from '../../utils/form-validation';
import TextInput from '../common/text-input';

type Props = {
  contact: any;
  closeModal: () => void;
  updateContact: (id: string, updatedContact: any) => Promise<void>;
  deleteContact: (id: string) => Promise<void>;
}

const ContactDetailsModal: React.FC<Props> = ({ closeModal, contact, updateContact, deleteContact }) => {
  
  const updateContactInitialValues = {
    first_name: contact.first_name,
    last_name: contact.last_name,
    phone: contact.phone
  }

  return (
    <Formik
      initialValues={updateContactInitialValues}
      validationSchema={newContactValidationSchema}
      onSubmit={(values, { setSubmitting }) => {
        const valuesToUpdate = {
          first_name: values.first_name,
          last_name: values.last_name,
          phone: values.phone
        }
        updateContact(contact.id, valuesToUpdate);
        setSubmitting(false);
      }}
    >
      <Modal>
        <Form>
          <div className="fields">
            <TextInput name='first_name' label='First Name:' />
            <TextInput name='last_name' label='Last Name:' />
            <TextInput name='phone' label='Phone:' />
          </div>
          <div className="buttons">
            <button onClick={() => closeModal()}>Close</button>
            <button type='submit'>Update</button>
            <button onClick={() => deleteContact(contact.id)}>Delete</button>
          </div>
        </Form>
      </Modal>
    </Formik>
  )
}

export default ContactDetailsModal
