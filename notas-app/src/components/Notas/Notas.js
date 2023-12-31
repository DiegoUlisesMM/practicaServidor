import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { getToken, onMessage } from 'firebase/messaging';
import { messaging } from '../../firebase' //viene de firebase.js
import { ToastContainer, toast } from 'react-toastify'; //muestra la notificacion push y estilos
import 'react-toastify/dist/ReactToastify.css';

const containerStyle = {
    maxWidth: '650px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#add8e6', // Color de fondo azul claro (tono pastel)
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  };
  
  const inputStyle = {
    width: '90%',
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #87cefa', // Borde azul claro (tono pastel)
    borderRadius: '4px',
  };
  
  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#007bff', // Azul oscuro
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
    border: '1px solid #87cefa', // Borde azul claro (tono pastel)
    borderRadius: '4px',
    padding: '10px',
    marginBottom: '10px',
    backgroundColor: '#fff',
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
  };
  
    
    const getTokenNotification = async () => {
        //Funcion para obtener el token
        const token = await getToken(messaging, {
            vapidKey: 'BAedM6kdQ180L_bXQIBqeY92zvwZ9zZWp11q6iaW2Ly4DcNPfZDVfwDopYYPxEKyZfSO2TJvUOjK_8u4i1ou458'
        }).catch((err) => console.log('No se pudo obtener el token', err))

        if (token) {
            console.log('Token: ' + token)
        } if (!token) {
            console.log('No hay token disponible')
        }
    }
     //Para pedir autorizacion del usuario en notificaciones
     const notificame = () => {
        if (!window.Notification) {
            console.log('Este navegador no soporta notificaciones');
            return;
        }
        if (Notification.permission === 'granted') {
            getTokenNotification();//Obtener y mostrar token en consola
        } else if (Notification.permission !== 'denied' || Notification.permission !== 'default'){
            Notification.requestPermission((permission) => {
                console.log(permission);
                if (permission === 'granted') {
                    getTokenNotification();//Obtener y mostrar token en consola
                }
            });
        }
    };
    notificame();
    


function Notas() {

useEffect(() => {
    getTokenNotification()
    onMessage(messaging, message => {
        console.log('onMessage: ', message);
        toast(message.notification.title)
    })
}, [])

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

export default Notas;
