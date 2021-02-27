<?php
include('conexion.php');

$nombre = $_POST['name'];
$hora = $_POST['hora'];
$fecha = $_POST['fecha'];

if (!empty($nombre) && !empty($hora) && !empty($hora)) {
  $query = "INSERT INTO peluqueria.turnos (Nombre, Dia, Hora, Peluquero) VALUES ('$nombre','$fecha', '$hora', '1')";
  $result = mysqli_query($conexion, $query);
  if (!$result) {
    die('Query Failed.');
  }
  echo "Task Added Successfully"; 
}
?>