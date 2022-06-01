$(document).ready(function() {
    /*
    if ( $('#categoria').length) {
        
        $('#categoria').click( function () {
                       
            const action = 'listarCategorias';
            var datos = '';
    
            $.ajax({
                url: 'p_articulo.php',
                type: "POST",
                async: true,
                data: {
                    action:action
                },
                beforeSend: function () {   
                                   
                },
                success: function (response) {
    
                    if (response == 'notData') {
                        console.log("No hay categorias para mostrar.");
                    } else {
                        var info = $.parseJSON(response);                                            
                        datos = info;
                        console.log(datos);
                    } 
                    $('#categoria').val(datos);                    
                },
                error: function (error) {
                    console.log(error);
                }
            });
        });
    }*/
    //Ingresar Impuesto e Importe
    if ( $('#valorUnitario').length) {
        
        $('#valorUnitario').keyup( function () {
            
            const valorU = $('#valorUnitario').val();            
            const action = 'calcularImpuesto';
            var datos = '';

            $.ajax({
                url: 'p_articulo.php',
                type: "POST",
                async: true,
                data: {
                    action:action,
                    valorU: valorU
                },
                beforeSend: function () {   
                                   
                },
                success: function (response) {

                    if (response == 'notData') {
                        console.log("No hay registro para mostrar.");
                    } else {
                        var info = $.parseJSON(response);                                            
                        datos = info; 
                    }
                    $('#impuesto').val(datos.impuesto);
                    $('#importe').val(datos.importe);                      
                },
                error: function (error) {
                    console.log(error);
                }
            });
        });
    }

    //Registrar Articulo
    if ($('#btnCategoria').length) {

        $('#btnCategoria').click(function () {
            
            const nombreCat = $('#nombreCat').val();
            const action = 'registrarCategoria';

            if (validarfor(nombreCat)) {
                
                $.ajax({
                    url: 'p_articulo.php',
                    type: "POST",
                    async: true,
                    data: {
                        action:action,
                        nombreCat: nombreCat
                    },
                    beforeSend: function () {   
                                       
                    },
                    success: function (response) {
    
                        if (response == 'notData') {
                            alert("No se ingresaron datos al formulario");
                        } else if (true) {
                            alert("Registro exitoso!");
                        } else {
                            alert("Fallo la conexión a Base de datos");
                        }
                    },
                    error: function (error) {
                        console.log(error);
                    }
                });
            } 
            
        });
    }

    
    //Registrar Articulo
    if ($('#btnRegistrar').length) {

        $('#btnRegistrar').click(function () {
            
            const nombre = $('#nombre').val();
            const claveProducto = $('#claveProducto').val();
            const claveSAT = $('#claveSAT').val();
            const categoria = $('#categoria').val();
            const unidad = $('#unidad').val();
            const valorUnitario = $('#valorUnitario').val();
            const impuesto = $('#impuesto').val();
            const importe = $('#importe').val();
            const action = 'registrarArticulo';

            if (validarfor(nombre, claveProducto, claveSAT, categoria, unidad, valorUnitario, impuesto, importe)) {
                
                $.ajax({
                    url: 'p_articulo.php',
                    type: "POST",
                    async: true,
                    data: {
                        action:action,
                        nombre: nombre,
                        claveProducto: claveProducto,
                        claveSAT: claveSAT,
                        categoria: categoria,
                        unidad: unidad,
                        valorUnitario: valorUnitario,
                        impuesto: impuesto,
                        importe: importe
                    },
                    beforeSend: function () {   
                                       
                    },
                    success: function (response) {
    
                        if (response == 'notData') {
                            alert("No se ingresaron datos al formulario");
                        } else if (true) {
                            alert("Registro exitoso!");
                        } else {
                            alert("Fallo la conexión a Base de datos");
                        }
                    },
                    error: function (error) {
                        console.log(error);
                    }
                });
            } 
            
        });
    }

    //Buscar por Nombre
    if ($('#buscarPorNombre').length) {

        $('#buscarPorNombre').click(function () {
            
            const bNombre = $('#nombreB').val();
            const action = 'buscarNombre';
            var dataArticulos ="";

            $.ajax({
                url: 'p_articulo.php',
                type: "POST",
                async: true,
                data: {
                    action:action,
                    bNombre: bNombre
                },
                beforeSend: function () {   
                                   
                },
                success: function (response) {

                    if (response == 'notData') {
                        dataArticulos = "No hay registro para mostrar.";
                    } else {
                        var info = $.parseJSON(response);
                        dataArticulos =`<tr>
                                        <th scope="row">${info.claveProducto}</th>
                                        <td>${info.claveUnidadSAT}</td>
                                        <td>${info.nombre}</td>
                                        <td>${info.unidad}</td>
                                        <td>${info.idCategoria}</td>
                                        <td>${info.valorUnitario}</td>
                                        <td>${info.impuesto}</td>
                                        <td>${info.importe}</td>
                                        <td><button id="modificar" class="btn btn-warning btn-sm" type="button">Modificar</button></td>
                                        <td><button id="eliminar" class="btn btn-danger btn-sm" type="button">Eliminar</button></td>
                                        </tr>`;
                    }
                    $('#datosArticulo').html(dataArticulos);

                },
                error: function (error) {
                    console.log(error);
                }
            });
        });
    }

    //Buscar por ClaveProducto
    if ($('#buscarPorClave').length) {

        $('#buscarPorClave').click(function () {
            
            const bClave = $('#BClaveProducto').val();
            const action = 'buscarClave';
            var dataArticulos ="";

            $.ajax({
                url: 'p_articulo.php',
                type: "POST",
                async: true,
                data: {
                    action:action,
                    bClave: bClave
                },
                beforeSend: function () {   
                                   
                },
                success: function (response) {

                    if (response == 'notData') {
                        dataArticulos = "No hay registro para mostrar.";
                    } else {
                        var info = $.parseJSON(response);
                        dataArticulos =`<tr>
                                        <th scope="row">${info.claveProducto}</th>
                                        <td>${info.claveUnidadSAT}</td>
                                        <td>${info.nombre}</td>
                                        <td>${info.unidad}</td>
                                        <td>${info.idCategoria}</td>
                                        <td>${info.valorUnitario}</td>
                                        <td>${info.impuesto}</td>
                                        <td>${info.importe}</td>
                                        <td><button id="modificar" class="btn btn-warning btn-sm" type="button">Modificar</button></td>
                                        <td><button id="eliminar" class="btn btn-danger btn-sm" type="button">Eliminar</button></td>
                                        </tr>`;
                    }
                    $('#datosArticulo').html(dataArticulos);

                },
                error: function (error) {
                    console.log(error);
                }
            });
        });
    }
/*
    if ( $('#txtSearch').length){
        $('#txtSearch').keyup(function () {
            
            const dataSearch = $('#txtSearch').val();
            const action = 'searchContactKey';
            var dataContact = '';

            $.ajax({
                url: 'ajaxData.php',
                type: "POST",
                async: true,
                data: {
                    action:action,
                    dataSearch:dataSearch
                },
                beforeSend: function () {                    
                },
                success: function (response) {
                    
                    if (response == 'notData') {
                        dataContact = "No hay registros para mostrar.";
                    } else {
                        var info = $.parseJSON(response);
                        dataContact = info;

                    }
                    $('#rowsContact').html(dataContact);
                },
                error: function (error) {
                    console.log(error);
                }
            });
        });
    }*/

    if ( $('#datosArticulo').length) {
        fntContactos();
    }
});//End Ready

//Categorias
function categorias() {
    const action = 'listarCategorias';
    var datos = '';

    $.ajax({
        url: 'p_articulo.php',
        type: "POST",
        async: true,
        data: {
            action:action
        },
        beforeSend: function () {   
                           
        },
        success: function (response) {

            if (response == 'notData') {
                console.log("No hay categorias para mostrar.");
            } else {
                var info = $.parseJSON(response);                                            
                datos = info;
                console.log(datos);
            } 
            $('#categoria').val(datos);                    
        },
        error: function (error) {
            console.log(error);
        }
    });
}


function fntContactos() {
        
        const action = 'listArticulos';
        var datos = '';

        $.ajax({
            url: 'p_articulo.php',
            type: "POST",
            async: true,
            data: {
                action:action
            },
            beforeSend: function () {                    
            },
            success: function (response) {
                
                if (response == 'notData') {
                    datos = "No hay registros para mostrar.";
                } else {
                    datos = JSON.parse(response);   
                }
                $('#datosArticulo').html(datos);
            },
            error: function (error) {
                console.log(error);
            }
        });
}

function validaVacio(valor) {
    valor = valor.replace("&nbsp;", "");
    valor = valor == undefined ? "" : valor;
    if (!valor || 0 === valor.trim().length) {
        return true;
    }
    else {
        return false;
    }
}

function validarfor(nombre, claveProducto, claveSAT, categoria, unidad, valorUnitario, impuesto, importe) {

    var validarCSAT = /^(?=[A-Za-z]+[0-9]|[0-9]+[A-Za-z])[A-Za-z0-9]{3,5}$/gm;    
    var numEntero = /^(?:\+|-)?\d+$/;
    var numDecimal = /^\d*(\.\d{1})?\d{0,1}$/;

    if (validaVacio(nombre) || validaVacio(claveProducto) || validaVacio(claveSAT) || validaVacio(categoria) || validaVacio(unidad) || validaVacio(valorUnitario) || validaVacio(impuesto) || validaVacio(importe)) {  //COMPRUEBA CAMPOS VACIOS
        alert("Los campos no pueden quedar vacios");
        return false;
    }

    if (!numEntero.test(claveProducto)) {
        alert("La clave ingresada es incorrecta.");
        return false;
    }
    if (!validarCSAT.test(claveSAT)) {
        alert("La clave ingresada es incorrecta.");
        return false;
    }

    if (!numDecimal.test(valorUnitario)) {
        alert("El precio es incorrecta.");
        return false;
    }

    return true;
}

function validarfor(nombreCat) {

    if (validaVacio(nombreCat)) {  //COMPRUEBA CAMPOS VACIOS
        alert("Los campos no pueden quedar vacios");
        return false;
    }

    return true;
}