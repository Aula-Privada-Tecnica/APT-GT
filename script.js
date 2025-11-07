
function toggleMenu() {
    const menuBtn = document.getElementById("menuToggle");
    const menu = document.getElementById("menu");

    const isHidden = menu.classList.contains("oculto");

    if (isHidden) {
        menu.classList.remove("oculto");
        menuBtn.textContent = "✖";
    } else {
        menu.classList.add("oculto");
        menuBtn.textContent = "☰";
    }
}

function abrirModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;

    modal.classList.remove("oculto");

    const contenido = modal.querySelector(".modal-contenido, .contenido-modal");
    if (contenido) {
        contenido.style.animation = "aparecer 0.4s forwards";
    }
}

function cerrarModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;

    const contenido = modal.querySelector(".modal-contenido, .contenido-modal");
    if (contenido) {
        contenido.style.animation = "desaparecer 0.3s forwards";
        setTimeout(() => {
            modal.classList.add("oculto");

            if (id === "clubModal") {
                const pinInput = document.getElementById("pinClub");
                const resultado = document.getElementById("resultadoClub");
                if (pinInput) pinInput.value = "";
                if (resultado) resultado.innerText = "";
            }

            if (id === "formularioModal") {
                const formulario = document.getElementById("formularioRegistro");
                if (formulario) formulario.reset();
            }
        }, 300);
    } else {
        modal.classList.add("oculto");
    }
}

function validarFormulario() {
    const fechaInicio = new Date(document.getElementById("fechaInicio").value);
    const fechaMinima = new Date("2026-02-03");

    if (fechaInicio <= fechaMinima) {
        alert("La fecha de inicio debe ser posterior al 2 de febrero de 2026.");
        return false;
    }

    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const mes = document.getElementById("mesNacimiento").value.padStart(2, '0');
    const dia = document.getElementById("diaNacimiento").value.padStart(2, '0');

    const codigo = `${nombre[0] || 'X'}${apellido[0] || 'X'}-${mes}${dia}-${Math.floor(Math.random() * 900 + 100)}`;
    alert(`Formulario enviado correctamente. Tu código estudiantil es: ${codigo}`);

    cerrarModal("formularioModal");
    return false;
}

function validarPin() {
    const pinInput = document.getElementById('pinClub');
    const resultado = document.getElementById('resultadoClub');
    const pin = pinInput.value.trim();

    const aplicarEstilosBase = (color) => {
        resultado.style.color = color;
        resultado.style.padding = '2vh';
        resultado.style.backgroundColor = 'transparent';
        resultado.style.border = 'none';
        resultado.style.borderRadius = '0';
        resultado.style.textAlign = "center";
        resultado.style.display = "flex";
        resultado.style.margin = "auto";
    };

    const estudiantesClub = {
        "242632426311": { nombre: "Ana", apellido: "Rojas" },
        "132150000000": { nombre: "Juan", apellido: "Perez" },
        "110411041104": { nombre: "María", apellido: "Gómez" },
    };

    if (pin.length !== 12) {
        resultado.innerText = "❌ PIN INCORRECTO ❌";
        aplicarEstilosBase('white');
        return;
    }

    if (estudiantesClub.hasOwnProperty(pin)) {
        const estudiante = estudiantesClub[pin];
        resultado.innerText = `¡Bienvenido/a ${estudiante.nombre} ${estudiante.apellido} tu acceso ha sido admitido.`;
        aplicarEstilosBase('white'); 

        setTimeout(() => {
            cerrarModal('clubModal'); 
        }, 1500); 

    } else {
        resultado.innerText = "❌ VERFIQUE SU PIN ❌";
        aplicarEstilosBase('white');
    }
}

function configurarModal7Pilares() {
    const abrirBtn = document.getElementById('abrirBloquesBtn');
    const cerrarBtn = document.getElementById('cerrarBloquesBtn');
    const bloquesModal = document.getElementById('bloquesAlternadosModal');

    if (abrirBtn) {
        abrirBtn.addEventListener('click', function() {
            if(bloquesModal) bloquesModal.classList.remove('oculto'); 
        });
    }

    if (cerrarBtn) {
        cerrarBtn.addEventListener('click', function() {
            if(bloquesModal) bloquesModal.classList.add('oculto'); 
        });
    }
}

function animarYBuscar() {
    const boton = document.getElementById('botonBing');
    const formulario = document.getElementById('bingForm');
    const input = formulario.querySelector('.input-busqueda');

    const FORM_ACTION = "https://www.bing.com/search?safesearch=strict";

    const palabrasProhibidas = [
        "porno", "sexo", "desnudo", "violencia", "gore", "armas", "suicidio", "porn", "p0rn", "s3x", "nude", "gay", "anal", "porno gay", "penes", "pene", "vagina", "chimar", "cojer", "masturbar", "chupar", "mamar", "oral", "gime", "cojer", "chimando", "penetrando", "culo", "pupusa", "semen", "cemen", "porno latino", "porno latino gay", "gai"
    ];

    const textoBusqueda = input.value.trim().toLowerCase();

    if (textoBusqueda === "") {
        input.focus();
        return;
    }
    
    for (const palabra of palabrasProhibidas) {
        if (textoBusqueda.includes(palabra)) {
            alert("❌ Búsqueda Bloqueada: El término ingresado no está permitido por nuestras políticas de seguridad. Mantengamos un ambiente sano ❌");
            input.value = "";
            input.focus();
            return;
        }
    }

    boton.classList.add('elevando');

    setTimeout(() => {
        boton.classList.remove('elevando');
        
        formulario.action = FORM_ACTION;
        formulario.method = "get";
        formulario.submit();

    }, 3000);
}


function limpiarBuscador() {
    const inputBuscador = document.querySelector('.input-busqueda');
    if (inputBuscador) {
        inputBuscador.value = "";
    }
}


document.addEventListener('DOMContentLoaded', function() {
    
    const anuncio = document.getElementById('anuncioModal');
    const botonCerrar = document.getElementById('cerrarAnuncio');
    
    if (anuncio) {
        anuncio.style.display = 'flex';
    }

    if (botonCerrar) {
        botonCerrar.addEventListener('click', function() {
            if (anuncio) {
                anuncio.style.display = 'none';
            }
        });
    }

    configurarModal7Pilares();
    
    limpiarBuscador();

    window.addEventListener('pageshow', function(event) {
        if (event.persisted) {
            limpiarBuscador();
        }
    });
});

document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});


document.addEventListener('keydown', function(e) {
    if (e.key === 'F12') {
        e.preventDefault();
    }

    if ((e.ctrlKey || e.metaKey) && (e.shiftKey && e.key === 'I')) {
        e.preventDefault();
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
        e.preventDefault();
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'u') {
        e.preventDefault();
    }
});


