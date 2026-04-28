const API = '../../server/api.php';

async function cargarUsuarios() {

    try {

        const response = await fetch(API);
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const usuarios = await response.json();

        const lista = document.getElementById('lista');

        lista.innerHTML = usuarios
            .map(u => `<li>${u.nombre}</li>`)
            .join('');

    } catch (error) {}
}