import React, { Dispatch, SetStateAction } from 'react'
import Modal from '../common/modal';
import { Formik, Form } from 'formik';
import { newContactValidationSchema } from '../../utils/form-validation';
import TextInput from '../common/text-input';

type Props = {
  setShow: Dispatch<SetStateAction<boolean>>;
  createContact: (formResult: any) => void;
}

const AddContactModal: React.FC<Props> = ({ setShow, createContact }) => {
  
  const newContactInitialValues = {
    first_name: '',
    last_name: '',
    phone: '',
  }
  
  return (
    <Formik
      initialValues={newContactInitialValues}
      validationSchema={newContactValidationSchema}
      onSubmit={(values, { setSubmitting }) => {
        createContact(values);
        setSubmitting(false);
      }}
    >
      <Modal setShow={setShow}>
        <Form className='content'>
          <h2>New Contact</h2>
          <div className="fields">
            <TextInput name='first_name' label='First Name:' />
            <TextInput name='last_name' label='Last Name:' />
            <TextInput name='phone' label='Phone:' />
          </div>
          <div className='buttons'>
            <button type='button' onClick={() => setShow(false)}>Cancel</button>
            <button type='submit'>Save</button>
          </div>
        </Form>
      </Modal>
    </Formik>
  )
}

export default AddContactModal
