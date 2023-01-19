// Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');


cargarEventListeners();
function cargarEventListeners() { // Por orden, creamos una función que tenga todos nuestros eventos.
    // Cuando agregas un curso presionando "Agregar al Carrito".
    listaCursos.addEventListener('click', agregarCurso);
}


// Funciones
function agregarCurso(event) {
    event.preventDefault(); // Omitir la accion de boton "agregar-carrito".
    if (event.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = event.target.parentElement.parentElement; // Accedemos al padre del padre de agregar-carrito.

        leerDatosCurso(cursoSeleccionado);
    }
}


// Lee el contenido del HTML al que le dimos click y extrae la informacion del curso.
function leerDatosCurso(curso) {
    //console.log(curso);

    // Crear un objeto con el contenido del curso actual
    const infoCurso = {
        img: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'), // Obtener el valo de un atributo de HTML.
        cantidad: 1
    }

    console.log(infoCurso);
}