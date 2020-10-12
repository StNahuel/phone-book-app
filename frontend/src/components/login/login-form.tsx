import React from 'react'
import { Formik, Form } from 'formik';
import { loginValidationSchema } from '../../utils/form-validation';
import TextInput from '../common/text-input';

type Props = {
  onLogin: (formResult: any) => void
}

const LoginForm: React.FC<Props> = ({ onLogin }) => {

  const loginInitialValues = {
    email: '',
    password: '',
  }

  return (
    <Formik
      initialValues={loginInitialValues}
      validationSchema={loginValidationSchema}
      onSubmit={(values, { setSubmitting }) => {
        onLogin(values);
        setSubmitting(false);
      }}
    >
      <Form className='login-form'>
        <TextInput label='Email: ' name='email' />
        <TextInput label='Password: ' name='password' type='password' />
        <button type='submit'>Login</button>
      </Form>
    </Formik>
  )
}

export default LoginForm
