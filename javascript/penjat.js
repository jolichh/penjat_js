// implementació del joc del penjat
// en iniciar programa, l'usuari veurà un menú per consola amb les seguents opcions:
// Iniciar joc, Estadístiques i Sortir

//es mostra per alerts perque no em funciona inspeccionar consola
function novaPartida() {
    while (true) {
        let user = prompt("Press: 1-Iniciar un joc, 2-Estadístiques, 3-Sortir");
        //eliminar todos los posibles espacios blancos
        user = user.trim();
        
        if (user) { //si no está vacío
            //comprovamos las 3 posibilidades
            if (user == 3) {
                break;
            }
            if (user == 2) {
                mostraEstadistica();
            }
            if (user == 1) {
                enPartida();
            }
        } else {
            alert("error");
        }
    }
}
//option 2
function mostraEstadistica() {
    alert("has escogido opcion 2");
    document.write("Total de partides: ");
    document.write("Partiddes guanyades("+'mGuanyades'+"):" + 'guanyades');
    document.write("Partides perdudes("+ 'mPerdudes' + "): " + 'perdudes');
}

//option 1
function enPartida() {
    alert("has escogido opcion 1");
    let paraula = prompt("Introdueix una paraula:");
    let encriptada = encriptaParaula(paraula);  //array
    let lletresUtilitzades = ""; //lletres que introdueix l'usuari
    
    //chivato: mostrem la paraula encriptada
    alert(encriptada+ ': '+paraula);

    let intents = 6;
    let falla = 0;
    let acerta = 0;
    while (falla<intents) {
        //es demana lletra fins que acabi partida: win or lose
        let lletra = prompt("Introdueix una lletra");
        if (!esUnaLletra(lletra)) {
            continue;
        }
        //si la letra es vàlida comprovamos si está en la palabra de juego
        if(paraula.includes(lletra)) {
            acerta++;
        } else {
            falla++;
        }
        alert("Fallos: "+falla+" aciertos: "+acerta);

        //destapamos la palabra (si acierta letra)
        for (let i= 0; i<encriptada.length(); i++) {
            if(paraula.includes(lletra)) {
                tmp = tmp + caracter;
            }
        }
        if (lletresUtilitzades.contains(paraula)) {
            alert("HAs ganado! volveras a inicio");
            break;
        }
    }
    //comprovamos si estan todas destapadas
    if (!lletresUtilitzades.match(paraula)) {
        alert("Has perdido! Vas a salir a inicio");
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