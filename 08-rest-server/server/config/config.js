// Port
process.env.PORT = process.env.PORT || 3000;

// Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// Base de datos
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'localhost:27017';
} else {
    urlDB = process.env.HOSTDB;
}

const nameDB = process.env.NAMEDB || 'cafe'

process.env.URLDB = 'mongodb://' + urlDB + '/' + nameDB;