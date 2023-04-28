// Funciones para almacenar y traer los datos que se almacenan
function guardarDatos(herramienta, valores_para_almacenar) 
{
    localStorage.setItem(herramienta, JSON.stringify(valores_para_almacenar))
}

function extraerDatos(herramienta) 
{
    const informacion = JSON.parse(localStorage.getItem(herramienta))
    return informacion
}

function guardarDatosCarrito() 
{
  guardarDatos("videojuegos", lista);
}
  
let videojuegos = extraerDatos('videojuegos') || [];
function ocultarProductoDetalle()
{
    document.getElementById('miModal').style.display='none';
}

// Variables que traemos de nuestro html
const informacionCompra = document.getElementById('informacionCompra');
const contenedorCompra = document.getElementById('contenedorCompra');
const productosCompra = document.getElementById('productosCompra');
const tarjetita = document.getElementById('tarjetita');
const carrito = document.getElementById('carrito');
const numero = document.getElementById("numero");
const header = document.querySelector("#header");
const total = document.getElementById('total');
const body = document.querySelector("body");
const x = document.getElementById('x')


function enseñar()
{
    document.getElementById('informacionCompra').style.display='block';
}

function desaparecer()
{
    document.getElementById('informacionCompra').style.display='none';
}


let lista = []
let valortotal = 0 


window.addEventListener("scroll", function () {
    if (tarjetita.getBoundingClientRect().top < 10) 
    {
        header.classList.add("scroll")
    }
    else 
    {
        header.classList.remove("scroll")
    }
})


window.addEventListener('load', () => {
  verVentanitas();
    contenedorCompra.classList.add("none")
})
//agregaesta//////////////////////////////////////////////////////////////////////////
function mostrarModal(indice) 
{
    const producto = extraerDatos('videojuegos')[indice];
    const modalDetalle = document.getElementById('miModal');
    const modalImagen = modalDetalle.querySelector('#modalImagen');
    const modalNombre = modalDetalle.querySelector('#modalNombre');
    const modalPrecio = modalDetalle.querySelector('#modalPrecio');
    const modalExistencia = modalDetalle.querySelector('#modalDescripcion');
    const botoncomprar = modalDetalle.querySelector('#btncomprar');

    modalImagen.src = producto.imagenJue;
    modalNombre.textContent = producto.nombreJue;
    modalPrecio.textContent = `$${producto.precioJue}MX`;
    modalExistencia.textContent = `Descripción: ${producto.descJue}`;
    botoncomprar.addEventListener('click', function (){comprar(indice); modalDetalle.style.display="block" });
    modalDetalle.style.display = "block";
}

//estatambien/////////////////////Es una funcion donde agrega las ventanas de cada videojuego cargado en la de administraciod///////////////////////////////////////
function verVentanitas()
 {
  tarjetita.innerHTML = ""
    for (let e = 0; e < videojuegos.length; e++) 
    {
        if (videojuegos[e].cantidadJue > 0) 
        {
            //esta agregar el onclick*/
            tarjetita.innerHTML +=  
            `
            <div class="tarjetita">
              <img  src="${videojuegos[e].imagenJue}" onclick="mostrarModal(${e})">
                <div class="informacion">
                  <p>${videojuegos[e].nombreJue}</p>
                  <p class="precio"> $${videojuegos[e].precioJue}</p>
                  <button onclick=comprar(${e})>Comprar</button>
                </div>
            </div>`
        }

        else 
        {
          tarjetita.innerHTML += 
          `<div class="tarjetita">
          <div><img src="${videojuegos[e].imagenJue}">
          <div class="informacion"><p>${videojuegos[e].nombreJue}</p>
          <p class="precio">$${videojuegos[e].precioJue}</p>
          </div></div></div>`
        }
    }
}



function comprar(indice) 
{
  let productoExistente = false;
  for (let e = 0; e < lista.length; e++) {
    if (lista[e].nombreJue === videojuegos[indice].nombreJue) {
      lista[e].cantidad += 1;
      lista[e].precioTotal = lista[e].precioJue * lista[e].cantidad;
      productoExistente = true;
      break;
    }
  }

  if (!productoExistente) {
    const producto = {
      nombreJue: videojuegos[indice].nombreJue,
      precio: videojuegos[indice].precioJue,
      cantidad: 1,
      precioTotal: videojuegos[indice].precioJue,
      imagenJue: videojuegos[indice].imagenJue // add the URL here
    }
    lista.push(producto);
  }

  let llevar = true
  let e = 0
  while (llevar == true) {
    if (videojuegos[e].nombreJue == videojuegos[indice].nombreJue) {
      videojuegos[e].cantidadJue -= 1
      if (videojuegos[e].cantidadJue == 0) {
        verVentanitas()
      }
      llevar = false
    }
    guardarDatos("videojuegos", videojuegos)
    e += 1
  }
  guardarDatos("carrito", lista); // Guardar el carrito en local storage
  numero.innerHTML = lista.reduce((total, item) => total + item.cantidad, 0)
  numero.classList.add("diseñoNumero")
  mostrarElemtrosLista();
}
carrito.addEventListener("click", function()
{
    body.style.overflow = "hidden"
    contenedorCompra.classList.remove('none')
    contenedorCompra.classList.add('contenedorCompra')
    informacionCompra.classList.add('informacionCompra')
    mostrarElemtrosLista()
})


function mostrarElemtrosLista() {
  productosCompra.innerHTML = "";
  let valortotal = 0;
  for (let e = 0; e < lista.length; e++) {
      const producto = lista[e];
      const precioTotal = producto.cantidad * producto.precio;
      valortotal += precioTotal;
      productosCompra.innerHTML += `<div><div class="img"><button onclick=eliminar(${e}) class="botonTrash"><img src="./img/trash.png"><img src="${videojuegos[e].imagenJue}"></button><p>${producto.nombre} (x${producto.cantidad})</p></div><p> $${precioTotal.toFixed(2)}</p></div>`;
  }
  total.textContent = `$${valortotal.toFixed(2)}`;
}



function eliminar(indice) 
{
    lista.splice(indice, 1);
    guardarDatos("carrito", lista); // Guardar el carrito en local storage
    mostrarElemtrosLista();
}
  
x.addEventListener("click", function()
{
    body.style.overflow = "auto"
    contenedorCompra.classList.add('none')
    contenedorCompra.classList.remove('contenedorCompra')
    informacionCompra.classList.remove('informacionCompra')
})

window.addEventListener('load', () => 
{
  videojuegos = extraerDatos('videojuegos') || [];
    lista = extraerDatos('carrito') || []; // Obtener los datos del carrito desde local storage
    verVentanitas();
    contenedorCompra.classList.add("none")
  });


  const detallesBtn = document.getElementById('detallescompra'); // Reemplaza "detallesBtn" con el ID de tu botón
detallesBtn.addEventListener('click', function() {
  window.location.href = '../html/carrito.html';
});
