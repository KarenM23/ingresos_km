const urlCategoria = 'api-categorias'

function datosCategorias(){

    $.ajax({
        url: urlCategoria,
        method: 'GET',
        dataType: 'json',

        success: function(respuesta){
            listarCategorias(respuesta)
        }
    })
}

function listarCategorias(categorias){
    let i 
    $('#listadoCategorias').children('tbody').html('')
    if(categorias.length > 0){
        let filaCategoria
        for(i = 0; i < categorias.length; i++){
            let botones
            if(categorias[i].condicion === 0){
                botones = '<button type="button" class="btn btn-warning btn-sm" onclick="mostrarDatosCategoria('+categorias[i].id+')">Editar</button> <button type="button" class="btn btn-danger btn-sm" onclick="desactivarCategoria('+categorias[i].id+')">Eliminar</button>'
            }else{
                botones = '<button type="button" class="btn btn-warning btn-sm" onclick="mostrarDatosCategoria('+categorias[i].id+')">Editar</button> <button type="button" class="btn btn-success btn-sm" onclick="activarCategoria('+categorias[i].id+')">Restaurar</button>'
            }

            filaCategoria += '<tr><td>'+categorias[i].id+'</td><td>'+categorias[i].nombre+'</td><td>'+categorias[i].descripcion+'</td><td>'+botones+'</td><tr>'
        }

        $('#listadoCategorias').children('tbody').html(filaCategoria)
    }else{
        $('#listadoCategorias').children('tbody').html('<tr><td colspan="4" class="text-center">No se encontro ninguna categorias</td></tr>')
    }
}

function agregarCategoria(){
    $('#divFormulario').show('ease') 
    $('#divFormulario .title').text('Registrar Categoria')
    $('#btnRegistrarCategoria').val('Registrar Categoria')
    limpiarFormularioCategoria()
}

function cancelarRegistroCategoria(){
    $('#divFormulario').hide('ease')
    limpiarFormularioCategoria()
}

function limpiarFormularioCategoria(){
    $('#nombreCategoria').val('')
    $('#descripcionCategoria').val('')
}

function registrarCategoria(){
    const nombre = $('#nombreCategoria').val()
    const descripcion = $('#descripcionCategoria').val()

    if(nombre !== '' && descripcion !== ''){
        const datos = {
            nombre: nombre,
            descripcion: descripcion
        }
    
        $.ajax({
            url: urlCategoria+'/registrar',
            method: 'POST',
            data: datos,
            accepts: 'application/json',
            dataType: 'json',
    
            success: function(respuesta){
               
                if(respuesta.status){
                    $('.alerta').html('<label class="text-success"> <i class="fa fa-check"></i> Categoria Registrado !!</label>')
                    setTimeout(function(){
                        $('.alerta').html('')
                    },5000)
                    $('.alertas-formulario').html('')
                    $('#divFormulario').hide()
                    limpiarFormularioCategoria()
                    datosCategorias()
                }else{
                    $('.alertas').html('<label class="text-danger"> <i class="fa fa-times"></i> Categoria no se pudo registrar !!</label>')
                }
            }
        })
    }else{
        $('.alertas-formulario').html('<span class="text-danger"> <i class="fa fa-times"></i> Campo(s) Vacío !!</span>')
    }
}

function mostrarDatosCategoria(id){
    $.ajax({
        url: urlCategoria+'/mostrar/'+id,
        method: 'GET',
        accepts: 'application/json',
        dataType: 'json',

        success: function(respuesta){

            if(respuesta){
                $('#divFormulario').hide('ease')
                $('#idCategoria').val(respuesta.id)
                $('#nombreCategoria').val(respuesta.nombre)
                $('#descripcionCategoria').val(respuesta.descripcion)

                $('#divFormulario .title').text('Actualizar Categoria')
                $('#btnRegistrarCategoria').val('Actualizar Categoria')
                $('#divFormulario').show('ease')
            }else{
                $('.alertas').html('<label class="text-danger"> <i class="fa fa-times"></i> No se encontraron datos de la categoria !!</label>')
            }
        }
    })
}

function editarCategoria(){
    const id = $('#idCategoria').val()
    const nombre = $('#nombreCategoria').val()
    const descripcion = $('#descripcionCategoria').val()

    if(id !== '' && nombre !== '' && descripcion !== ''){
        const datos = {
            id: id,
            nombre: nombre,
            descripcion: descripcion
        }

        $.ajax({
            url: urlCategoria+'/actualizar/'+id,
            method: 'PATCH',
            data: datos,
            accepts: 'application/json',
            dataType: 'json',
    
            success: function(respuesta){
                if(respuesta.status){
                    $('.alerta').html('<label class="text-success"> <i class="fa fa-check"></i> Categoria Actualizada !!</label>')
                    setTimeout(function(){
                        $('.alerta').html('')
                    },5000)
                    $('.alertas-formulario').html('')
                    $('#divFormulario').hide()
                    limpiarFormularioCategoria()
                    datosCategorias()
                }else{
                    $('.alertas').html('<label class="text-danger"> <i class="fa fa-times"></i> Categoria no se pudo actualizar !!</label>')
                }
            }
        })
    }else{
        $('.alertas-formulario').html('<span class="text-danger"> <i class="fa fa-times"></i> Campo(s) Vacío !!</span>')
    }
}

function desactivarCategoria(id){
    $.ajax({
        url: urlCategoria+'/desactivar/'+id,
        method: 'PATCH',
        accepts: 'application/json',
        dataType: 'json',

        success: function(respuesta){
            if(respuesta.status){
                $('.alerta').html('<label class="text-success"> <i class="fa fa-check"></i> Categoria Desactivada !!</label>')
                setTimeout(function(){
                    $('.alerta').html('')
                },5000)
                datosCategorias()
            }else{
                $('.alertas').html('<label class="text-danger"> <i class="fa fa-times"></i> Categoria no se pudo desactivar !!</label>')
            }
        }
    })
}

function activarCategoria(id){
    $.ajax({
        url: urlCategoria+'/activar/'+id,
        method: 'PATCH',
        accepts: 'application/json',
        dataType: 'json',

        success: function(respuesta){
            if(respuesta.status){
                $('.alerta').html('<label class="text-success"> <i class="fa fa-check"></i> Categoria Activada !!</label>')
                setTimeout(function(){
                    $('.alerta').html('')
                },5000)
                datosCategorias()
            }else{
                $('.alertas').html('<label class="text-danger"> <i class="fa fa-times"></i> Categoria no se pudo activar !!</label>')
            }
        }
    })
}

function buscarCategoria(){
    const categoria = $('#buscarCategoria').val()
    if(categoria !== ''){
        $.ajax({
            url: urlCategoria+'/buscar/'+categoria,
            method: 'GET',
            accepts: 'application/json',
            dataType: 'json',
    
            success: function(categorias){
                $('.alerta-buscador').html('')
                listarCategorias(categorias)
            }
        })
    }else{
        $('.alerta-buscador').html('<i class="fa fa-times"> Ingrese un dato para buscar !!')
    }
}