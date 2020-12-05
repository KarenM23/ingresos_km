const { Router, query } = require('express')
const { Op, fn, col} = require('sequelize')
const ruta = Router()
const Ingresos = require('./../models/ingresos')
const DetalleI = require('./../models/detalle_ingreso')
const Personas = require('./../models/personas')
const Productos = require('./../models/articulos')
const Users = require('./../models/users')

ruta.get('/', async (req, res) => {
    const ingresos = await Ingresos.findAll({
        include: [{
            model: Users,
            include: [{
                model: Personas,
                attributes: ['nombre'],
                where: {
                    tipo_documento: 'P'
                }
            }],
        }],
        attributes: ['id', [fn('date_format', col('fecha_hora'), '%d/%m/%Y %h:%i:%s'), 'fecha_hora'], 'tipo_comprobante', 'serie_comprobante', 'num_comprobante', 'impuesto', 'total', 'estado']
    })

    res.json(ingresos)
})

ruta.post('/registrar', async (req, res) => {
    const { idproveedor, usuario, tipo_comprobante, serie_comprobante,num_comprobante, fecha, impuesto, total, articulos, cantidades, precios} = req.body

    const ingreso = await Ingresos.create({
        idproveedor: idproveedor,
        idusuario: 1,
        tipo_comprobante: tipo_comprobante,
        serie_comprobante: serie_comprobante,
        num_comprobante: num_comprobante,
        fecha_hora: fecha,
        impuesto: impuesto,
        total: total,
        estado: 'Aprobado'
    })

    let i
    let status = true

    for(i = 0; i < articulos.length; i++){
        console.log(ingreso.id, articulos[i], cantidades[i], precios[i])
        DetalleI.create({
            idingreso: ingreso.id,
            idarticulo: articulos[i],
            cantidad: cantidades[i],
            precio: precios[i]
        }).catch((err) => {
            status = false
        })
    }

    if(status){
        res.json({message: 'Ingreso Registrado !!',  status: true})
    }else{
        res.json({message: 'Error al registrar el ingreso', status: false})
    }
})

ruta.get('/mostrar/:id', async (req, res) => {
    const ingreso = await Ingresos.findAll({
        include: [{
            model: DetalleI,
            include: [{
                model: Productos,
                attributes: ['id', 'codigo', 'nombre']
            }]
        }],
        where: {
            id: req.params.id
        }
    })

    res.json(ingreso)
})

ruta.patch('/anular/:id',  async (req, res) => {
    const ingreso = await Ingresos.findByPk(req.params.id)

    ingreso.update({
        estado: 'Anulado'
    }).then(() => {
        res.json({status: true})
    }).catch(err => {
        res.json({status: false})
    })
})

ruta.get('/buscar/:datos', async (req, res) => {
    const ingresos = await Ingresos.findAll({
        include: [{
            model: Users,
            include: [{
                model: Personas,
                where: {
                    nombre:{
                        [Op.startsWith]: req.params.datos
                    } 
                }
            }]
        }]
    })
    
    res.json(ingresos)
})

ruta.get('/listaproveedores', async (req, res) => {
    const proveedores = await Personas.findAll({
        include: [{
            model: Users,
            where: {
                condicion: 0
            }
        }],
        where: {
            tipo_documento: 'P'
        }
    })

    res.json(proveedores)
})

ruta.get('/listaproductos', async (req, res) => {
    const productos = await Productos.findAll({
        where: {
            condicion: 0
        }
    })

    res.json(productos)
})

ruta.get('/producto/:id', async (req, res) => {
    const producto = await Productos.findByPk(req.params.id)
    res.json(producto)
})

module.exports = ruta