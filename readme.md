# Tienda de guitarras

Simulador de una tienda de guitarras desarrollado en JavaScript.

## Funcionalidades

- Visualización de guitarras disponibles con imagen, precio y stock
- Búsqueda de guitarras por marca o modelo
- Carrito de compras con imágenes de los productos
- Agregar y eliminar productos del carrito
- Modificar cantidades con botones de suma y resta
- Cálculo dinámico del total de la compra
- Código promocional GUITARRA10 con 10% de descuento
- Persistencia del descuento mediante localStorage
- Confirmación y finalización de compra
- Vaciar carrito
- Gestión de inventario
- Alta y eliminación de guitarras
- Imagen por defecto para las guitarras agregadas desde Gestión
- Persistencia de inventario y carrito con localStorage
- Carga inicial del inventario desde un archivo JSON local mediante fetch
- Uso de async/await
- Manejo de errores con try-catch-finally
- Manipulación dinámica del DOM
- Uso de métodos de arrays como forEach, filter, find y reduce
- Notificaciones con Toastify
- Confirmaciones y mensajes con SweetAlert2
- Popup promocional mediante setTimeout

## Páginas

- `index.html`: tienda principal
- `pages/carrito.html`: carrito de compras
- `pages/gestion.html`: gestión del inventario

## Datos

-El inventario inicial se encuentra en `data/guitarras.json`

-Las imágenes de los productos se encuentran en `assets/img/guitarras/`

-Al cargar la aplicación por primera vez, los datos del inventario se obtienen mediante `fetch`

-El inventario, el carrito y el estado del código de descuento se guardan en `localStorage`

-Las guitarras agregadas desde Gestión utilizan una imagen por defecto

-Los cambios realizados desde Gestión se mantienen guardados en el navegador mediante `localStorage`


## Cómo ejecutar el proyecto

-Se recomienda utilizar un servidor local, por ejemplo Live Server desde Visual Studio Code, ya que el proyecto utiliza fetch para cargar el archivo JSON local

-Al iniciar la aplicación por primera vez, el inventario se carga desde data/guitarras.json

-Desde la página Gestión se pueden agregar nuevas guitarras al inventario

-Como ejemplo de prueba, se puede cargar una Takamine GY93E, ya que las guitarras agregadas desde Gestión utilizan por defecto una imagen de ese modelo

-Los cambios realizados en el inventario, el carrito y el código de descuento se guardan en localStorage