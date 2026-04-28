async function crearUsuario() {
    try {

        const nuevoUsuario = {
            name: 'John Doe',
            email: 'john.doe@example.com',
            username: 'johndoe'
        };

        const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoUsuario)
        };

        const response = await fetch('https://jsonplaceholder.typicode.com/users', params);

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const usuarioCreado = await response.json();
        console.log('Usuario creado:', usuarioCreado);
        console.log('ID del nuevo usuario:', usuarioCreado.name);

        return usuarioCreado;

    } catch (error) {
        console.error('Error al crear usuario:', error);
        return null;
    }
}

crearUsuario();