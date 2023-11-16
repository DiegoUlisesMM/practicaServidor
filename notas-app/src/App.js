import React, { useState, useEffect } from 'react';
import axios from 'axios';

const containerStyle = {
  maxWidth: '600px',
  margin: '0 auto',
  padding: '20px',
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '10px',
  border: '1px solid #ccc',
  borderRadius: '4px',
};

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const ulStyle = {
  listStyle: 'none',
  padding: '0',
};

const liStyle = {
  border: '1px solid #ccc',
  borderRadius: '4px',
  padding: '10px',
  marginBottom: '10px',
  backgroundColor: '#fff',
  boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
};

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: '', description: '' });

  useEffect(() => {
    axios.get('http://localhost:3000/api/note')
      .then((response) => setNotes(response.data))
      .catch((error) => console.error('Error fetching notes:', error));
  }, []);
  
  const handleNoteSubmit = () => {
    if (newNote.title.trim() === '') {
      alert('El título no puede estar vacío.');
      return;
    }
    if (newNote.description.trim() === '') {
      alert('La nota no puede estar vacía.');
      return;
    }

    axios.post('http://localhost:3000/api/note', newNote)
      .then((response) => {
        setNotes([...notes, response.data]);
        setNewNote({ title: '', description: '' });
      })
      .catch((error) => console.error('Error creating note:', error));
  };

  return (
    <div style={containerStyle} className="App">
      <header className="App-header">
        <form>
          <input
            type="description"
            placeholder="Título"
            style={inputStyle}
            value={newNote.title}
            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
          />
          <input
            type="description"
            placeholder="descriptiono de la nota"
            style={inputStyle}
            value={newNote.description}
            onChange={(e) => setNewNote({ ...newNote, description: e.target.value })}
          />
          <button type="button" style={buttonStyle} onClick={handleNoteSubmit}>
            Crear nota
          </button>
        </form>
        {notes.length === 0 ? (
          <p>No hay notas disponibles.</p>
        ) : (
          <ul style={ulStyle}>
            {notes.map((note) => (
              <li key={note._id} style={liStyle}>
                <h3>{note.title}</h3>
                <p>{note.description}</p>
              </li>
            ))}
          </ul>
        )}
      </header>
    </div>
  );
}

export default App;
