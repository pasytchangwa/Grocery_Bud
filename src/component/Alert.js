import React, {useEffect} from 'react'

const Alert = ({type, msg, removeAlert, elements}) => {

  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert()
    }, 1500);
    return () => {
      clearTimeout(timeout);
    }
  }, [elements]);
  return (
    <p className={`alert alert-${type}`}>
     {msg}
    </p>
  )
}

export default Alert