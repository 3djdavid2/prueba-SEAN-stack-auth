const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database.js')

const EstadoPedido = require('../models/estadoPedido')

const TipoEntrega = require('../models/tipoEntrega')
const Tiendas = require('../models/tiendas')

const TipoDocTribut = require('../models/tipoDocTribut')
const TipoDatosFA = require('../models/tipoDatosFA')
const QuienRetiraTienda = require('../models/quienRetiraTienda')
const QuienRecibe = require('../models/quienRecibe')


class Ordenes extends Model { }

Ordenes.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    orden: {
        type: DataTypes.STRING
    },
    ot: {
        type: DataTypes.STRING
    },
    status_name: {
        type: DataTypes.STRING
    },
    status_code: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    idsProductos: {
        type: DataTypes.STRING
    },
    codProductos: {
        type: DataTypes.STRING
    },
    cantProductos: {
        type: DataTypes.STRING
    },
    tipoEntregaId: {
        type: DataTypes.INTEGER
    },
    tiendaId: {
        type: DataTypes.INTEGER
    },
    quienRetiraId: {
        type: DataTypes.INTEGER
    },
    rutRetira: {
        type: DataTypes.STRING
    },
    nombreRetira: {
        type: DataTypes.STRING
    },
    DomicilioId: {
        type: DataTypes.NUMBER
    },
    quienRecibeId: {
        type: DataTypes.INTEGER
    },
    rutRecibe: {
        type: DataTypes.STRING
    },
    nombreRecibe: {
        type: DataTypes.STRING
    },
    tipoDocId: {
        type: DataTypes.INTEGER
    },
    tipoDatosFAId: {
        type: DataTypes.INTEGER
    },
    rutFA: {
        type: DataTypes.STRING
    },
    razonFA: {
        type: DataTypes.STRING
    },
    giroFA: {
        type: DataTypes.STRING
    },
    telFA: {
        type: DataTypes.STRING
    },
}, {
    sequelize,
    modelName: 'ordens'
});


//
QuienRecibe.hasOne(Ordenes, {
    foreignKey: 'quienRecibeId',   
    sourceKey: 'id'
});
Ordenes.belongsTo(QuienRecibe, {
    foreignKey: 'quienRecibeId',   
    targetId: 'id'
});

//
QuienRetiraTienda.hasOne(Ordenes, {
    foreignKey: 'quienRetiraId',   
    sourceKey: 'id'
});
Ordenes.belongsTo(QuienRetiraTienda, {
    foreignKey: 'quienRetiraId',   
    targetId: 'id'
});

//

//
TipoDatosFA.hasOne(Ordenes, {
    foreignKey: 'tipoDatosFAId',   
    sourceKey: 'id'
});
Ordenes.belongsTo(TipoDatosFA, {
    foreignKey: 'tipoDatosFAId',   
    targetId: 'id'
});

//

//
TipoDocTribut.hasOne(Ordenes, {
    foreignKey: 'tipoDocId',   
    sourceKey: 'id'
});
Ordenes.belongsTo(TipoDocTribut, {
    foreignKey: 'tipoDocId',   
    targetId: 'id'
});

//





//
TipoEntrega.hasOne(Ordenes, {
    foreignKey: 'tipoEntregaId',   
    sourceKey: 'id'
});
Ordenes.belongsTo(TipoEntrega, {
    foreignKey: 'tipoEntregaId',   
    targetId: 'id'
});

//
Tiendas.hasOne(Ordenes, {
    foreignKey: 'tiendaId',  
    sourceKey: 'id'
});
Ordenes.belongsTo(Tiendas, {
    foreignKey: 'tiendaId', 
    targetId: 'id'
});
//

module.exports = Ordenes;