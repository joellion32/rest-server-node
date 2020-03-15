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

process.env.CADUCIDAD = 60 * 60 * 24 * 30;



// ============================
//  Seed o Semilla del Token
// ============================
process.env.SEED = process.env.SEED || 'esta-es-la-semilla';

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