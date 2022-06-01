<?php
if ($_POST) {
    
    require_once("conexion.php");

    //Listar Categorias
    if ($_POST['action'] == 'listarCategorias') {
    
        $query_Select = mysqli_query($conection, "SELECT * FROM categoría ORDER BY nombreCat asc");

        $num_rows = mysqli_num_rows($query_Select);

        if ($num_rows > 0) {

            $htmlTable = '';
            while($row = mysqli_fetch_assoc($query_Select)) {

                $htmlTable .= '<option value="'.$row['idCategoria'].'">'.$row['nombreCat'].'</option>';

            }   
            //echo $query_Insert;
            echo json_encode($htmlTable, JSON_UNESCAPED_UNICODE);
            
        }else {
            echo "notData";
        }
        exit;
    }

    //Calcular Impuesto
    if ($_POST['action'] == 'calcularImpuesto') {
    
        $valorU = $_POST['valorU'];
        $iva = 0.16;

        $datosArray = array();

        if (!empty($valorU)) {
            $impuesto = $valorU * $iva;
            $impuesto2 = number_format($impuesto, 2);

            $importe = $valorU + ($valorU * 0.16);
            $importe2 = number_format($importe, 2);

            $datosArray = array("impuesto"=>"$impuesto2","importe"=>"$importe2");

            //print_r($arrDatos);
            echo json_encode($datosArray, JSON_PRETTY_PRINT);

        }else {
            echo "notData";
        }
        exit;
    }

    if ($_POST['action'] == 'registrarCategoria') {
           
            
        $nombreCat = $_POST['nombreCat'];
        $sql= "INSERT INTO categoría (nombreCat) VALUES ('$nombreCat');";
        
        if (true) {
            

            $query_Insert = mysqli_query($conection, $sql);

            //echo $query_Insert;
            echo json_encode($query_Insert, JSON_UNESCAPED_UNICODE);
            
        }else {
            echo "notData";
        }
        exit;

    }

    /*INSERT INTO articulo VALUES(15121501, 'H87', 'Aceite 4 Tiempos 946ML', 'pieza', 99.14, , 15.86, 115.00, 123);*/
    /*nombre, claveProducto, claveSAT, categoria, unidad, valorUnitario, impuesto, importe  (claveProducto, claveUnidadSAT, nombre, unidad, valorUnitario, impuesto, importe, idCategoria)*/
    if ($_POST['action'] == 'registrarArticulo') {
           
            
        $nombre = $_POST['nombre'];
        $claveProducto = intval($_POST['claveProducto']);
        $claveSAT = $_POST['claveSAT'];
        $categoria = intval($_POST['categoria']);
        $unidad = $_POST['unidad'];
        $valorUnitario = floatval($_POST['valorUnitario']);
        $impuesto1 = floatval($_POST['impuesto']);
        $importe1 = floatval($_POST['importe']);
        $sql= "INSERT INTO articulo (claveProducto, claveUnidadSAT, nombre, unidad, valorUnitario, impuesto, importe, idCategoria) VALUES ($claveProducto, '$claveSAT', '$nombre', '$unidad', $valorUnitario, $impuesto1, $importe1, $categoria);";
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

    if ($_POST['action'] == 'buscarNombre') {
        
        if (!empty($_POST['bNombre'])) {
            
            $arrContact = array();
            $bNombre = $_POST['bNombre'];
            $querySelect = mysqli_query($conection, "SELECT * FROM articulo WHERE nombre = '$bNombre';");
            $num_rows = mysqli_num_rows($querySelect);
            if ($num_rows > 0) {
                
                $arrContact = mysqli_fetch_assoc($querySelect);                
                echo json_encode($arrContact, JSON_UNESCAPED_UNICODE);
            }else {
                echo "notData";
            }
            exit;
        }
    }
    if ($_POST['action'] == 'buscarClave') {
        
        if (!empty($_POST['bClave'])) {
            
            $arrContact = array();
            $bClave = intval($_POST['bClave']);
            $querySelect = mysqli_query($conection, "SELECT * FROM articulo WHERE claveProducto = $bClave;");
            $num_rows = mysqli_num_rows($querySelect);
            if ($num_rows > 0) {
                
                $arrContact = mysqli_fetch_assoc($querySelect);                
                echo json_encode($arrContact, JSON_UNESCAPED_UNICODE);
            }else {
                echo "notData";
            }
            exit;
        }
    }

    //Listar Tabla
    
    if ($_POST['action'] == 'listArticulos') {

        $query_select = mysqli_query($conection, "SELECT * FROM articulo");
        $num_rows = mysqli_num_rows($query_select);

        if ($num_rows > 0) {

            $htmlTable = '';
            while ($row = mysqli_fetch_assoc($query_select)) {
                $htmlTable .='<tr>
                                <td scope="row">'.$row['claveProducto'].'</td>
                                <td>'.$row['claveUnidadSAT'].'</td>
                                <td>'.$row['nombre'].'</td>
                                <td>'.$row['unidad'].'</td>
                                <td>'.$row['idCategoria'].'</td>
                                <td>'.$row['valorUnitario'].'</td>
                                <td>'.$row['impuesto'].'</td>
                                <td>'.$row['importe'].'</td>
                                <td><button id="modificar" class="btn btn-warning btn-sm" type="button">Modificar</button></td>
                                <td><button id="eliminar" class="btn btn-danger btn-sm" type="button">Eliminar</button></td>
                            </tr>';
            }
            //echo $htmlTable;
            echo json_encode($htmlTable, JSON_UNESCAPED_UNICODE);
        }else {
            echo "notData";
        }
        exit;
    }
}
?>