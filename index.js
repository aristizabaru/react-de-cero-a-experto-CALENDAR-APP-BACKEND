require( 'dotenv' ).config();

const express = require( 'express' );
const { dbConnection } = require( './database/config' );
const cors = require( 'cors' );

// Crear servidor de express
const app = express();

// Base de datos
dbConnection();

// CORS
app.use( cors() );

// Directorio publico
app.use( express.static( 'public' ) );

// Lectura y parse del body
app.use( express.json() );

// rutas
app.use( '/api/auth', require( './routes/auth' ) );
app.use( '/api/events', require( './routes/events' ) );

// escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log( 'servidor escuchando en puerto: ' + 3000 );
} );