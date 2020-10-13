import React, { Dispatch, SetStateAction } from 'react'
import '../../styles/modal.css';

type Props = {
  children: JSX.Element;
  setShow: Dispatch<SetStateAction<boolean>>;
}

const Modal: React.FC<Props> = ({ children, setShow }) => {
  return (
    <div className='overlay'>
      <div className="content">
        {children}
      </div>
    </div>
  )
}

export default Modal
