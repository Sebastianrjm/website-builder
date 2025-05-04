import { useState, useEffect } from 'react';
export const loadTemplate = async (templateName, config) => {
  // Código de la función
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

  const downloadTemplate = () => {
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${config.templateType || 'template'}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="preview-container" role="region" aria-live="polite">
      {error ? (
        <div className="error-message" role="alert">
          {error}
        </div>
      ) : (
        <div>
          <div dangerouslySetInnerHTML={{ __html: content }} />
          <button onClick={downloadTemplate} className="download-button">
            Descargar HTML
          </button>
        </div>
      )}
    </div>
  );
};

export default Preview;