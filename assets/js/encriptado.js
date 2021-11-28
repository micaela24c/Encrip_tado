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

function encriptar() {
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


//FALTA ACABAR


function desencriptar() {
    var base64Frase = document.getElementsByTagName("input")[0].value;
    var palabra_desencriptada = "";
    var indice64 = -1;
    var numbinarios = "";
    var binario = "";
    var binString = "";
    var nceros = -1;
    var ceros = "";
    var iguales = [];
    var niguales = 0;

    //1. Buscamos las referencias decimales de la tabla de Base64

    for (let i = 0; i < base64Frase.length; i++) {
        if (i < base64Frase.length - 1) {
            if (base64Frase[i + 1] == "=") {

                iguales = base64Frase.filter(e => e == "=");
                niguales = iguales.length;
                indice64 = base64.findIndex(base64Frase[i]);
                binario = indice64.toString(2); //0

                nceros = 8 - (binario.length % 8); // AGREGADO: Algunas veces el número binario tiene 6 dígitos y otras veces 7

                let ceros = "";
                for (let m = 0; m < nceros; m++) {
                    ceros += "0";
                }

                binario = ceros + binario;

                binario = binario.slice(2, 8 - 2 * niguales);

                binString += binario;

                break//que pasa si es igual a =, los ceros van a la izquierda

            }
        }
        //18 0 ==
        indice64 = base64.findIndex(base64Frase[i]);
        binario = indice64.toString(2); //10010
        //1
        nceros = 6 - (binario.length % 6); // AGREGADO: Algunas veces el número binario tiene 6 dígitos y otras veces 7

        let ceros = "";
        for (let m = 0; m < nceros; m++) {
            ceros += "0";
        }

        // estoy segura
        binString += ceros + binario; //010010

    }
    var subBin = "";
    var ascii = -1;
    

    for (let h = 0; h < binString.length; h += 8) {
        subBin = binString.slice(h, h + 8);

         ascii =  parseInt(subBin, 2); 

         palabra_desencriptada += String.fromCharCode(ascii);
    }


    document.getElementById("resultado").innerHTML = palabra_desencriptada;
}
