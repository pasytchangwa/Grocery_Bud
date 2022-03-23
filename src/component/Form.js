import React from 'react'
import Alert from './Alert'
import List from './List'

const Form = ({handleChange, handleSubmit, showAlert, alert, elements, grocery, edit, handleDelete, handleEdit}) => {
  return (
    <>
    <form onSubmit={handleSubmit} className="grocery-form">
      {alert.show && <Alert {...alert} removeAlert={() => showAlert()} elements={elements}/>}

      <h3>grocery list</h3>
      <div className='form-control'>
        <input type="text" className="grocery" placeholder='e.g. eggs' value={grocery} onChange={handleChange} />
        <button className="submit-btn" type='submit'>
          {edit ? 'edit' : 'submit'}
        </button>
      </div>
    </form>
    {elements.length > 0 && (
     <div className="grocery-container">
        <List items={elements} handleDelete={handleDelete} handleEdit={handleEdit}/>
     </div>
    )}
    </>
  )
}

export default Form;