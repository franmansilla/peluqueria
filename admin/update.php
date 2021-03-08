<?php

  include('../conexion.php');

if(isset($_POST['dias'])) {
  $dias = $_POST['dias']; 
  $dm = $_POST['dm'];
  $hm = $_POST['hm'];
  $dt = $_POST['dt'];
  $ht = $_POST['ht'];
  $query = "UPDATE usuarios SET DesdeM = '$dm', HastaM = '$hm', DesdeT = '$dt', HastaT = '$ht' WHERE id = '1'";
  $query1 = "UPDATE dias SET Habilitado = '0'";
  $result1 = mysqli_query($conexion, $query1);
  foreach ($dias as $dia) {
    $query1 = "UPDATE dias SET Habilitado = '1' WHERE IDDia=$dia";
    $result1 = mysqli_query($conexion, $query1);
}
  $result = mysqli_query($conexion, $query);
  

  if (!$result) {
    die('Query Failed.');
  }if (!$result1) {
    die('Query Failed.');
  }
  echo "Task Update Successfully";  

}

?>