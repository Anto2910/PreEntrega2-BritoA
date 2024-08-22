// Array de productos
const productos = [
    { id: 1, nombre: "CLÁSICAS", precio: 800.00, imagen: "img/imagen1.png" },
    { id: 2, nombre: "PIZZA", precio: 850.00, imagen: "img/imagen2.png" },
    { id: 3, nombre: "QUESO", precio: 890.00, imagen: "img/imagen3.png" },
    { id: 4, nombre: "SALAME", precio: 850.00, imagen: "img/imagen4.png" },
    { id: 5, nombre: "JAMÓN", precio: 850.00, imagen: "img/imagen5.png" },
    { id: 6, nombre: "CHEDDAR", precio: 890.00, imagen: "img/imagen6.png" },
    { id: 7, nombre: "CEBOLLA", precio: 850.00, imagen: "img/imagen7.png" },
    { id: 8, nombre: "BARBACOA", precio: 850.00, imagen: "img/imagen8.png" },
    { id: 9, nombre: "AJO & OLIVA", precio: 900, imagen: "img/imagen9.png" }
];

let carrito = [];

// Función para mostrar productos en la página
function mostrarProductos() {
    const listaProductos = document.getElementById('lista-productos');
    productos.forEach(producto => {
        const div = document.createElement('div');
        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio.toFixed(2)}</p>
            <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
        `;
        listaProductos.appendChild(div);
    });
}

// Función para agregar productos al carrito
function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    carrito.push(producto);
    actualizarCarrito();
}

// Función para actualizar el carrito
function actualizarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    const totalCarrito = document.getElementById('total-carrito');
    listaCarrito.innerHTML = '';
    let total = 0;

    carrito.forEach((producto, index) => {
        const li = document.createElement('li');
        li.textContent = `${producto.nombre} - $${producto.precio.toFixed(2)}`;
        listaCarrito.appendChild(li);
        total += producto.precio;
    });

    totalCarrito.textContent = total.toFixed(2);
}

// Función para mostrar el modal del carrito
function mostrarCarrito() {
    document.getElementById('carrito-modal').style.display = 'flex';
}

// Función para cerrar todos los modales
function cerrarModales() {
    const modales = document.querySelectorAll('.modal');
    modales.forEach(modal => modal.style.display = 'none');
}

// Función para mostrar el modal de pago
function mostrarPagoModal() {
    document.getElementById('pago-modal').style.display = 'flex';
}

// Función para confirmar el pago
function confirmarPago() {
    const metodoPago = document.getElementById('medio-pago').value;
    const mensajeExito = document.getElementById('mensaje-exito');
    mensajeExito.textContent = `¡Pedido realizado con éxito! Método de pago seleccionado: ${metodoPago}`;
    mensajeExito.style.display = 'block';
    document.getElementById('pago-modal').style.display = 'none';
    
    // Mostrar el modal de éxito
    mostrarModalExito();
    
    // Limpiar el carrito después de un breve retraso
    setTimeout(() => {
        cerrarModales();
        carrito = [];
        actualizarCarrito();
    }, 2000); // El modal de éxito se mostrará durante 2 segundos
}

// Función para mostrar el modal de éxito
function mostrarModalExito() {
    document.getElementById('exito-modal').style.display = 'flex';
}

// Event listeners
document.getElementById('carrito').addEventListener('click', mostrarCarrito);
document.querySelectorAll('.close').forEach(element => {
    element.addEventListener('click', cerrarModales);
});
document.getElementById('confirmar-pago').addEventListener('click', confirmarPago);
document.getElementById('comprar').addEventListener('click', mostrarPagoModal);

// Mostrar productos al cargar la página
document.addEventListener('DOMContentLoaded', mostrarProductos);
