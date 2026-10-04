/* =========================================================
   AMAZONÍA TRAVEL
   Archivo principal de JavaScript
========================================================= */


/* ---------------------------------------------------------
   1. Detectar desde qué carpeta se está ejecutando la página
--------------------------------------------------------- */

const estaEnPaginas = window.location.pathname.includes("/paginas/");

const raiz = estaEnPaginas ? "../" : "";


/* ---------------------------------------------------------
   2. Actualizar automáticamente el año del footer
--------------------------------------------------------- */

const anioActual = new Date().getFullYear();

const anioInicio = document.getElementById("anio-actual");

if (anioInicio) {
    anioInicio.textContent = anioActual;
}

document.querySelectorAll(".anio-actual").forEach(elemento => {
    elemento.textContent = anioActual;
});


/* ---------------------------------------------------------
   3. Cargar información general de la empresa
--------------------------------------------------------- */

fetch(`${raiz}datos/empresa.json`)
    .then(respuesta => {

        if (!respuesta.ok) {
            throw new Error("No se pudo cargar empresa.json");
        }

        return respuesta.json();
    })

    .then(empresa => {

        /* Página Nosotros */

        const mision = document.getElementById("mision-empresa");
        const vision = document.getElementById("vision-empresa");
        const ubicacion = document.getElementById("ubicacion-empresa");
        const telefono = document.getElementById("telefono-empresa");
        const correo = document.getElementById("correo-empresa");


        if (mision) {
            mision.textContent = empresa.mision;
        }

        if (vision) {
            vision.textContent = empresa.vision;
        }

        if (ubicacion) {
            ubicacion.textContent = empresa.ubicacion;
        }

        if (telefono) {
            telefono.textContent = empresa.telefono;
        }

        if (correo) {
            correo.textContent = empresa.correo;
        }


        /* Página Contacto */

        const contactoUbicacion =
            document.getElementById("contacto-ubicacion");

        const contactoTelefono =
            document.getElementById("contacto-telefono");

        const contactoCorreo =
            document.getElementById("contacto-correo");


        if (contactoUbicacion) {
            contactoUbicacion.textContent = empresa.ubicacion;
        }

        if (contactoTelefono) {
            contactoTelefono.textContent = empresa.telefono;
        }

        if (contactoCorreo) {
            contactoCorreo.textContent = empresa.correo;
        }

    })

    .catch(error => {
        console.error("Error al cargar los datos de la empresa:", error);
    });


/* ---------------------------------------------------------
   4. Cargar productos / tours
--------------------------------------------------------- */

fetch(`${raiz}datos/productos.json`)
    .then(respuesta => {

        if (!respuesta.ok) {
            throw new Error("No se pudo cargar productos.json");
        }

        return respuesta.json();
    })

    .then(productos => {

        mostrarDestinosDestacados(productos);

        mostrarTodosLosServicios(productos);

    })

    .catch(error => {
        console.error("Error al cargar los productos:", error);
    });


/* =========================================================
   5. Mostrar destinos destacados en INDEX
========================================================= */

function mostrarDestinosDestacados(productos) {

    const contenedor =
        document.getElementById("destinos-container");


    /* Si no estamos en index.html, este elemento no existe */
    if (!contenedor) {
        return;
    }


    const destacados = productos.filter(producto => {
        return producto.destacado === true;
    });


    destacados.forEach(producto => {

        const tarjeta = document.createElement("article");

        tarjeta.classList.add("tarjeta-destino");


        tarjeta.innerHTML = `
            <div class="tarjeta-imagen">
                <img
                    src="${producto.imagen}"
                    alt="${producto.nombre}">
            </div>

            <div class="tarjeta-contenido">

                <span class="tarjeta-lugar">
                    📍 ${producto.destino}
                </span>

                <h3>
                    ${producto.nombre}
                </h3>

                <p>
                    ${producto.descripcion}
                </p>

                <div class="tarjeta-info">

                    <span>
                        🕒 ${producto.duracion}
                    </span>

                    <span>
                        🥾 ${producto.dificultad}
                    </span>

                </div>

                <div class="tarjeta-final">

                    <strong>
                        $${producto.precio}
                    </strong>

                    <a
                        href="paginas/contacto.html"
                        class="enlace-tarjeta">
                        Consultar →
                    </a>

                </div>

            </div>
        `;


        contenedor.appendChild(tarjeta);

    });

}


/* =========================================================
   6. Mostrar TODOS los servicios en servicios.html
========================================================= */

function mostrarTodosLosServicios(productos) {

    const contenedor =
        document.getElementById("servicios-container");


    /* Si no estamos en servicios.html, no hacemos nada */
    if (!contenedor) {
        return;
    }


    productos.forEach(producto => {

        const tarjeta = document.createElement("article");

        tarjeta.classList.add("servicio-card");


        tarjeta.innerHTML = `
            <div class="servicio-imagen">

                <img
                    src="${producto.imagen}"
                    alt="${producto.nombre}">

                <span class="servicio-etiqueta">
                    ${producto.destino}
                </span>

            </div>


            <div class="servicio-contenido">

                <h3>
                    ${producto.nombre}
                </h3>

                <p>
                    ${producto.descripcion}
                </p>


                <div class="servicio-detalles">

                    <div>
                        <span>Duración</span>
                        <strong>
                            ${producto.duracion}
                        </strong>
                    </div>

                    <div>
                        <span>Dificultad</span>
                        <strong>
                            ${producto.dificultad}
                        </strong>
                    </div>

                </div>


                <div class="servicio-footer">

                    <div class="servicio-precio">

                        <small>
                            Desde
                        </small>

                        <strong>
                            $${producto.precio}
                        </strong>

                    </div>


                    <a
                        href="contacto.html"
                        class="boton boton-pequeno">
                        Consultar
                    </a>

                </div>

            </div>
        `;


        contenedor.appendChild(tarjeta);

    });

}


/* =========================================================
   7. Formulario de contacto
========================================================= */

const formulario =
    document.getElementById("formulario-contacto");

const mensajeFormulario =
    document.getElementById("mensaje-formulario");


if (formulario) {

    formulario.addEventListener("submit", function(evento) {

        /*
            Evita que la página se recargue al enviar
            el formulario.
        */
        evento.preventDefault();


        const nombre =
            document.getElementById("nombre").value.trim();

        const correo =
            document.getElementById("correo").value.trim();

        const servicio =
            document.getElementById("servicio").value;


        /*
            Validación adicional sencilla
        */
        if (nombre === "" || correo === "" || servicio === "") {

            mensajeFormulario.textContent =
                "Por favor completa los campos obligatorios.";

            mensajeFormulario.className =
                "mensaje-formulario mensaje-error";

            return;
        }


        /*
            Mostrar confirmación
        */

        mensajeFormulario.textContent =
            `¡Gracias, ${nombre}! Tu consulta sobre ${servicio} fue registrada correctamente.`;

        mensajeFormulario.className =
            "mensaje-formulario mensaje-exito";


        /*
            Limpiar formulario después del envío
        */

        formulario.reset();

    });

}