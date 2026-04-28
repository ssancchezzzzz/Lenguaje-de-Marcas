//peticion para que me devuelva todos los productos de un usuario pasandole el id
async function obtenerProductosPorUsuario(userId) {

    try {

        const params = new URLSearchParams({ userId });
        const url = `https://jsonplaceholder.typicode.com/posts?${params}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const publicaciones = await response.json();
        console.log(publicaciones);

        return publicaciones;

    } catch (error) {
        console.error('Error al obtener publicaciones:', error);
        return null;
    }
}

//obtenerProductosPorUsuario(1);

//Peticiones PUT

async function reemplazar(id, posts) {

    const params = new URLSearchParams({ id });

    const body = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(posts)
    };

    const url = `https://jsonplaceholder.typicode.com/posts/${id}`;

    const response = await fetch(url, body);

    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }

    const resultado = await response.json();
    console.log('Publicación reemplazada:', resultado);

    return resultado;

}

const posts = {
    title: 'Manolo el del bombo',
    body: 'Contenido actualizado de la publicación.',
    id: 1
};

reemplazar(1, posts)