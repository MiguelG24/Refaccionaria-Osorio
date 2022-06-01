$(document).ready(function() {

    //Registrar Proveedor
    if ($('#btnRegistrarProveedor').length) {

        $('#btnRegistrarProveedor').click(function () {
            
            const rfc = $('#rfc').val();
            const razonSocial = $('#razonSocial').val();
            const limiteCredito = $('#limiteCredito').val();
            const refernciaPago = $('#refernciaPago').val();
            const numeroCuenta = $('#numeroCuenta').val();
            const clabeInter = $('#clabeInter').val();
            const telefono = $('#telefono').val();
            const direccion = $('#direccion').val();
            const action = 'registrarProveedor';

            if (validarfor(rfc, razonSocial, limiteCredito, refernciaPago, numeroCuenta, clabeInter, telefono, direccion)) {
                
                $.ajax({
                    url: 'p_proveedores.php',
                    type: "POST",
                    async: true,
                    data: {
                        action:action,
                        rfc: rfc,
                        razonSocial: razonSocial,
                        limiteCredito: limiteCredito,
                        refernciaPago: refernciaPago,
                        numeroCuenta: numeroCuenta,
                        clabeInter: clabeInter,
                        telefono: telefono,
                        direccion: direccion
                    },
                    beforeSend: function () {   
                                       
                    },
                    success: function (response) {
    
                        if (response == 'notData') {
                            alert("No se ingresaron datos al formulario");
                        } else if (response == 1) {
                            alert("Registro de Proveedor exitoso!");
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
/*
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
    }

    if ( $('#datosArticulo').length) {
        fntContactos();
    }*/
});//End Ready

/*
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
*/

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

function validarfor(rfc, razonSocial, limiteCredito, refernciaPago, numeroCuenta, clabeInter, telefono, direccion) {

    var numDecimal = /^\d*(\.\d{1})?\d{0,1}$/;
    var numDigitos = /^[0-9]{5,20}$/i;
    var validarNCuenta = /^[0-9]{14}$/i;
    var validarClabe = /^[0-9]{18}$/i;
    var validarTEl = /^[0-9]{2,3}-? ?[0-9]{6,7}$/;

    if (validaVacio(rfc) || validaVacio(razonSocial) || validaVacio(limiteCredito) || validaVacio(refernciaPago) || validaVacio(numeroCuenta) || validaVacio(clabeInter) || validaVacio(telefono) || validaVacio(direccion)) {  //COMPRUEBA CAMPOS VACIOS
        alert("Los campos no pueden quedar vacios");
        return false;
    }

    if (!validarInput(rfc)) {
        alert("El RFC ingresada es incorrecto.");
        return false;
    } 

    if (!numDecimal.test(limiteCredito)) {
        alert("El limite de credito ingresado es incorrecto.");
        return false;
    }

    if (!numDigitos.test(refernciaPago)) {
        alert("La Referencia de Pago es incorrecta.");
        return false;
    }

    if (!validarNCuenta.test(numeroCuenta)) {
        alert("El Número de Cuenta es incorrecta.");
        return false;
    }

    if (!validarClabe.test(clabeInter)) {
        alert("La clabe Interbancaria es incorrecta.");
        return false;
    }

    if (!validarTEl.test(telefono)) {
        alert("El Numero de teléfono ingresado es incorrecto.");
        return false;
    }

    return true;
}

//Función para validar un RFC
// Devuelve el RFC sin espacios ni guiones si es correcto
// Devuelve false si es inválido
// (debe estar en mayúsculas, guiones y espacios intermedios opcionales)
function rfcValido(rfc, aceptarGenerico = true) {
    const re       = /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/;
    var   validado = rfc.match(re);

    if (!validado)  //Coincide con el formato general del regex?
        return false;

    //Separar el dígito verificador del resto del RFC
    const digitoVerificador = validado.pop(),
          rfcSinDigito      = validado.slice(1).join(''),
          len               = rfcSinDigito.length,

    //Obtener el digito esperado
          diccionario       = "0123456789ABCDEFGHIJKLMN&OPQRSTUVWXYZ Ñ",
          indice            = len + 1;
    var   suma,
          digitoEsperado;

    if (len == 12) suma = 0
    else suma = 481; //Ajuste para persona moral

    for(var i=0; i<len; i++)
        suma += diccionario.indexOf(rfcSinDigito.charAt(i)) * (indice - i);
    digitoEsperado = 11 - suma % 11;
    if (digitoEsperado == 11) digitoEsperado = 0;
    else if (digitoEsperado == 10) digitoEsperado = "A";

    //El dígito verificador coincide con el esperado?
    // o es un RFC Genérico (ventas a público general)?
    if ((digitoVerificador != digitoEsperado)
     && (!aceptarGenerico || rfcSinDigito + digitoVerificador != "XAXX010101000"))
        return false;
    else if (!aceptarGenerico && rfcSinDigito + digitoVerificador == "XEXX010101000")
        return false;
    return rfcSinDigito + digitoVerificador;
}


//Handler para el evento cuando cambia el input
// -Lleva la RFC a mayúsculas para validarlo
// -Elimina los espacios que pueda tener antes o después
function validarInput(input) {
    var rfc = input.trim().toUpperCase();
        
    var rfcCorrecto = rfcValido(rfc);   // ⬅️ Acá se comprueba
  
    if (rfcCorrecto) {
    	return true;
    } else {
        return false;
    }

}