'use strict'

var formulario = document.querySelector("#formulario");
var botonTema = document.querySelector("#boton-tema");
var inputTarea = inputTarea = document.querySelector("#input-tarea");

function recogerValores() {
    formulario.addEventListener("submit", () => {
        const nuevaTarea = inputTarea.value;
        const keyTarea = "tarea_" + (localStorage.length + 1); // genera la key 
        localStorage.setItem(keyTarea,nuevaTarea);
    });
}


function eliminarTarea(botonEliminar, animationClass, aviso = false) {
    const tareaAEliminar = botonEliminar.parentNode.parentNode.parentNode;
    const tareaAEliminarSPAN = tareaAEliminar.querySelector("span").getAttribute('data-codigo');

    if (aviso) {
        const confirmacion = window.confirm("¿Deseas realizar esta acción?");

        if (confirmacion) {
            tareaAEliminar.classList.add(animationClass);
            setTimeout(() => {
                localStorage.removeItem(tareaAEliminarSPAN); // Eliminar del localstorage
                tareaAEliminar.remove(); // Eliminar del html
            }, 3000);
        }
    } else {
        tareaAEliminar.classList.add(animationClass);
        setTimeout(() => {
            localStorage.removeItem(tareaAEliminarSPAN); // Eliminar del localstorage
            tareaAEliminar.remove(); // Eliminar del html
        }, 3000);
    }
}

// function editarTarea(botonEdit) {
//     keyTarea = botonEdit.parentNode.parentNode.parentNode.querySelector("span").getAttribute('data-codigo'); // Obtenemos el data-codigo del bloque para saber cual hay que editar
//     const tareaAnterior = localStorage[keyTarea]; // Obtenemos el valor almacenado en el localstorage
//     inputTarea.value = tareaAnterior; // Hacemos que el contenido del input sea el de la tarea que queramos editar
// }



function asignarEventosBotones() {
    var botonesEliminar = document.querySelectorAll(".fa-trash");
    botonesEliminar.forEach(botonEliminar => {
        botonEliminar.addEventListener("click", () => {
            eliminarTarea(botonEliminar, "fade-in-out", true);
        });
    });

    // // Editar tarea
    // var botonesEdit = document.querySelectorAll(".fa-pen-to-square");
    // botonesEdit.forEach(botonEdit => {
    //     botonEdit.addEventListener("click", () => {
    //         editarTarea(botonEdit);
    //         isEdit(true);
    //     });
    // });

    // Finalizar tarea
    var botonesHecho = document.querySelectorAll(".fa-circle-check");
    botonesHecho.forEach(botonHecho => {
        botonHecho.addEventListener("click", () => {
            eliminarTarea(botonHecho, "fade-in-out");
        });
    });

}


// Generar listado de tareas
function actualizarListaTareas() {
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

            // const iconoEditar = document.createElement("span");
            // iconoEditar.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';

            const iconoCheck = document.createElement("span");
            iconoCheck.innerHTML = '<i class="fa-regular fa-circle-check"></i>';

            // Agregar los elementos al contenedor de la tarea
            divIconosModificar.appendChild(iconoEliminar);
            // divIconosModificar.appendChild(iconoEditar);
            divIconosModificar.appendChild(iconoCheck);

            divTarea.appendChild(spanTarea);
            divTarea.appendChild(divIconosModificar);

            // Agregar la tarea al contenedor de tareas
            contenedorListaTareas.appendChild(divTarea);
        }
    }
    // Volver a asignar los eventos a los nuevos botonesEventosBotones()
    asignarEventosBotones();
}

function cambiarTema() {
    var body = document.querySelector("body");
    body.classList.add("modoClaro");
    botonTema.addEventListener("click", () => {
        const botonModoOscuro = document.querySelector(".fa-moon");
        const botonModoClaro = document.querySelector(".fa-sun");

        body.classList.add("modoClaro");
        if (botonModoOscuro) {
            botonTema.classList.add("fa-sun");
            body.classList.add("modoOscuro");
            botonTema.classList.remove("fa-moon");
            body.classList.remove("modoClaro");

        } else {
            botonTema.classList.remove("fa-sun");
            body.classList.add("modoClaro");
            botonTema.classList.add("fa-moon");
            body.classList.remove("modoOscuro");
        }
    });
}

// Inicializar eventos y lista de tareas al cargar la página
cambiarTema();
recogerValores();
actualizarListaTareas();