import { obtenerProductos,traerProducto } from "./firebase.js";
const galeriaCarrito= document.querySelector('.galeria-carrito')
const carrito=[]
let total = 0
let carritoRep={}


const construirTarjeta= async (productosArray) => {
    
    const productos = await productosArray
    const contenedorProductos= document.querySelector('.products-container')
        
        productos.forEach(producto => {
            const card= document.createElement('div')
            card.classList.add('card-group')

            card.innerHTML= `
                <div class= "row tarjeta-responsive" id= ${producto.data().codigo}>
                    <div class="col-md-4 img-contenedor">          
                        <img src= ${producto.data().img} class= 'img-fluid img-responsive' alt=${producto.data().libro}>
                    </div>
                    <div class="col-md-8">
                        <div class= "card-body body-responsive">
                            <p class= "card-title"> ${producto.data().libro}</p>
                            <p class= "card-title"> ${producto.data().autor}</p>
                            <p class= "card-title"> Categoria: ${producto.data().genero}</p>
                            <p class="card-title">Precio: <b>$${producto.data().precio}</b></p>
                            <button class= "btn btn-outline-dark btn-sm comprar-btn" data-id="${producto.id}" id="${producto.id}">Comprar</button>
                            
                        </div>
                    </div> 
                </div>
            `
            contenedorProductos.append(card)
        });
    alHacerClick()    
}
construirTarjeta(obtenerProductos())

const alHacerClick= ()=>{
    const comprarBoton = document.querySelectorAll('.comprar-btn')
    comprarBoton.forEach(btn=>btn.addEventListener('click', agregarAlCarrito))
}

const agregarAlCarrito = async (e)=>{

    const productoClickeado = await traerProducto(e.target.id);

    if(chequearCarrito(e.target.id)){
        imprimirTotal(productoClickeado.data().precio)
    } else {
        carrito.push(productoClickeado)
        imprimirTotal(productoClickeado.data().precio)
        construirCartaCarrito()
    }
    imprimirCantRepetida(e.target.parentElement)
}

const chequearCarrito = (id)=>carrito.some(producto=>producto.id===id)

const construirCartaCarrito = ()=>{

    galeriaCarrito.innerHTML=''
   
    carrito.forEach(producto=> {

        const card= document.createElement('div')
            card.classList.add('card-group')

            card.innerHTML= `
                <div class= "row tarjeta-responsive cart-responsive" id= ${producto.data().codigo}>
                    <div class="col-md-4 img-contenedor">          
                        <img src= ${producto.data().img} class= 'img-fluid cart-img-responsive' alt=${producto.data().libro}>
                    </div>
                    <div class="col-md-8">
                        <div class= "carrito-cuerpo card-body">
                            <small class= "text-muted"> ${producto.data().libro}</small>
                            <small class= "text-muted"> ${producto.data().autor}</small>
                            <small class="text-muted">Precio: <b>$${producto.data().precio}</b></small>
                            <small class="text-muted"><b>X<span class="text-muted cantidad" data-id="${producto.id}" id="${producto.id}">1</span></b></small>
                        </div>
                    </div> 
                </div>
            `
            galeriaCarrito.append(card)
    })
}

const imprimirCantRepetida = (btn)=>{
    
    const productoRepetido= {
        id: btn.querySelector('.comprar-btn').dataset.id,
        cantidad: 1
    }

    if(carritoRep.hasOwnProperty(productoRepetido.id)){
        productoRepetido.cantidad= carritoRep[productoRepetido.id].cantidad + 1
    }

    carritoRep[productoRepetido.id]={...productoRepetido}
    imprimirCantidades()
}

const imprimirCantidades= ()=>{   
    const spanRep = galeriaCarrito.querySelectorAll('span')
    spanRep.forEach(x=>{
        for(let i=0;i<spanRep.length;i++){
            Object.values(carritoRep).forEach(producto=>{
                if(spanRep[i].dataset.id === producto.id){
                    spanRep[i].textContent=producto.cantidad
                }
            })
        }
    })
    
    
}

const imprimirTotal = (price) =>{
    const totalCarrito= document.querySelector('.total-carrito')
    total += price
    totalCarrito.textContent= total
} 

const vaciarCarrito = ()=>{
    total=0
    document.querySelector('.total-carrito').textContent=0
    document.querySelector('.galeria-carrito').innerHTML=''
    carrito.length=0
}

const finalizarCarrito = ()=>{
    const checkout = document.querySelector('.checkout')
    const empty = document.querySelector('.empty')

    checkout.addEventListener('click', ()=>{
        if(carrito.length > 0){
            Swal.fire({
                title:"Gracias por su compra"
            })
        }
    })
    
    empty.addEventListener('click', ()=>{
        if(carrito.length > 0){
            Swal.fire({
                title:"Carrito vacío"
            })
        }
    })

    checkout.addEventListener('click', vaciarCarrito)
    empty.addEventListener('click', vaciarCarrito)
}

finalizarCarrito()


