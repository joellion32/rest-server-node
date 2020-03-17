// ============================
//  Puerto
// ============================
process.env.PORT = process.env.PORT || 3000;


// ============================
//  Entorno
// ============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// ============================
//  vencimiento del token
// ============================
// 60 segundos
// 60 minutos
// 24 horas
// 30 dias

process.env.CADUCIDAD = '48h';



// ============================
//  Seed o Semilla del Token
// ============================
process.env.SEED = process.env.SEED || 'esta-es-la-semilla';



// ============================
//  client ID google chrome
// ============================

process.env.CLIENT_ID = process.env.CLIENT_ID || "451026386818-tn45jj26gp4sm6mr1j55f1lb3qk94b30.apps.googleusercontent.com";


// ============================
//  Base de datos
// ============================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/rest-database';
} else {
    urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB;