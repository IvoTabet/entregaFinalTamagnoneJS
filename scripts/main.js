let valorTotal = 0
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const agregarCarrito = (item) => {
    carrito.push(item)
}

//===================== CREACION DE ITEMS EN LA PAGINA ===========================
let prods = []
const obtenerProductos = async(url) => {
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`ERROR: ${res.ok}`);
        }
        
        const data = await res.json();
        generarCards(data);
        prods = data
    }catch (error){
        console.error(error.message);
    }
  }

const contenedorProductos = document.getElementById("contProduc")

function generarCards(products){
    contenedorProductos.innerHTML = ``
    products.forEach((elem)=>{
        
        const div = document.createElement("div")
        div.innerHTML = `
        <div class="cardItem ${elem.categoria}">
    
        <img src="${elem.img}" class="imgCard">
        <h3>${elem.nombre}</h3>
        <p>$${elem.valor}</p>
        <button class="btnAdicionar" id="${elem.id}">Agregar al carrito</button>
        </div>
        `
        contenedorProductos.appendChild(div)
    })
    botonComprarItems()    
}

function botonComprarItems(){
    const btnAdd = document.getElementsByClassName("btnAdicionar")
    for(let elm of btnAdd){
        elm.addEventListener("click", agregarItem)
    }
}
//=================================== FILTROS POR CATEGORIA ===============================

const botonesFiltrs = document.getElementsByClassName("btnCategoria")

for (let boton of botonesFiltrs){
    boton.addEventListener("click", filtrar)
}

function filtrar(elm){
    const id = elm.target.dataset.id

    if(id === "slctAll"){
        generarCards(prods)
    }else{
        const productsFiltrados = prods.filter(x=> x.categoria === id)
        generarCards(productsFiltrados)
    }

}

// ====================================== AGREGAR ITEMS AL CARRITO =======================


function agregarItem(btn){
    let idItem = parseInt(btn.target.id)
    
    const itemAgregado = prods.find(prod => prod.id === idItem)
    
    valorTotal += itemAgregado.valor
    if (carrito.some(prod => prod.id === idItem)) {
        const index = carrito.findIndex(producto => producto.id === idItem)
        carrito[index].cantidad++
        localStorage.setItem("carrito", JSON.stringify(carrito))
    }else{
        itemAgregado.cantidad = 1
        agregarCarrito(itemAgregado)   
        localStorage.setItem("carrito", JSON.stringify(carrito))            
    }

}


//================================== MUESTRO EL MODAL DEL CARRITO ========================

const carritoModal = document.getElementById("modalCont")
const btnCarro = document.getElementById("finCompra")
const modal = document.getElementById("modal")

function generarCardsCarrito(){
    modal.innerHTML=``
    carrito.forEach((elem)=>{
        if(elem.cantidad>0){
            const div = document.createElement("div")
            div.innerHTML = `
            <div class="cardCarrito">
                <img src="${elem.img}" class="imgCardCarrito">
                <h3>${elem.nombre}</h3>
                <p>Cantidad: ${elem.cantidad}</p>
                <p>$${elem.valor*elem.cantidad}</p>    
                <button class="btnBorrar" id="${elem.id}">Borrar</button>
            </div>
            `
            modal.appendChild(div)
        }
    })

    const div = document.createElement("div")
    div.innerHTML=`
    <div class="contBotonesFinales">
        <p class="valorTotal">Valor total: R$${valorTotal}</p>
        <button id="closeCarro">Seguir comprando</button> 
        <button id="finalizarCompra">Finalizar compra</button>
    </div>
    `
    modal.appendChild(div)

    const btnCloseCarro = document.getElementById("closeCarro")
    btnCloseCarro.addEventListener("click", ()=>{
        carritoModal.classList.toggle("activo")
    })

    const btnFinalizarCompra = document.getElementById("finalizarCompra")
    btnFinalizarCompra.addEventListener("click", ()=>{
        carritoModal.classList.toggle("activo")
        carrito=[]
        localStorage.clear()
        valorTotal=0
        Swal.fire({
            title: "Usted ha finalizado su compra",
            text: "Muchas gracias por haberse tomado el tiempo de utilizar mi simulador, le deseo un gran día.",
            icon: "success"
          });

    })

    const btnBorrar = document.getElementsByClassName("btnBorrar")

    for (let boton of btnBorrar){
        boton.addEventListener("click", borrarItem)
    }
}



btnCarro.addEventListener("click", ()=>{
    modal.innerHTML=``
    carritoModal.classList.toggle("activo")
    generarCardsCarrito()    
})


function borrarItem(btn){
    let idItem = parseInt(btn.target.id)
    const itemABorrar = carrito.find(item => item.id === idItem)
    
    valorTotal -= itemABorrar.valor
    if (carrito.some(item => item.id === idItem)) {
        const index = carrito.findIndex(producto => producto.id === idItem)
        carrito[index].cantidad--
        if(carrito[index].cantidad >0)
        {
            localStorage.setItem("carrito", JSON.stringify(carrito))
        }else if(carrito[index].cantidad ===0){
            carrito = carrito.filter(prod => prod.id !== idItem);
            localStorage.removeItem("carrito", carrito[index]) 
            localStorage.setItem("carrito", JSON.stringify(carrito))    
        }
    }    
    generarCardsCarrito()
}

const cargarCarrito = () => {
    if(carrito.length>0){
        carrito = JSON.parse(localStorage.getItem("carrito"))
    }
};

obtenerProductos('./scripts/dataBase.json')
cargarCarrito()