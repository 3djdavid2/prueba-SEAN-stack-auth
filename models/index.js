const banners = require('./banner')
const carritos = require('./carrito')
const categoria = require('./categoria')
const direccionesClientes = require('./direccionesCliente')
const estadopedidos = require('./estadoPedido')
const marcas = require('./marca')
const ordenEnviames = require('./ordenEnviame')
const ordens = require('./orden')
const packmixes = require('./packs-mix')
const packs = require('./packs')
const pagos = require('./pago')
const products = require('./products')
const quienRecibes = require('./quienRecibe')
const quienRetiraTiendas = require('./quienRetiraTienda')
const respuestaEnviames = require('./respEnviame')
const respuestaTBKs = require('./respTBK')
const roles = require('./role')
const tiendas = require('./tiendas')
const tipoDatosFAs = require('./tipoDatosFA')
const tipoDocTributs = require('./tipoDocTribut')
const tipoEntregas = require('./tipoEntrega')
const transferencia = require('./transferencia')
const users = require('./users')


const modelo = {
    banners,
    carritos,
    categoria,
    direccionesClientes,
    estadopedidos,
    marcas,
    ordenEnviames,
    ordens,
    packmixes,
    packs,
    pagos,
    products,
    quienRecibes,
    quienRetiraTiendas,
    respuestaEnviames,
    respuestaTBKs,
    roles,
    tiendas,
    tipoDatosFAs,
    tipoDocTributs,
    tipoEntregas,
    transferencia,
    users,
}

module.exports = modelo