$(document).ready( function () {
    
    if ($('#claveProducto').length) {
        
        $('#claveProducto').keyup( function () {
           
            const claveProducto = $('#claveProducto').val();
            const action = 'buscarArticulo';
            var dataArticulo = "";

            $.ajax({
                url: 'p_factura.php',
                type: "POST",
                async: true,
                data: {
                    action:action,
                    claveProducto: claveProducto
                },
                beforeSend: function () {   
                                   
                },
                success: function (response) {

                    if (response == 'notData') {
                        dataArticulo = "No hay registro para mostrar.";
                    } else {
                        var info = $.parseJSON(response);
                        dataArticulo = info;
                        $('#datosArticulo').html(dataArticulo);
                    }           
                },
                error: function (error) {
                    console.log(error);
                }

            });
        });
    }

    //Agregar Articulo
    if ($('#btnAgregar').length) {

        $('#btnAgregar').click(function () {
            
            const claveProducto = $('#claveProducto').val();
            const cantidad = $('#cantidad').val();
            const action = 'agregarArticulo';
            var datos = '';

            if (validarfor2(claveProducto, cantidad)) {
                
                $.ajax({
                    url: 'p_factura.php',
                    type: "POST",
                    async: true,
                    data: {
                        action:action,
                        claveProducto: claveProducto,
                        cantidad: cantidad
                    },
                    beforeSend: function () {   
                                       
                    },
                    success: function (response) {
    
                        if (response == 'notData') {
                            datos = "No hay registros para mostrar.";
                        } else {
                            datos = JSON.parse(response);   
                        }
                        $('#bodyDetallesF').html(datos);
                    },
                    error: function (error) {
                        console.log(error);
                    }
                });
            } 
            
        });
    }

    //Registrar Factura
    if ($('#btnRegistrar').length) {

        $('#btnRegistrar').click(function () {
            
            const folioR = $('#folioR').val();
            const rfc = $('#rfc').val();
            const razonS = $('#razonS').val();
            const fechaE = $('#fechaE').val();
            const fechaR = $('#fechaR').val();
            const total = $('#total').val();
            const diasRest = $('#diasRest').val();
            const action = 'registrarFactura';

            if (validarfor(folioR, rfc, razonS, fechaE, fechaR, diasRest)) {
                
                $.ajax({
                    url: 'p_factura.php',
                    type: "POST",
                    async: true,
                    data: {
                        action:action,
                        folioR: folioR,
                        rfc: rfc,
                        razonS: razonS,
                        fechaE: fechaE,
                        fechaR: fechaR,
                        total:total,
                        diasRest: diasRest
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
});//End Ready



function validarfor(folioR, rfc, razonS, fechaE, fechaR, total, diasRest) {
 
    var numEntero = /^(?:\+|-)?\d+$/;
    var validarFecha = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/;
    var numDecimal = /^\d*(\.\d{1})?\d{0,1}$/;    

    if (folioR =="" || rfc =="" || razonS=="" || fechaE=="" || fechaR=="" || total=="" || diasRest=="") {  //COMPRUEBA CAMPOS VACIOS
        alert("Los campos no pueden quedar vacios");
        return false;
    }

    if (!numEntero.test(folioR)) {
        alert("El folio ingresado es incorrecto.");
        return false;
    }

    if (!validarInput(rfc)) {
        alert("El RFC ingresada es incorrecto.");
        return false;
    } 

    if (!validarFecha.test(fechaE)) {
        alert("La Fecha Emitida es incorrecta.");
        return false;
    }

    if (!validarFecha.test(fechaR)) {
        alert("La Fecha Recibida es incorrecta.");
        return false;
    }  

    if (!numDecimal.test(total)) {
        alert("El total es incorrecto.");
        return false;
    }

    return true;
}

function validarfor2(claveProducto, cantidad) {
   
    var numEntero = /^(?:\+|-)?\d+$/;

    if (claveProducto == "" || cantidad == "") {  //COMPRUEBA CAMPOS VACIOS
        alert("Los campos no pueden quedar vacios");
        return false;
    }
    
    if (!numEntero.test(claveProducto)) {
        alert("La Clave de Producto ingresada es incorrecta.");
        return false;
    }

    if (!numEntero.test(cantidad)) {
        alert("La clave ingresada es incorrecta.");
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
                    //input.value == undefined ? '' : input.value.trim().toUpperCase();
        
    var rfcCorrecto = rfcValido(rfc);   // ⬅️ Acá se comprueba
  
    if (rfcCorrecto) {
    	return true;
    } else {
        return false;
    }

}