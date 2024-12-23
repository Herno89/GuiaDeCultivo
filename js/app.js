const productos = {
    indoor1: {
        id: 1,
        nombre: "Carpa de cultivo 100x100x200",
        marca: "Dua Tek",
        categoria: "Invernadero",
        precio: 100.00,
        stock: 20,
        descuento: 0.1,
        img: "https://www.todomicro.com.ar/10470-large_default/carpa-indoor-de-cultivo-100-x-100-x-200.jpg"
    },
    indoor2: {
        id: 2,
        nombre: "Carpa de cultivo Hulk 120x240x200",
        marca: "Hulk",
        categoria: "Invernadero",
        precio: 180.00,
        stock: 20,
        descuento: 0.1,
        img: "https://benditaseagrowshop.com/wp-content/uploads/Carpa-de-cultivo-hulk-120x240-ma-2.jpg"
    },
    lampara1: {
        id: 3,
        nombre: "Lampara de cultivo Cogordo p1000",
        marca: "Cogordo",
        categoria: "Iluminacion",
        precio: 220.75,
        stock: 20,
        descuento: 0,
        img: "https://http2.mlstatic.com/D_NQ_NP_2X_606829-MLU75842971953_042024-F.webp"
    },
    lampara2: {
        id: 4,
        nombre: "Panel Led Cultivo Samsung Quantum Board 240w - Ir + Uv",
        marca: "Samsung",
        categoria: "Iluminacion",
        precio: 420.50,
        stock: 20,
        descuento: 0.1,
        img: "https://http2.mlstatic.com/D_NQ_NP_2X_789953-MLA74091121612_012024-F.webp"
    },
    sustrato1: {
        id: 5,
        nombre: "GrowMix / Multipro 80 L",
        marca: "Tierra fertil",
        categoria: "Sustrato",
        precio: 18.00,
        stock: 20,
        descuento: 0,
        img: "https://juanijuana.com.ar/wp-content/uploads/2021/10/Growmix-Multripro-Sustrato.png"
    },
    fertilizante1: {
        id: 6,
        nombre: "Kit Fertilizante Feeding Grow 50g+ Hybrid 125g + Booster 50g",
        marca: "Green House",
        categoria: "Fertilizantes",
        precio: 27.25,
        stock: 20,
        descuento: 0,
        img: "https://http2.mlstatic.com/D_NQ_NP_2X_603998-MLA70610186539_072023-F.webp"
    }
};

const IVA = 0.21; // 21% de IVA

document.addEventListener('DOMContentLoaded', function() {
    renderizarProductos();
    cargarCarrito();
});

function renderizarProductos() {
    const productosContainer = document.getElementById('productos');
    productosContainer.innerHTML = '';

    for (const [key, producto] of Object.entries(productos)) {
        const article = document.createElement('article');
        article.className = 'tarjeta';
        article.id = key;
        article.innerHTML = `
            <div class="tarjeta-content">
                <img src="${producto.img}" alt="${producto.nombre}">
                <h2>${producto.nombre}</h2>
                <p>Marca: ${producto.marca}</p>
                <p>Precio: $${producto.precio.toFixed(2)}</p>
                <p>Stock: <span id="stock-${key}">${producto.stock}</span></p>
                <button onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio}, '${key}')">Agregar al Carrito</button>
            </div>
        `;
        productosContainer.appendChild(article);
    }
}

function agregarAlCarrito(nombre, precio, productoKey) {
    const producto = productos[productoKey];

    if (!producto || producto.stock <= 0) {
        alert('¡Producto agotado!');
        return;
    }

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.push({ 
        nombre: producto.nombre, 
        precio: producto.precio, 
        productoKey 
    });

    producto.stock--;
    document.getElementById(`stock-${productoKey}`).textContent = producto.stock;

    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderizarCarrito();
}

function renderizarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    const subtotalCarrito = document.getElementById('subtotal-carrito');
    const descuentoCarrito = document.getElementById('descuento-carrito');
    const ivaCarrito = document.getElementById('iva-carrito');
    const totalCarrito = document.getElementById('total-carrito');
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    listaCarrito.innerHTML = '';

    let subtotal = 0;
    let descuentoTotal = 0;

    carrito.forEach((producto, index) => {
        const productoInfo = productos[producto.productoKey];

        if (!productoInfo) return;

        const li = document.createElement('li');
        const descuentoProducto = productoInfo.descuento * producto.precio;
        const precioConDescuento = producto.precio - descuentoProducto;

        li.innerHTML = `
            ${producto.nombre} - $${producto.precio.toFixed(2)}
            ${productoInfo.descuento > 0 ? 
                `<span class="descuento">(Desc. ${(productoInfo.descuento * 100).toFixed(0)}%: -$${descuentoProducto.toFixed(2)})</span>` 
                : ''}
        `;

        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.onclick = () => eliminarDelCarrito(index);

        li.appendChild(botonEliminar);
        listaCarrito.appendChild(li);

        subtotal += producto.precio;
        descuentoTotal += descuentoProducto;
    });

    const ivaTotal = (subtotal - descuentoTotal) * IVA;
    const total = subtotal - descuentoTotal + ivaTotal;

    subtotalCarrito.textContent = subtotal.toFixed(2);
    descuentoCarrito.textContent = descuentoTotal.toFixed(2);
    ivaCarrito.textContent = ivaTotal.toFixed(2);
    totalCarrito.textContent = total.toFixed(2);
}

function eliminarDelCarrito(index) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const producto = carrito[index];
    const productoInfo = productos[producto.productoKey];

    if (productoInfo) {
        productoInfo.stock++;
        document.getElementById(`stock-${producto.productoKey}`).textContent = productoInfo.stock;
    }

    carrito.splice(index, 1);

    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderizarCarrito();
}

function vaciarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.forEach(item => {
        const producto = productos[item.productoKey];
        if (producto) {
            producto.stock++;
            document.getElementById(`stock-${item.productoKey}`).textContent = producto.stock;
        }
    });

    localStorage.removeItem('carrito');
    renderizarCarrito();
}

function cargarCarrito() {
    renderizarCarrito();
}

function mostrarCheckout() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    if (carrito.length === 0) {
        alert('El carrito está vacío');
        return;
    }

    const modal = document.getElementById('checkout-modal');
    modal.style.display = 'flex';

    const subtotal = parseFloat(document.getElementById('subtotal-carrito').textContent);
    const descuento = parseFloat(document.getElementById('descuento-carrito').textContent);
    const iva = parseFloat(document.getElementById('iva-carrito').textContent);
    const total = parseFloat(document.getElementById('total-carrito').textContent);

    document.getElementById('modal-subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('modal-descuento').textContent = descuento.toFixed(2);
    document.getElementById('modal-iva').textContent = iva.toFixed(2);
    document.getElementById('modal-total').textContent = total.toFixed(2);
}

function realizarCompra() {
    alert('¡Compra realizada con éxito!');
    localStorage.removeItem('carrito');
    cerrarCheckout();
    renderizarCarrito();
}

function cerrarCheckout() {
    const modal = document.getElementById('checkout-modal');
    modal.style.display = 'none';
}