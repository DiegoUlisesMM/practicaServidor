import React from 'react';
import '../styles/DetalleTarea.css';

function DetalleTarea({ tarea, onUpdateEstado, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Tarea: {tarea.title}</h2>
        <p>Descripción: {tarea.description}</p>
        <p>Fecha de vencimiento: {tarea.dueDate ? tarea.dueDate.toString() : 'Sin fecha'}</p>
        <p>Prioridad: {tarea.priority}</p>
        <p>Estado: {tarea.estado}</p>
        <button onClick={onUpdateEstado} style={{marginRight:'15px'}}>Cambiar Estado</button>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}

export default DetalleTarea;
