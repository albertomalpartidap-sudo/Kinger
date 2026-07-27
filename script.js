// ============================================================
// Kinger — lógica de la página de chat (chat.html)
// ============================================================
// Maneja SOLO la interfaz: mostrar mensajes, el estado vacío,
// el botón "Nuevo chat" y el indicador de "escribiendo".
//
// La conexión real con el backend (FastAPI + GLM-4) se agrega
// en la función getKingerResponse(), más abajo. Por ahora
// responde con un mensaje simulado para que puedas probar
// la interfaz sin tener el backend corriendo.
// ============================================================

const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatMessages = document.getElementById('chatMessages');
const typingIndicator = document.getElementById('typingIndicator');
const emptyState = document.getElementById('emptyState');
const chatMainInner = document.getElementById('chatMainInner');
const newChatBtn = document.getElementById('newChatBtn');

function showEmptyState() {
  if (emptyState) emptyState.hidden = false;
  chatMessages.innerHTML = '';
}

function hideEmptyStateIfNeeded() {
  if (emptyState && !emptyState.hidden) emptyState.hidden = true;
}

function addMessage(text, sender) {
  hideEmptyStateIfNeeded();

  const bubble = document.createElement('div');
  bubble.className = sender === 'user' ? 'msg msg-user' : 'msg msg-bot';

  const p = document.createElement('p');
  p.textContent = text;
  bubble.appendChild(p);

  chatMessages.appendChild(bubble);
  chatMainInner.scrollTop = chatMainInner.scrollHeight;
}

function setTyping(isTyping) {
  typingIndicator.hidden = !isTyping;
  if (isTyping) chatMainInner.scrollTop = chatMainInner.scrollHeight;
}

// ------------------------------------------------------------
// 🔌 AQUÍ CONECTAS TU BACKEND (FastAPI + GLM-4)
// ------------------------------------------------------------
// Reemplaza el contenido de esta función por una llamada real
// a tu API, por ejemplo:
//
// async function getKingerResponse(message) {
//   const res = await fetch("https://TU-BACKEND-URL/chat", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ message })
//   });
//   const data = await res.json();
//   return data.reply;
// }
//
// Mientras tanto, esta versión simula una respuesta para que
// puedas probar la interfaz sin el backend corriendo:
async function getKingerResponse(message) {
  await new Promise((resolve) => setTimeout(resolve, 900));
  return 'Todavía no estoy conectado a mi backend real — esta es una respuesta de prueba.';
}
// ------------------------------------------------------------

chatForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const text = chatInput.value.trim();
  if (!text) return;

  addMessage(text, 'user');
  chatInput.value = '';
  chatInput.focus();

  setTyping(true);
  try {
    const reply = await getKingerResponse(text);
    setTyping(false);
    addMessage(reply, 'bot');
  } catch (err) {
    setTyping(false);
    addMessage('Algo salió mal al contactar a Kinger. Intenta de nuevo.', 'bot');
    console.error('Kinger chat error:', err);
  }
});

if (newChatBtn) {
  newChatBtn.addEventListener('click', () => {
    showEmptyState();
    chatInput.value = '';
    chatInput.focus();
  });
}
