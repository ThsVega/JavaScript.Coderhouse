/*
const productos = [
    {nombre: "Cafe chimi", precio: 1500 },
    {nombre: "galleta gaara", precio: 1000 },
    {nombre: "Cafe kitty", precio: 1700 }
]

const caferecomendado = productos.filter(el => el.producto.includes(cafe))

const productosprecios = productos.forEach(producto => {
    console.log(`${porducto.nombre} actualmente cuesta $${producto.precio}`)
})

const preciossep2024 = productos.map( (producto)=>{return producto*1.5})

console.log(preciossep2024)
*/

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

/*let div1 = document.createElement("div")

div1.innerHTML = `<p> ${cafe1.nombre} tiene un costo de $${cafe1.precio}.
                      ${cafe2.nombre} tiene un costo de $${cafe2.precio}.
                      ${galleta1.nombre} tiene un costo de $${galleta1.precio}.<p>`

document.body.appendChild(div1)*/

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