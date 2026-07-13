import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import List from './components/List';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [itemToEdit, setItemToEdit] = useState(null);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('items')) || [
      { id: 1, value: 'Leche' },
      { id: 2, value: 'Pan' },
      { id: 3, value: 'Harina' },
    ];
    setItems(storedItems);
  }, []);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const addOrUpdateItem = (value) => {
    if (itemToEdit) {
      setItems(items.map(item => item.id === itemToEdit.id ? { ...item, value } : item));
      setItemToEdit(null);
    } else {
      setItems([...items, { id: Date.now(), value }]);
    }
  };

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const editItem = (item) => {
    setItemToEdit(item);
  };

  // Nueva función: elimina todos los elementos
  const deleteAll = () => {
    setItems([]);
  };

  return (
    <div className="App">
      <h1>Listas </h1>
      <Form addOrUpdateItem={addOrUpdateItem} itemToEdit={itemToEdit} />
      <List items={items} deleteItem={deleteItem} editItem={editItem} />
      {items.length > 0 && (
        <button className="delete-all-btn" onClick={deleteAll}>
          Eliminar todo
        </button>
      )}
    </div>
  );
}

export default App;