<?php
include('../conexion.php');

$query = "select DesdeM,HastaM,DesdeT,HastaT from usuarios where id=1";

$result = mysqli_query($conexion, $query);

if (!$result) {
  die('Query Error' . mysqli_error($conexion));
}
$row = mysqli_fetch_array($result);
$json[] = array(
  'dm' => date("H:i", strtotime($row['DesdeM'])),
  'dt' => date("H:i", strtotime($row['DesdeT'])),
  'hm' => date("H:i", strtotime($row['HastaM'])),
  'ht' => date("H:i", strtotime($row['HastaT']))
);
$jsonstring = json_encode($json);
echo $jsonstring;
?>