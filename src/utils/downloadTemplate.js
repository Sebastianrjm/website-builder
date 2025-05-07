import JSZip from 'jszip';
import { saveAs } from 'file-saver';

// Función para descargar la plantilla como un archivo ZIP
export const downloadTemplate = async(templateType, config, templateContent) => {
    const zip = new JSZip();

    // 1. Agregar el archivo HTML al nivel raíz del ZIP
    zip.file(`${templateType}.html`, templateContent);

    // 2. Agregar el archivo CSS específico de la plantilla dentro de la carpeta "styles"
    const templateCSSResponse = await fetch(`/templates/styles/${templateType}.css`);
    if (templateCSSResponse.ok) {
        const templateCSSContent = await templateCSSResponse.text();
        zip.file(`styles/${templateType}.css`, templateCSSContent);
    } else {
        console.warn(`El archivo CSS para la plantilla ${templateType} no está disponible.`);
    }

    // 3. Agregar el archivo base.css dentro de la carpeta "styles"
    const baseCSSResponse = await fetch(`/templates/styles/base.css`);
    if (baseCSSResponse.ok) {
        const baseCSSContent = await baseCSSResponse.text();
        zip.file('styles/base.css', baseCSSContent);
    } else {
        console.warn('El archivo base.css no está disponible.');
    }

    // 4. Agregar las variables configuradas como JSON al nivel raíz del ZIP
    const variables = JSON.stringify(config, null, 2);
    zip.file('variables.json', variables);

    // 5. Generar el archivo ZIP y descargarlo
    zip.generateAsync({ type: 'blob' }).then((blob) => {
        saveAs(blob, `${templateType}-template.zip`);
    });
};