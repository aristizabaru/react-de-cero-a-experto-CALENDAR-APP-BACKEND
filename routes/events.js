/*
    Ruta de usuario / Events

    Todas las rutas protegidas
*/
const express = require( 'express' );
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require( '../controllers/events' );
const { validarJWT } = require( '../middlewares/validar-jwt' );
const { check } = require( 'express-validator' );
const { validarCampos } = require( '../middlewares/validar-campos' );
const { isDate } = require( '../helpers/isDate' );

const router = express.Router();

// Todas las peticiones pasan por validación de Token
router.use( validarJWT );

// GET /api/events
router.get( '/', getEventos );

// POST /api/events
router.post(
    '/',
    [ // Middlewares
        check( 'title', 'El nombre es obligatorio' ).not().isEmpty(),
        check( 'start', 'La fecha de inicio es obligatoria' ).custom( isDate ),
        check( 'end', 'La fecha de finalización es obligatoria' ).custom( isDate ),
        validarCampos,
    ],
    crearEvento );

// PUT /api/events
router.put(
    '/:id',
    [ // Middlewares
        check( 'title', 'El nombre es obligatorio' ).not().isEmpty(),
        check( 'start', 'La fecha de inicio es obligatoria' ).custom( isDate ),
        check( 'end', 'La fecha de finalización es obligatoria' ).custom( isDate ),
        validarCampos,
    ],
    actualizarEvento );

// DELETE /api/events
router.delete( '/:id', eliminarEvento );

module.exports = router;