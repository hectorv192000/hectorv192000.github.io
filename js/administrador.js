/**************************CAPTURA/GUARDADO/EXTRACCIÓN DE DATOS DEL VIDEOJUEGO DESDE STORAGE************************/
function guardarDatos(herramienta, valores_para_almacenar) 
{
    localStorage.setItem(herramienta, JSON.stringify(valores_para_almacenar))
}

function extraerDatos(herramienta) 
{
    const informacion = JSON.parse(localStorage.getItem(herramienta))
    return informacion
}

let videojuegos = extraerDatos('videojuegos') || [];
let alerta = document.getElementById('alerta')


/**************************CAPTURAR VIDEOJUEGO- MUESTRA DE MODAL************************/
const id = document.getElementById('ID_jue')
const nombre = document.getElementById('Nom_jue')
const descripcion = document.getElementById('Des_jue')
const precio = document.getElementById('Pre_jue')
const cantidadVi = document.getElementById('Cantidad_jue')
const genero = document.getElementById('Genero')
const portada = document.getElementById('Port_juego')

/*********************OCULTAR Y MOSTRAR MODAL */
function desaparecer()
{
    document.getElementById('ventanaModal').style.display='none';
}

function Agregardesaparecer()
{
    document.getElementById('ventanaModal').style.display='none';
    document.getElementById('tablaProductos').style.display='block';
}

function ver()
{
    document.getElementById('ventanaModal').style.display='block';
    document.getElementById('tablaProductos').style.display='none';
}

function verEditar()
{
    document.getElementById('ventanaEditarModal').style.display='block';
    document.getElementById('tablaProductos').style.display='none';
}

function Editardesaparecer()
{
    document.getElementById('ventanaEditarModal').style.display='none';
    document.getElementById('tablaProductos').style.display='block';
}




document.getElementById("AgregarBoton").addEventListener("click", function (event) 
{
    event.preventDefault()
    let ID_jue= id.value
    let Nom_jue = nombre.value
    let Des_jue = descripcion.value
    let Pre_jue = precio.value
    let Cantidad_jue= cantidadVi.value
    let Genero = genero.value
    let Port_juego = portada.value;

    let llevar = true



    //***************************************CÓDIGO PARA QUE EL ID DEL VIDEOJUEGO AGREGADO NO SE REPITA */
    if (ID_jue == '' || Nom_jue == '' || Des_jue == '' || Pre_jue == '' || Genero == ''|| Port_juego == '') 
    {
        alerta.classList.add('llenarCampos')
        setTimeout(() => { alerta.classList.remove('llenarCampos') }, 2500)
        llevar = false
    }

    else 
    {
        for (let e = 0; e < videojuegos.length; e++) 
        {
            if (videojuegos[e].codigo == ID_jue) 
            {
                alerta.classList.add('repetidoError')
                setTimeout(() => { alerta.classList.remove('repetidoError') }, 2500)
                llevar = false
            }
        }
    }

    if (llevar == true) 
    {
        videojuegos.push
        (
            {
            codigo: ID_jue,
            nombreJue: Nom_jue,
            descJue: Des_jue,
            precioJue: Pre_jue,
            tipoJue: Genero,
            existencia: Cantidad_jue,
            imagenJue: Port_juego
           }
        )

        alerta.classList.add('realizado')
        setTimeout(() => {
            alerta.classList.remove('repetidoError')
            window.location.reload()
        }, 1500)
    }
    guardarDatos('videojuegos', videojuegos);
})



/**************************EDICIÓN DEL ALTA DEL VIDEOJUEGO************************/
const NombreEdit = document.getElementById('Edit_nom')
const DescripcionEdit= document.getElementById('Edit_desc')
const PrecioEdit = document.getElementById('Edit_pre')
const GeneroEdit = document.getElementById('Edit_gen')
const PortadaEdit = document.getElementById('Edit_port')


document.getElementById("editarBoton").addEventListener("click", function (event) 
{
    event.preventDefault()
    let Edit_nom = NombreEdit.value
    let Edit_desc = DescripcionEdit.value
    let Edit_pre = PrecioEdit.value
    let Edit_gen = GeneroEdit.value
    let Edit_port = PortadaEdit.value

    let llevar = false

    if (Edit_nom == '' || Edit_desc == '' || Edit_pre == '' || Edit_gen == '' || Edit_port == '') 
    {
        alerta.classList.add('llenarCampos')
        setTimeout(() => { alerta.classList.remove('llenarCampos') }, 2500)
    }

    else 
    {
        for (let e = 0; e < videojuegos.length; e++) 
        {
            if (videojuegos[e].nombreJue == Edit_nom) 
            {
                videojuegos[e][Edit_pre] = Edit_gen
                llevar = true
            }
        }
        if (llevar == true) {
            alerta.classList.add('realizado')
            setTimeout(() => 
            {
                alerta.classList.remove('realizado')
                window.location.reload()
            }, 1500);
        }

        else 
        {
            alerta.classList.add('noExisteError')
            setTimeout(() => 
            { alerta.classList.remove('noExsiteError') 
        }, 2500);
        }
        guardarDatos('videojuegos', videojuegos);
    }
})




/**************************ELIMINACIÓN DEL ALTA DEL VIDEOJUEGO************************/
const eliminarVideojuego = document.getElementById('ID_jue')

document.getElementById("eliminarBoton").addEventListener("click", function (event) 
{
    event.preventDefault()
    let ID_jue = eliminarVideojuego.value
    let llevar = false

    for (let e = 0; e < videojuegos.length; e++) 
    {
        if (videojuegos[e].nombreJue == ID_jue) 
        {
            videojuegos.splice(e, 1)
            llevar = true
        }
    }

    if (llevar == false) 
    {
        alerta.classList.add('noExsiteError')
        setTimeout(() => { alerta.classList.remove('noExsiteError') }, 2500);
    }

    else 
    {
        alerta.classList.add('realizado')
        setTimeout(() => {
            alerta.classList.remove('realizado')
            window.location.reload()
        }, 1500);
    }
    guardarDatos('videojuegos', videojuegos);
})










/**************************MUESTRA DE LA CAPTURA DE DATOS DEL VIDEOJUEGO************************/
window.addEventListener('load', () => {
    const productoEditado = document.getElementById('Edit_nom')
    const productoBorrar = document.getElementById('ID_jue')

    for (let e = 0; e < videojuegos.length; e++) {
        productoEditado.innerHTML += `<option>${videojuegos[e].nombreJue}</option>`
        productoBorrar.innerHTML += `<option>${videojuegos[e].nombreJue}</option>`
    }
    Object.keys(videojuegos[0]).forEach(element => {
        GeneroEdit.innerHTML += `<option>${element}</option>`
    });

    let videojuegosMostrar = document.getElementById('mostrarVideojuegos')
    videojuegosMostrar.innerHTML = ''
    for (let e = 0; e < videojuegos.length; e++) {
        videojuegosMostrar.innerHTML += 
        `
        <td>${videojuegos[e].codigo}</td>
        <td>${videojuegos[e].nombreJue}</td>
        <td>${videojuegos[e].descJue}</td>
        <td>${videojuegos[e].precioJue}</td>
        <td>${videojuegos[e].tipoJue}</td>
        <td><img class="imgtab" src="${videojuegos[e].imagenJue}" alt="Portada del producto"></td>
        <td>
            <button class="botborr" id="eliminarBoton">Borrar</button>
            <button class="boted" id="botonEditar" onclick="verEditar()">Editar</button>
        </td>`        
    }
})
