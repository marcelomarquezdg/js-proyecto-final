//Recuperar carrito desde localStorage e implementar try/catch/fianlly

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

//Calcular total del carrito

function calcularTotal() {

    const total = carrito.reduce(
        (acumulador, guitarra) => acumulador + guitarra.precio * guitarra.cantidad,
        0
    );
    const totalCarrito = document.getElementById("total-carrito");

    totalCarrito.textContent =
        carrito.length > 0
            ? "Total: $" + total
            : "El carrito está vacío";
}

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

