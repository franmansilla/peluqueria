<?php
    include("../conexion.php");
    
    $user = $_POST['user'];
    $pass= $_POST['pass'];


    $consulta = "SELECT * FROM usuarios WHERE Usuario = '$user' and contraseña = sha('$pass')";
    $ejecucion = mysqli_query($conexion, $consulta);
    $resultado=mysqli_fetch_array($ejecucion);
    
    if(isset($resultado['Id'])){
        session_start();
        $_SESSION['Id'] = $resultado['Id'];
        $_SESSION['Usuario'] = $resultado['Usuario'] ;
        echo 1;
    }else{
        echo 0;
    }
    mysqli_close($conexion);
?>