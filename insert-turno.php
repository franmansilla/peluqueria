<?php
include('conexion.php');

$nombre = $_POST['name'];
$hora = $_POST['hora'];
$fecha = $_POST['fecha'];

if (!empty($nombre) && !empty($hora) && !empty($hora)) {
  $query = "INSERT INTO peluqueria.turnos (Nombre, Dia, Hora, Peluquero) VALUES ('$nombre','$fecha', '$hora', '1')";
  $result = mysqli_query($conexion, $query);
  if (!$result) {
    die('Query Failed.'. mysqli_error($conexion));
  }
  $json = array();
  $json[] = array(
    'fecha' => $fecha,
    'hora' => $hora
  );
  $jsonstring = json_encode($json);
echo $jsonstring;
}

?>