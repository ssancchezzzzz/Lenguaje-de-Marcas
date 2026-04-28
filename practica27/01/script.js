const btnCargar = document.getElementById('cargar');
const input = document.getElementById('buscar');
const select = document.getElementById('select');
const resultado = document.getElementById('resultado');

let listaTareas = [];

function mostrarTareas(tareas) {

    if (tareas.length === 0) {
        resultado.innerHTML = '<p>No hay tareas que mostrar.</p>';
        return;
    } else {

        resultado.innerHTML = `<h2>Lista de Tareas: ${tareas.length}</h2>`

        tareas.forEach((tarea) => {

            resultado.innerHTML += `
            <div data-task
            data-status="${tarea.estado}"
            data-priority="${tarea.prioridad}">
                <p>${tarea.nombre}</p>
                <button data-id="${tarea.id}">
                Marcar como hecha.
                </button>
            </div>
            `;
        });

        const botones = document.querySelectorAll('button[data-id]');

        botones.forEach((boton) => {

            boton.addEventListener('click', function(evento) {

                const id = parseInt(evento.target.dataset.id);
                const tarea = listaTareas.find((i) => i.id === id);

                if (tarea) {
                    tarea.estado = 'hecha';
                }
                filtrar();
            });
        });
    }
}

function filtrar() {
    const texto = input.value.toLowerCase().trim();
    const prioridad = select.value.toLowerCase();

    const tareasFiltradas = listaTareas.filter((i) => {

        const coincidenciaTexto = i.nombre.toLowerCase().includes(texto);
        const coincidenciaPrioridad = prioridad === 'todas' || i.prioridad === prioridad;

        return coincidenciaTexto && coincidenciaPrioridad;
    });

    mostrarTareas(tareasFiltradas);
};

btnCargar.addEventListener('click', function() {

    listaTareas = [
        { id: 1, nombre: 'Estudiar HTML', estado: 'pendiente', prioridad: 'alta' },
        { id: 2, nombre: 'Practicar CSS', estado: 'pendiente', prioridad: 'media' },
        { id: 3, nombre: 'Apuntes', estado: 'pendiente', prioridad: 'baja' },
        { id: 4, nombre: 'Realizar ejercicios', estado: 'pendiente', prioridad: 'alta' },
    ];
    mostrarTareas(listaTareas);
});

input.addEventListener('input', filtrar);
select.addEventListener('change', filtrar);