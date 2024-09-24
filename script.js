const productos = function (nombre, precio, stock){
    this.nombre = nombre
    this.precio = precio
    this.stock = stock
}
let cafe1 = new productos ("cafe chimi", 1500, 15)
let cafe2 = new productos ("cafe kitty", 1700, 19)
let galleta1 = new productos ("galleta gaara", 2000, 20)

let catalogo=[cafe1, cafe2, galleta1]

localStorage.setItem("cafe1", cafe1)
localStorage.setItem("cafe2", cafe2)
localStorage.setItem("galleta1", galleta1)

function ordenarproductos(){
    let productousuario = prompt("Que vas a llevar hoy?").trim().toLowerCase()
    let carrito = catalogo.filter((productos)=>productos.nombre.toLowerCase().includes(productousuario))
    if(carrito.length>0){
        console.table(carrito)
    }else{
        alert("no existe tal producto")
    }
}

let botondeconsprecios = document.getElementById("consultarprecios")
botondeconsprecios.addEventListener("click", ordenarproductos)

let parrafoproductos = document.getElementById("parrafo-productos")
parrafoproductos.innerHTML = `<p> ${cafe1.nombre} tiene un costo de $${cafe1.precio}. <br>
                      ${cafe2.nombre} tiene un costo de $${cafe2.precio}.<br>
                      ${galleta1.nombre} tiene un costo de $${galleta1.precio}.<p>`

function comprarcafechimi (){
    localStorage.setItem("cafe chimi", 1500)
}
function comprarcafekitty (){
    localStorage.setItem("cafe kitty", 1700)
}
function comprargalletagaara (){
    localStorage.setItem("galleta gaara", 2000)
}
function VaciarCarro (){
    localStorage.clear()
}

let btncomprarcafe1 = document.getElementById("comprarcafe1")
btncomprarcafe1.addEventListener("click", comprarcafechimi)

let comprarcafe2 = document.getElementById("comprarcafe2")
comprarcafe2.addEventListener("click", comprarcafekitty)

let comprargalleta1 = document.getElementById("comprargalleta1")
comprargalleta1.addEventListener("click", comprargalletagaara)

let VaciarCarrito1= document.getElementById("VaciarCarrito")
VaciarCarrito1.addEventListener("click", VaciarCarro)