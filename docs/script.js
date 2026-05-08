let carrito = [];

function toggleCarrito() {
    document.getElementById('sidebar').classList.toggle('activo');
}

function addToCart(id, nombre, precioStr) {
    // Reemplaza coma por punto por si Django envía el precio localizado (ej. 130,00)
    let precio = parseFloat(precioStr.replace(',', '.'));
    carrito.push({ id, nombre, precio: precio });
    updateCart();
    showNotify();
}

function showNotify() {
    const n = document.getElementById('notificacion');
    n.classList.add('show');
    setTimeout(() => n.classList.remove('show'), 2000);
}

function updateCart() {
    document.getElementById('cart-count').innerText = carrito.length;
    const lista = document.getElementById('lista-carrito');
    let total = 0;

    lista.innerHTML = carrito.map((item, index) => {
        total += item.precio;
        return `
            <div class="item-carrito">
                <div>
                    <strong style="display:block;">${item.nombre}</strong>
                    <small style="color:var(--text-sec); font-weight:600;">$${item.precio.toFixed(2)}</small>
                </div>
                <button onclick="removeItem(${index})" style="color:#cc0000; background:none; border:none; cursor:pointer;">Quitar</button>
            </div>
        `;
    }).join('');

    document.getElementById('total-precio').innerText = `$${total.toFixed(2)}`;
}

function removeItem(index) {
    carrito.splice(index, 1);
    updateCart();
}

function toggleNav() {
    document.getElementById('nav-menu').classList.toggle('activo');
}

function processWhatsAppOrder() {
    if (carrito.length === 0) {
        alert("Tu bolsa está vacía.");
        return;
    }

    let texto = "¡Hola Aliorka's! Desearía hacer una compra de los siguientes productos:\n\n";
    
    // Agrupar items similares para no mandar una lista muy larga
    const conteo = {};
    carrito.forEach(item => {
        if (conteo[item.id]) {
            conteo[item.id].cantidad++;
            conteo[item.id].subtotal += item.precio;
        } else {
            conteo[item.id] = { ...item, cantidad: 1, subtotal: item.precio };
        }
    });

    Object.values(conteo).forEach(item => {
        texto += `- ${item.cantidad}x ${item.nombre} ($${item.subtotal.toFixed(2)})\n`;
    });

    const total = carrito.reduce((sum, item) => sum + item.precio, 0);
    texto += `\n*Total de la compra: $${total.toFixed(2)}*\n\n`;
    texto += "Por favor, indíquenme los métodos de pago disponibles.";

    // Número de teléfono de WhatsApp
    const telefono = "584148384691";
    // Volvemos a usar wa.me porque whatsapp:// no es soportado por todos los navegadores/dispositivos
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(texto)}`;
    
    // Redirigir en la misma pestaña para abrir la app o web
    window.location.href = url;
}
