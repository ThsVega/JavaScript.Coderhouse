const productos = function (nombre, precio, stock, imagen) {
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
    this.imagen = imagen;
    this.cantidad = 0;
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
let medialuna1 = new productos("medialuna slowpoke", 4000, 1, "assets/medialuna-slowpoke.png");
let medialuna2 = new productos("medialuna salamance", 4500, 7, "assets/medialuna-salamance.png");

let catalogo = [cafe1, cafe2, cafe3, cafe4, galleta1, galleta2, galleta3, galleta4, waffle1, medialuna1, medialuna2];
let carrito = [];

let parrafoproductos = document.getElementById("listadeproductos"); 
let listacarrito = document.getElementById("carrito");
let preciototal = document.getElementById("total");
let VaciarCarrito1 = document.getElementById("VaciarCarrito");

function mostrarproductos() {
    parrafoproductos.innerHTML = '';
    catalogo.forEach((producto, index) => {
        parrafoproductos.innerHTML += `
            <div>
                <img src="${producto.imagen}" alt="${producto.nombre}" style="width:100px; height:auto;">
                <p>${producto.nombre} tiene un costo de $${producto.precio}. 
                <button onclick="agregaralcarrito(${index})">Agregar al carrito</button></p>
            </div>
        `;
    });
}

function guardarlocalstorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function cargarlocalstorage() {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        actualizarcarrito();
    }
}

function agregaralcarrito(index) {
    let producto = catalogo[index];
    if (producto.stock > 0) {
        let productoEnCarrito = carrito.find(item => item.nombre === producto.nombre);
        
        if (productoEnCarrito) {
            if (productoEnCarrito.cantidad < producto.stock) {
                productoEnCarrito.cantidad++;
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Sin Stock',
                    text: 'No hay más stock de este producto'
                });
                return;
            }
        } else {
            productoEnCarrito = { ...producto, cantidad: 1 };
            carrito.push(productoEnCarrito);
        }

        producto.stock--;
        actualizarcarrito();
        guardarlocalstorage();

        Swal.fire({
            position: "center",
            icon: "success",
            title: "Añadido al Carrito",
            showConfirmButton: false,
            timer: 1500
        });
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

    carrito.forEach((producto, index) => {
        total += producto.precio * producto.cantidad;
        listacarrito.innerHTML += `
            <p>${producto.nombre} - $${producto.precio} x ${producto.cantidad}
                <button onclick="cantidadmas(${index})">+</button>
                <button onclick="cantidadmenos(${index})">-</button>
                <button onclick="elimprodcarrito(${index})">Eliminar</button>
            </p>
        `;
    });
    
    preciototal.innerHTML = `Total: $${total}`;
}

function cantidadmas(index) {
    let producto = carrito[index];
    if (producto.cantidad < producto.stock) {
        producto.cantidad++;
        producto.stock--;
        actualizarcarrito();
        guardarlocalstorage();
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Sin Stock',
            text: 'Lamentamos informarle que no contamos con ese producto actualmente, espero lo entienda y tenga un lindo dia ^^'
        });
    }
}

function cantidadmenos(index) {
    let producto = carrito[index];
    if (producto.cantidad > 1) {
        producto.cantidad--;
        producto.stock++;
    } else {
        elimprodcarrito(index);
    }
    actualizarcarrito();
    guardarlocalstorage();
}

function elimprodcarrito(index) {
    let producto = carrito.splice(index, 1)[0];
    let catalogoProducto = catalogo.find(p => p.nombre === producto.nombre);
    catalogoProducto.stock += producto.cantidad;
    actualizarcarrito();
    guardarlocalstorage();
}

VaciarCarrito1.onclick = function() {
    carrito = [];
    catalogo.forEach(producto => producto.stock += producto.cantidad);
    actualizarcarrito();
    localStorage.removeItem("carrito");
    Swal.fire({
        position: "center",
        icon: "success",
        title: "Carrito vaciado a la perfección",
        showConfirmButton: false,
        timer: 1500
    });
};

document.getElementById('finalizar').onclick = function() {
    carrito = [];
    catalogo.forEach(producto => producto.stock += producto.cantidad);
    actualizarcarrito();
    localStorage.removeItem("carrito");
    Swal.fire({
        position: "center",
        icon: "success",
        title: "Compra Finalizada con éxito, espero disfrute de nuestro servicio ^^",
        showConfirmButton: false,
    });
}

async function infocomprador() {
    const formContainer = document.createElement('div');

    const infocliente = [
        { id: 'nombrecliente', placeholder: 'Indique aqui su Nombre' },
        { id: 'correocliente', placeholder: 'Indique aqui su Correo', type: 'email' },
        { id: 'direcliente', placeholder: 'Indique aqui su Dirección' },
        { id: 'telcliente', placeholder: 'Indique aqui su Telefono', type: 'tel' }
    ];

    infocliente.forEach(cliente => {
        const input = document.createElement('input');
        input.id = cliente.id;
        input.placeholder = cliente.placeholder;
        input.className = 'swal2-input';
        if (cliente.type) input.type = cliente.type;
        formContainer.appendChild(input);
    });

    const { value: formValues } = await Swal.fire({
        title: 'Ingrese sus datos para poder finalizar la compra :)',
        html: formContainer,
        focusConfirm: false,
        preConfirm: () => {
            const nombre = document.getElementById('nombrecliente').value;
            const correo = document.getElementById('correocliente').value;
            const direccion = document.getElementById('direcliente').value;
            const telefono = document.getElementById('telcliente').value;
            if (!nombre || !correo || !direccion || !telefono) {
                Swal.showValidationMessage('Ingrese sus datos, sino no podremos finalizar su compra');
                return;
            }
            return { nombre, correo, direccion, telefono };
        }
    });

    if (formValues) {
        let resumencarrito = `<strong>Nombre:</strong> ${formValues.nombre}<br>
                             <strong>Correo:</strong> ${formValues.correo}<br>
                             <strong>Dirección:</strong> ${formValues.direccion}<br>
                             <strong>Teléfono:</strong> ${formValues.telefono}<br><br>
                             <strong>Su Compra:</strong><br>`;

        let total = 0;
        carrito.forEach(producto => {
            resumencarrito += `${producto.nombre} - $${producto.precio} x ${producto.cantidad} unidad/es<br>`;
            total += producto.precio * producto.cantidad;
        });
        resumencarrito += `<br><strong>Total:</strong> $${total}`;

        await Swal.fire({
            title: 'Confirme si sus datos son correctos',
            html: resumencarrito,
            icon: 'info',
            confirmButtonText: 'Confirmar Compra'
        });

        carrito = [];
        catalogo.forEach(producto => producto.stock += producto.cantidad);
        actualizarcarrito();
        localStorage.removeItem("carrito");

        Swal.fire({
            position: "center",
            icon: "success",
            title: "Compra Finalizada con éxito, espero disfrute de nuestro servicio ^^",
            showConfirmButton: false,
            timer: 2000
        });
    }
}

document.getElementById('finalizar').onclick = infocomprador;

mostrarproductos();
cargarlocalstorage();