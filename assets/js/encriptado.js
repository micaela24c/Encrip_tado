var base64 =[];
for (let index = 65; index <= 90; index++) {
    base64.push(String.fromCharCode(index));
    
}

for (let index = 97; index <= 122; index++) {
    base64.push(String.fromCharCode(index));
    
}

for (let index = 48; index <= 57; index++) {
    base64.push(String.fromCharCode(index));
    
}
base64.push("+");
base64.push("/");

function encriptar(elemento){

    var palabra = document.getElementsByTagName("input")[0].value;

    var base64Frase = "";
    
    for (let i = 0; i < palabra.length; i += 3) {
        let subPalabra = palabra.slice(i, i + 3);
        let binString = "";
        for (let j = 0; j < subPalabra.length; j++) {
            let asciiCode = subPalabra.charCodeAt(j);
            binString += ("0" + asciiCode.toString(2));
        }
    
        let bytes6 = "";
        let newAscii = "";
        var newbase64 = "";
        for (let k = 0; k < binString.length; k += 6) {
            bytes6 = "00" + binString.slice(k, k + 6);
            newAscii = parseInt(bytes6, 2);
            newbase64 += base64 [newAscii];
        }
        base64Frase += newbase64;
    }


    document.getElementById("resultado").innerHTML = base64Frase ;
}
 
function desencriptar(elemento){
    var palabra = document.getElementsByTagName("input")[0].value;
    var palabra_descodificada = atob(palabra);
    document.getElementById("resultado").innerHTML = palabra_descodificada;
}