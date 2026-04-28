const inputNombre = document.getElementById('nombre');
const botonsaludar = document.getElementById('saludar');
const botonColor = document.getElementById('cambiarColor');
const resultado = document.getElementById('resultado');
const contenedor = document.getElementById('contenedor');

let colorActivo = false;

botonsaludar.addEventListener('click', function() {

    const nombre = inputNombre.value.trim();

    if (nombre === '') {
        resultado.innerText = 'Por favor, ingresa un nombre.';
    } else {
        resultado.innerText = `¡Hola, ${nombre}, Eres tan gay como Adam?`;
    }
});

botonColor.addEventListener('click', function() {
    if (colorActivo) {
        contenedor.style.backgroundColor = 'white'
        resultado.innerText = 'Color original y heterosexual.'
    } else {
        contenedor.style.backgroundColor = 'pink';
        resultado.innerText = 'Color cambiado'
    }
    colorActivo = !colorActivo;
});