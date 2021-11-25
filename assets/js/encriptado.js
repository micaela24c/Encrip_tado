function encriptar(elemento){

    var palabra = document.getElementsByTagName("input")[0].value;
    var palabra_codificada = btoa(palabra);
    document.getElementById("resultado").innerHTML = palabra_codificada;
}
 
function desencriptar(elemento){
    var palabra = document.getElementsByTagName("input")[0].value;
    var palabra_descodificada = atob(palabra);
    document.getElementById("resultado").innerHTML = palabra_descodificada;
}