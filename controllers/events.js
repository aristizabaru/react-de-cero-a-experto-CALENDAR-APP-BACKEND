const { response } = require( 'express' );
const Evento = require( '../models/Evento' );

const getEventos = async ( req, res = response ) => {

    const eventos = await Evento.find()
        .populate( 'user', 'name' );

    res.json( {
        ok: true,
        eventos,
    } );
};

const crearEvento = async ( req, res = response ) => {

    const evento = new Evento( req.body );

    try {
        evento.user = req.token.uid;
        const eventoBd = await evento.save();

        res.json( {
            ok: true,
            evento: eventoBd
        } );

    } catch ( error ) {
        console.log( error );
        res.status( 500 ).json( {
            ok: false,
            message: 'Error, por favor hable con el administrador',
        } );
    }
};

const actualizarEvento = async ( req, res = response ) => {

    const eventoId = req.params.id;
    const { uid } = req.token;

    try {

        const evento = await Evento.findById( eventoId );

        if ( !evento ) {
            return res.status( 404 ).json( {
                ok: false,
                message: 'No existe el evento'
            } );
        }

        if ( evento.user.toString() !== uid ) {
            return res.status( 401 ).json( {
                ok: false,
                message: 'No tiene privilegio de editar el evento'
            } );
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        };

        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, { new: true } );

        res.json( {
            ok: true,
            evento: eventoActualizado
        } );


    } catch ( error ) {
        console.log( error );
        res.status( 500 ).json( {
            ok: false,
            message: 'Error, por favor hable con el administrador',
        } );
    }
};

const eliminarEvento = async ( req, res = response ) => {

    const eventoId = req.params.id;
    const { uid } = req.token;

    try {

        const evento = await Evento.findById( eventoId );

        if ( !evento ) {
            return res.status( 404 ).json( {
                ok: false,
                message: 'No existe el evento'
            } );
        }

        if ( evento.user.toString() !== uid ) {
            return res.status( 401 ).json( {
                ok: false,
                message: 'No tiene privilegio de eliminar el evento'
            } );
        }

        await Evento.findByIdAndDelete( eventoId );

        res.json( {
            ok: true,
        } );


    } catch ( error ) {
        console.log( error );
        res.status( 500 ).json( {
            ok: false,
            message: 'Error, por favor hable con el administrador',
        } );
    }
};

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento,
};