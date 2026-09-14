/**
 * Ferretería El Tornillo - Lógica de Formulario de Contacto
 * Validación estática en cliente (navegador)
 */

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('formulario-contacto');
  const nombreInput = document.getElementById('nombre');
  const mensajeInput = document.getElementById('mensaje');
  const feedbackBox = document.getElementById('form-feedback');

  if (!contactForm || !nombreInput || !feedbackBox) {
    return;
  }

  // Quitar el aviso de error cuando el usuario empiece a escribir
  nombreInput.addEventListener('input', () => {
    if (nombreInput.value.trim().length >= 2) {
      nombreInput.classList.remove('input-error');
      if (feedbackBox.classList.contains('is-error')) {
        feedbackBox.className = 'form-feedback';
        feedbackBox.style.display = 'none';
        feedbackBox.innerHTML = '';
      }
    }
  });

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const nombre = nombreInput.value.trim();
    const mensaje = mensajeInput ? mensajeInput.value.trim() : '';

    // Validación del nombre (mínimo 2 caracteres)
    if (nombre.length < 2) {
      mostrarAviso(
        'error',
        'Por favor completa tu nombre (debe tener al menos 2 caracteres) para poder responderte.'
      );
      nombreInput.classList.add('input-error');
      nombreInput.focus();
      return;
    }

    // Validación exitosa
    mostrarAviso(
      'success',
      `¡Gracias por comunicarte, <strong>${escaparHTML(nombre)}</strong>! Tu mensaje ha sido recibido con éxito. Estaremos atentos a atenderte.`
    );

    // Limpiar campos y estado de error
    nombreInput.classList.remove('input-error');
    contactForm.reset();
  });

  /**
   * Muestra un mensaje en el contenedor de aviso
   * @param {'error' | 'success'} tipo
   * @param {string} mensajeHTML
   */
  function mostrarAviso(tipo, mensajeHTML) {
    feedbackBox.className = `form-feedback is-${tipo}`;
    feedbackBox.style.display = 'flex';

    const icono = tipo === 'error'
      ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
           <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
         </svg>`
      : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
           <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
         </svg>`;

    feedbackBox.innerHTML = `${icono}<div>${mensajeHTML}</div>`;
    feedbackBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  /**
   * Escapa caracteres especiales de HTML para prevenir inyecciones
   * @param {string} str
   * @returns {string}
   */
  function escaparHTML(str) {
    const p = document.createElement('p');
    p.textContent = str;
    return p.innerHTML;
  }
});
