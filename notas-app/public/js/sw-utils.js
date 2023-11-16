// Guardar en el cache dinamico
function actualizarCacheDinamico(cacheDinamico, req, res) {


    if (res.ok) {
    
    return caches.open(cacheDinamico).then(cache => {
    
    cache.put(req, res.clone());
    
    return res.clone();
    
    });
    
    } else {
    return res;
    }
    
    }
    // Cache with network update
    function actualizarCacheStatico(estaticoCache, req, APP_SHELL_INMUTABLE) {
    
    
    if (APP_SHELL_INMUTABLE.includes(req.url)) {
    // No hace falta actualizar el inmutable
    // console.log('existe en inmutable', req.url );
    
    } else {
    // console.log('actualizando', req.url );
    return fetch(req)
    .then(res => {
    return actualizarCacheDinamico(estaticoCache, req, res)
    })
    }
    
    
    
    }
    
//Estrategia de cache Red y actualizacion de cache
function manejoApi(cacheName, req) {
    if (req.clone().method === 'POST') {
        if (self.registration.sync) {
            return req.clone().text().then(body => {
                const bodyObj = JSON.parse(body)
                return guardarMensaje(bodyObj)
            });
        } else {
            return fetch(req);
        }
    } else {
        return fetch(req).then(res => {
                if (res.ok) {
                    actualizarCacheDinamico(cacheName, req, res.clone())
                    return res.clone()
                } else {
                    return caches.match(req);
                }
            })
            .catch(err => {
                // Manejo de errores, puedes personalizar esto según tus necesidades
                console.error('Error en la petición a la API', err);
                return caches.match(req);
            });
    }
}


