const Sequelize = require('sequelize')

const sequelize = new Sequelize('ingresos_km', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = sequelize