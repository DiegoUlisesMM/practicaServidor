import React, { useEffect } from 'react';
import './Login.css';
import { getAuth, signInAnonymously } from 'firebase/auth'; // Cambiado desde 'firebase-auth'
//import { getAuth, signInAnonymously } from '../../firebase-auth'; //Esto es lo importante para el logueo

import { Link } from 'react-router-dom';

import portada from '../../assets/portada.png';

const Login = () => {
    const login = () => {
        signInAnonymously(getAuth()).then((usuario) => console.log(usuario));
    }
    return (
        <div className='container'>
          <img className='img' src={portada} alt="Portada" />
          <button type="button" onClick={login}>
            <Link to="/Notas">Iniciar sesión</Link>
          </button>
        </div>
      );
}

export default Login;
