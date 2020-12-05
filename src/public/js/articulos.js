const urlArticulos = 'api-articulos'

function datosSelectCategorias(){
    $.ajax({
        url: urlCategoria+'/lista-categorias',
        method: 'GET',
        dataType: 'json',

        success: function(categorias){
            let i
            let opcionCategoria = '<option value="0"> Categoria </option>'
            for(i = 0; i < categorias.length; i++){
                opcionCategoria += '<option value="'+categorias[i].id+'"> '+categorias[i].nombre+' </option>'
            }

            $('#categoriaArticulo').html(opcionCategoria)
        }
    })
}

function datosArticulos(){
    $.ajax({
        url: urlArticulos,
        method: 'GET',
        dataType: 'json',

        success: function(articulos){
            listarArticulos(articulos)
        }
    })
}

function listarArticulos(articulos){

    let i
    $('#listadoArticulos').children('tbody').html('')
    if(articulos.length > 0){
        let filaArticulo
        for(i = 0; i < articulos.length; i++){
            let botones
            let condicion
            if(articulos[i].condicion === 0){
                botones = '<button type="button" class="btn btn-warning btn-sm" onclick="mostrarDatosArticulo('+articulos[i].id+')">Editar</button> <button type="button" class="btn btn-danger btn-sm" onclick="desactivarArticulo('+articulos[i].id+')">Eliminar</button>'
                condicion = 'A'
            }else{
                botones = '<button type="button" class="btn btn-warning btn-sm" onclick="mostrarDatosArticulo('+articulos[i].id+')">Editar</button> <button type="button" class="btn btn-success btn-sm" onclick="activarArticulo('+articulos[i].id+')">Restaurar</button>'
                condicion = 'I'
            }

            filaArticulo += '<tr><td>'+articulos[i].id+'</td><td>'+articulos[i].Categoria.nombre+'</td><td>'+articulos[i].nombre+'</td><td>'+articulos[i].codigo+'</td><td>'+articulos[i].stock+'</td><td>'+condicion+'</td><td>'+botones+'</td></tr>'
        }

        $('#listadoArticulos').children('tbody').html(filaArticulo)
    }else{
        $('#listadoArticulos').children('tbody').html('<tr><td colspan="7" class="text-center">No se encontro ningun producto.</td></tr>')
    }
}

function agregarArticulo(){
    $('#divFormulario').show('ease') 
    $('#divFormulario .title').text('Registrar Articulo')
    $('#btnRegistrarArticulo').val('Registrar Articulo')
    limpiarFormularioArticulo()
}

function cancelarRegistroArticulo(){
    $('#divFormulario').hide('ease')
    limpiarFormularioArticulo()
}

function limpiarFormularioArticulo(){
    $('#idProveedor')
    $('#categoriaArticulo').val(0)
    $('#nombreArticulo').val('')
    $('#codigoArticulo').val('')
    $('#pventaArticulo').val('')
    $('#stockArticulo').val('')
    $('#descripcionArticulo').val('')
}

function registrarArticulo(){
    const categoria = $('#categoriaArticulo').val()
    const nombre = $('#nombreArticulo').val()
    const codigo = $('#codigoArticulo').val()
    const pventa = $('#pventaArticulo').val()
    const stock = $('#stockArticulo').val()
    const descripcion = $('#descripcionArticulo').val()

    if(categoria !== '0' && nombre !== '' && codigo !== '' && pventa !== '' && stock !== '' && descripcion !== ''){
        const datos = {
            categoria: categoria,
            nombre: nombre,
            codigo: codigo,
            precio_venta: pventa,
            stock: stock,
            descripcion: descripcion
        }
    
        $.ajax({
            url: urlArticulos+'/registrar',
            method: 'POST',
            data: datos,
            accepts: 'application/json',
            dataType: 'json',
    
            success: function(respuesta){
                if(respuesta.status){
                    $('.alerta').html('<label class="text-success"> <i class="fa fa-check"></i> Articulo Registrado !!</label>')
                    setTimeout(function(){
                        $('.alerta').html('')
                    },5000)
                    $('.alertas-formulario').html('')
                    $('#divFormulario').hide()
                    limpiarFormularioArticulo()
                    datosArticulos()
                }else{
                    $('.alertas').html('<label class="text-danger"> <i class="fa fa-times"></i> Articulo no se pudo registrar !!</label>')
                }
            }
        })
    }else{
        $('.alertas-formulario').html('<span class="text-danger"> <i class="fa fa-times"></i> Campo(s) Vacío !!</span>')
    }
}

function mostrarDatosArticulo(id){
    $.ajax({
        url: urlArticulos+'/mostrar/'+id,
        method: 'GET',
        accepts: 'application/json',
        dataType: 'json',

        success: function(respuesta){

            if(respuesta.id !== ''){
                $('#divFormulario').hide('ease')
                $('#idArticulo').val(respuesta.id)
                $('#categoriaArticulo').val(respuesta.idcategoria)
                $('#nombreArticulo').val(respuesta.nombre)
                $('#codigoArticulo').val(respuesta.codigo)
                $('#pventaArticulo').val(respuesta.precio_venta)
                $('#stockArticulo').val(respuesta.stock)
                $('#descripcionArticulo').val(respuesta.descripcion)

                $('#divFormulario .title').text('Actualizar Articulo')
                $('#btnRegistrarArticulo').val('Actualizar Articulo')
                $('#divFormulario').show('ease')
            }else{
                $('.alertas').html('<label class="text-danger"> <i class="fa fa-times"></i> No se encontraron datos del articulo !!</label>')
            }
        }
    })
}

function editarArticulo(){
    const id = $('#idArticulo').val()
    const categoria = $('#categoriaArticulo').val()
    const nombre = $('#nombreArticulo').val()
    const codigo = $('#codigoArticulo').val()
    const pventa = $('#pventaArticulo').val()
    const stock = $('#stockArticulo').val()
    const descripcion = $('#descripcionArticulo').val()

    if(id !== '' && categoria !== '0' && nombre !== '' && codigo !== '' && pventa !== '' && stock !== '' && descripcion !== ''){
        const datos = {
            id: id,
            categoria: categoria,
            nombre: nombre,
            codigo: codigo,
            precio_venta: pventa,
            stock: stock,
            descripcion: descripcion
        }

        $.ajax({
            url: urlArticulos+'/actualizar/'+id,
            method: 'PATCH',
            data: datos,
            accepts: 'application/json',
            dataType: 'json',
    
            success: function(respuesta){
                if(respuesta.status){
                    $('.alerta').html('<label class="text-success"> <i class="fa fa-check"></i> Articulo Actualizado !!</label>')
                    setTimeout(function(){
                        $('.alerta').html('')
                    },5000)
                    $('.alertas-formulario').html('')
                    $('#divFormulario').hide()
                    limpiarFormularioArticulo()
                    datosArticulos()
                }else{
                    $('.alertas').html('<label class="text-danger"> <i class="fa fa-times"></i> Articulo no se pudo actualizar !!</label>')
                }
            }
        })
    }else{
        $('.alertas-formulario').html('<span class="text-danger"> <i class="fa fa-times"></i> Campo(s) Vacío !!</span>')
    }
}

function desactivarArticulo(id){
    $.ajax({
        url: urlArticulos+'/desactivar/'+id,
        method: 'PATCH',
        accepts: 'application/json',
        dataType: 'json',

        success: function(respuesta){
            if(respuesta.status){
                $('.alerta').html('<label class="text-success"> <i class="fa fa-check"></i> Articulo Desactivado !!</label>')
                    setTimeout(function(){
                        $('.alerta').html('')
                    },5000)
                datosArticulos()
            }else{
                $('.alertas').html('<label class="text-danger"> <i class="fa fa-times"></i> Articulo no se pudo desactivar !!</label>')
            }
        }
    })
}

function activarArticulo(id){
    $.ajax({
        url: urlArticulos+'/activar/'+id,
        method: 'PATCH',
        accepts: 'application/json',
        dataType: 'json',

        success: function(respuesta){
            if(respuesta.status){
                $('.alerta').html('<label class="text-success"> <i class="fa fa-check"></i> Articulo Activado !!</label>')
                    setTimeout(function(){
                        $('.alerta').html('')
                    },5000)
                datosArticulos()
            }else{
                $('.alertas').html('<label class="text-danger"> <i class="fa fa-times"></i> Articulo no se pudo activar !!</label>')
            }
        }
    })
}

function buscarArticulo(){
    const articulo = $('#buscarArticulo').val()
    if(articulo !== ''){
        $.ajax({
            url: urlArticulos+'/buscar/'+articulo,
            method: 'GET',
            accepts: 'application/json',
            dataType: 'json',
    
            success: function(articulos){
                $('.alerta-buscador').html('')
                listarArticulos(articulos)
            }
        })
    }else{
        $('.alerta-buscador').html('<i class="fa fa-times"> Ingrese un dato para buscar !!')
    }
}