/*function sumar(num1, num2){
    let resultado = num1+num2
    alert(resultado)
}
sumar(245,567)*/

var admin = "Thomas"

let NombreUsuario = prompt("Ingresar nombre de usuario")
if (NombreUsuario == admin){
    alert("hola admin");
}
else if (NombreUsuario == ""){
    alert("Nombre de Usuario Incorrecto")
}
else{
    alert("Hola " + NombreUsuario)
}


let NumComision = prompt("Ingrese el numero de Comisión")
while (NumComision != "64785"){
    alert ("El numero de Comisión ingresado no es correcto");
    NumComision = prompt ("Vuelva a intentarlo por favor")
}


let bienvenida = () => "Buenas, les damos la bienvenida a la Consola de este Entregable";
console.log (bienvenida());


function multiplicar(numero1, numero2) {
    resultado = numero1 * numero2;
}
multiplicar (12957, 5);
console.log(resultado);


let nacimiento = prompt("En que año naciste?")
let edadactual = "2024" - nacimiento
alert ("Actualmente tenes " + edadactual + " años");


const presentes = ["Thomas", "Sofia", "Marcelina", "Yoana"];
presentes.push ("Maxi")
presentes.push ("Gastón")
console.log("Hoy en la casa estan presentes, " + presentes)