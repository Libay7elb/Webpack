
import '../css/componentes.css';
// import webpacklogo from '../assets/imgs/webpack-logo.png'

// Para exportar nuestro codigo debemos usar la palabra exportar.
 export const saludar =(nombre)=>{
    console.log("imprimiendo un h1");
    const h1 = document.createElement("h1");
    h1.innerText = `HOLA ${nombre} :)!!!`;
    document.body.append(h1)
}


// Img
// console.log(webpacklogo)
// const img = document.createElement("img");
// img.src = webpacklogo;
// document.body.append(img);