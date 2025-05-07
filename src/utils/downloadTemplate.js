import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export const downloadTemplate = async(templateType, config, templateContent) => {
    const zip = new JSZip();

    // 1. Crear el archivo HTML con el contenido de la plantilla
    zip.file(`${templateType}.html`, templateContent);

    // 2. Descargar y agregar los archivos CSS a la carpeta "styles"
    try {
        // Descargar archivo base.css
        const baseCSSResponse = await fetch(`/templates/styles/base.css`);
        if (baseCSSResponse.ok) {
            const baseCSSContent = await baseCSSResponse.text();
            zip.file('styles/base.css', baseCSSContent);
        } else {
            console.warn('No se pudo descargar base.css');
        }

        // Descargar archivo específico del template
        const templateCSSResponse = await fetch(`/templates/styles/${templateType}.css`);
        if (templateCSSResponse.ok) {
            const templateCSSContent = await templateCSSResponse.text();
            zip.file(`styles/${templateType}.css`, templateCSSContent);
        } else {
            console.warn(`No se pudo descargar ${templateType}.css`);
        }
    } catch (error) {
        console.error('Error al descargar los archivos CSS:', error);
    }

    // 3. Crear un archivo README.txt con instrucciones claras
    const readmeContent = `
# Instrucciones para Abrir el Archivo HTML

Gracias por descargar esta plantilla.

### Cómo Ver los Estilos Correctamente
Para asegurarte de que los estilos se carguen correctamente, **no abras el archivo HTML directamente con doble clic**. En su lugar, utiliza un servidor local como "Live Server" o equivalente.

#### Opción 1: Usar Live Server (Recomendado)
1. Instala la extensión "Live Server" en tu editor de código (por ejemplo, Visual Studio Code).
2. Abre la carpeta donde descargaste los archivos con tu editor.
3. Haz clic derecho en el archivo HTML y selecciona "Open with Live Server".

#### Opción 2: Usar Python (Alternativa)
1. Abre una terminal en la carpeta donde descargaste los archivos.
2. Ejecuta el siguiente comando:
python -m http.server 3000
3. Abre tu navegador y visita: \`http://localhost:3000\`.

### Nota
Si abres el archivo directamente, los estilos pueden no cargarse debido a restricciones del navegador con el protocolo \`file://\`.

¡Esperamos que disfrutes de tu plantilla!
`;

    zip.file('README.txt', readmeContent);

    // 4. Generar el archivo ZIP y descargarlo
    zip.generateAsync({ type: 'blob' }).then((blob) => {
        saveAs(blob, `${templateType}-template.zip`);
    }).catch((error) => {
        console.error('Error al generar el archivo ZIP:', error);
    });
};