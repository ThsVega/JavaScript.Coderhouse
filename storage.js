document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("carrito")) {
        carrito = JSON.parse(localStorage.getItem("carrito"));
        actualizarcarrito();
    }
});

function guardarenlocalstorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}