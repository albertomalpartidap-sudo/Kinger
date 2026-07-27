// ============================================================
// Kinger — formulario de la página de asociados (asociados.html)
// ============================================================
// Por ahora solo simula el envío. Cuando tengas dónde recibir
// estos mensajes (tu backend, un correo, o un servicio como
// Formspree/EmailJS), reemplaza el contenido de sendAssociateMessage().
// ============================================================

const associatesForm = document.getElementById('associatesForm');
const associatesStatus = document.getElementById('associatesStatus');

// ------------------------------------------------------------
// 🔌 AQUÍ CONECTAS EL ENVÍO REAL (backend, email, Formspree, etc.)
// ------------------------------------------------------------
// Ejemplo con tu propio backend:
//
// async function sendAssociateMessage(data) {
//   const res = await fetch("https://TU-BACKEND-URL/asociados", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data)
//   });
//   if (!res.ok) throw new Error("No se pudo enviar");
// }
//
// Mientras tanto, esta versión solo simula el envío:
async function sendAssociateMessage(data) {
  await new Promise((resolve) => setTimeout(resolve, 700));
}
// ------------------------------------------------------------

if (associatesForm) {
  associatesForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const data = {
      name: document.getElementById('associateName').value.trim(),
      email: document.getElementById('associateEmail').value.trim(),
      message: document.getElementById('associateMessage').value.trim(),
    };

    if (!data.name || !data.email || !data.message) return;

    associatesStatus.hidden = true;
    try {
      await sendAssociateMessage(data);
      associatesForm.reset();
      associatesStatus.textContent = '¡Gracias! Te contactaremos pronto.';
      associatesStatus.hidden = false;
    } catch (err) {
      associatesStatus.textContent = 'No se pudo enviar. Intenta de nuevo.';
      associatesStatus.hidden = false;
      console.error('Associates form error:', err);
    }
  });
}
