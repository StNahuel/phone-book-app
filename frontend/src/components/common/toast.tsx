import React from 'react'


const Toast: React.FC<any> = ({ appearance = 'error', children, onDismiss }) => {
  return (
    <div className="toast">
      <div className={`text-container ${appearance}`}>{children}</div>
    </div>
  )
}

export default Toast
