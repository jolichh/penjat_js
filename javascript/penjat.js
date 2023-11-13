// implementació del joc del penjat
// en iniciar programa, l'usuari veurà un menú per consola amb les seguents opcions:
// Iniciar joc, Estadístiques i Sortir

//aquestes son variables globals
const intents = 6;
let falla = 0;
let acerta = 0;
let partidesCount = 0;
let partidesGuanyades = 0;
let partidesPerdudes = 0;

let estGuanyada = 0;
let estPerduda = 0;

//variables para HTML
let letraHtml;
let arrayEncriptada;
let paraula;
let lletresUtilitzades = [];
//es mostra per alerts perque no em funciona inspeccionar consola
function novaPartida() {
    lletresUtilitzades = [];
    partidesCount++;
    falla = 0;  //neteja 
    acerta = 0; //neteja
    creaBotons();
    //demana paraula de joc
    paraula = prompt("Introdueix una paraula:");
    arrayEncriptada = encriptaParaula(paraula);  //paraula en array de lletres

    mostraLletraEncriptada();
    
}
//esta funcion se utiliza una vez por partida para crear el elemento
function mostraLletresUtilitzades() {
    let divLletresUtilitzades = document.getElementById("lletresUtilitzades");
    // let p = document.createElement("p");
    // p.textContent = lletresUtilitzades.join(" ");
    // divLletresUtilitzades.appendChild(p);
    let p = lletresUtilitzades.join(" ");
    divLletresUtilitzades.innerHTML = p;
}

//*NOTA: para que no salga p modo triangulo: usar innerHTML como en el button y en vez de += solo usar = y asignar nuevo valor
function mostraLletraEncriptada() {
    let divJocPenjat = document.getElementById("jocPenjat");
    // let p = document.createElement("p");
    // p.textContent = arrayEncriptada.join(" ");
    // divJocPenjat.appendChild(p);
    let p = arrayEncriptada.join(" ");
    divJocPenjat.innerHTML = p;
}
//option 2
function mostraEstadistica() {
    alert(`Total de partides: ${partidesCount} \nPartides guanyades: (${estGuanyada}%): ${partidesGuanyades} \nPartides perdudes (${estPerduda}%): ${partidesPerdudes}`);
}

function resetValues() {
    //reset values
    falla = 0;
    acerta = 0;
    partidesCount = 0;
    partidesGuanyades = 0;
    partidesPerdudes = 0;
}

//retorna la mitja de x = ?, y = 100%
function mitja(x, y) {
    let result = (x*100)/y;
    return result.toFixed(2);
}

//option 1
function enPartida() {
    partidesCount++;
    let paraula = prompt("Introdueix una paraula:");
    let arrayEncriptada = encriptaParaula(paraula);  //paraula en array de lletres
    console.log(arrayEncriptada.join(""));

    let lletresFallades = [];

    while (falla<intents) {
        //es demana lletra fins que acabi partida: win or lose
        // let lletra = prompt("Introdueix una lletra");
        let lletra = letraHtml;
        if (!esUnaLletra(lletra)) {
            continue;
        }
        //si la letra es vàlida comprovamos si está en la palabra de juego
        if(paraula.includes(lletra)) {            
            //destapamos la palabra (si acierta letra)
            for (let i= 0; i<arrayEncriptada.length; i++) {
                if(paraula[i].match(lletra)) {
                    arrayEncriptada[i] = lletra;
                }
            }
            acerta++;
        }

        //si falla guardamos la letra
        if (!paraula.includes(lletra)) {
            lletresFallades.push(lletra);
            falla++;
        }

        if (paraula === arrayEncriptada.join("")) {
            alert("Enhorabona has guanyat!");
            partidesGuanyades++;
            break;
        }

        //muestra a cada tirada
        alert("Panel: "+arrayEncriptada + "\nLletres fallades "+ falla + "/"+ intents+ ": " + lletresFallades);
    }

    //si no cumple condicion while o no ha ganado
    if (paraula !== arrayEncriptada.join("")) {
        alert("Has mort penjat...");
        partidesPerdudes++;
    }
}
//encripta la paraula de joc i retorna array del string
function encriptaParaula(paraula) {
    let txt = "";
        for (let i=0; i<paraula.length; i++) {
            txt = txt + '_';
        }
    return txt.split('');
}
//comprova que sigui només 1 lletra
function esUnaLletra(lletra) {    
    let esLletra = /[^a-zÀ-ÖØ-öø-ÿ]+/i; //incluye tildes
    if (lletra.length == 1) {
        //comprovamos que no es vacio y es una letra
        if (lletra != " " && lletra.search(esLletra)) {
            return true;
        }
    }
    return false;
}
function creaBotons() {
    let acbArray = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G','H','I','J','K','L','M','N','O','P','Q','R','S','T','V','W','X','Z'];
    //hace get del div del html con ese id
    let divAbc = document.getElementById("abecedari");
    let txt = "";
    
    //recorre array de letras y los muestra al html
    acbArray.forEach(elemento =>{
        txt += `<button id="${elemento}" type="button" onclick="clickLletra('${elemento}')">${elemento}</button>`;

    });
    divAbc.innerHTML = txt;
    // alert(divAbc);
}
//HTML elements
// document.addEventListener("DOMContentLoaded", function() {
//     let acbArray = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G','H','I','J','K','L','M','N','O','P','Q','R','S','T','V','W','X','Z'];
//     //hace get del div del html con ese id
//     let divAbc = document.getElementById("abecedari");
//     let txt = "";
    
//     //recorre array de letras y los muestra al html
//     acbArray.forEach(elemento =>{
//         txt += `<button id="${elemento}" onclick="clickLletra('${elemento}')>${elemento}</button>"`;
//         // let input = document.createElement("input");
//         // input.type = "button";
//         // input.value = elemento;
//         // input.onclick = function() { clickLletra(elemento) };
//         // divAbc.appendChild(input);

//     });
//     divAbc.innerHTML = txt;
//     alert(divAbc);
// });

//funciones al click sobre la letra de html
function clickLletra(lletra) {
    alert("has hecho click en: "+lletra);
    utilitzaLletra(lletra); //comprueba si falla o acierta
    disableLletra(lletra);
}
//al utilizar letra (acierta o falla) muestra la lista actualizada de letras utilizadas
function utilitzaLletra(lletra) {
    //comprueba si esta la letra
    if(paraula.includes(lletra)) {            
        //destapamos la palabra (si acierta letra)
        for (let i= 0; i<arrayEncriptada.length; i++) {
            if(paraula[i].match(lletra)) {
                arrayEncriptada[i] = lletra;
            }
        }
        acerta++;
    }
    //si falla
    if (!paraula.includes(lletra)) {
        falla++;
    }
    //guarda lletres utilitzades
    lletresUtilitzades.push(lletra);
    mostraLletresUtilitzades();

    if (paraula === arrayEncriptada.join("")) {
        alert("Enhorabona has guanyat!");
        partidesGuanyades++;
    }
    if (falla>=intents) {
        alert("Has perdut...");
    }
}
//deja marcada la letra como usada
function disableLletra(lletra) {
    let boton = document.getElementById(`${lletra}`);
    boton.disabled = true;
}