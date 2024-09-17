const carrito = []
const categorias = ["alimento", "accesorios", "juguetes"]
const alimento = [
    {nombre: "alimento basico", valorAlim: 1000},
    {nombre: "alimento comun", valorAlim: 2500},
    {nombre: "alimento premium", valorAlim: 5000}
]
const accesorios = [
    {nombre: "collar", valor: 2800},
    {nombre: "correa", valor: 3000},
    {nombre: "bozal", valor: 4000}
]
const juguetes = [
    {nombre: "hueso", valor: 1500},
    {nombre: "pelota", valor: 1000},
    {nombre: "palo rascador", valor: 4300}
]
let tipoProdu, tipoAlim, tipoAcces, tipoJug
//let cantProdu = 0, cantAlim =0, cantAcces = 0, cantJug = 0
let valorTotal = 0
let continuar = true

class Producto {
    constructor(nombre, precio) {
        this.nombre = nombre
        this.precio = parseFloat(precio)
    }
}

const validarTipoProdu = (idProdu) =>{
    for (let i=0; i<categorias.length; i++){
        if(idProdu === categorias[i]){
            return categorias[i]
        }
    }
}

const validarAlimento = (alim) =>{
    for(let info of alimento){
        if(info.nombre === alim){
            valorTotal += info.valorAlim
            alert('se ha agregado ' + info.nombre + ' exitosamente')
            agregarCarrito(info.nombre, info.valorAlim)
        }
    }
}

const validarAccesorio = (aceso) =>{
    for(let info of accesorios){
        if(info.nombre === aceso){
            valorTotal += info.valor
            alert('se ha agregado ' + info.nombre + ' exitosamente')
            agregarCarrito(info.nombre, info.valor)
        }
    }
}

const validarJuguete = (juguetin) =>{
    for(let info of juguetes){
        if(info.nombre === juguetin){
            valorTotal += info.valor
            alert('se ha agregado ' + info.nombre + ' exitosamente')
            agregarCarrito(info.nombre, info.valor)
        }
    }
}

const agregarCarrito = (nombre, precio) => {
    carrito.push(new Producto(nombre, precio))
}

alert("Bienvenido, a continuación realizará el simulador de compras de nuestro sitio")
do{
    tipoProdu = prompt("Ingrese el tipo de producto que quiera agregar a su carrito: \n-alimento \n-accesorios \n-juguetes")
    validarTipoProdu(tipoProdu)
    switch (tipoProdu){
        case "alimento":
            tipoAlim = prompt("Que alimento desea comprar? \n-'alimento basico' $1000 \n-'alimento comun' $2500 \n-'alimento premium' $5000")
            validarAlimento(tipoAlim)
            continuar = confirm("desea agregar otro producto?")
            break;
        case "accesorios":
            tipoAcces = prompt("Que accesorio desea comprar? \n-'bozal' $4000 \n-'correa' $3000 \n-'collar' $2800")
            validarAccesorio(tipoAcces)
            continuar = confirm("desea agregar otro producto?")
            break;
        case "juguetes":
            tipoJug = prompt("Que juguete desea comprar? \n-'hueso' $1500 \n-'palo rascador' $4300 \n-'pelota' $1000")
            validarJuguete(tipoJug)
            continuar = confirm("desea agregar otro producto?")
            break;
        default: alert("ingrese un producto valido")
    }
}while(continuar === true)

let mensaje = "Productos agregados: \n"
for(let items of carrito)
{
    mensaje += "Nombre: " + items.nombre + "-------------- Valor producto: $" + items.precio + "\n"
}
alert(mensaje + "El valor final a pagar es: $"+ valorTotal)