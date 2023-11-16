/*
    implementació del joc del penjat versió gràfic
*/

//aquestes son variables globals
const intents = 6;
const acbArray = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

let falla = 0;
let acerta = 0;
let partidesCount = 0;
let partidesGuanyades = 0;
let partidesPerdudes = 0;

let estGuanyada = 0;
let estPerduda = 0;

//variables para HTML
let paraulaEncriptada;
let paraula;
let lletresUtilitzades = [];
//es mostra per alerts perque no em funciona inspeccionar consola
//funcionalitat del boto IniciarPartida
function novaPartida() {
    lletresUtilitzades = [];
    partidesCount++;
    falla = 0;  //neteja 
    acerta = 0; //neteja
    
    //demana paraula de joc
    paraula = prompt("Introdueix una paraula:");
    paraula = paraula.toUpperCase();
    paraulaEncriptada = encriptaParaula(paraula);  //paraula en array de lletres

    mostraLletraEncriptada();
    creaBotons();    
    mostraDibuix(); //utilitza contador de falla
}
//funcion que gestiona la letra
//al utilizar letra (acierta o falla) muestra la lista actualizada de letras utilizadas
function utilitzaLletra(lletra) {
    //comprueba si esta la letra
    if(paraula.includes(lletra)) {            
        //destapamos la palabra (si acierta letra)
        for (let i= 0; i<paraulaEncriptada.length; i++) {
            if(paraula[i].match(lletra)) {
                paraulaEncriptada[i] = lletra;
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
    mostraLletraEncriptada();
    mostraDibuix();
    if (paraula === paraulaEncriptada.join("")) {
        alert("Enhorabona has guanyat!");
        partidesGuanyades++;
        disableTotesLletres();
    }
    if (falla>=intents) {
        alert("T'has penjat! Has perdut...");
        partidesPerdudes++;
        disableTotesLletres();
    }
}
//*NOTA: para que no salga p modo triangulo: usar innerHTML como en el button y en vez de += solo usar = y asignar nuevo valor
function mostraLletraEncriptada() {
    let divJocPenjat = document.getElementById("jocPenjat");
    // let p = document.createElement("p");
    // p.textContent = paraulaEncriptada.join(" ");
    // divJocPenjat.appendChild(p);
    // alert(paraulaEncriptada.join(" "));
    let p = paraulaEncriptada.join(" ");
    divJocPenjat.innerHTML = p;
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
//mostra les estadístiques
function mostraEstadistica() {
    let nowWindows = window.open("", "_blank");
    
    estGuanyada = mitja(partidesGuanyades,partidesCount);
    estPerduda = mitja(partidesPerdudes,partidesCount);
    //let divEstadisticas = document.getElementById("estadisticas");
    let txt = `<p>Total de partides: ${partidesCount} </p><p>Partides guanyades: (${estGuanyada}%): ${partidesGuanyades}</p><p>Partides perdudes (${estPerduda}%): ${partidesPerdudes}</p>`;
   nowWindows.document.write(txt);
    // divEstadisticas.innerHTML = txt;
}
//mostra img segons el numero de error
function mostraDibuix() {
    let img = document.getElementById("imatgePenjat");
    img.src = `img_penjat/penjat_${falla}.png`;
}
//neteja totes les estadistiques
function resetValues() {
    //reset values
    falla = 0;
    acerta = 0;
    partidesCount = 0;
    partidesGuanyades = 0;
    partidesPerdudes = 0;

    estGuanyada = 0;
    estPerduda = 0;
}
//retorna la mitja de x = ?, y = 100%
function mitja(x, y) {
    let result = (x*100)/y;
    return result.toFixed(2);
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
//crea els botons per a jugar
function creaBotons() {
    //hace get del div del html con ese id
    let divAbc = document.getElementById("abecedari");
    let txt = "";
    
    //recorre array de letras y los muestra al html
    acbArray.forEach(elemento =>{
        txt += `<button id="${elemento}" type="button" onclick="clickLletra('${elemento}')">${elemento}</button>`;

    });
    divAbc.innerHTML = txt;
}
//funciones al click sobre la letra de html
function clickLletra(lletra) {
    // alert("has hecho click en: "+lletra);
    utilitzaLletra(lletra); //comprueba si falla o acierta
    disableLletra(lletra);
}
//deja marcada la letra como usada
function disableLletra(lletra) {
    let boton = document.getElementById(`${lletra}`);
    boton.disabled = true;
}
function disableTotesLletres() {    
    acbArray.forEach(elemento =>{
        let boton = document.getElementById(`${elemento}`);        
        boton.disabled = true;
    });    
}