import { useState, useEffect } from 'react';
import { loadTemplate } from '../utils/templateLoader';

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

  return (
    <div className="preview-container" role="region" aria-live="polite">
      {error ? (
        <div className="error-message" role="alert">
          {error}
        </div>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: content }} />
      )}
    </div>
  );
};

export default Preview;