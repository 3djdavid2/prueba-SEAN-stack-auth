const { DataTypes } = require('sequelize');
const sequelize = require('../database.js')
const Marca = require('./marca')
const Categoria = require('./categoria')


const Product = sequelize.define('product', {
    
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    codigo: {
        type: DataTypes.NUMBER
    },
    nombre: {
        type: DataTypes.STRING
    },
    precio: {
        type: DataTypes.NUMBER
    },
    descuento: {
        type: DataTypes.NUMBER
    },
    estado: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    packActivo: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    packTipo: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    
    categoriaId: {
        type: DataTypes.INTEGER
    },
    marcaId: {
        type: DataTypes.INTEGER
    },
    descripcion: {
        type: DataTypes.STRING
    },
    imgURL: {
        type: DataTypes.STRING
    },
   
    precioPromo: {
        type: DataTypes.NUMBER
    },
    multiploLlevaPromo: {
        type: DataTypes.NUMBER
    },
    multiploPagaPromo: {
        type: DataTypes.NUMBER
    },
    inicioPromo: {
        type: DataTypes.DATE
    },
    finPromo: {
        type: DataTypes.DATE
    },
    cantidad: {
        type: DataTypes.NUMBER
    },
    unidadMedida: {
        type: DataTypes.STRING
    },
    unidMinVenta: {
        type: DataTypes.DECIMAL(10, 2)
    },
    largocm: {
        type: DataTypes.NUMBER
    },
    anchocm: {
        type: DataTypes.NUMBER
    },
    altocm: {
        type: DataTypes.NUMBER
    },
    pesoKg: {
        type: DataTypes.DECIMAL(10, 2)
    },
    sprite: {
        type: DataTypes.STRING
    },
    banner: {
        type: DataTypes.STRING
    },
    video: {
        type: DataTypes.STRING
    },
    usuario: {
        type: DataTypes.STRING
    },


});

Marca.hasOne(Product, {
    foreignKey: 'marcaId',
    sourceKey: 'id'
})

Product.belongsTo(Marca, {
    foreignKey: 'marcaId',
    targetId: 'id'
})
Categoria.hasOne(Product, {
    foreignKey: 'categoriaId',
    sourceKey: 'id'
})

Product.belongsTo(Categoria, {
    foreignKey: 'categoriaId',
    targetId: 'id'
})


module.exports = Product;