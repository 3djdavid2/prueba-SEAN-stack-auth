const { DataTypes } = require('sequelize');
const sequelize = require('../database.js')
const Marca= require('./marca')
const Categoria= require('./categoria')


const Product = sequelize.define('product', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    estado: {
        type: DataTypes.STRING
    },
    nombre: {
        type: DataTypes.STRING
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
    codigo: {
        type: DataTypes.NUMBER
    },
    precio: {
        type: DataTypes.NUMBER
    },
    precioPromo: {
        type: DataTypes.NUMBER
    },
    cantidadPromo: {
        type: DataTypes.NUMBER
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
    }


});

Marca.hasOne(Product, {
    foreignKey: 'marcaId',
    sourceKey:'id'
})

Product.belongsTo(Marca,{ 
    foreignKey: 'marcaId',
    targetId: 'id'
})
Categoria.hasOne(Product, {
    foreignKey: 'categoriaId',
    sourceKey:'id'
})

Product.belongsTo(Categoria,{ 
    foreignKey: 'categoriaId',
    targetId: 'id'
})




module.exports = Product;

