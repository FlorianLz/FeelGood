<?php

include('../bdd/config.php');
include('../bdd/bd.php');
$sql="SELECT id FROM defis ORDER BY id DESC LIMIT 1";
$query=$pdo->prepare($sql);
$query->execute();
$line=$query->fetch();

$id=$line['id'];
$fileName = $_FILES["file1"]["name"];
$fileTmpLoc = $_FILES["file1"]["tmp_name"];
$fileType = $_FILES["file1"]["type"];
$fileSize = $_FILES["file1"]["size"];
$fileErrorMsg = $_FILES["file1"]["error"];
$extensions_autorisees = array('video/mp4');
$name="/public/uploads/$id-".time();

if (!$fileTmpLoc) { // if file not chosen
    echo "Erreur : aucun fichier sélectionné.";
    exit();
}

if (in_array($fileType, $extensions_autorisees)) {
    if(move_uploaded_file($fileTmpLoc, '..'.$name)){
        $sql="INSERT INTO videos VALUES (NULL, ?, ? , 0)";
        $query=$pdo->prepare($sql);
        $query->execute(array($name,$id));
        echo "Votre vidéo à bien été envoyée. Merci !";
    } else {
        echo "Errreur lors de l'envoi de votre vidéo, merci de réessayer.";
    }
}else{

   echo 'Merci de choisir un fichier MP4.';

}

?>