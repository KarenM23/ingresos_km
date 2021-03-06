const express = require('express')
const sequelize = require('./db')
const path = require('path')
const server = express()
const port = process.env.PORT || 3000

require('./models/asociaciones')

//middlewares

server.use(express.urlencoded({extended:false}))
server.use(express.json())

//Rutas 

server.get('/api', (req, res) => {
    res.send('Bienvenido esta funcionando el servidor')
})

server.use('/api-categorias', require('./routes/categorias'))
server.use('/api-articulos', require('./routes/articulos'))
server.use('/api-ingresos', require('./routes/ingresos'))
server.use('/api-proveedores', require('./routes/proveedores'))
server.use('/api-usuarios', require('./routes/users'))

//Archivos estaticos

server.use(express.static(path.join(__dirname, 'public')))

server.listen(port, () => {
    sequelize.sync({force: false})
        .then(() => {
            console.log('Conectado a la base de datos')
        })
        .catch(err => {
            console.log(err.message)
        })
})