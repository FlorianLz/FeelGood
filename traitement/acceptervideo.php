<?php
session_start();
$id=$_GET['id'];
include ('../bdd/config.php');
include ('../bdd/bd.php');
$sql="UPDATE videos SET visible = 1 WHERE id=?";
$query=$pdo->prepare($sql);
$query->execute(array($id));
header('Location: ../admin.php');

?>