let artistas = [];
let votacionesAbiertas = true;


fetch("encuesta.xml")
    .then(response => response.text())
    .then(data => {

        const parser = new DOMParser();
        const xml = parser.parseFromString(data, "text/xml");

        const lista = xml.getElementsByTagName("artista");

        for (let artista of lista) {

            artistas.push({
                nombre: artista.getElementsByTagName("nombre")[0].textContent,
                canciones: [
                    artista.getElementsByTagName("cancion")[0].textContent,
                    artista.getElementsByTagName("cancion")[1].textContent
                ],
                votos: 0
            });
        }

        mostrarArtistas();
    });


function mostrarArtistas() {

    const contenedor = document.getElementById("contenedorArtistas");
    contenedor.innerHTML = "";

    artistas.forEach((artista, index) => {

        const div = document.createElement("div");
        div.className = "tarjeta";

        div.innerHTML = `
      <h2>${artista.nombre}</h2>

      <p>🎵 ${artista.canciones[0]} 🎵</p>
      <p>🎵 ${artista.canciones[1]} 🎵</p>

      <p><b>Votos:</b> ${artista.votos}</p>

      <button onclick="votar(${index})">Votar</button>
    `;

        contenedor.appendChild(div);
    });

    actualizarTotal();
}

function votar(index) {

    if (!votacionesAbiertas) return;

    artistas[index].votos++;

    mostrarArtistas();
}


function actualizarTotal() {

    let total = artistas.reduce((suma, artista) => suma + artista.votos, 0);

    document.getElementById("totalVotos").textContent = total;
}


document.getElementById("cerrarVotaciones").addEventListener("click", () => {

    votacionesAbiertas = false;

    if (artistas.length === 0) return;

    const ganador = artistas.reduce((max, a) =>
        a.votos > max.votos ? a : max
    );

    document.getElementById("ganador").textContent =
        `🏆 Ganador: ${ganador.nombre} con ${ganador.votos} votos - TRAP AWARDS ESPAÑA 2026 🏆`;
});



document.getElementById("reiniciarVotaciones").addEventListener("click", () => {

    artistas.forEach(a => a.votos = 0);

    votacionesAbiertas = true;

    document.getElementById("ganador").textContent = "";

    mostrarArtistas();
});