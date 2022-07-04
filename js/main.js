import { obtenerProductos,traerProducto } from "./firebase.js";

const construirTarjeta= async (productosArray) => {
    
    const productos = await productosArray
    const contenedorProductos= document.querySelector('.productsContainer')
        
        productos.forEach(producto => {
            const card= document.createElement('div')
            card.classList.add('card-group')

            card.innerHTML= `
                <div class= "row tarjetaResponsive" id= ${producto.data().codigo}>
                    <div class="col-md-4 imgContenedor">          
                        <img src= ${producto.data().img} class= 'img-fluid imgResponsive' alt=${producto.data().libro}>
                    </div>
                    <div class="col-md-8">
                        <div class= "card-body bodyResponsive">
                            <p class= "card-title"> ${producto.data().libro}</p>
                            <p class= "card-title"> ${producto.data().autor}</p>
                            <p class= "card-title"> Categoria: ${producto.data().genero}</p>
                            <p class="card-title">Precio: <b>$${producto.data().precio}</b></p>
                            <button class= "btn btn-outline-dark btn-sm comprarBtn" id="${producto.id}">Comprar</button>
                            
                        </div>
                    </div> 
                </div>
            `
            contenedorProductos.append(card)
        });
    alHacerClick()    
}

//El parametro es la funcion que esta en firebase y obtiene todos los documentos de PRODUCTOS
construirTarjeta(obtenerProductos())


//Me traigo todos los botones y Cuando haces click en un boton llama a la funcion agregarAlCarrito que se trae el e.target.id y le pasa como parametro para traerProducto(). Luego le pide que le retorne el documento que tenga el mismo id.
const alHacerClick= ()=>{
    const comprarBoton = document.querySelectorAll('.comprarBtn')
    comprarBoton.forEach(btn=>btn.addEventListener('click', agregarAlCarrito))
}


//Creo un array para guardar todos los documentos clickeados en el DOM. Exporto carrito para usarlo en sweetalert.js
const carrito=[]
/* let totalRepetido=0 */
const agregarAlCarrito = async (e)=>{

    const productoClickeado = await traerProducto(e.target.id);
    
    if(chequearCarrito(e.target.id)){
        agregarCantidadRepetida(e.target.id)
        imprimirTotal(productoClickeado.data().precio)
    } else {
        imprimirTotal(productoClickeado.data().precio)
        carrito.push(productoClickeado)
        construirCartaCarrito()
    } 
    
}

//Trae del html galeriaCarrito y es llamada luego del pusheo al carrito, de esa manera lo recorre y lo imprime en el DOM.Se vacia cada vez que se ejecuta la funcion para q al volver a clickear sobre el boton de comprar no imprima las cartas anteriores del arraya carrito.
const construirCartaCarrito = ()=>{

    const galeriaCarrito= document.querySelector('.galeriaCarrito')
    galeriaCarrito.innerHTML=''
   
    carrito.forEach(producto=> {

        const card= document.createElement('div')
            card.classList.add('card-group')

            card.innerHTML= `
                <div class= "row tarjetaResponsive cartResponsive" id= ${producto.data().codigo}>
                    <div class="col-md-4 imgContenedor">          
                        <img src= ${producto.data().img} class= 'img-fluid cartImgResponsive' alt=${producto.data().libro}>
                    </div>
                    <div class="col-md-8">
                        <div class= "carritoCuerpo card-body">
                            <small class= "text-muted"> ${producto.data().libro}</small>
                            <small class= "text-muted"> ${producto.data().autor}</small>
                            <small class="text-muted">Precio: <b>$${producto.data().precio}</b></small>
                            <small class="text-muted"><b>X<span class="cantidad" id="${producto.id}">1</span></b></small>
                        </div>
                    </div> 
                </div>
            `
            galeriaCarrito.append(card)
    })
}

const agregarCantidadRepetida= (id) =>{
    const cantidad=document.querySelector('.cantidad')
    if(id === cantidad.id){ 
        const cantidadParseada= parseInt(cantidad.textContent)
        cantidad.textContent = cantidadParseada + 1
        console.log(cantidad.id);
    }
}

//Chequea si ya hay un tarjeta igual en el carrito. Es llamada dentro de agregarAlCarrito
const chequearCarrito = (id)=>carrito.some(producto=>producto.id===id)


let total = 0
const imprimirTotal = (price) =>{

    const totalCarrito= document.querySelector('.totalCarrito')
    total = total + price
    totalCarrito.textContent= total

} 


const vaciarCarrito = ()=>{
    total=0
    document.querySelector('.totalCarrito').textContent=0
    document.querySelector('.galeriaCarrito').innerHTML=''
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


