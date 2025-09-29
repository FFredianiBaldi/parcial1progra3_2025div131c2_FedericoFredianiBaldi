// array con todos los productos
let productos = [
    {id: 1, nombre: "arandano", precio: 5000, ruta_img: "img/arandano.jpg"},
    {id: 2, nombre: "banana", precio: 1000, ruta_img: "img/banana.jpg"},
    {id: 3, nombre: "frambuesa", precio: 4000, ruta_img: "img/frambuesa.png"},
    {id: 4, nombre: "frutilla", precio: 3000, ruta_img: "img/frutilla.jpg"},
    {id: 5, nombre: "kiwi", precio: 2000, ruta_img: "img/kiwi.jpg"},
    {id: 6, nombre: "mandarina", precio: 800, ruta_img: "img/mandarina.jpg"},
    {id: 7, nombre: "manzana", precio: 1500, ruta_img: "img/manzana.jpg"},
    {id: 8, nombre: "naranja", precio: 9000, ruta_img: "img/naranja.jpg"},
    {id: 9, nombre: "pera", precio: 2500, ruta_img: "img/pera.jpg"},
    {id: 10, nombre: "anana", precio: 3000, ruta_img: "img/anana.jpg"},
    {id: 11, nombre: "pomelo-amarillo", precio: 2000, ruta_img: "img/pomelo-amarillo.jpg"},
    {id: 12, nombre: "pomelo-rojo", precio: 2000, ruta_img: "img/pomelo-rojo.jpg"}
];

// objeto alumno con mis datos
let alumno = {
    dni: 47382135,
    nombre: "Federico",
    apellido: "Frediani Baldi"
}

// parte del documento donde se muestran cada uno de los productos
let listadoProductos = document.getElementById("listadoProductos");

function imprimirDatosAlumno(alumno){
    console.log(`DNI: ${alumno.dni}, Nombre: ${alumno.nombre}, Apellido: ${alumno.apellido}`);

    let navNombre = document.getElementById("navNombre");
    navNombre.innerHTML = alumno.nombre + " " + alumno.apellido;
}


// funcion que muestra los productos en la pagina.
// por cada producto, se le agrega a cartaProducto el html que deberia tener para mostrar cada producto
// despues, se modifica el html de listadoProductos para que muestre el contenido de cartaProducto
function mostrarProductos(array){
    let cartaProducto = "";
    array.forEach(producto => {
        cartaProducto += `
        <div class="card-producto">
            <img src="${producto.ruta_img}" alt="">
            <h3>${producto.nombre}</h3>
            <p>$${producto.precio}</p>
            <button>Agregar al carrito</button>
        </div>
        `;
    });

    listadoProductos.innerHTML = cartaProducto;
}

function filtrarProductos(){
    // barra de busqueda donde el usuario filtra los productos
    let barraBusqueda = document.getElementById("barraBusqueda");

    barraBusqueda.addEventListener("keyup", function(){
        // se guarda lo que el usuario escribio en el input
        let valorBusqueda = barraBusqueda.value.toLowerCase();

        // se filtran los productos en todos los productos que incluyan lo que el usuario esta buscando
        let productosFiltrados = productos.filter(producto => producto.nombre.toLowerCase().includes(valorBusqueda));

        // se muestran los productos ahora filtrados
        mostrarProductos(productosFiltrados);
    });
}

// funcion de inicializacion
function init(){
    imprimirDatosAlumno(alumno);
    mostrarProductos(productos);
    filtrarProductos();
}

init();