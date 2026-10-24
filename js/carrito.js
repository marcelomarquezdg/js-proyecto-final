//Recuperar carrito desde localStorage e implementar try/catch/finally

function obtenerCarritoDelStorage() {
    try {
        const carritoGuardado = localStorage.getItem("carrito");

        return carritoGuardado
            ? JSON.parse(carritoGuardado)
            : [];

    } catch (error) {
        console.error("No se pudieron obtener los datos del carrito");

        return [];

    } finally {
        console.log("Fin del bloque try-catch");
    }
}

const carrito = obtenerCarritoDelStorage();

const inputCodigoDescuento = document.getElementById("codigo-descuento");

const btnAplicarDescuento = document.getElementById("aplicar-descuento");

let descuentoAplicado = localStorage.getItem("descuentoAplicado") === "true";

//Calcular total del carrito

function calcularTotal() {

    const subtotal = carrito.reduce(
        (acumulador, guitarra) => acumulador + guitarra.precio * guitarra.cantidad,
        0
    );

    const total = descuentoAplicado
        ? subtotal * 0.90
        : subtotal;

    const totalCarrito = document.getElementById("total-carrito");

    if (carrito.length > 0) {
        totalCarrito.innerHTML = descuentoAplicado
            ? `
            Subtotal: $${subtotal}<br>
            Descuento: 10%<br>
            <strong>Total: $${total}</strong>
        `
            : `Total: $${total}`;

    } else {
        totalCarrito.textContent = "El carrito está vacío";
    }
}

btnAplicarDescuento.addEventListener("click", () => {

    const codigoIngresado = inputCodigoDescuento.value.trim().toUpperCase();

    if (codigoIngresado === "GUITARRA10") {
        descuentoAplicado = true;
        localStorage.setItem("descuentoAplicado", "true");

        calcularTotal();

        Swal.fire({
            title: "Descuento aplicado",
            text: "Se aplicó un 10% de descuento a tu compra.",
            icon: "success",
            confirmButtonColor: "#2e7d32"
        });

    } else {
        descuentoAplicado = false;
        localStorage.setItem("descuentoAplicado", "false");

        calcularTotal();

        Swal.fire({
            title: "Código inválido",
            text: "El código ingresado no es válido.",
            icon: "error",
            confirmButtonColor: "#d33"
        });
    }
});

// Mostrar carrito en el HTML

function imprimirCarritoEnHTML(lista) {

    const contenedorCarrito = document.getElementById("contenedor-carrito");

    contenedorCarrito.innerHTML = "";

    lista.forEach(guitarra => {

        const { marca, modelo, anio, precio, cantidad } = guitarra;

        const card = document.createElement("article");

        card.classList.add("card");

        card.innerHTML = `
            <p>Marca: ${marca}</p>
            <h3>Modelo: ${modelo}</h3>
            <p>Año: ${anio}</p>
            <p>Precio: $${precio}</p>
            <p>Cantidad: ${cantidad}</p>
            <button class="btn-restar">-</button>
            <button class="btn-sumar">+</button>
            <button class="card-boton">
                Eliminar del carrito
            </button>
        `;

        contenedorCarrito.appendChild(card);

        const btnSumar = card.querySelector(".btn-sumar");

        btnSumar.addEventListener("click", () => {
            guitarra.cantidad++;

            localStorage.setItem("carrito", JSON.stringify(carrito));

            imprimirCarritoEnHTML(carrito);
            calcularTotal();
        });

        const btnRestar = card.querySelector(".btn-restar");

        btnRestar.addEventListener("click", () => {

            if (guitarra.cantidad > 1) {
                guitarra.cantidad--;
            } else {
                const indice = carrito.indexOf(guitarra);
                carrito.splice(indice, 1);
            }

            localStorage.setItem("carrito", JSON.stringify(carrito));

            imprimirCarritoEnHTML(carrito);
            calcularTotal();
        });

        const btnEliminar = card.querySelector(".card-boton");

        btnEliminar.addEventListener("click", () => {

            const indice = carrito.indexOf(guitarra);

            carrito.splice(indice, 1);

            localStorage.setItem("carrito", JSON.stringify(carrito));

            imprimirCarritoEnHTML(carrito);
            calcularTotal();
        });
    });
}

// Mostrar carrito al cargar la página

imprimirCarritoEnHTML(carrito);
calcularTotal();

//* Finalizar compra*

const btnFinalizarCompra = document.getElementById("finalizar-compra");

btnFinalizarCompra.addEventListener("click", () => {

    if (carrito.length === 0) {
        Swal.fire({
            title: "Tu carrito está vacío",
            text: "Agregá productos antes de finalizar la compra.",
            icon: "info",
            confirmButtonColor: "#2e7d32"
        });

        return;
    }

    const subtotal = carrito.reduce(
        (acumulador, guitarra) => acumulador + guitarra.precio * guitarra.cantidad,
        0
    );

    const total = descuentoAplicado
        ? subtotal * 0.90
        : subtotal;

    Swal.fire({
        title: "¿Confirmar compra?",
        text: "El total de tu compra es $" + total,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#2e7d32",
        cancelButtonColor: "#333",
        confirmButtonText: "Sí, comprar",
        cancelButtonText: "Seguir comprando",
        reverseButtons: true
    }).then((result) => {

        if (result.isConfirmed) {
            carrito.length = 0;

            descuentoAplicado = false;
            localStorage.setItem("descuentoAplicado", "false");

            localStorage.setItem("carrito", JSON.stringify(carrito));

            imprimirCarritoEnHTML(carrito);
            calcularTotal();

            Swal.fire({
                title: "Compra realizada",
                text: "Tu compra se completó correctamente.",
                icon: "success",
                confirmButtonColor: "#2e7d32"
            });
        }
    });
});

//Vaciar carrito

const btnVaciarCarrito = document.getElementById("vaciar-carrito");

btnVaciarCarrito.addEventListener("click", () => {
    Swal.fire({
        title: "Estás a punto de vaciar tu carrito",
        text: "Se eliminarán todos los productos agregados. Esta acción no se puede deshacer.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#007c30",
        confirmButtonText: "Sí, vaciar carrito",
        cancelButtonText: "Seguir comprando",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            carrito.length = 0;

            descuentoAplicado = false;
            localStorage.setItem("descuentoAplicado", "false");

            localStorage.setItem("carrito", JSON.stringify(carrito));

            imprimirCarritoEnHTML(carrito);
            calcularTotal();

            Swal.fire({
                title: "Carrito vaciado",
                text: "Se eliminaron todos los productos del carrito.",
                icon: "success",
                confirmButtonColor: "#2e7d32"
            });
        }
    });
});

