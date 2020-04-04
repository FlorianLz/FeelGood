<?php
if (isset($_POST['pseudo']) && !empty($_POST['pseudo']) && isset($_POST['mdp']) && !empty($_POST['mdp'])){
    include ('../bdd/config.php');
    include ('../bdd/bd.php');
    $pseudo=htmlspecialchars(addslashes($_POST['pseudo']));
    $mdp=htmlspecialchars(addslashes($_POST['mdp']));
    $sql="SELECT pseudo FROM utilisateurs WHERE pseudo=? AND mdp=PASSWORD(?)";
    $query=$pdo->prepare($sql);
    $query->execute(array($pseudo,$mdp));

    if($line=$query->fetch()){
        session_start();
        $_SESSION['admin']=$pseudo;
        header('Location: ../admin.php');
    }else{
        header('Location: ../admin.php');
    }
}


?>