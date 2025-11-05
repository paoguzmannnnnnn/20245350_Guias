
const buttonAgregarPagina = document.querySelector("#idAgregarPagina");
const buttonMenu= document.querySelector("#idAgregarMenu");
const buttonTitulo= document.querySelector("#idAgregarTitulo");
const buttonParrafo= document.querySelector("#idAgregarParrafo");

const pagina = document.querySelector("#idPagina");

buttonAgregarPagina.onclick = function (){
    const contenedorVerificando= document.querySelector("#idDivPage");

    if (!contenedorVerificando){
        //Creando el contenedor de la pagina
        const contendor=document.createElement("div");
        contendor.setAttribute("id", "idDivPage");
        contendor.setAttribute("class", "container");
        contendor.setAttribute(
            "style",
            "border: solid 1 px black; height:500px; overflow: scroll; overflow-x: hidden;"
        );
        pagina.appendChild(contenedor);

    } else {
        alert("Ya se agrego el contenedor de la pagina")
    }
}




buttonTitulo.onclick = function () {
    //Verificando que existe el contenedor de la pagina
    const contenedor = document.querySelector("#idDivPage");
    // Verificando que existe el menu
    const menu = document.querySelectorAll("#idDivPage > header");
    if (contenedor) {
        if (menu.length > 0) {
            let titulo = prompt("Agregue el titulo de la pagina");
            if (titulo != "" && titulo != null) {
                const h1 = document.createElement("h1");
                // Agregando clases de Bootstrap
                h1.setAttribute("class", "display-5 text-center fw-bold py-4 my-4");
                h1.innerHTML = titulo;
                contenedor.appendChild(h1);
            } else {
                alert(
                    "No se ha registrado ningun titulo, por favor ingrese información"
                );
            }
        } else {
            alert("Debe agregar un menu primero");
        }
    } else {
        alert("Primero debe agregar un contendor de pagina");
    }
};