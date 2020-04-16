<?php
if (isset($_POST['pseudo']) && !empty($_POST['pseudo']) && isset($_POST['mdp']) && !empty($_POST['mdp'])){
    include ('../bdd/config.php');
    include ('../bdd/bd.php');
    $pseudo=strtolower(htmlspecialchars(addslashes($_POST['pseudo'])));
    $mdp=htmlspecialchars(addslashes($_POST['mdp']));
    $sql="SELECT pseudo FROM utilisateurs WHERE ( LOWER(pseudo)=? OR LOWER(email)=?) AND mdp=PASSWORD(?)";
    $query=$pdo->prepare($sql);
    $query->execute(array($pseudo,$pseudo,$mdp));

    if($line=$query->fetch()){
        session_start();
        if($line['admin'] == 1){
            $_SESSION['admin']=$pseudo;
            $_SESSION['login']=$pseudo;
            header('Location: ../admin.php');
        }else{
            $_SESSION['login']=$pseudo;
        }
    }else{
        header('Location: ../index.php');
    }
}


?>