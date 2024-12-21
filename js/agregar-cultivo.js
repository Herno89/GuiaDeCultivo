import { addCultivo } from '../data/datosCultivo.js';

function agregarInputRiego() {
    const riegosContainer = document.getElementById('riegos-container');
    const nuevoRiegoInput = document.createElement('div');
    nuevoRiegoInput.className = 'riego-input';
    nuevoRiegoInput.innerHTML = `
        <label>
            Fecha: <input type="date" class="fecha-riego" required>
        </label>
        <label>
            <input type="checkbox" class="realizado-riego">
            Realizado
        </label>`;

    riegosContainer.appendChild(nuevoRiegoInput);
}

function manejarNuevoCultivo(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const genetica = document.getElementById('genetica').value;
    const fotoperiodo = document.getElementById('fotoperiodo').value;
    const fechaIni = document.getElementById('fechaIni').value;
    const fechaFlor = document.getElementById('fechaFlor').value;
    const img = document.getElementById('img').value;
    
    const riegosInputs = document.querySelectorAll('.riego-input');
    const riegos = Array.from(riegosInputs).map(riegoInput => {
        const fecha = riegoInput.querySelector('.fecha-riego').value;
        const realizado = riegoInput.querySelector('.realizado-riego').checked;
        return { fecha, realizado };
    });

    const nuevoCultivo = { nombre, genetica, fotoperiodo, fechaIni, fechaFlor,img, riegos };
    addCultivo(nuevoCultivo);

    alert('Cultivo agregado con éxito');
    window.location.href = '../index.html';
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('nuevo-cultivo-form').addEventListener('submit', manejarNuevoCultivo);
    document.getElementById('agregar-riego').addEventListener('click', agregarInputRiego);
    agregarInputRiego(); // Agregar un input de riego inicial
});
