// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs,
  doc, 
  getDoc 
} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-2ED6vylfDZBU328NxYLkI1OPaRuGvVM",
  authDomain: "proa-libreria.firebaseapp.com",
  projectId: "proa-libreria",
  storageBucket: "proa-libreria.appspot.com",
  messagingSenderId: "437292582301",
  appId: "1:437292582301:web:aa1db6d0e5e445c7091b74"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Initialize Firestore
const db = getFirestore(app)


//Agregar Datos
/* export async function agregarProductos(libro,autor,genero,img,stock){
  
  try {
    const docRef = await addDoc(collection(db, "productos"), {
      libro: libro,
      autor: autor,
      genero: genero,
      img: img,
      stock: stock,
    });
    console.log("Document written with ID: ", docRef.id);
  
  } 
  catch (e) {
    console.error("Error adding document: ", e);
}
} */

//Traer Datos
export const obtenerProductos= async ()=>{

  const querySnapshot = await getDocs(collection(db, "productos"));
    const productos=[];
    querySnapshot.forEach((doc) => {
      productos.push(doc);
    });

    return productos
}

//Traer un dato

export const traerProducto = async (id)=>{

  const docRef = doc(db, "productos", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }

}
