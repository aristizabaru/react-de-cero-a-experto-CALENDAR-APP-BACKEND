/*
    Ruta de usuario / Auth
*/
const express = require( 'express' );
const { check } = require( 'express-validator' );
const { validarCampos } = require( '../middlewares/validar-campos' );
const { crearUsuario, loginUsuario, revalidarToken } = require( '../controllers/auth' );
const { validarJWT } = require( '../middlewares/validar-jwt' );

const router = express.Router();

// POST /api/auth/new
router.post(
    '/new',
    [ // Middlewares
        check( 'name', 'El nombre es obligatorio' ).not().isEmpty(),
        check( 'email', 'El email es obligatorio' ).isEmail(),
        check( 'password', 'El password debe ser de 6 caracteres' ).isLength( { min: 6 } ),
        validarCampos,
    ],
    crearUsuario );

// POST /api/auth/
router.post(
    '/',
    [ // Middlewares
        check( 'email', 'El email es obligatorio' ).isEmail(),
        check( 'password', 'El password debe ser de 6 caracteres' ).isLength( { min: 6 } ),
        validarCampos,
    ],
    loginUsuario );

// GET /api/auth/renew
router.get( '/renew', validarJWT, revalidarToken );

module.exports = router;