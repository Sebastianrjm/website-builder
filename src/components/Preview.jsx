import { useState, useEffect, useRef } from 'react';
import Handlebars from 'handlebars';
import { downloadTemplate } from '../utils/downloadTemplate';

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

    console.log("Tipo de plantilla:", config.templateType);
  console.log("menuSections:", config.menuSections);


    loadTemplate(config.templateType, config)
      .then((templateContent) => {
        const iframeDoc = iframeRef.current.contentDocument || iframeRef.current.contentWindow.document;

        // Seleccionar el archivo CSS correspondiente a la plantilla
        const templateCSS = `/templates/styles/${config.templateType}.css`;

        // Crear el contenido HTML completo para el iframe
        const iframeContent = `
          <!DOCTYPE html>
          <html lang="es">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">

            <title>${config.siteTitle || 'Vista Previa'}</title>
            <meta name="description" content="${config.metaDescription || ''}" />
            <meta name="author" content="${config.author || ''}" />
            <meta property="og:title" content="${config.siteTitle || ''}" />
            <meta property="og:description" content="${config.metaDescription || ''}" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="${config.siteUrl || ''}" />
            <meta property="og:image" content="${config.ogImage || ''}" />
            <link rel="canonical" href="${config.siteUrl || ''}" />

            <!-- Twitter Card tags -->
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="${config.siteTitle || ''}" />
            <meta name="twitter:description" content="${config.metaDescription || ''}" />
            <meta name="twitter:image" content="${config.ogImage || ''}" />

            ${config.favicon ? `<link rel="icon" href="${config.favicon}" />` : ''}

            <!-- Estilos -->
            <!-- Bootstrap CSS -->
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet">
            <!-- Google fonts -->
            <link href="https://fonts.googleapis.com/css2?family=${config.fontFamily.replace(/ /g, '+')}:wght@400;700&display=swap" rel="stylesheet">
            <!-- Swiper css -->
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
            <!-- AOS CSS -->
            <link href="https://unpkg.com/aos@2.3.4/dist/aos.css" rel="stylesheet">
            <link rel="stylesheet" href="/templates/styles/base.css"> <!-- Estilos básicos -->
            <link rel="stylesheet" href="${templateCSS}"> <!-- Estilos específicos de la plantilla -->
            <!-- Bootstrap Icons (opcional, para iconos) -->
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css">
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
  }, [config])
  
 const handleDownload = async () => {
  const iframeDoc = iframeRef.current?.contentDocument || iframeRef.current?.contentWindow?.document;

  if (!iframeDoc) {
    console.error('El iframe no está disponible.');
    return;
  }

  // Capturar el contenido HTML del iframe
  let templateContent = iframeDoc.documentElement.outerHTML;

  // Ajustar las rutas de los estilos en el contenido HTML
  templateContent = templateContent.replace(
    /\/templates\/styles\//g, // Busca todas las referencias a "/templates/styles/"
    './styles/'                 // Reemplaza con la ruta relativa "styles/"
  );

  // Llamar a la función downloadTemplate con el contenido ajustado
  await downloadTemplate(config.templateType, config, templateContent);
};

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
      <div className="preview-container">
      {/* Botón para descargar la plantilla */}
      <button onClick={handleDownload} className="download-button">
        Descargar Plantilla
      </button>
    </div>
    </div>
  );
};

export default Preview;