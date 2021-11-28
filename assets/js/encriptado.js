var base64 = [];
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

function encriptar(elemento) {
    var palabra = document.getElementsByTagName("input")[0].value;
    var base64Frase = "";

    for (let i = 0; i < palabra.length; i += 3) {
        let subPalabra = palabra.slice(i, i + 3);
        let binChar = "";
        let binString = "";
        let nCerosIzquierda = 0; // número ceros a la izquierda
        for (let j = 0; j < subPalabra.length; j++) {
            let asciiCode = subPalabra.charCodeAt(j);
            binChar = asciiCode.toString(2);
            nCerosIzquierda = 8 - (binChar.length % 8); // AGREGADO: Algunas veces el número binario tiene 6 dígitos y otras veces 7
            
            let cerosIzquierda = "";
            for (let k = 0; k < nCerosIzquierda; k++) {
                cerosIzquierda += "0";
            }
            binString += cerosIzquierda + binChar;
        }

        let bytes6 = "";
        let newAscii = "";
        var newbase64 = "";
        if (binString.length % 6 == 0) {  // CORREGIDO
            for (let k = 0; k < binString.length; k += 6) {
                bytes6 = "00" + binString.slice(k, k + 6);
                newAscii = parseInt(bytes6, 2);
                newbase64 += base64[newAscii];
            }
        } else {
            for (let j = 0; j < Math.floor(binString.length / 6); j++) { // CORREGIDO
                bytes6 = "00" + binString.slice(j, j + 6);
                newAscii = parseInt(bytes6, 2);
                newbase64 += base64[newAscii];
            }
            
            let cerosDerecha = 6 - (binString.length % 6); // CORREGIDO
            let subBinString = "00" + binString.slice((Math.floor(binString.length / 6) * 6)); // CORREGIDO
            for (let k = 0; k < cerosDerecha; k++) {
                subBinString += "0";
            }
            newAscii = parseInt(subBinString, 2);
            newbase64 += base64[newAscii];
            for (let l = 0; l < cerosDerecha; l += 2) {
                newbase64 += "=";
            }
        }
        base64Frase += newbase64;
    }
    document.getElementById("resultado").innerHTML = base64Frase;
}

function desencriptar(elemento){

    var base64Frase = document.getElementsByTagName("input")[0].value;
    var palabra_decodificada = "";

    function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {

            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }

        output = Base64._utf8_decode(output);

        return output;
}
