<?php
session_start();
if (isset($_POST['idVideo']) && isset($_SESSION['id'])){
    include ('../bdd/config.php');
    include ('../bdd/bd.php');

    $idVideo=htmlspecialchars(addslashes($_POST['idVideo']));
    $monid=$_SESSION['id'];

    $sql="SELECT id FROM likes WHERE video_id=?";
    $query = $pdo->prepare($sql);
    $query->execute(array($idVideo));
    $count=$query->rowCount();

    echo "$count likes";
}
?>