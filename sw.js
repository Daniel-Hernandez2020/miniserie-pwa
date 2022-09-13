/*Las pwa te permiten almacenar en cache aquellos recurso que no van a cambiar
 para eso debe darle un nombre a la cache*/

 //asignar un nombre y versión al cache
const CACHE_NAME = 'v1_cache_programador_fitness',
urlsToCache = [
  './',
  'https://fonts.googleapis.com/css?family=Raleway:400,700',
  'https://fonts.gstatic.com/s/raleway/v12/1Ptrg8zYS_SKggPNwJYtWqZPAA.woff2',
  'https://use.fontawesome.com/releases/v5.0.7/css/all.css',
  'https://use.fontawesome.com/releases/v5.0.6/webfonts/fa-brands-400.woff2',
  './style.css',
  './script.js',
  './img/ProgramadorFitness.png',
  './img/favicon.png'
]

/*Self hace referencia al SW */
/*Durante la fase de instalacion, generalmente se almacena en cache
los activos estaticos */
self.addEventListener("install", e =>{

  e.waitUntil(
    caches.open(CACHE_NAME)
     .then(cache=>{
      return cache.addAll(urlsToCache)
       .then(()=>self.skipWaitin())//skip ->Seguir esperando hasta que pase todas las urls
     })
      .catch(err=>console.log('Fallo registro de cache', err))//si falla una url
  )


})

//una ves que se instala el SW, se activa y busca los recursos para hacer
//que funcione sin conexion
self.addEventListener('activate', e=>{

  const cacheWhitelist = [CACHE_NAME] //Comprueba lo que contiene la cache original en caso de desconexion

  e.waitUntil(
    caches.keys()//permite ver las llaves de los archivos para comprabar si cambiaraon
    .then(cachesNames =>{
      cachesNames.map(cacheName =>{//map evalua uno a uno los elementos array
        //Eliminamos lo que ya no se neceista en cache
        //indexof retorna el indice del elemento que coincida entre dos arrays
        //indexof devuelve -1 si no encuentra coincidencias
        if(cacheWhitelist.indexOf(cacheName)===-1){
          return caches.delete(cacheName)
        }
      })
    })
    //le indica al SW activar el cache actual
     .then( ()=>self.clients.claim())
    )
})

//cuando el navegador recupera una url
self.addEventListener('fetch', e=>{//esta funcion es capaz de notar si el archivo cargado en cache es diferente del solicitado y lo actualiza

  //Responde ya sea con el objeto en cache o continuar y buscar
  //url real
  e.respondWith(//evalua la respuesta

    caches.match(e.request)//busca conincidencia entre peticiones que haya hecho el metodo fetch
     .then( res=>{
      if(res){
        //recuperando del cache
        return res

      }

      //recuperar de la peticion a la url, esto seria encaso de que no coincida con la cache
      return fetch(e.request)
     })

  )

})
