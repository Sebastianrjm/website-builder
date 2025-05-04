import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuración mínima funcional
export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
        fs: {
            allow: ['..'] // Permite acceder a la carpeta public/
        }
    }
});