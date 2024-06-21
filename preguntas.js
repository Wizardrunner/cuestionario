let preguntaActual = 0;
let puntosObtenidos = 0;
let PREGUNTAS = [];

async function cargarPreguntas() {
    try {
        const response = await fetch('preguntas.json');
        PREGUNTAS = await response.json();
        mostrarPregunta();
    } catch (error) {
        console.error('Error al cargar las preguntas:', error);
    }
}

function mostrarPregunta() {
    const PREGUNTA = PREGUNTAS[preguntaActual];
    document.getElementById('pregunta').innerText = PREGUNTA.pregunta;
    document.getElementById('lblOptA').innerText = PREGUNTA.optA;
    document.getElementById('lblOptB').innerText = PREGUNTA.optB;
    document.getElementById('lblOptC').innerText = PREGUNTA.optC;
    document.getElementById('lblOptD').innerText = PREGUNTA.optD;

    document.querySelectorAll('input[name="opciones"]').forEach((input) => {
        input.checked = false;
        input.disabled = false;
    });

    document.querySelectorAll('label').forEach((label) => {
        label.classList.remove('correcta', 'incorrecta');
    });

    document.getElementById('botonComprobar').classList.remove('oculto');
    document.getElementById('botonSiguiente').classList.add('oculto');
    document.getElementById('resultado').classList.add('oculto');
}

function comprobarRespuesta() {
    const SELECCIONADA = document.querySelector('input[name="opciones"]:checked');
    if (!SELECCIONADA) {
        alert("Por favor, selecciona una opción.");
        return;
    }

    const RESPUESTA_CORRECTA = PREGUNTAS[preguntaActual].correcta;
    const ID_RESPUESTA_CORRECTA = `Opt${RESPUESTA_CORRECTA.toUpperCase()}`;
    document.getElementById(ID_RESPUESTA_CORRECTA).nextElementSibling.classList.add('correcta');

    if (SELECCIONADA.value === RESPUESTA_CORRECTA) {
        puntosObtenidos += PREGUNTAS[preguntaActual].puntos;
    } else {
        SELECCIONADA.nextElementSibling.classList.add('incorrecta');
    }

    document.querySelectorAll('input[name="opciones"]').forEach((input) => {
        input.disabled = true;
    });

    document.getElementById('botonComprobar').classList.add('oculto');
    document.getElementById('botonSiguiente').classList.remove('oculto');
}

function siguientePregunta() {
    preguntaActual++;
    if (preguntaActual < PREGUNTAS.length) {
        mostrarPregunta();
    } else {
        mostrarResultado();
    }
}

function mostrarResultado() {
    const RESULTADO = document.getElementById('resultado');
    resultado.innerText = `Has obtenido ${puntosObtenidos} de 10 puntos.`;
    resultado.classList.remove('oculto');
}

document.addEventListener('DOMContentLoaded', cargarPreguntas);
