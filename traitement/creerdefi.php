<?php
if (isset($_POST['description']) && !empty($_POST['description'])){
    include ('../bdd/config.php');
    include ('../bdd/bd.php');
    $sql="INSERT INTO defis VALUES (NULL, NULL, ?)";
    $query=$pdo->prepare($sql);
    $query->execute(array($_POST['description']));
    header('Location: ../admin.php');
}


?>