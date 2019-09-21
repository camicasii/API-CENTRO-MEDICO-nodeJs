/*Cuando hacemos peticiones AJAX con jQuery o Angular 
a un backend o un API REST es normal que tengamos 
problemas con el acceso CORS en NodeJS y nos fallen las peticiones.*/

const middleware={
    cors:(req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
}
}

module.exports= middleware;