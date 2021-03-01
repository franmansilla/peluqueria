<?php
include('../conexion.php');
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
    if (date("N", strtotime($dia))==$row['IDDia'] and $row['Habilitado']=='0') {
     $bandera= 1;
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
?>