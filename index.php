<?php
include ('bdd/config.php');
include ('bdd/bd.php');
    $sql="SELECT *, DATE_FORMAT(defis.date,'%d/%m/%Y') AS date_formate FROM defis ORDER BY id DESC LIMIT 1";
    $query=$pdo->prepare($sql);
    $query->execute();
    $line=$query->fetch();
?>

<!DOCTYPE html>
<html lang="fr" class="no-js">
  <head>

    <title>Titre</title>
    <!-- Chargement des metas -->
    <meta name="description" content="Ma description..."/>
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

    <!-- Chargement des feuilles de style-->
    <link href="https://fonts.googleapis.com/css?family=Lato:400,700" rel="stylesheet" />
    <link rel="stylesheet" href="./assets/css/styles.css" />

    <!-- Chargement des scripts utiles -->
    <script>document.documentElement.className = document.documentElement.className.replace("no-js","js");</script>
  
  </head>
  
  <!--Corps de la page -->
  <body onload="comptearebours();">
    <header>
      <div>
        <div class="logo">
          <h1>FeelGood</h1>
        </div>
        <div class="menu">
          <a href="#"><p>Défi du jour</p></a>
          <p>|</p>
          <a href="#"><p>Réalisations</p></a>
          <p>|</p>
          <a href="#"><p>Gagnants</p></a>
          <p>|</p>
          <a href="#"><p>Qui sommes-nous ?</p></a>
        </div>
      </div>
    </header>

    <section class="section1">
      <div>
        <h2>Ensemble, partageons quotidiennement<br>du positif !</h2>
        <div>
          <p>Live tous les soirs à 20h !</p>
        </div>
      </div>
    </section>

    <section class="section2">
      <div>
        <div>
          <div>
            <h3>Défi du jour :  <span><?php echo($line['description']); ?></span></h3>
          </div>
          <div class="cpt">
            <p>Fin dans ...</p>
            <div id="CompteArebour" class="CompteArebour">
              <div id="contour">
                <div id="heures"></div>
              </div>
              <span>:</span>
              <div id="contour">
                <div id="minutes"></div>
              </div>
              <span>:</span>
              <div id="contour">
                <div id="secondes"></div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <p class="Rectangle">Je participe</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section3">
      <div>
        <h3>Les réalisations du defi d'hier </h3>
        <div>
          <div class="Rectangle">
            <div class="boutonplay"></div>
          </div>
          <div class="Rectangle">
            <div class="boutonplay"></div>
          </div>
          <div class="Rectangle">
            <div class="boutonplay"></div>
          </div>
          <div class="Rectangle">
            <div class="boutonplay"></div>
          </div>
          <div class="Rectangle">
            <div class="boutonplay"></div>
          </div>
          <div class="Rectanglegray">
            <p>Voir plus<br>de vidéos</p>
            <img src="assets/images/play.png">
          </div>
        </div>
      </div>
    </section>

    <section class="section4">
      <div>
        <h3>Les derniers gagnants</h3>
        <div>

          <div>
            <div class="Rectangle">
              <div class="boutonplay"></div>
              <p>Jeudi 2 Mars</p>
            </div>
            <div class="info">
              <p>Défi : <span>Déscription du défi...</span></p>
              <p>Gagnant : <span>Nom/Pseudo</span></p>
              <p>Avec <span>150</span></p>
            </div>
          </div>

          <div>
            <div class="Rectangle">
              <div class="boutonplay"></div>
              <p>Jeudi 2 Mars</p>
            </div>
            <div class="info">
              <p>Défi : <span>Déscription du défi...</span></p>
              <p>Gagnant : <span>Nom/Pseudo</span></p>
              <p>Avec <span>150</span></p>
            </div>
          </div>

          <div>
            <div class="Rectangle">
              <div class="boutonplay"></div>
              <p>Jeudi 2 Mars</p>
            </div>
            <div class="info">
              <p>Défi : <span>Déscription du défi...</span></p>
              <p>Gagnant : <span>Nom/Pseudo</span></p>
              <p>Avec <span>150</span></p>
            </div>
          </div>
          <div>
            <div class="Rectangle">
              <div class="boutonplay"></div>
              <p>Jeudi 2 Mars</p>
            </div>
            <div class="info">
              <p>Défi : <span>Déscription du défi...</span></p>
              <p>Gagnant : <span>Nom/Pseudo</span></p>
              <p>Avec <span>150</span></p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="whoweare">
      <h2> Qui sommes-nous ? </h2>

      <div class="whoweareInfos">
        <div>
          <div>
            <img src="assets/images/test_avatar.png"  class="whoweareAvatar" alt="avatar_olivier"/>
            <p class="nomPsn"> Olivier DELACHERIE</p>
          </div>

          <div>
            <img src="assets/images/test_avatar.png"  class="whoweareAvatar" alt="avatar_olivier"/>
            <p class="nomPsn"> Florian LAIGNEZ</p>
          </div>

          <div>
            <img src="assets/images/test_avatar.png"  class="whoweareAvatar" alt="avatar_olivier"/>
            <p class="nomPsn"> Lydie VITTU</p>
          </div>
        </div>

        <p class="textExplicatif">
          Étudiants en 2ème année de DUT MMI à Lens, nous avions pour sujet d'Anglais de réfléchir à une création informatique qui pourrait aider les personnes durant ce confinement.
          Nous en avions marre des médias qui nous donnent de mauvaises ondes, c'est pour cela que nous avons eu l'idée de ce site !
          Nous voulons donner que du positif durant cette période en collaborant ensemble.
        </p>
      </div>

    </div>

    <footer>
      <p> © 2020 - Fait avec 🤍 par la DreamTeam</p>
      <div>
        <img class="icone_footer" src="assets/images/fb.png" alt="icone_fb"/>
        <img class="icone_footer" src="assets/images/twitter.png" alt="icone_twitter"/>
      </div>
    </footer>
  <!-- Chargement des scripts utiles -->
    <script src="https://polyfill.io/v3/polyfill.min.js?features=default%2CIntersectionObserver%2CArray.from%2CNodeList.prototype.forEach"></script>
    <script src="./assets/js/script.bundle.js"></script>
    <script>
      function comptearebours(){// Définition de la date cible


        let DateFinale = new Date("Apr 30, 2020 20:00:00").getTime();

        // On actualise le compte à rebours toutes les secondes
        let x = setInterval(function() {

          // Définition de la date actuelle
          let now = new Date().getTime();

          // On trouver la distance entre les 2 dates
          let distance = DateFinale - now;

          // Calcul du temps restant en mois, jours, heures, minutes et secondes

          let heures = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          let secondes = Math.floor((distance % (1000 * 60)) / 1000);

          // Affichage des résultats dans les divs correspondantes

          document.getElementById("heures").innerHTML = heures;
          document.getElementById("minutes").innerHTML = minutes;
          document.getElementById("secondes").innerHTML = secondes;

        }, 1000);
      }

    </script>

  </body>
</html>
