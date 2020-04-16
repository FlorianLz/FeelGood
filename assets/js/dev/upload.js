//Soumission formulaire inscription
$("#forminscription").submit(function(event){
    event.preventDefault();

    let formData = {
        'identifiant' : $('input[name=identifiant]').val(),
        'email' : $('input[name=email]').val(),
        'mdp' : $('input[name=mdp]').val(),
        'mdp2' : $('input[name=mdp2]').val(),
        'recaptcha_response' : $('input[name=recaptcha_response]').val(),
    };
    console.log(formData);

    $.post( "traitement/inscription.php", formData, function(data) {
        $('#status').html(data);
    });
});