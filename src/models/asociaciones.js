const Articulos = require('./../models/articulos')
const Categorias = require('./../models/categorias')
const DetalleI = require('./../models/detalle_ingreso')
const Ingresos = require('./../models/ingresos')
const Personas = require('./../models/personas')
const Roles = require('./../models/roles')
const Users = require('./../models/users')

Categorias.hasMany(Articulos, {foreignKey: 'idcategoria'})
Articulos.belongsTo(Categorias, {foreignKey: 'idcategoria'})

Articulos.hasMany(DetalleI, {foreignKey: 'idarticulo'})
DetalleI.belongsTo(Articulos, {foreignKey: 'idarticulo'})

Ingresos.hasOne(DetalleI, {foreignKey: 'idingreso'})
DetalleI.belongsTo(Ingresos, {foreignKey: 'idingreso'})

Users.hasMany(Ingresos, {foreignKey: 'idusuario'})
Ingresos.belongsTo(Users, {foreignKey: 'idusuario'})

Users.hasMany(Ingresos, {foreignKey: 'idproveedor'})
Ingresos.belongsTo(Users, {foreignKey: 'idproveedor'})

Personas.hasOne(Users, {foreignKey: 'id'})
Users.belongsTo(Personas, {foreignKey: 'id'})

Roles.hasOne(Users, {foreignKey: 'idrol'})
Users.belongsTo(Roles, {foreignKey: 'idrol'})