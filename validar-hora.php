<?php
include('conexion.php');
$fecha = $_POST['fecha'];
if (!empty($fecha)) {
  $query = "SELECT hora from turnos where dia='$fecha'";
  $query1 = "select DesdeM,HastaM,DesdeT,HastaT from usuarios where id=1";
  $result = mysqli_query($conexion, $query);
  $result1 = mysqli_query($conexion, $query1);

  if (!$result) {
    die('Query Error' . mysqli_error($conexion));
  }
  if (!$result1) {
    die('Query Error' . mysqli_error($conexion));
  }
  $row = mysqli_fetch_array($result1);
  $dm = date("H:i", strtotime($row['DesdeM']));
  $hm = date("H:i", strtotime($row['HastaM']));
  $dt = date("H:i", strtotime($row['DesdeT']));
  $ht = date("H:i", strtotime($row['HastaT']));
  $horas = array();
  while ($dm < $hm) {
    array_push($horas, $dm);
    $nd = strtotime('+30 minute', strtotime($dm));
    $nd = date("H:i", $nd);
    $dm = $nd;
  }
  while ($dt < $ht) {
    array_push($horas, $dt);
    $nd = strtotime('+30 minute', strtotime($dt));
    $nd = date("H:i", $nd);
    $dt = $nd;
  }
  $json = array();
  foreach ($horas as &$hora) {
    $bandera = 0;
    while ($row = mysqli_fetch_array($result)) {
      
      if ($hora == date("H:i", strtotime($row['hora']))) {
        $bandera = 1;
      }
    }
    mysqli_data_seek($result,0);
    if ($bandera == 0) {
      $json[] = array(
        'hora' => $hora
      );
    }
  }
   $jsonstring = json_encode($json);
  echo $jsonstring;

}
mysqli_free_result($result);
?>
