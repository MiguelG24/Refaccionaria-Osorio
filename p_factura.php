<?php
if ($_POST) {
    
    require_once("conexion.php");

    //Buscar por Input
    if ($_POST['action'] == 'buscarArticulo') {
    
        $claveProducto = $_POST['claveProducto'];

        $query_select = mysqli_query($conection, "SELECT claveProducto, nombre, unidad, importe  FROM articulo WHERE 
                                                    claveProducto LIKE '%$claveProducto%'");
                                                    
        $num_rows = mysqli_num_rows($query_select);

        if ($num_rows > 0) {

            $htmlTable = '';
            while ($row = mysqli_fetch_assoc($query_select)) {
                $htmlTable .='<div class="card mb-3 mt-4" style="max-width: 450px;">
                                <div class="row g-0 w-100">
                                    <div class="col-md-5">
                                        <div class="card-header text-end fw-bold">
                                            Clave de Producto:
                                        </div>
                                        <div class="card-header text-end fw-bold">
                                            Nombre:
                                        </div>
                                        <div class="card-header text-end fw-bold">
                                            Unidad:
                                        </div>
                                        <div class="card-header text-end fw-bold">
                                            Importe:
                                        </div>

                                    </div>
                                    <div class="col-md-7">
                                        <ul class="list-group list-group-flush">
                                            <li class="list-group-item">'.$row['claveProducto'].'</li>
                                            <li class="list-group-item">'.$row['nombre'].'</li>
                                            <li class="list-group-item">'.$row['unidad'].'</li>
                                            <li class="list-group-item">'.$row['importe'].'</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>';
            }
            //echo $htmlTable;
            echo json_encode($htmlTable, JSON_UNESCAPED_UNICODE);
        }else {
            echo "notData";
        }
        exit;
    }
    //Agergar Articulo a detalles de Factura
    if ($_POST['action'] == 'agregarArticulo') {

        $claveProducto = intval($_POST['claveProducto']);
        $cantidad = intval($_POST['cantidad']);
        $subtotalAPagar = 0;

        $result = mysqli_query($conection, "SELECT valorUnitario FROM articulo WHERE claveProducto = $claveProducto;");

        $row = mysqli_fetch_row($result);
        $valorUnitarioA = $row[0];

        $subtotalAPagar = $cantidad * $valorUnitarioA;

        //$impuestoIVA = $subtotalAPagar * 0.16;
        
/*
        $sql= "INSERT INTO detallesFactura (folioFactura , claveArticulo, cantidadPorArticulo, subtotalAPagar, impuestoIVA) VALUES ($folioR, $claveProducto, $cantidad, $subtotalAPagar, $impuestoIVA);";
        $query_Insert = mysqli_query($conection, $sql);
*/
        $select = "SELECT a.claveProducto, a.claveUnidadSAT, a.nombre, a.unidad, c.nombreCat, a.valorUnitario FROM articulo as a, categoría as c WHERE a.idCategoria = c.idCategoria AND a.claveProducto = $claveProducto;";
        $query_Select = mysqli_query($conection, $select);
        $num_rows = mysqli_num_rows($query_Select);

        if ($num_rows > 0) {

            $htmlTable = '';
            while ($row = mysqli_fetch_assoc($query_Select)) {
                $htmlTable .='<tr>
                                <td scope="row">'.$row['claveProducto'].'</td>
                                <td>'.$row['claveUnidadSAT'].'</td>
                                <td>'.$row['nombre'].'</td>
                                <td>'.$row['unidad'].'</td>
                                <td>'.$row['nombreCat'].'</td>
                                <td>'.$row['valorUnitario'].'</td>
                                <td>'.$cantidad.'</td>
                                <td>'.$subtotalAPagar.'</td>
                                <td><button id="modificar" class="btn btn-warning btn-sm" type="button">Modificar</button></td>
                                <td><button id="eliminar" class="btn btn-danger btn-sm" type="button">Eliminar</button></td>
                            </tr>';        
            }    
            //echo $query_Insert;
            echo json_encode($htmlTable, JSON_UNESCAPED_UNICODE);
            
        }else {
            echo "notData";
        }
        exit;

    }



    if ($_POST['action'] == 'registrarFactura') {
                    
        $folioR = intval($_POST['folioR']);
        $rfc = $_POST['rfc'];
        $razonS = $_POST['razonS'];
        $fechaE = $_POST['fechaE'];
        $fechaR = $_POST['fechaR'];
        $importeTotal = floatval($_POST['total']);
        $diasRest = intval($_POST['diasRest']);

        $sql= "INSERT INTO factura (folio, rfcProveedor, fechaEmitida, fechaRecibida, importeTotal, diasRestantes) VALUES ($folioR, '$rfc', '$razonS', '$fechaE', '$fechaR', $importeTotal, $diasRest);";
        // INSERT INTO `articulo` (`claveProducto`, `claveUnidadSAT`, `nombre`, `unidad`, `valorUnitario`, `impuesto`, `importe`, `idCategoria`) VALUES ('', '', '', '', '', '', '', '')
        if (true) {
            

            $query_Insert = mysqli_query($conection, $sql);

            //echo $query_Insert;
            echo json_encode($query_Insert, JSON_UNESCAPED_UNICODE);
            
        }else {
            echo "notData";
        }
        exit;

    }

    /*
    if ($_POST['action'] == 'searchContact') {
        
        if (!empty($_POST['id'])) {
            
            $arrContact = array();
            $intId = intval($_POST['id']);
            $querySelect = mysqli_query($conection, "SELECT * FROM ag_contacto WHERE id_contacto = $intId");
            $num_rows = mysqli_num_rows($querySelect);
            if ($num_rows > 0) {
                
                $arrContact = mysqli_fetch_assoc($querySelect);
                echo json_encode($arrContact, JSON_UNESCAPED_UNICODE);
            }else {
                echo "notData";
            }
            exit;
         }

    }*/



    //Listar Tabla
    /*
    if ($_POST['action'] == 'listContact') {

        $query_select = mysqli_query($conection, "SELECT * FROM ag_contacto");
        $num_rows = mysqli_num_rows($query_select);

        if ($num_rows > 0) {

            $htmlTable = '';
            while ($row = mysqli_fetch_assoc($query_select)) {
                $htmlTable .='<tr>
                                <th scope="row" id="'.$row['id_contacto'].'">'.$row['id_contacto'].'</th>
                                <td>'.$row['nombres'].'</td>
                                <td>'.$row['apellidos'].'</td>
                                <td>'.$row['telefono'].'</td>
                                <td>'.$row['email'].'</td>
                            </tr>';
            }
            //echo $htmlTable;
            echo json_encode($htmlTable, JSON_UNESCAPED_UNICODE);
        }else {
            echo "notData";
        }
        exit;
    }*/
}
?>



