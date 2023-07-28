'use strict'


const formulario = document.getElementById("formulario");

var submitTarea = document.getElementById("add-tarea");
submitTarea.addEventListener("click", function(event) {
    event.preventDefault();
    var tarea = document.getElementById("input-tarea");
    var tareaValor = tarea.value;

    localStorage.setItem(generarKeyRandom(), tareaValor);
    for (const i in localStorage) {

        if (typeof localStorage[i] == "string") {
            li.append(localStorage[i]);
            ul.append(li);
        }
        generarTarea(localStorage.getItem(i));
    }

});

// Obtener el contenedor donde agregaremos las tareas
const contenedorTareas = document.getElementById("tareas-pendientes");

// Función para generar una tarea
function generarTarea(nombreTarea) {
    // Crear elementos de la tarea
    const divTarea = document.createElement("div");
    divTarea.classList.add("tarea");

    const spanTarea = document.createElement("span");
    spanTarea.textContent = nombreTarea;

    const divIconosModificar = document.createElement("div");
    divIconosModificar.classList.add("iconos-modificar");

    const iconoEliminar = document.createElement("span");
    iconoEliminar.innerHTML = '<i class="fa-solid fa-trash"></i>';

    const iconoEditar = document.createElement("span");
    iconoEditar.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';

    const iconoCheck = document.createElement("span");
    iconoCheck.innerHTML = '<i class="fa-regular fa-circle-check"></i>';

    // Agregar los elementos al contenedor de la tarea
    divIconosModificar.appendChild(iconoEliminar);
    divIconosModificar.appendChild(iconoEditar);
    divIconosModificar.appendChild(iconoCheck);

    divTarea.appendChild(spanTarea);
    divTarea.appendChild(divIconosModificar);

    // Agregar la tarea al contenedor de tareas
    contenedorTareas.appendChild(divTarea);
}

function GenerarCodigoRandom() {
    const numeroAleatorio = Math.floor(Math.random() * 10000);
    const key = "tarea_" + numeroAleatorio;
    return key
}

console.log(GenerarCodigoRandom());