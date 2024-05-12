const { response } = require( 'express' );
const jwt = require( 'jsonwebtoken' );

const validarJWT = ( req, res = response, next ) => {

    // x-token headers
    const token = req.header( 'x-token' );

    if ( !token ) {
        return res.status( 401 ).json( {
            ok: false,
            message: 'No hay token en la petición'
        } );
    }

    try {

        const { uid, name } = jwt.verify( token, process.env.SECRET_JWT_SEED );

        req.token = {
            uid,
            name,
        };

    } catch ( error ) {
        return res.status( 401 ).json( {
            ok: false,
            message: 'No hay token en la petición'
        } );
    }

    next();

};

module.exports = {
    validarJWT
};