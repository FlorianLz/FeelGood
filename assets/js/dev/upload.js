//Soumission formulaire inscription
$("#forminscription").submit(function(event){
    event.preventDefault();

    let formData = {
        'identifiant' : $('input[name=identifiant]').val(),
        'email' : $('input[name=email]').val(),
        'mdp' : $('input[name=mdpinscription]').val(),
        'mdp2' : $('input[name=mdp2inscription]').val(),
        'recaptcha_response' : $('input[name=recaptcha_response]').val(),
    };

    $.post( "traitement/inscription.php", formData, function(data){
        if(data === 'OK'){
            window.location.href='./index.php'
        }else{
            $('#status').html(data);
        }
    });
});