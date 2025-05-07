import JSZip from 'jszip';
import { saveAs } from 'file-saver';

// Función para descargar la plantilla como un archivo ZIP
export const downloadTemplate = async (templateType, config, templateContent) => {
  const zip = new JSZip();

  // 1. Agregar el archivo HTML
  zip.file(`${templateType}.html`, templateContent);

  // 2. Agregar el archivo CSS correspondiente
  const cssResponse = await fetch(`/templates/styles/${templateType}.css`);
  if (cssResponse.ok) {
    const cssContent = await cssResponse.text();
    zip.file(`${templateType}.css`, cssContent);
  } else {
    console.error(`No se pudo cargar el archivo CSS para ${templateType}`);
  }

  // 3. Agregar las variables configuradas como JSON
  const variables = JSON.stringify(config, null, 2);
  zip.file('variables.json', variables);

  // 4. Generar el archivo ZIP y descargarlo
  zip.generateAsync({ type: 'blob' }).then((blob) => {
    saveAs(blob, `${templateType}-template.zip`);
  });
};