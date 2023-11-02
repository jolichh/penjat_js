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
            if ( user == 2) {
                mostraEstadistica();
            }
            if (user == 1) {
                iniciarJoc();
            }
        } else {
            alert("error");
        }
    }
}
function iniciarJoc() {

}
function mostraEstadistica() {
    
}