require( 'dotenv' ).config();

const express = require( 'express' );

// crear servidor de express
const app = express();

// Directorio publico
app.use( express.static( 'public' ) );

// rutas
// app.get( '/', ( req, res ) => {
//     res.json( { message: 'Hello stranger' } );
// } );

// escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log( 'servidor escuchando en puerto: ' + 3000 );
} );