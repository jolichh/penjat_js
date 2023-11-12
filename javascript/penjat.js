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

//es mostra per alerts perque no em funciona inspeccionar consola
function novaPartida() {

    while (true) {
        let user = prompt("Press: \n1-Iniciar un joc \n2-Estadístiques \n3-Sortir");
        //eliminar todos los posibles espacios blancos
        user = user.trim();
        
        if (user && user == 1 || user == 2 || user == 3) { //si no está vacío
            //comprovamos las 3 posibilidades
            if (user == 3) {
                resetValues();
                break;
            }
            if (user == 2) {
                //funcio mitja parametres(x = ?, y = 100%)
                estGuanyada = mitja(partidesGuanyades,partidesCount);
                estPerduda = mitja(partidesPerdudes,partidesCount);
                mostraEstadistica();
            }
            if (user == 1) {
                falla = 0;  //neteja 
                acerta = 0;
                enPartida();
            }
        } else {
            alert("error");
        }
    }
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
        let lletra = prompt("Introdueix una lletra");
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