<html>

    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>FeelGood - Login</title>
        <script src="https://www.google.com/recaptcha/api.js?render=6LeXw-cUAAAAAHGwghgKBhnB7rJeyszx4uPlA7Mh"></script>
        <script>
            grecaptcha.ready(function () {
                grecaptcha.execute('6LeXw-cUAAAAAHGwghgKBhnB7rJeyszx4uPlA7Mh', { action: 'contact' }).then(function (token) {
                    var recaptchaResponse = document.getElementById('recaptchaResponse');
                    recaptchaResponse.value = token;
                });
            });
        </script>
    </head>

    <body>

        <form method="POST" id="forminscription">
            <input type="text" name="identifiant" placeholder="Pseudo..." required>
            <input type="email" name="email" placeholder="Email..." required>
            <input type="password" name="mdp" placeholder="Mot de passe..." required>
            <input type="password" name="mdp2" placeholder="Validation du mot de passe..." required>
            <input type="submit">Inscription</input>
            <input type="hidden" name="recaptcha_response" id="recaptchaResponse">
        </form>
        <div id="status"></div>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
        <script src="./assets/js/dev/upload.js"></script>
    </body>

</html>