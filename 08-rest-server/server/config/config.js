// Port
process.env.PORT = process.env.PORT || 3000;

// Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// Token
// 60 seg, 60 min, 24 h, 30 dias
process.env.CADUCIDAD_TOKEN = '30 days';

// Auth
process.env.SEED = process.env.SEED || 'seed-desarrollo';

// Base de datos
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'localhost:27017';
} else {
    urlDB = process.env.HOSTDB;
}

const nameDB = process.env.NAMEDB || 'cafe'

process.env.URLDB = 'mongodb://' + urlDB + '/' + nameDB;