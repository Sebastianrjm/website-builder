export const exportConfig = (config) => {
    // 1. Crear JSON
    const json = JSON.stringify(config, null, 2);

    // 2. Crear HTML final
    const html = `<!DOCTYPE html>
  <html>
  <head>
    <title>${config.siteTitle} - Configuración</title>
  </head>
  <body>
    <pre>${json}</pre>
  </body>
  </html>`;

    // 3. Descargar
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = config - $ { config.templateType }.html;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
};