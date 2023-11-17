// Importa Firebase
importScripts('https://www.gstatic.com/firebasejs/10.6.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.6.0/firebase-messaging-compat.js');

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAEGErEAeM6uIgaR145gkI6rUZAHJmPNKc",
    authDomain: "test-push-19cb1.firebaseapp.com",
    projectId: "test-push-19cb1",
    storageBucket: "test-push-19cb1.appspot.com",
    messagingSenderId: "441656737676",
    appId: "1:441656737676:web:1e6a76bb5a6709f690a0a9",
    measurementId: "G-G4S095121J"
  };
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging(app);

messaging.onBackgroundMessage(payload => {
    console.log('Recibiendo mensaje en segundo plano')
    const tituloNotificacion = payload.notification.title;
    const options = {
        body: payload.notification.body,
        icon: '../img/40.png',
    }
    self.registration.showNotification(tituloNotificacion, options)
})