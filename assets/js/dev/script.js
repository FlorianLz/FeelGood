let modal = document.getElementById("modaleParticipation");
let btn = document.getElementById("participer");
let span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

//Upload fichier vidéo

$("#upload_form").submit(function(event) {
    event.preventDefault();

    if ( $('#file1').val().match(/.+\.(mp4)$/i) ){
        uploadFile();
    }else{
        $('#status').html('Aucun fichier sélectionné.');
    }

});

function uploadFile(){
    let file = document.getElementById("file1").files[0];
    // alert(file.name+" | "+file.size+" | "+file.type);
    let formdata = new FormData();
    formdata.append("file1", file);
    let ajax = new XMLHttpRequest();
    ajax.upload.addEventListener("progress", progressHandler, false);
    ajax.addEventListener("load", completeHandler, false);
    ajax.addEventListener("error", errorHandler, false);
    ajax.addEventListener("abort", abortHandler, false);
    ajax.open("POST", "traitement/upload.php");
    ajax.send(formdata);
}
function progressHandler(event){
    let percent = (event.loaded / event.total) * 100;
    //document.getElementById("progressBar").value = Math.round(percent);
    document.getElementById("myBar").style.display = "block";
    document.getElementById("myBar").style.width = Math.round(percent)+"%";
    document.getElementById("status").innerHTML = Math.round(percent)+"%";
    //document.getElementById("percent").innerHTML = Math.round(percent)+"%";
}
function completeHandler(event){
    document.getElementById("status").innerHTML = event.target.responseText;
    //document.getElementById("progressBar").value = 0;
    document.getElementById("myBar").style.display = "none";
    //document.getElementById("percent").style.display = "none";
    if(event.target.responseText === 'Votre vidéo à bien été envoyée. Merci !'){
        $('#upload_form > label').css('visibility', 'hidden');
        $('#upload_form > input').css('visibility', 'hidden');
    }
}
function errorHandler(event){
    document.getElementById("status").innerHTML = "Upload Failed";
}
function abortHandler(event) {
    document.getElementById("status").innerHTML = "Upload Aborted";
}

//Aperçu de la vidéo sélectionnée
$(document).on("change", ".file_video", function(evt) {
    $('#status').html('');
    let $source = $('#video_here');
    $('.player_video').show();
    $source[0].src = URL.createObjectURL(this.files[0]);
    $source.parent()[0].load();
});