const Sequelize = require('sequelize')

const sequelize = new Sequelize('heroku_9d7ab188d61844d', 'bee077a0e3bf6d', 'f2dc5cea', {
    host: 'us-cdbr-east-02.cleardb.com',
    dialect: 'mysql'
})

module.exports = sequelize