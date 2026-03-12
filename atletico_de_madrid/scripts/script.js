/* 
Cuando el DOM termina de cargarse completamente se ejecutan
todas las funciones principales de inicialización de la página.
Esto garantiza que todos los elementos HTML ya existan.
*/

document.addEventListener("DOMContentLoaded",function(){

    cargar_xml();        // Carga las tarjetas desde el archivo XML
    activar_busqueda();  // Activa el buscador de temporadas
    activar_tema();      // Activa el selector de temas
    activar_tarjeta();   // Activa el sistema de creación de tarjetas
    activar_spotlight(); // Activa el efecto visual del cursor

});


/* 
FUNCIÓN: cargar_xml()

Se encarga de:
1. Cargar el archivo XML donde están guardadas las tarjetas.
2. Convertir ese XML en un documento manipulable.
3. Recorrer cada tarjeta del XML.
4. Extraer titulo, texto e imagen.
5. Crear las tarjetas dinámicamente en el HTML.
*/

function cargar_xml(){

    fetch("data/historia.xml")

    .then(r=>r.text())

    .then(datos=>{

        // DOMParser permite convertir texto XML en un documento manipulable
        let parser=new DOMParser();

        let xml=parser.parseFromString(datos,"text/xml");

        // Guardamos todas las etiquetas <tarjeta>
        let tarjetas=xml.getElementsByTagName("tarjeta");

        for(let i=0;i<tarjetas.length;i++){

            let titulo=tarjetas[i].getElementsByTagName("titulo")[0].textContent;

            let texto=tarjetas[i].getElementsByTagName("texto")[0].textContent;

            let imagen=tarjetas[i].getElementsByTagName("imagen")[0].textContent;

            // Creamos una tarjeta en el HTML
            crear_tarjeta(titulo,texto,imagen);

        }

    });

}


/*
FUNCIÓN: crear_tarjeta(titulo,texto,imagen)

Esta función crea dinámicamente una tarjeta visual en el HTML.

PARÁMETROS
titulo
texto
imagen
*/

function crear_tarjeta(titulo,texto,imagen){

    let tarjeta=document.createElement("div");

    tarjeta.classList.add("tarjeta");

    tarjeta.innerHTML=`

    <img src="${imagen}">
    <h3>${titulo}</h3>
    <p>${texto}</p>

    `;

    // Se añade la tarjeta al contenedor del grid
    document.getElementById("galeria_tarjetas").appendChild(tarjeta);

}



/*
FUNCIÓN: activar_busqueda()

Activa el sistema de búsqueda de tarjetas por título.

1. El usuario escribe una temporada.
2. Se recorren todas las tarjetas.
3. Si el título contiene el texto buscado se muestra.
4. Si no coincide se oculta.
*/

function activar_busqueda(){

document.getElementById("boton_buscar").addEventListener("click",function(){

    // Texto introducido por el usuario
    let texto=document.getElementById("campo_busqueda").value.toLowerCase();

    // Selecciona todas las tarjetas existentes
    let tarjetas=document.querySelectorAll(".tarjeta");

    tarjetas.forEach(t=>{

        let titulo=t.querySelector("h3").textContent.toLowerCase();

        if(titulo.includes(texto)){

            // Si coincide se elimina la clase oculta
            t.classList.remove("oculta");

        }else{

            // Si no coincide se añade la clase oculta
            t.classList.add("oculta");

        }

    });

});

}



/*
FUNCIÓN: activar_tema()

Permite cambiar el tema visual de la web.

TIPOS DE TEMA
oscuro
claro
personalizado -> abre un modal para elegir colores

VARIABLES IMPORTANTES
tema -> guarda el valor seleccionado en el selector
*/

function activar_tema(){

document.getElementById("selector_tema").addEventListener("change",function(){

    let tema=this.value;

    if(tema==="oscuro"){

        document.body.style.background="#050505";
        document.body.style.color="white";

    }

    if(tema==="claro"){

        document.body.style.background="#f4f4f4";
        document.body.style.color="black";

    }

    if(tema==="personalizado"){

        // Se muestra el modal de personalización
        document.getElementById("modal_tema").style.display="flex";

    }

});


/*
LISTENER aplicar_tema

Se ejecuta cuando el usuario pulsa "Aplicar"
en el modal de personalización.

VARIABLES
cab -> color cabecera
main -> color fondo principal
pie -> color footer
*/

document.getElementById("aplicar_tema").addEventListener("click",function(){

    let cab=document.getElementById("color_cabecera").value;

    let main=document.getElementById("color_main").value;

    let pie=document.getElementById("color_pie").value;

    document.querySelector(".cabecera").style.background=cab;

    document.querySelector("main").style.background=main;

    document.querySelector(".pie").style.background=pie;

    document.getElementById("modal_tema").style.display="none";

});

}



/*
FUNCIÓN: activar_tarjeta()

Permite crear nuevas tarjetas dinámicamente desde un formulario.
*/

function activar_tarjeta(){

document.getElementById("boton_tarjeta").addEventListener("click",function(){

    document.getElementById("modal_tarjeta").style.display="flex";

});


document.getElementById("crear_tarjeta").addEventListener("click",function(){

    let titulo=document.getElementById("titulo_tarjeta").value;

    let descripcion=document.getElementById("descripcion_tarjeta").value;

    let archivo=document.getElementById("imagen_tarjeta").files[0];

    /*
    FileReader permite leer archivos locales del usuario.
    Aquí se usa para convertir la imagen en base64
    para poder insertarla directamente en el HTML.
    */

    let lector=new FileReader();

    lector.onload=function(e){

        crear_tarjeta(titulo,descripcion,e.target.result);

    };

    lector.readAsDataURL(archivo);

    document.getElementById("modal_tarjeta").style.display="none";

});

}