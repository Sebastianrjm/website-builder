const http = require('http');
const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');

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
const server = http.createServer((req, res) => {
    if (req.url === '/preview/restaurant') {
        const templatePath = path.join(__dirname, 'templates', 'restaurant.hbs');
        fs.readFile(templatePath, 'utf8', (err, templateSource) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error al cargar la plantilla');
                return;
            }

            // Compilar y renderizar la plantilla
            const template = Handlebars.compile(templateSource);
            const html = template(config);

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(html);
        });
    } else if (req.url.startsWith('/styles/')) {
        // Servir archivos CSS
        const cssPath = path.join(__dirname, 'public', req.url);
        fs.readFile(cssPath, 'utf8', (err, cssContent) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Archivo CSS no encontrado');
                return;
            }

            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.end(cssContent);
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Página no encontrada');
    }
});

// Inicia el servidor
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`Solicitud recibida para: ${req.url}`);
});