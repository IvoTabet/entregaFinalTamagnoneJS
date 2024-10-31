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

obtenerProductos('./scripts/dataBase.json')
cargarCarrito()