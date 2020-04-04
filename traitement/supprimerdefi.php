<?php
if (isset($_POST['iddefi']) && !empty($_POST['iddefi'])){
    include ('../bdd/config.php');
    include ('../bdd/bd.php');
    $sql="DELETE FROM defis WHERE id=?";
    $query=$pdo->prepare($sql);
    $query->execute(array($_POST['iddefi']));
    header('Location: ../admin.php');
}


?>