const checkout=document.querySelector('.checkout')
const empty=document.querySelector('.empty')
import {carrito} from "./main.js"

checkout.addEventListener('click', ()=>{
    
    if(carrito.length != 0)
    Swal.fire({
        title:"Gracias por su compra"
    })
})

empty.addEventListener('click', ()=>{
    Swal.fire({
        title:"Carrito vacío"
    })
})