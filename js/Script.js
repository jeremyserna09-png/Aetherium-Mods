// 🧠 Base de conocimiento (Adaptada de Python a JS)
const baseConocimiento = {
    "Instalación": {
        "¿Cómo instalar un mod? ❓": "Generalmente, debes encontrar el mod, descargarlo y mover el archivo (a menudo un .jar o un archivo comprimido) a la carpeta de 'mods' de tu juego o launcher de Aetherium.",
        "¿Qué es un gestor de mods y cuál debería usar? 🧐": "Un gestor de mods es una herramienta que facilita la instalación, actualización y gestión de tus mods. Para Aetherium, podrías considerar el gestor oficial o herramientas populares como **CurseForge** o **Modrinth**.",
        "¿Qué es un archivo Jar y cómo lo abro? 📂": "Un archivo **.jar** es un formato de archivo comprimido muy común para los mods de juegos basados en Java. No necesitas 'abrirlo' directamente; simplemente colócalo en tu carpeta de mods para que el juego o el gestor de mods lo cargue.",
        "¿Cómo puedo solucionar un error de instalación?": "Primero, verifica que la **versión del mod** sea compatible con la versión de tu juego. Asegúrate de tener las dependencias necesarias y revisa los logs del juego para ver el error específico."
    },
    "Creación": {
        "¿Cómo puedo crear mi propio mod? 🛠": "Necesitas aprender el lenguaje de programación del juego (a menudo **Java**), usar un entorno de desarrollo integrado (**IDE**) y estudiar la **API de modding** del juego (como Forge, Fabric o la API específica de Aetherium).",
        "¿Para que juegos puedo hacer mods? 🎮": "Puedes hacer mods para muchos juegos que tienen una comunidad activa y herramientas de modding, incluyendo **Minecraft**, **Skyrim**, **Stardew Valley** y, por supuesto, **Aetherium**."
    },
    "Comunidad": {
        "¿Como puedo mostrarle mis mods a la comunidad? 🤓": "Sube tu mod a plataformas populares como **CurseForge**, **Modrinth**, o el foro oficial de la comunidad de Aetherium. Incluye una buena descripción y capturas de pantalla.",
        "¿Cómo puedo descargar mods de la comunidad? ✔": "Visita plataformas de distribución como **CurseForge** o **Modrinth**, o el sitio web oficial de Aetherium. Busca mods, revisa su compatibilidad y descárgalos.",
        "¿Qué cosas no puedo mostrar en la comunidad? 🤐": "Generalmente, no está permitido compartir contenido que infrinja derechos de autor, material ilegal, contenido ofensivo o **información personal** de otros usuarios sin su consentimiento. Consulta las reglas de la comunidad."
    }
};

// 🤝 Respuestas rápidas
const respuestasSaludo = [
    "¡Hola! 😊 Soy Roni-Bot. ¿En qué te puedo ayudar?",
    "¡Buenos días! 🌟 ¿Qué información necesita?",
    "¡Hola! 👋 ¿Necesitas ayuda?"
];

const respuestasDespedida = [
    "¡Hasta pronto! 👋.",
    "¡Nos vemos! 😊",
    "¡Adiós! 🌟 Que tengas un gran día."
];

const respuestasAgradecimiento = [
    "¡Un gusto! 🤗 ¿Necesitas algo mas?",
    "Un placer! 😼." ,

];

// ------------------- Funciones del Chatbot -------------------

function limpiarTexto(texto) {
    return texto.toLowerCase().replace(/[^\w\s¿?áéíóúñ]/g, '').trim().replace(/\s+/g, ' ');
}

function detectarSaludo(preguntaLimpia) {
    const saludos = ['hola', 'buenos dias', 'saludos', 'que tal', 'hey'];
    return saludos.some(saludo => preguntaLimpia.includes(saludo));
}

function detectarDespedida(preguntaLimpia) {
    const despedidas = ['adios', 'hasta luego', 'nos vemos', 'chau', 'bye', 'salir', 'terminar'];
    return despedidas.some(despedida => preguntaLimpia.includes(despedida));
}

function detectarAgradecimiento(preguntaLimpia) {
    const agradecimiento = ['gracias', 'muchas gracias', 'te lo agradezco'];
    return agradecimiento.some(agradecimiento => preguntaLimpia.includes(agradecimiento));
}

// Lógica simplificada de coincidencia de palabras clave (sustituyendo la lógica de similitud de Python)
function encontrarMejorRespuesta(preguntaUsuario) {
    const preguntaLimpia = limpiarTexto(preguntaUsuario);

    if (detectarSaludo(preguntaLimpia)) {
        return respuestasSaludo[Math.floor(Math.random() * respuestasSaludo.length)];
    }
    if (detectarDespedida(preguntaLimpia)) {
        return respuestasDespedida[Math.floor(Math.random() * respuestasDespedida.length)];
    }
    if (detectarAgradecimiento(preguntaLimpia)) {
        return respuestasAgradecimiento[Math.floor(Math.random() * respuestasAgradecimiento.length)];
    }

    let mejorPuntuacion = 0;
    let mejorRespuesta = "";
    let materiaEncontrada = "";

    const palabrasUsuario = new Set(preguntaLimpia.split(' '));

    for (const materia in baseConocimiento) {
        for (const preguntaBase in baseConocimiento[materia]) {
            const preguntaBaseLimpia = limpiarTexto(preguntaBase);
            const palabrasBase = preguntaBaseLimpia.split(' ');
            
            // Calculo simple de la puntuación (palabras clave compartidas)
            let puntuacion = 0;
            palabrasBase.forEach(palabra => {
                if (palabrasUsuario.has(palabra) && palabra.length > 2) {
                    puntuacion++;
                }
            });

            // Normalización simple: Puntuación / Número de palabras clave en la pregunta base
            const puntuacionNormalizada = puntuacion / palabrasBase.filter(p => p.length > 2).length;

            if (puntuacionNormalizada > mejorPuntuacion) {
                mejorPuntuacion = puntuacionNormalizada;
                mejorRespuesta = baseConocimiento[materia][preguntaBase];
                materiaEncontrada = materia;
            }
        }
    }

    // Umbral de coincidencia (ajustado para el método simple de JS)
    if (mejorPuntuacion >= 0.3) { 
        // Capitaliza la primera letra de la materia
        const materiaCapitalizada = materiaEncontrada.charAt(0).toUpperCase() + materiaEncontrada.slice(1);
        return `📚 [${materiaCapitalizada}] ${mejorRespuesta}`;
    } else {
        return "🤔 No estoy seguro, ¿puedes reformular la pregunta o intenta preguntarme sobre la comunidad de Aetherium y mods?";
    }
}

// ------------------- Interfaz y Eventos (DOM) -------------------

const chatContainer = document.getElementById('chatbot-container');
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const toggleBtn = document.getElementById('chatbot-toggle-btn');
const closeBtn = document.getElementById('chat-close-btn');

function addMessage(text, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', `${sender}-message`);
    messageElement.innerHTML = text; // Usamos innerHTML para permitir negritas (Markdown)
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll al último mensaje
}

function handleSend() {
    const userText = userInput.value.trim();
    if (userText === '') return;

    // 1. Mostrar mensaje del usuario
    addMessage(userText, 'user');
    userInput.value = '';

    // 2. Obtener respuesta del bot
    const botResponse = encontrarMejorRespuesta(userText);
    
    // 3. Mostrar mensaje del bot después de un pequeño retraso (simula "pensar")
    setTimeout(() => {
        addMessage(botResponse, 'bot');
    }, 500);
}

// Evento para el botón de Enviar
sendBtn.addEventListener('click', handleSend);

// Evento para la tecla Enter en el input
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSend();
    }
});

// Evento para el botón flotante (abrir/cerrar)
toggleBtn.addEventListener('click', () => {
    chatContainer.classList.toggle('hidden');
    if (!chatContainer.classList.contains('hidden')) {
        userInput.focus();
        // Mensaje de bienvenida si se abre por primera vez
        if (chatMessages.children.length === 0) {
            addMessage(respuestasSaludo[0], 'bot');
        }
    }
});

// Evento para el botón de cerrar (x)
closeBtn.addEventListener('click', () => {
    chatContainer.classList.add('hidden');
});

