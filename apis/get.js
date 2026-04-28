async function obtenerUsuarios() {

    try {

        const response = await fetch('https://jsonplaceholder.typicode.com/users');

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`)
        }

        const usuarios = await response.json();
        //console.log(usuarios)

        const nombres = usuarios.map(usuario => usuario.name);
        console.log(nombres);

        return usuarios;

    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        return null;
    }
}

obtenerUsuarios();