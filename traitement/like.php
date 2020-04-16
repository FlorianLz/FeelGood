<?php
session_start();
if (isset($_POST['idVideo']) && isset($_SESSION['id'])){
    include ('../bdd/config.php');
    include ('../bdd/bd.php');

    $idVideo=htmlspecialchars(addslashes($_POST['idVideo']));
    $monid=$_SESSION['id'];

    //On vérifie si j'aime déjà la publication ou non

    $sql="SELECT id FROM likes WHERE video_id=? and utilisateur_id=?";
    $query = $pdo->prepare($sql);
    $query->execute(array($idVideo,$monid));
    $count=$query->rowCount();

    if($count == 0){
        $sqladd="INSERT INTO likes VALUES (NULL,'$idVideo','$monid')";
        $queryadd = $pdo->prepare($sqladd);
        $queryadd->execute();

        $sql="SELECT id FROM likes WHERE video_id=?";
        $query = $pdo->prepare($sql);
        $query->execute(array($idVideo));
        $count=$query->rowCount();

        echo "<img src='assets/images/coeur2.png' class='imgLike' alt='imgLike2'/>";
    }else{
        $sqldelete="DELETE FROM likes WHERE utilisateur_id=? AND video_id=?";
        $querydelete = $pdo->prepare($sqldelete);
        $querydelete->execute(array($monid, $idVideo));

        $sql="SELECT id FROM likes WHERE video_id=?";
        $query = $pdo->prepare($sql);
        $query->execute(array($idVideo));
        $count=$query->rowCount();

        echo "<img src='assets/images/coeur1.png' class='imgLike' alt='imgLike1'/>";
    }
}
?>