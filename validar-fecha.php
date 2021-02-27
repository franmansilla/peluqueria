<?php
include('conexion.php');
$query = "SELECT * FROM dias WHERE idUsuario=1";
$result = mysqli_query($conexion, $query);

if (!$result) {
  die('Query Error' . mysqli_error($conexion));
}
$d = date("Y-m-d");
$h = date("Y-m-d", strtotime($d . '+ 14 days'));
$dias = array();
while ($d <= $h) {
  array_push($dias, $d);
  $nd = date("Y-m-d", strtotime($d . '+ 1 days'));
  $d = $nd;
}
foreach ($dias as &$dia) {
  $bandera = 0;
  while ($row = mysqli_fetch_array($result)) {
    switch (date("N", strtotime($dia))) {
      case 1:
        echo "lunes";
        break;
      case 2:
        echo "martes";
        break;
      case 3:
        echo "miercoles";
        break;
      case 4:
        echo "jueves";
        break;
      case 5:
        echo "viernes";
        break;
      case 6:
        echo "sabado";
        break;
      case 7:
        echo "domingo";
        break;
    }
  }
  mysqli_data_seek($result, 0);
  if ($bandera == 0) {
    $json[] = array(
      'dia' => $dia
    );
  }
}
$jsonstring = json_encode($json);
echo $jsonstring;
