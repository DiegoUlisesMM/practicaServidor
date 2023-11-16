import React, { useState } from 'react';
import '../styles/InputBuscador.css';

function InputBuscador(props) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    props.onChange(searchTerm);
  };

  return (
    <div className="input-buscador">
      <input
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="custom-input"
      />
      <button type="button" onClick={handleSearch} className="custom-button">
        Buscar
      </button>
    </div>
  );
}

export default InputBuscador;
