const { Router } = require('express')
const ruta = Router()
const { Op } = require('sequelize')
const Users = require('./../models/users')
const Personas = require('./../models/personas')

ruta.get('/', async (req, res) => {
    const proveedores = await Personas.findAll({
        include: {
            model: Users,
            attributes: ['condicion']
        },
        where: {
            tipo_documento: 'P'
        }
    })

    res.json(proveedores)
})

ruta.post('/registrar', async (req, res) => {
    const { nombre, num_documento, direccion, telefono, email} = req.body

    Personas.create({
        nombre: nombre,
        tipo_documento: 'P',
        num_documento: num_documento,
        direccion: direccion,
        telefono: telefono,
        email: email,
    }).then(persona => {
        Users.create({
            id: persona.id,
            condicion: 0,
            idrol: 3
        }).then(() => {
            res.json({status: true})
        }).catch(err => {
            res.json({status: false})
        })
    })
})

ruta.get('/mostrar/:id', async (req, res) => {
    const proveedor = await Personas.findByPk(req.params.id)
    res.json(proveedor)
})

ruta.patch('/actualizar/:id', async (req, res) => {
    const { nombre, num_documento, direccion, telefono, email } = req.body
    const proveedor = await Personas.findByPk(req.params.id)

    proveedor.update({
        nombre: nombre,
        num_documento: num_documento,
        direccion: direccion,
        telefono: telefono,
        email: email
    }).then(() => {
        res.json({status: true})
    }).catch(err => {
        res.json({status: false})
    })
})

ruta.patch('/desactivar/:id', async (req, res) => {
    const proveedor = await Users.findByPk(req.params.id)

    proveedor.update({
        condicion: 1
    }).then(() => {
        res.json({status: true})
    }).catch(err => {
        res.json({status: false})
    })
})

ruta.patch('/activar/:id', async (req, res) => {
    const proveedor = await Users.findByPk(req.params.id)

    proveedor.update({
        condicion: 0
    }).then(() => {
        res.json({status: true})
    }).catch(err => {
        res.json({status: false})
    })
})

ruta.get('/buscar/:proveedor',  async (req, res) => {
    const proveedores = await Personas.findAll({
        include: {
            model: Users,
            attributes: ['condicion']
        },
        where: {
            [Op.or]: {
                num_documento: {
                    [Op.startsWith]: req.params.proveedor,
                },
                nombre: {
                    [Op.startsWith]: req.params.proveedor
                }
            },
            [Op.and]: {
                tipo_documento: 'P'
            }
        }
    })

    res.json(proveedores)
})

module.exports = ruta