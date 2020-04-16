<?php
if (isset($_POST['pseudo']) && !empty($_POST['pseudo']) && isset($_POST['mdp']) && !empty($_POST['mdp'])){
    include ('../bdd/config.php');
    include ('../bdd/bd.php');
    $pseudo=htmlspecialchars(addslashes($_POST['pseudo']));
    $mdp=htmlspecialchars(addslashes($_POST['mdp']));
    $sql="SELECT id,pseudo,admin FROM utilisateurs WHERE ( LOWER(pseudo) = ? OR LOWER(email) = ? ) AND mdp=PASSWORD(?)";
    $query=$pdo->prepare($sql);
    $query->execute(array(strtolower($pseudo),strtolower($pseudo),$mdp));

    if($line=$query->fetch()){
        session_start();
        if($line['admin'] == 1){
            $_SESSION['admin']=$line['pseudo'];
            $_SESSION['login']=$line['pseudo'];
            $_SESSION['id']=$line['id'];
            echo'admin';
        }else{
            $_SESSION['login']=$line['pseudo'];
            $_SESSION['id']=$line['id'];
            echo'ok';
        }
    }else{
        echo'Le couple identifiant / mdp est incorrect !';
    }
}else{
    echo'Merci de remplir tous les champs.';
}


?>