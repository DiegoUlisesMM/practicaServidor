import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-solid-svg-icons';
import '../styles/MensajeNoEncontrado.css';

function MensajeNoEncontrado() {
  return (
    <div className="mensaje-no-encontrado">
      <FontAwesomeIcon icon={faFrown} className="icon" />
      <p>No se encontraron resultados.</p>
    </div>
  );
}

export default MensajeNoEncontrado;
