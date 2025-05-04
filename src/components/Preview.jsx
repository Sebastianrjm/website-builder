import { useState, useEffect, useRef } from 'react';
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
  const iframeRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!config?.templateType) {
      console.error('Error: templateType no está definido en config', config);
      setError('Por favor selecciona un tipo de plantilla para previsualizar.');
      return;
    }

    loadTemplate(config.templateType, config)
      .then((templateContent) => {
        const iframeDoc = iframeRef.current.contentDocument || iframeRef.current.contentWindow.document;

        // Crear el contenido HTML completo para el iframe
        const iframeContent = `
          <!DOCTYPE html>
          <html lang="es">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${config.siteTitle || 'Vista Previa'}</title>
            <style>
              body {
                background-color: ${config.backgroundColor || '#ffffff'};
                color: ${config.textColor || '#000000'};
                font-family: ${config.fontFamily || 'Arial, sans-serif'};
                text-align: ${config.textAlign || 'center'};
              }
              h1, h2, h3, h4, h5, h6 {
                color: ${config.primaryColor || '#0000ff'};
              }
            </style>
          </head>
          <body>
            ${templateContent}
          </body>
          </html>
        `;

        // Escribir el contenido en el iframe
        iframeDoc.open();
        iframeDoc.write(iframeContent);
        iframeDoc.close();

        setError(null);
      })
      .catch((err) => {
        console.error('Error loading template:', err);
        setError('Ocurrió un error al cargar la plantilla.');
      });
  }, [config]);

  return (
    <div className="preview-container" style={{ marginTop: '20px' }}>
      {error ? (
        <div className="error-message" role="alert" style={{ color: 'red' }}>
          {error}
        </div>
      ) : (
        <iframe
          ref={iframeRef}
          title="Vista previa de la plantilla"
          style={{
            width: '100%',
            height: '500px',
            border: '1px solid #ccc',
          }}
        ></iframe>
      )}
    </div>
  );
};

export default Preview;