import Handlebars from 'handlebars';
export const loadTemplate = async (templateName, config) => {
  try {
    // Construir la ruta de la plantilla
    const response = await fetch(`/templates/${templateName}.hbs`);

    if (!response.ok) {
      throw new Error(`No se pudo cargar la plantilla: ${templateName}`);
    }

    const templateText = await response.text();

    // Compilar la plantilla con Handlebars
    const template = Handlebars.compile(templateText);
    const renderedTemplate = template(config);

    return renderedTemplate;
  } catch (error) {
    console.error('Error al cargar la plantilla:', error.message);
    return `<div class="error">Error: ${error.message}</div>`;
  }
};