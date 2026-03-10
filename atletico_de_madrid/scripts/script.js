document.addEventListener("DOMContentLoaded",function(){

cargar_xml();
activar_busqueda();
activar_tema();
activar_tarjeta();
activar_spotlight();

});


function cargar_xml(){

fetch("data/historia.xml")

.then(r=>r.text())

.then(datos=>{

let parser=new DOMParser();

let xml=parser.parseFromString(datos,"text/xml");

let tarjetas=xml.getElementsByTagName("tarjeta");

for(let i=0;i<tarjetas.length;i++){

let titulo=tarjetas[i].getElementsByTagName("titulo")[0].textContent;

let texto=tarjetas[i].getElementsByTagName("texto")[0].textContent;

let imagen=tarjetas[i].getElementsByTagName("imagen")[0].textContent;

crear_tarjeta(titulo,texto,imagen);

}

});

}


function crear_tarjeta(titulo,texto,imagen){

let tarjeta=document.createElement("div");

tarjeta.classList.add("tarjeta");

tarjeta.innerHTML=`

<img src="${imagen}">
<h3>${titulo}</h3>
<p>${texto}</p>

`;

document.getElementById("galeria_tarjetas").appendChild(tarjeta);

}


function activar_busqueda(){

document.getElementById("boton_buscar").addEventListener("click",function(){

let texto=document.getElementById("campo_busqueda").value.toLowerCase();

let tarjetas=document.querySelectorAll(".tarjeta");

tarjetas.forEach(t=>{

let titulo=t.querySelector("h3").textContent.toLowerCase();

if(titulo.includes(texto)){

t.style.display="flex";

}else{

t.style.display="none";

}

});

});

}


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

document.getElementById("modal_tema").style.display="flex";

}

});


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


function activar_tarjeta(){

document.getElementById("boton_tarjeta").addEventListener("click",function(){

document.getElementById("modal_tarjeta").style.display="flex";

});


document.getElementById("crear_tarjeta").addEventListener("click",function(){

let titulo=document.getElementById("titulo_tarjeta").value;

let descripcion=document.getElementById("descripcion_tarjeta").value;

let archivo=document.getElementById("imagen_tarjeta").files[0];

let lector=new FileReader();

lector.onload=function(e){

crear_tarjeta(titulo,descripcion,e.target.result);

};

lector.readAsDataURL(archivo);

document.getElementById("modal_tarjeta").style.display="none";

});

}


function activar_spotlight(){

document.addEventListener("mousemove",function(e){

document.body.style.setProperty("--x",e.clientX+"px");

document.body.style.setProperty("--y",e.clientY+"px");

});

}