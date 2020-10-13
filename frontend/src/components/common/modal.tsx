import React from 'react'
import '../../styles/modal.css';

type Props = {
  children: JSX.Element | JSX.Element[];
}

const Modal: React.FC<Props> = ({ children }) => {
  return (
    <div className='overlay'>
      <div className="content">
        {children}
      </div>
    </div>
  )
}

export default Modal
