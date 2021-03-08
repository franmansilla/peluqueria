<?php
include('../conexion.php');
$query = "SELECT * FROM dias WHERE idUsuario=1";
$result = mysqli_query($conexion, $query);

if (!$result) {
  die('Query Error' . mysqli_error($conexion));
}
  while ($row = mysqli_fetch_array($result)) {
    $json[] = array(
      'id' => $row['IDDia'],
      'dia'=>$row['Dia'],
      'habilitado'=>$row['Habilitado']
    );
  }
$jsonstring = json_encode($json);
echo $jsonstring;
?>