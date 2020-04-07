//Upload fichier vidéo

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
    ajax.open("POST", "upload.php");
    ajax.send(formdata);
}
function progressHandler(event){
    let percent = (event.loaded / event.total) * 100;
    document.getElementById("progressBar").value = Math.round(percent);
    document.getElementById("myBar").style.width = Math.round(percent)+"%";
    document.getElementById("status").innerHTML = Math.round(percent)+"% uploaded... please wait";
    document.getElementById("percent").innerHTML = Math.round(percent)+"%";
}
function completeHandler(event){
    document.getElementById("status").innerHTML = event.target.responseText;
    document.getElementById("progressBar").value = 0;
}
function errorHandler(event){
    document.getElementById("status").innerHTML = "Upload Failed";
}
function abortHandler(event) {
    document.getElementById("status").innerHTML = "Upload Aborted";
}