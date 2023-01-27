// Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = []; // Aquí se iran agregando los articulos.


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
        id: curso.querySelector('a').getAttribute('data-id'), // Obtener el valor de un atributo de HTML.
        cantidad: 1
    }

    // Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id );
    
    if (existe) {
        // Actualizamos la cantidad
        const cursos = articulosCarrito.map( curso =>  {
            if (curso.id === infoCurso.id) { // Actualizar la cantidad sumando 1 al valor actual y retorna el objeto actualizado.
                curso.cantidad++;
                return curso;
            } else { // Retorna los objetos que no son duplicados.
                return curso;
            }
        });

        articulosCarrito = [...cursos];

    } else {
        // Agregamos el curso al carrito
        articulosCarrito = [...articulosCarrito, infoCurso]; // Agregamos una copia de articulosCarrito para no perder la referencia de los cursos que hemos agregado y añadimos el nuevo curso que estamos seleccionado. Esto lo instanciamos en el arreglo que tenemos para nuestro carrito llamado articulosCarrito.
    }    

    console.log(articulosCarrito);

    carritoHTML();
}


// Muestra el carrito de compras en el HTML.
function carritoHTML() {
    // Limpiar el HTML para eliminar duplicados
    limpiarHTML();

    // Recorre el carrito y genera el HTML.
    articulosCarrito.forEach( (curso) => {
        const {img, titulo, precio, cantidad, id} = curso; // Desestructuramos el Curso
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${img}" width="100"></td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data=id="${id}"> X </a>
            </td>
        `;

        // Agrega el HTML del carrito en el tbody.
        contenedorCarrito.appendChild(row);
    });
}


// Elimina los cursos del tbody.
function limpiarHTML() {
    // Forma lenta para limpiar HTML
    // contenedorCarrito.innerHTML = '';

    // Este método mejora el performance.
    while(contenedorCarrito.firstChild) { // Si contenedorCarrito tiene al menos un elemento dentro, se sigue ejecutando la limpieza hasta que ya no tenga ningun elemento.
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}