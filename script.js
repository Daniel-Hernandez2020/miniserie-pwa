/*Service worker es un archivo js que corre en segundo plano */


if('serviceWorker' in navigator){

    /*Registro de el service worker */
    navigator.serviceWorker.register('./sw.js')
    .then(reg => console.log('registro de SW exitoso', reg))
    .catch(err => console.warn('Error al tratar de registrar el SW',err))


}