const productos = function (nombre, precio, stock, imagen) {
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
    this.imagen = imagen;
};
let cafe1 = new productos("cafe chimi", 1500, 15, "assets/cafe-chimi-producto.jpg");
let cafe2 = new productos("cafe kitty", 1700, 19, "assets/cafe-kitty-producto.jpg");
let cafe3 = new productos("frape gaara", 3000, 20, "assets/freppe-gaara.png");
let cafe4 = new productos("frape billie", 3500, 10, "assets/frappe-billie.jpg");
let galleta1 = new productos("galleta chimi", 2000, 24, "assets/galleta-chimi.png");
let galleta2 = new productos("galleta kitty", 1900, 50, "assets/galleta-kitty.png");
let galleta3 = new productos("galleta gaara", 2500, 54, "assets/galletitas-gaara-producto.jpg");
let galleta4 = new productos("galleta billie", 3000, 26, "assets/galleta-billie.png");
let waffle1 = new productos("waffle milenium falcon", 5000, 34, "assets/waffle-milenium-falcon.png");
let medialuna1 = new productos("medialuna slowpoke", 4000, 14, "assets/medialuna-slowpoke.png");
let medialuna2 = new productos("medialuna salamance", 4500, 7, "assets/medialuna-salamance.png");

let catalogo = [cafe1, cafe2, cafe3, cafe4, galleta1, galleta2, galleta3, galleta4, waffle1, medialuna1, medialuna2]

let carrito = [];

let parrafoproductos = document.getElementById("listadeproductos")
parrafoproductos.innerHTML = `<p> ${cafe1.nombre} tiene un costo de $${cafe1.precio}. <br>
                      ${cafe2.nombre} tiene un costo de $${cafe2.precio}.<br>
                      ${galleta1.nombre} tiene un costo de $${galleta1.precio}.<p>`

let listacarrito = document.getElementById("carrito")

let preciototal = document.getElementById("total")

let VaciarCarrito1= document.getElementById("VaciarCarrito")

function mostrarproductos() {
    parrafoproductos.innerHTML = '';
    catalogo.forEach((producto, compra) => {
        parrafoproductos.innerHTML += `
            <div>
                <img src="${producto.imagen}" alt="${producto.nombre}" style="width:100px; height:auto;">
                <p>${producto.nombre} tiene un costo de $${producto.precio}. 
                <button onclick="agregaralcarrito(${compra})">Agregar al carrito</button></p>
            </div>
        `;
    });
}
function agregaralcarrito(compra) {
    let productoañadido = catalogo[compra];
    if (productoañadido.stock > 0) {
        carrito.push(productoañadido);
        productoañadido.stock--;
        actualizarcarrito();
        Swal.fire({
        position: "center",
        icon: "success",
        title: "Añadido al Carrito",
        showConfirmButton: false,
        timer: 1500
      })
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Sin Stock',
            text: 'Actualmente no contamos con este producto, espero nos disculpe ^^'
        });
    }
}
function actualizarcarrito() {
    listacarrito.innerHTML = '';
    let total = 0;

    carrito.forEach((producto, compra) => {
        listacarrito.innerHTML += `<p>${producto.nombre} - $${producto.precio} 
            <button onclick="eliminarDelCarrito(${compra})">Eliminar</button></p>`;
        total += producto.precio;
    });
    preciototal.innerHTML = `Total: $${total}`;
}
function eliminarDelCarrito(compra) {
    let productoeliminado = carrito.splice(compra, 1)[0];
    catalogo.forEach(producto => {
        if (producto.nombre === productoeliminado.nombre) {
            producto.stock++;
        }
    });
    actualizarcarrito();
}
VaciarCarrito1.addEventListener('click', () => {
    carrito = [];
    catalogo.forEach(producto => {
        producto.stock = producto.stock + 1;
    });
    actualizarcarrito();        
    Swal.fire({
        position: "center",
        icon: "success",
        title: "Carrito vaciado a la perfección",
        showConfirmButton: false,
        timer: 1500
      })
});

mostrarproductos();

document.getElementById('finalizar').onclick = function() {
    carrito = [];
    catalogo.forEach(producto => {
        producto.stock = producto.stock + 1;
    });
    actualizarcarrito();        
    Swal.fire({
        position: "center",
        icon: "success",
        title: "Compra Finalizada con exito, espero disfrute de nuestro servicio ^^",
        showConfirmButton: false,
      })
    }