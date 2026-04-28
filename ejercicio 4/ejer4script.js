const btnFiltrar = document.getElementById('filtrar');
const btnFav = document.getElementById('favoritos');
const select = document.getElementById('categoria');
const contenedorProducto = document.getElementById('productos');
const contador = document.getElementById('contador');

let totalFavoritos = 0;
let mostrarFavs = false;

fetch('ejer4.xml')
    .then(response => response.text())
    .then(data => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(data, 'text/xml');
        const productos = xml.getElementsByTagName('producto');
        for (let producto of productos) {
            const nombre = producto.getElementsByTagName('nombre')[0].textContent;
            const categoria = producto.getElementsByTagName('categoria')[0].textContent;

            contenedorProducto.innerHTML += `
                <div data-product
                data-categoria="${categoria}"
                data-favorito="false">

                    <p>${nombre}</p>
                    <button class="fav">Agregar a Favoritos</button>
                </div>
            `;

        }

    });