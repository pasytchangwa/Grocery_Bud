import React, {useState, useEffect} from "react";
import Form from "./component/Form";

const getLocalStorage = () => {
  let list = localStorage.getItem('elements');
  if (list) {
    return (list = JSON.parse(localStorage.getItem('elements')))
  } else {
    return [];
  }
}

const App = () => {
  const [grocery, setGrocery] = useState('');
  const [elements, setElements] = useState(getLocalStorage());
  const [alert, setAlert] = useState({show: false, msg: '', type: ''});
  const [edit, setEdit] = useState(false);
  const [editID, setEditID] = useState(null);

  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({show, type, msg});
  }

  const handleChange = (e) => {
    setGrocery(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!grocery) {
      showAlert(true, 'danger', 'please a value is required');
    } else if (grocery && edit) {
      setElements(
        elements.map((element) => {
          if (element.id === editID) {
            return {...element, title:grocery}
          }
          return element;
        })
      );
      setGrocery('');
      setEditID(null);
      setEdit(false);
      showAlert(true, 'success', 'grocery had been edited');
    } else {
      showAlert(true, 'success', 'grocery added to the list');
      const newElement = {id: new Date().getTime().toString(), title: grocery}

      setElements([...elements, newElement])
      setGrocery('');
    }
  };

  const handleEdit = (id) => {
    const toEdit = elements.find(element => element.id === id);
    setEdit(true);
    setEditID(id);
    setGrocery(toEdit.title)
  }

  const handleDelete = (id) => {
    showAlert(true, 'danger', 'A grocery deleted')
    const newElements = elements.filter((element) => element.id !== id)
    setElements(newElements);
  }

  const removeElements= () => {
    showAlert(true, 'danger', 'empty grocery list')
    setElements([])
  }

  useEffect(() => {
    localStorage.setItem('elements', JSON.stringify(elements))
  }, [elements]);

  return (
    <section className="section-center">
      <Form
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        alert={alert}
        showAlert={showAlert}
        elements={elements}
        grocery={grocery}
        edit={edit} 
        handleDelete={handleDelete}
        handleEdit={handleEdit}>
      </Form>
      <button className="clear-btn" onClick={removeElements}>Clear items</button>
    </section>
  )
}

export default App;
