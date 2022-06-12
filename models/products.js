const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database.js')

class Product extends Model { }

Product.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    estado: {
        type: DataTypes.STRING
    },
    nombre: {
        type: DataTypes.STRING
    },
    categoria: {
        type: DataTypes.STRING
    },
    categoriaId: {
        type: DataTypes.NUMBER
    },
    marca: {
        type: DataTypes.STRING
    },
    marcaId: {
        type: DataTypes.NUMBER
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
    cantidad: {
        type: DataTypes.NUMBER
    },
    
    unidadMedida: {
        type: DataTypes.STRING
    },
    unidMinVenta: {
        type: DataTypes.DECIMAL(10,2)
    },
}, {
    sequelize,
  
    modelName: 'product'
})

module.exports = Product;

