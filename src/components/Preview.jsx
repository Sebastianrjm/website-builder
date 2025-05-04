import { useState, useEffect } from 'react';
import Handlebars from 'handlebars';

// Función para cargar las plantillas desde la carpeta `public/templates`
const loadTemplate = async (templateType, config) => {
  try {
    const response = await fetch(`/templates/${templateType}.hbs`);
    if (!response.ok) {
      throw new Error(`Failed to load template: ${templateType}`);
    }

    const templateSource = await response.text();
    const template = Handlebars.compile(templateSource);
    return template(config);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const Preview = ({ config }) => {
  const [content, setContent] = useState('<div>Selecciona una plantilla</div>');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!config?.templateType) {
      console.error('Error: templateType no está definido en config', config);
      setError('Por favor selecciona un tipo de plantilla para previsualizar.');
      return;
    }

    loadTemplate(config.templateType, config)
      .then((templateContent) => {
        setContent(templateContent);
        setError(null);
      })
      .catch((err) => {
        console.error('Error loading template:', err);
        setError('Ocurrió un error al cargar la plantilla.');
        setContent('<div class="error">Error al cargar la plantilla.</div>');
      });
  }, [config]);

useEffect(() => {
  const root = document.documentElement;

  // Aplicar variables CSS
  root.style.setProperty('--background-color', config.backgroundColor || '#ffffff');
  root.style.setProperty('--text-color', config.textColor || '#000000');
  root.style.setProperty('--text-align', config.textAlign || 'center');
  root.style.setProperty('--primary-color', config.primaryColor || '#0000ff');
}, [config]);

  return (
    <div className="preview-container" role="region" aria-live="polite">
      {error ? (
        <div className="error-message" role="alert">
          {error}
        </div>
      ) : (
        <div
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
      )}
    </div>
  );
};

export default Preview;