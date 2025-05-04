import http from 'http';
import fs from 'fs/promises';
import path from 'path';
import Handlebars from 'handlebars';

// Configuración de datos dinámicos
const config = {
    siteTitle: 'Mi Restaurante',
    primaryColor: '#ff5733',
    backgroundColor: '#f0f0f0',
    textColor: '#333333',
    h1Color: '#ff5733',
    h1Size: '36px',
    h2Color: '#666666',
    h2Size: '24px',
    fontFamily: 'Arial, sans-serif',
    slogan: 'El mejor lugar para comer',
    menuSections: ['Entradas', 'Platos Fuertes', 'Postres', 'Bebidas'],
    facebook: 'https://facebook.com',
    twitter: 'https://twitter.com',
    instagram: 'https://instagram.com',
};

// Crear el servidor
const server = http.createServer(async(req, res) => {
    if (req.url === '/' || req.url === '/index.html') {
        // Ruta para servir el archivo index.html
        const htmlPath = path.join(process.cwd(), 'index.html'); // Cambiado para buscar en la raíz del proyecto
        try {
            const htmlContent = await fs.readFile(htmlPath, 'utf8');
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(htmlContent);
        } catch (err) {
            console.error(`Error al cargar index.html: ${err.message}`);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error al cargar index.html');
        }
    } else if (req.url.startsWith('/styles/') || req.url.startsWith('/scripts/') || req.url.startsWith('/images/')) {
        // Sirve archivos estáticos desde la carpeta public
        const staticPath = path.join(process.cwd(), 'public', req.url); // Cambia a la ruta de public
        try {
            const content = await fs.readFile(staticPath);
            const ext = path.extname(req.url);
            let contentType = 'text/plain';

            // Configura el tipo de contenido según la extensión
            if (ext === '.css') contentType = 'text/css';
            else if (ext === '.js') contentType = 'application/javascript';
            else if (ext === '.png') contentType = 'image/png';
            else if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
            else if (ext === '.svg') contentType = 'image/svg+xml';

            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        } catch (err) {
            console.error(`Error al cargar el recurso estático: ${err.message}`);
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Recurso no encontrado');
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Página no encontrada');
    }
});

// Inicia el servidor
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});