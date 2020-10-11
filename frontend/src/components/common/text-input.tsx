import React from 'react'
import { useField, FieldAttributes } from 'formik';

type Props = {
  name: string;
  label: string;
  type?: string;
} & FieldAttributes<any>;

const TextInput: React.FC<Props> = (props) => {
  const [field, meta] = useField(props);

  return (
    <div className='input-wrapper'>
      <label htmlFor={props.name}>{props.label}</label>
      <input 
        {...field}
        {...props}
        type={props.type ? props.type : 'text'}
      />
      {meta.touched && meta.error && <span>{meta.error}</span>}
    </div>
  )
}

export default TextInput
