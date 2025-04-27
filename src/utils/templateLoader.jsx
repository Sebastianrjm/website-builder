import Handlebars from 'handlebars';

// Plantillas predefinidas
const TEMPLATES = {
  restaurant: `
    <div class="template">
      <h1>{{siteTitle}}</h1>
      {{#if showPreview}}
        <p>Previsualización activa</p>
      {{/if}}
    </div>
  `,
  ecommerce: `
    <div class="ecommerce">
      <h2>{{siteTitle}}</h2>
      <p>¡Bienvenido a nuestra tienda en línea!</p>
    </div>
  `
};

/**
 * Carga y compila una plantilla de forma asíncrona.
 * 
 * @param {string} templateName - Nombre de la plantilla.
 * @param {object} config - Configuración para renderizar la plantilla.
 * @returns {Promise<string>} - Promesa que resuelve a la plantilla renderizada.
 */
export const loadTemplate = async (templateName, config) => {
  try {
    // Verificar que la plantilla existe
    if (!TEMPLATES[templateName]) {
      throw new Error(`La plantilla "${templateName}" no existe.`);
    }

    // Compilar la plantilla
    const template = Handlebars.compile(TEMPLATES[templateName]);
    const renderedTemplate = template(config);

    // Simular un tiempo de carga (opcional, para pruebas asíncronas)
    return new Promise((resolve) => {
      setTimeout(() => resolve(renderedTemplate), 500);
    });
  } catch (error) {
    // Manejo de errores
    console.error('Error al cargar la plantilla:', error.message);
    return Promise.reject(new Error(`<div class="error">${error.message}</div>`));
  }
};