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
function mostrarModal(indice) {
    const producto = obtenerAlmacenamientoLocal('videojuegos')[indice];
    const modal = document.getElementById('miModal');
    const modalImagen = modal.querySelector('#modalImagen');
    const modalNombre = modal.querySelector('#modalNombre');
    const modalPrecio = modal.querySelector('#modalPrecio');
    const modalExistencia = modal.querySelector('#modalDescripcion');
    const botoncomprar = modal.querySelector('#btncomprar');

    modalImagen.src = producto.imagenJue;
    modalNombre.textContent = producto.nombreJue;
    modalPrecio.textContent = `$${producto.precioJue}MX`;
    modalExistencia.textContent = `Descripción: ${producto.descJue}`;
    botoncomprar.addEventListener('click', function (){comprar(indice); modal.style.display="block" });
    modal.style.display = "block";
}

/*********************MOSTRAR GALERÍA********************************* */



function verVentanitas()
 {
  tarjetita.innerHTML = ""
    for (let e = 0; e < videojuegos.length; e++) 
    {
        if (videojuegos[e].existencia > 0) 
        {
            //esta agregar el onclick*/
            tarjetita.innerHTML +=  
            `<div class="container" id="lista-productos" class="tarjetita" >
            
            <div class="card-deck mb-3 text-center">
                
                <div class="card mb-4 shadow-sm">
                    <div class="card-header">
                        <h4 class="my-0 font-weight-bold">${videojuegos[e].nombreJue}</h4>
                    </div>
                    <div class="card-body">
                        <img  src="${videojuegos[e].imagenJue}" onclick="mostrarModal(${e})" class="card-img-top">
                        <h1 class="card-title pricing-card-title precio"> $${videojuegos[e].precioJue}<span class="">5000</span></h1>

                        <ul class="list-unstyled mt-3 mb-4">
                            <li>${videojuegos[e].descJue}</li>
                        </ul>
                        <a href="" class="btn btn-block btn-primary agregar-carrito" data-id="1">Comprar</a>
                    </div>
                </div>
            </div>
        </div>`

        }

        else 
        {
            tarjetita.innerHTML +=  
            `<div class="container" id="lista-productos" class="tarjetita">
            
            <div class="card-deck mb-3 text-center">
                
                <div class="card mb-4 shadow-sm">
                    <div class="card-header">
                        <h4 class="my-0 font-weight-bold">${videojuegos[e].nombreJue}</h4>
                    </div>
                    <div class="card-body">
                        <img  src="${videojuegos[e].imagenJue}" onclick="mostrarModal(${e})" class="card-img-top">
                        <h1 class="card-title pricing-card-title precio"> $${videojuegos[e].precioJue}<span class="">5000</span></h1>

                        <ul class="list-unstyled mt-3 mb-4">
                            <li>${videojuegos[e].descJue}</li>
                        </ul>
                        <a href="" class="btn btn-block btn-primary agregar-carrito" data-id="1">Comprar</a>
                    </div>
                </div>
            </div>
        </div>`
        }
    }
}








