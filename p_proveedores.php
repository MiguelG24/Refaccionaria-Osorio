<?php
if ($_POST) {
    
    require_once("conexion.php");

    //Registrar Proveedor 
    if ($_POST['action'] == 'registrarProveedor') {
                    
        $rfc = $_POST['rfc'];
        $razonSocial = $_POST['razonSocial'];
        $limiteCredito = floatval($_POST['limiteCredito']);
        $refernciaPago = $_POST['refernciaPago'];
        $numeroCuenta = $_POST['numeroCuenta'];
        $clabeInter = $_POST['clabeInter'];
        $telefono = $_POST['telefono'];
        $direccion = $_POST['direccion'];

        $sql= "INSERT INTO proveedor (RFC, razonSocial, limiteCredito, referenciaPago, numCuenta, clabeInterbancaria, clabeInterbancaria, direccion) VALUES ('$rfc', '$razonSocial', $limiteCredito, '$refernciaPago', '$numeroCuenta', '$clabeInter', '$telefono', '$direccion');";

        if (true) {
            

            $query_Insert = mysqli_query($conection, $sql);

            //print_r($query_Insert);

           
            echo json_encode($query_Insert, JSON_UNESCAPED_UNICODE);
            
        }else {
            echo "notData";
        }
        exit;

    }
    /*
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


    */
 

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