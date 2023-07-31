'use strict'

var formulario = document.querySelector("#formulario");

// Añadir tareas al local storage
formulario.addEventListener("submit", () => {
    var tareasPendientes = document.querySelector("#tareas-pendientes");
    const keyTarea = "tarea_" + (localStorage.length + 1); // genera key aleatoria
    const tarea = document.querySelector("#input-tarea").value;
    localStorage.setItem(keyTarea, tarea);
});

// Generar listado de tareas
var contenedorListaTareas = document.querySelector("#tareas-pendientes");
for (const i in localStorage) {
    if (typeof localStorage[i] == "string") {
        // Generar estructura del contenido
        const divTarea = document.createElement("div");
        divTarea.classList.add("tarea");
        const spanTarea = document.createElement("span");
        spanTarea.setAttribute("data-codigo", i);
        spanTarea.textContent = localStorage[i];


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
        contenedorListaTareas.appendChild(divTarea);
    }
}

// Eliminar tarea 
var botonesEliminar = document.querySelectorAll(".fa-trash");
botonesEliminar.forEach(botonEliminar => {
    botonEliminar.addEventListener("click", () => {

        const tareaAEliminar = botonEliminar.parentNode.parentNode.parentNode;
        const tareaAEliminarSPAN = tareaAEliminar.querySelector("span").getAttribute('data-codigo');
        console.log(tareaAEliminarSPAN);

        localStorage.removeItem(tareaAEliminarSPAN); // Eliminar del localstorage
        tareaAEliminar.remove(); // Eliminar del html
    });
});

// Editar tarea

// Finalizar tarea