import { getCultivos } from './data/datosCultivo.js';

function mostrarCultivos() {
    const cultivosContainer = document.getElementById('cultivos-container');
    cultivosContainer.innerHTML = ''; // Limpiar el contenedor

    const cultivos = getCultivos();
    console.log(cultivos);
    

    cultivos.forEach(cultivo => {
        console.log("***************");
        
        console.log(cultivo.img);
        
        //Crea una nueva card a partir de los datos del json
        const card = document.createElement('div');
        card.className = 'tarjeta';
        //aca usa backstiks o bien template strings para generar el contenido
        card.innerHTML = `
            <div class="tarjeta-content">
                <h2>${cultivo.nombre}</h2>
                <ul>
                    <li><strong>Genética:</strong> ${cultivo.genetica}</li>
                    <li><strong>Fotoperíodo:</strong> ${cultivo.fotoperiodo}</li>
                    <li><strong>Fecha de inicio:</strong> ${cultivo.fechaIni}</li>
                    <li><strong>Fecha de floración:</strong> ${cultivo.fechaFlor}</li>
                </ul>
                <img src="${cultivo.img}" alt="">
                <h3>Riegos:</h3>
                <ul>
                    ${cultivo.riegos.map(riego => `
                        <li>
                            ${riego.fecha} - ${riego.realizado ? 'Realizado' : 'No realizado'}
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
        //crea una nueva card
        cultivosContainer.appendChild(card);
    });

    // Agregar la card de "Agregar Cultivo"
    const agregarCard = document.createElement('div');
    agregarCard.className = 'tarjeta';
    agregarCard.innerHTML = `
        <div class="tarjeta-content">
            <h2>Agregar Nuevo Cultivo</h2>
            <p>Haz clic para agregar un nuevo cultivo a tu colección.</p>
            <div class="menu-simple-menu">
                <button id="agregar-cultivo-btn">Agregar Cultivo</button>
            </div>
        </div>
    `;
    agregarCard.querySelector('#agregar-cultivo-btn').addEventListener('click', () => {
        window.location.href = './pages/agregar-cultivo.html';
    });
    cultivosContainer.appendChild(agregarCard);
}

document.addEventListener('DOMContentLoaded', mostrarCultivos);
