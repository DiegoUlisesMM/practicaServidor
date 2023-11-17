
//Imports 
importScripts('https://cdn.jsdelivr.net/npm/pouchdb@7.0.0/dist/pouchdb.min.js')
importScripts('js/sw-db.js');
importScripts('js/sw-utils.js');
importScripts('firebase-messaging-sw.js');

// Crear las variables de cache
const CACHE_DYNAMIC = 'dynamic-v1' // Para los archivos que se van a descargar
const CACHE_STATIC = 'static-v1' // App shell
const CACHE_INMUTABLE = 'inmutable-v1' // CDN de terceros, LIBRERIAS


self.addEventListener('install', event => {
    const cachePromise = caches.open(CACHE_STATIC).then(function (cache) {
        return cache.addAll([
            '/',
            '/index.html',
            '/js/app.js',
            '/js/sw-utils.js',
            '/sw.js',
            'static/js/bundle.js',
            'favicon.ico',
            'not-found.png',
            '/pages/offline.html'
        ])
    })
    const cacheInmutable = caches.open(CACHE_INMUTABLE).then(function (cache) {
        return cache.addAll([
            'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css',
            'https://cdn.jsdelivr.net/npm/pouchdb@7.0.0/dist/pouchdb.min.js',
            'https://www.gstatic.com/firebasejs/10.6.0/firebase-app-compat.js',
            'https://www.gstatic.com/firebasejs/10.6.0/firebase-analytics.js'
        ])
    })
    event.waitUntil(Promise.all([cachePromise, cacheInmutable]))
})


// Funcion para eliminar cache anterior
self.addEventListener('activate', function (event) {
    const respuesta = caches.keys()
    .then(keys => {
        keys.forEach(key => {
            if(key !== CACHE_STATIC && key.includes('static')){
                return caches.delete(key)
            }
        })

    })
    event.waitUntil(respuesta)
})

//Estrategia de cache 
self.addEventListener('fetch', function (event) {
    let respuesta
    //Cambio en estrategia de cache
    if( event.request.url.includes('/api')){
        //Tenemos que enviar una respuesta
        respuesta = manejoApi(CACHE_DYNAMIC, event.request);
    }else{
    const respuesta = caches.match(event.request).then(res => {
        if (res) {
            actualizarCacheStatico(CACHE_STATIC, event.request, CACHE_INMUTABLE);
            return res;
        } else {
            // Si llegamos a este punto, es necesario hacer una petición a la web
            return fetch(event.request).then(newRes => {
                return actualizarCacheDinamico(CACHE_DYNAMIC, event.request, newRes);
            })
        }
    });
}
    // event.respondWith(respuesta)
})

//Tareas asincronas
self.addEventListener('sync', event => {
    console.log('SW: Sync');

    if( event.tag === 'nuevo-post'){

        //postear a DB cuando hay conexion
        const respuesta = postearMensajes();

        event.waitUntil( respuesta );
    }
});