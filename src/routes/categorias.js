const { Router } = require('express')
const { Op } = require('sequelize')
const ruta = Router()
const Categorias = require('./../models/categorias')

ruta.get('/', async (req, res) => {
    const categorias = await Categorias.findAll()

    res.json(categorias)
})

ruta.post('/registrar', async (req, res) => {
    const { nombre, descripcion } = req.body

    Categorias.create({
        nombre: nombre,
        descripcion: descripcion,
        condicion: 0
    }).then(() => {
        res.json({status: true})
    }).catch(err => {
        res.json({status: false})
    })
})

ruta.get('/mostrar/:id', async (req, res) => {
    const categoria = await Categorias.findByPk(req.params.id)

    res.json(categoria)
})

ruta.patch('/actualizar/:id', async (req, res) => {
    const { nombre, descripcion } = req.body
    const categoria = await Categorias.findByPk(req.params.id)
    
    categoria.update({
        nombre: nombre,
        descripcion: descripcion,
    }).then(() => {
        res.json({status: true})
    }).catch(err => {
        res.json({status: false})
    })
})

ruta.patch('/desactivar/:id',  async (req, res) => {
    const categoria = await Categorias.findByPk(req.params.id)

    categoria.update({
        condicion: 1
    }).then(() => {
        res.json({status: true})
    }).catch(err => {
        res.json({status: false})
    })
})

ruta.patch('/activar/:id',  async (req, res) => {
    const categoria = await Categorias.findByPk(req.params.id)

    categoria.update({
        condicion: 0
    }).then(() => {
        res.json({status: true})
    }).catch(err => {
        res.json({status: false})
    })
})

ruta.get('/buscar/:categoria', async (req, res) => {
    const categorias = await Categorias.findAll({
        where: {
            nombre: {
                [Op.startsWith]: req.params.categoria  
            }
        }
    })

    res.json(categorias)
})

ruta.get('/lista-categorias', async (req, res) => {
    const categorias = await Categorias.findAll({
        where: {
            condicion: 0
        }
    })
    res.json(categorias)
})

module.exports = ruta