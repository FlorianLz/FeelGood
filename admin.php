<?php
include ('bdd/config.php');
include ('bdd/bd.php');
session_start();

if (!isset($_SESSION['admin'])){
    echo 'Merci de vous identifier pour accéder à cette partie.';
    ?>
    <form action="traitement/connexion.php" method="post">
        <input type="text" name="pseudo" placeholder="pseudo...">
        <input type="password" name="mdp" placeholder="mdp...">
        <input type="submit" value="Se connecter">
    </form>
    <?php
}else{
    ?>
    <h1>Liste des défis :</h1>

    <?php
    $sql="SELECT *, DATE_FORMAT(defis.date,'%d/%m/%Y') AS date_formate FROM defis";
    $query=$pdo->prepare($sql);
    $query->execute();

    while($line=$query->fetch()){
        echo '<p>Défi du ' .$line['date_formate']. ' : '.$line['description']. '</p><form method="post" action="traitement/supprimerdefi.php"><input type="hidden" name="iddefi" value="'.$line['id'].'"><input type="submit" value="Supprimer ce défi"></form>';
    }
    ?>
    <h1>Créer un défi :</h1>
    <form action="traitement/creerdefi.php" method="post">
        <input type="text" name="description" placeholder="Description du défi...">
        <input type="submit" value="Envoyer ce défi">
    </form>
<?php
}
?>