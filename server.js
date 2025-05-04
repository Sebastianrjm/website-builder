import http from 'http';
import fs from 'fs/promises';
import path from 'path';

const server = http.createServer(async(req, res) => {
    let filePath = '';

    if (req.url === '/' || req.url === '/index.html') {
        filePath = path.join(process.cwd(), 'index.html');
    } else {
        filePath = path.join(process.cwd(), req.url.substring(1));
    }

    try {
        const fileContent = await fs.readFile(filePath);
        const ext = path.extname(filePath);
        let contentType = 'text/plain';

        // Configurar el tipo de contenido según la extensión
        if (ext === '.html') contentType = 'text/html';
        else if (ext === '.css') contentType = 'text/css';
        else if (ext === '.js' || ext === '.jsx') contentType = 'application/javascript';

        res.writeHead(200, { 'Content-Type': contentType });
        res.end(fileContent);
    } catch (err) {
        console.error(`Error al cargar el archivo: ${err.message}`);
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Archivo no encontrado');
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});