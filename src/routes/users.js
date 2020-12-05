const { Router } = require('express')
const ruta = Router()
const { Op } = require('sequelize')
const Users = require('./../models/users')
const Personas = require('./../models/personas')
const Roles = require('./../models/roles')

ruta.get('/', async (req, res) => {
    const usuarios = await Personas.findAll({
        include: [{
            model: Users,
            include: [{
                model: Roles,
                attributes: ['nombre']
            }]
        }],
        where: {
            tipo_documento: 'U'
        }
    })

    res.json(usuarios)
})

ruta.post('/registrar', async (req, res) => {
    const { nombre, num_documento, direccion, telefono, email, usuario, password, rol } = req.body

    Personas.create({
        nombre: nombre,
        tipo_documento: 'U',
        num_documento: num_documento,
        direccion: direccion,
        telefono: telefono,
        email: email,
    }).then(persona => {
        Users.create({
            id: persona.id,
            usuario: usuario,
            password: password,
            condicion: 0,
            idrol: rol
        }).then(() => {
            res.json({status: true})
        }).catch(err => {
            res.json({status: false})
        })
    }).catch(err => {
        res.json({status: false})
    })
})

ruta.get('/mostrar/:id', async (req, res) => {
    const usuario = await Personas.findByPk(req.params.id, {
        include: [{
            model: Users
        }]
    })
    res.json(usuario)
})

ruta.patch('/actualizar/:id', async (req, res) => {
    const { nombre, num_documento, direccion, telefono, email, usuario, password, rol } = req.body
    const user = await Personas.findByPk(req.params.id, {
        include: [{
            model: Users
        }]
    })

    user.update({
        num_documento: num_documento,
        nombre: nombre,
        direccion: direccion,
        telefono: telefono,
        email: email,
        usuario: usuario,
        password: password,
        idrol: rol
    }).then(() => {
        res.json({status: true})
    }).catch(() => {
        res.json({status: false})
    })
})

ruta.patch('/desactivar/:id', async (req, res) => {
    const usuario = await Users.findByPk(req.params.id)

    usuario.update({
        condicion: 1
    }).then(() => {
        res.json({status: true})
    }).catch(err => {
        res.json({status: false})
    })
})

ruta.patch('/activar/:id', async (req, res) => {
    const usuario = await Users.findByPk(req.params.id)

    usuario.update({
        condicion: 0
    }).then(() => {
        res.json({status: true})
    }).catch(err => {
        res.json({status: false})
    })
})

ruta.get('/buscar/:usuario',  async (req, res) => {
    const usuarios = await Personas.findAll({
        include: Users,
        where: {
            nombre: {
                [Op.startsWith]: req.params.usuario
            },
            tipo_documento: 'U'
        }
    })

    res.json(usuarios)
})

ruta.get('/roles', async(req, res) => {
    const roles = await Roles.findAll({
        attributes: ['id', 'nombre']
    })

    res.json(roles)
})

module.exports = ruta