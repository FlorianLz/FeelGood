<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['recaptcha_response'])) {

    // Build POST request:
    $recaptcha_url = 'https://www.google.com/recaptcha/api/siteverify';
    $recaptcha_secret = '6LeXw-cUAAAAAMefty7kaR1fJQ2tdRThi6wFlE2m';
    $recaptcha_response = $_POST['recaptcha_response'];

    // Make and decode POST request:
    $recaptcha = file_get_contents($recaptcha_url . '?secret=' . $recaptcha_secret . '&response=' . $recaptcha_response);
    $recaptcha = json_decode($recaptcha);

    // Take action based on the score returned:
    if ($recaptcha->score >= 0.5) {
        //C'est ok, on continue
        if(isset($_POST['identifiant']) && isset($_POST['email']) && isset($_POST['mdp']) && isset($_POST['mdp2'])){
            include ('../bdd/config.php');
            include ('../bdd/bd.php');
            //Vérif du pseudo
            $pseudo=htmlspecialchars($_POST['identifiant']);
            $email=htmlspecialchars($_POST['email']);
            $mdp=htmlspecialchars($_POST['mdp']);
            $mdp2=htmlspecialchars($_POST['mdp2']);

            if(preg_match('`^([a-zA-Z0-9-_]{2,36})$`', $pseudo)) {
                //On vérifie que le pseudo n'existe pas
                $sql="SELECT LOWER(pseudo) FROM utilisateurs WHERE pseudo=?";
                $query=$pdo->prepare($sql);
                $query->execute(array(strtolower($pseudo)));

                if($line = $query->fetch()){
                    echo 'Pseudo déjà utilisé...';
                }else{
                    //on vérifie l'email
                    $regex = '/^[^0-9][_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/';

                    if (preg_match($regex, $email)) {
                        // Email déjà enregistrée ?
                        $sql="SELECT LOWER(email) FROM utilisateurs WHERE email=?";
                        $query=$pdo->prepare($sql);
                        $query->execute(array(strtolower($email)));
                        if($line = $query->fetch()){
                            echo 'Email déjà utilisé...';
                        }else{
                            //Vérif des 2 mdp
                            if($mdp === $mdp2){
                                $sql="INSERT INTO utilisateurs VALUES (NULL, ?, ?, PASSWORD(?), 0)";
                                $query=$pdo->prepare($sql);
                                $query->execute(array($email,$pseudo,$mdp));
                                echo 'OK';
                            }else{
                                echo 'Vos mots de passe doivent être identiques...';
                            }
                        }
                    } else {
                        echo'Le format de votre adresse mail est invalide...';
                    }
                }
            }else{
                echo 'Pseudo incorrect !';
            }

        }else{
            'Merci de renseigner tous les champs !';
        }
    } else {
        //Score trop faible, on stop
        echo 'Erreur lors de l\'inscription';
    }

}
?>