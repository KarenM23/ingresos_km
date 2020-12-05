const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db')

class DetalleI extends Model {}

DetalleI.init({
    idingreso: {
        type: DataTypes.INTEGER(10)
    },
    idarticulo: {
        type: DataTypes.INTEGER(10)
    },
    cantidad: {
        type: DataTypes.INTEGER(11)
    },
    precio: {
        type: DataTypes.FLOAT(11, 2)
    }
}, {
    sequelize,
    modelName: 'DetalleI',
    tableName: 'detalle_ingreso_66'
})

module.exports = DetalleI