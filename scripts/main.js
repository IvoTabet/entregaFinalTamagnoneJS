/*const carrito = []

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
alert(mensaje + "El valor final a pagar es: $"+ valorTotal)*/



let valorTotal = 0
const carrito = []

const agregarCarrito = (nombre, precio) => {
    carrito.push(new Producto(nombre, precio))
}

class Producto {
    constructor(nombre, precio) {
        this.nombre = nombre
        this.precio = parseFloat(precio)
    }
}

//===================== CREACION DE ITEMS EN LA PAGINA ================================================

const productos = [
    {id: 1, categoria:"alimento", nombre: "alimento basico", valor: 1000, img: "https://prd.place/200"},
    {id: 2, categoria:"alimento", nombre: "alimento comun", valor: 2500, img: "https://prd.place/201"},
    {id: 3, categoria:"alimento", nombre: "alimento premium", valor: 5000, img: "https://prd.place/202"},
    {id: 4, categoria:"accesorio", nombre: "collar", valor: 2800, img: "https://prd.place/203"},
    {id: 5, categoria:"accesorio", nombre: "correa", valor: 3000, img: "https://prd.place/204"},
    {id: 6, categoria:"accesorio", nombre: "bozal", valor: 4000, img: "https://prd.place/205"},
    {id: 7, categoria:"juguete", nombre: "hueso", valor: 1500, img: "https://prd.place/206"},
    {id: 8, categoria:"juguete", nombre: "pelota", valor: 1000, img: "https://prd.place/207"},
    {id: 9, categoria:"juguete", nombre: "palo rascador", valor: 4300, img: "https://prd.place/208"}
]

const contenedorProductos = document.getElementById("contProduc")
productos.forEach((elem)=>{

    const div = document.createElement("div")
    div.innerHTML = `
    <div class="cardItem ${elem.categoria}">

    <img src="${elem.img}">
    <h3>${elem.nombre}</h3>
    <p>$${elem.valor}</p>
    <button class="btnAdicionar" id="${elem.id}">Agregar al carrito</button>
    </div>
    `
    contenedorProductos.appendChild(div)
})

//=========================== FILTROS POR CATEGORIA ===============================

const filtroAlim = document.getElementById("btnAlimento")
const filtroAcces = document.getElementById("btnAccesorios")
const filtroJug = document.getElementById("btnJuguetes")
const filtroLimpiar = document.getElementById("cleanFilter")

const cardsAlims = document.getElementsByClassName("alimento")
const cardsAcces = document.getElementsByClassName("accesorio")
const cardsJugs = document.getElementsByClassName("juguete")


filtroAlim.addEventListener("click", ()=>{
    cardsAcces.item(0).classList.add("filterAlim")
    cardsAcces.item(1).classList.add("filterAlim")
    cardsAcces.item(2).classList.add("filterAlim")
    cardsJugs.item(0).classList.add("filterAlim")
    cardsJugs.item(1).classList.add("filterAlim")
    cardsJugs.item(2).classList.add("filterAlim")
})

filtroAcces.addEventListener("click", ()=>{
    cardsAlims.item(0).classList.add("filterAlim")
    cardsAlims.item(1).classList.add("filterAlim")
    cardsAlims.item(2).classList.add("filterAlim")
    cardsJugs.item(0).classList.add("filterAlim")
    cardsJugs.item(1).classList.add("filterAlim")
    cardsJugs.item(2).classList.add("filterAlim")
})

filtroJug.addEventListener("click", ()=>{
    cardsAlims.item(0).classList.add("filterAlim")
    cardsAlims.item(1).classList.add("filterAlim")
    cardsAlims.item(2).classList.add("filterAlim")
    cardsAcces.item(0).classList.add("filterAlim")
    cardsAcces.item(1).classList.add("filterAlim")
    cardsAcces.item(2).classList.add("filterAlim")
})

filtroLimpiar.addEventListener("click", ()=>{
    cardsAlims.item(0).classList.remove("filterAlim")
    cardsAlims.item(1).classList.remove("filterAlim")
    cardsAlims.item(2).classList.remove("filterAlim")
    cardsAcces.item(0).classList.remove("filterAlim")
    cardsAcces.item(1).classList.remove("filterAlim")
    cardsAcces.item(2).classList.remove("filterAlim")
    cardsJugs.item(0).classList.remove("filterAlim")
    cardsJugs.item(1).classList.remove("filterAlim")
    cardsJugs.item(2).classList.remove("filterAlim")
})

// ====================================== AGREGAR ITEMS AL CARRITO =======================

const btnAdd = document.getElementsByClassName("btnAdicionar")

btnAdd.item(0).addEventListener("click", ()=>{
    for(let info of productos){
        if(info.id === 1){
            valorTotal += info.valor
            agregarCarrito(info.nombre, info.valor)
        }
    }
})
btnAdd.item(1).addEventListener("click", ()=>{
    for(let info of productos){
        if(info.id === 2){
            valorTotal += info.valor
            agregarCarrito(info.nombre, info.valor)
        }
    }
})
btnAdd.item(2).addEventListener("click", ()=>{
    for(let info of productos){
        if(info.id === 3){
            valorTotal += info.valor
            agregarCarrito(info.nombre, info.valor)
        }
    }
})
btnAdd.item(3).addEventListener("click", ()=>{
    for(let info of productos){
        if(info.id === 4){
            valorTotal += info.valor
            agregarCarrito(info.nombre, info.valor)
        }
    }
})
btnAdd.item(4).addEventListener("click", ()=>{
    for(let info of productos){
        if(info.id === 5){
            valorTotal += info.valor
            agregarCarrito(info.nombre, info.valor)
        }
    }
})
btnAdd.item(5).addEventListener("click", ()=>{
    for(let info of productos){
        if(info.id === 6){
            valorTotal += info.valor
            agregarCarrito(info.nombre, info.valor)
        }
    }
})
btnAdd.item(6).addEventListener("click", ()=>{
    for(let info of productos){
        if(info.id === 7){
            valorTotal += info.valor
            agregarCarrito(info.nombre, info.valor)
        }
    }
})
btnAdd.item(7).addEventListener("click", ()=>{
    for(let info of productos){
        if(info.id === 8){
            valorTotal += info.valor
            agregarCarrito(info.nombre, info.valor)
        }
    }
})
btnAdd.item(8).addEventListener("click", ()=>{
    for(let info of productos){
        if(info.id === 9){
            valorTotal += info.valor
            agregarCarrito(info.nombre, info.valor)
        }
    }
})


const carritoModal = document.getElementById("modalCont")
const btnCarro = document.getElementById("finCompra")
const btnCloseCarro = document.getElementById("closeCarro")
const modal = document.getElementById("modal")





btnCarro.addEventListener("click", ()=>{
    carritoModal.classList.toggle("activo")

    let mensaje = ""
    for(let items of carrito)
    {
        mensaje += "Nombre: " + items.nombre + "-------------- Valor producto: $" + items.precio + "\n"
    }
    modal.innerHTML= `
    <p>Productos agregados</p>
    <p>${mensaje}</p>
    <p>Valor total a pagar: $${valorTotal}</p>
    `
})

btnCloseCarro.addEventListener("click", ()=>{
    carritoModal.classList.toggle("activo")
})