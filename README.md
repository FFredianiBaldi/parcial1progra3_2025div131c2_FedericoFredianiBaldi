# Parcial 1 de Programacion 3 :scroll:

### Codigo JavaScript del parcial

```js
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

// se intenta conseguir el carrito del localStorage. de no haber dicho carrito, se crea una lista vacia
let carrito = JSON.parse(localStorage.getItem("carritoFrutas")) || []; 

// parte del html que muestra los elementos del carrito
let contenedorCarrito = document.getElementById("carrito");

// parte del html que muestra la cantidad de elementos en el carrito
let cantidadCarrito = document.getElementById("cantidad");

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
            <button onclick="agregarCarrito(${producto.id})">Agregar al carrito</button>
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


function agregarCarrito(id){
    // se verifica que el producto no este ya en el carrito
    if(!carrito.some(p => p.id === id)){
        // se busca al producto por id en la lista de productos
        let producto = productos.find(producto => producto.id === id);

        // se agrega dicho producto a la lista carrito y se modifica el carrito de localStorage
        carrito.push(producto);
        localStorage.setItem("carritoFrutas", JSON.stringify(carrito));

        mostrarCarrito(carrito);
    }
}

// funcion que deberia llamarse cada vez que hay un cambio en el carrito para mostrarlo actualizado
function mostrarCarrito(carrito){

    let htmlCarrito = "<h2>Carrito</h2>";

    // si hay elementos en el carrito...
    if (carrito.length > 0){
        //se genera una lista desordenada con cada producto que esta en el carrito, su precio y un boton para eliminarlo
        htmlCarrito += "<ul>";
        carrito.forEach(producto => {
            htmlCarrito += `
            <li class="bloque-item">
                <p class="nombre-item">${producto.nombre} - $${producto.precio}</p>
                <button class="boton-eliminar" onclick="eliminarCarrito(${producto.id})">Eliminar</button>
            </li>
            `;
        });
    
        // se cierra el ul y ademas se agrega la posibilidad de vaciar el carrito y se muestra el precio total a pagar
        htmlCarrito += `
        </ul>
        <div class="footer-carrito">
            <button class="vaciar-carrito" onclick="vaciarCarrito()">Vaciar carrito</button>
            <p id="totalCarrito"></p>
        </div>
        `;
    }
    // si no hay elementos en el carrito...
    else{
        htmlCarrito += "<p>No hay elementos en el carrito</p>"
    }

    contenedorCarrito.innerHTML = htmlCarrito;

    actualizarCantidadCarrito();
    actualizarTotalCarrito();
}


// funcion que elimina el elemento deseado del carrito
function eliminarCarrito(id){
    // se filtra el carrito para que tenga los productos cuyo id no sean el que se quiere eliminar
    carrito = carrito.filter(producto => producto.id != id);
    mostrarCarrito(carrito);
    localStorage.setItem("carritoFrutas", JSON.stringify(carrito));
}

// funcion que actualiza la cantidad de elementos en el carrito para mostrarlo
function actualizarCantidadCarrito(){
    let cantidad = carrito.length;

    // condicional para que no diga "1 Productos"
    if(cantidad != 1){
        cantidadCarrito.innerHTML = cantidad + " Productos";
    }
    else{
        cantidadCarrito.innerHTML = cantidad + " Producto";
    }
}

function actualizarTotalCarrito(){
    let total = 0;
    carrito.forEach(producto => total += producto.precio);
    let totalCarrito = document.getElementById("totalCarrito");
    if(totalCarrito){
        totalCarrito.innerHTML = `Total: $${total}`;
    }
}

// funcion que revisa si el usuario quiere acomodar los productos alfabeticamente o de menor a mayor precio
function ordenarProductos(){
    // se escucha si el usuario cambio el selector de ordenarProductos
    let selector = document.getElementById("ordenarProductos");
    selector.addEventListener("change", function(event){
        // si se eligio alfabeticamente...
        if(event.target.value === "alfabeticamente"){
            // bubble sort para acomodarlo alfabeticamente
            for(let i = 0; i < productos.length - 1; i++) {
                for (let j = 0; j < productos.length - 1 - i; j++){
                    if (productos[j].nombre.toLowerCase() > productos[j+1].nombre.toLowerCase()){
                        let temp = productos[j];
                        productos[j] = productos[j + 1];
                        productos[j + 1] = temp;
                    }
                }
            }
        }
        // si en cambio se eligio por precio...
        else if(event.target.value === "precio"){
            //bubble sort para acomodarlo por precio 
            for(let i = 0; i < productos.length - 1; i++) {
                for (let j = 0; j < productos.length - 1 - i; j++){
                    if (productos[j].precio > productos[j+1].precio){
                        let temp = productos[j];
                        productos[j] = productos[j + 1];
                        productos[j + 1] = temp;
                    }
                }
            }
        }
        // se vuelven a mostrar los productos ahora acomodados al gusto del usuario
        mostrarProductos(productos);
    });
}

// funcion que vacia el carrito
function vaciarCarrito(){
    // se vacia la lista, se suben los cambios a localStorage y se vuelve a mostrar el carrito actualizado
    carrito = [];
    localStorage.setItem("carritoFrutas", JSON.stringify(carrito));
    mostrarCarrito(carrito);
}

// funcion de inicializacion
function init(){
    imprimirDatosAlumno(alumno);
    mostrarProductos(productos);
    filtrarProductos();
    mostrarCarrito(carrito);
    ordenarProductos();
}

init();
```