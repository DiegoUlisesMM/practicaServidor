import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Input, Button } from 'antd';
import './NoteForm.css';
import Header from '../Header/Header.js';
import MiLista from '../List/MiLista.js';
import { getToken, onMessage } from 'firebase/messaging';
import { messaging } from '../../firebase' //viene de firebase.js
import { ToastContainer, toast } from 'react-toastify'; //muestra la notificacion push y estilos
import 'react-toastify/dist/ReactToastify.css';

const getTokenNotification = async () => 
{
    //Funcion para obtener el token
    const token = await getToken(messaging, {
        vapidKey: 'BAedM6kdQ180L_bXQIBqeY92zvwZ9zZWp11q6iaW2Ly4DcNPfZDVfwDopYYPxEKyZfSO2TJvUOjK_8u4i1ou458'
    }).catch((err) => console.log('No se pudo obtener el token', err))

    if (token) {
        console.log('Token: ' + token)
    } if (!token) {
        console.log('No hay token disponible')
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

    useEffect(() => {
        getTokenNotification()
        onMessage(messaging, message => {
            console.log('onMessage: ', message);
            toast(message.notification.title)
        })
    }, [])
    // const [notes, setNotes] = useState ([]);
    // const [form] = Form.useForm(); //crear una instancia del fromulario
}