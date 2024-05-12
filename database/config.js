const mongoose = require( 'mongoose' );
require( 'dotenv' ).config();

const dbConnection = async () => {

    try {
        await mongoose.connect( process.env.DB_CONNECTION );
        console.log( 'DB online' );
    } catch ( error ) {
        console.log( error );
        throw new Error( 'Error inicializando BD' );
    }
};

module.exports = {
    dbConnection
};