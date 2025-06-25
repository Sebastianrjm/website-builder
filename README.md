# Generador de Páginas Web

Este proyecto es un generador de sitios web personalizables, desarrollado con React y Vite. Permite crear y previsualizar sitios de diferentes tipos usando plantillas dinámicas (Handlebars) y descargar los archivos generados, facilitando la creación de páginas para restaurantes, blogs, e-commerce y más.

## Tecnologías utilizadas

- **React**: Para la construcción de la interfaz de usuario interactiva.
- **Vite**: Herramienta de desarrollo y build ultrarrápida.
- **Handlebars**: Motor de plantillas para generación dinámica de HTML.
- **JavaScript (ES Modules)**
- **HTML5 y CSS3**
- **FileSaver**: Permite descargar archivos generados por el usuario.
- **JSZip**: Permite empaquetar archivos en formato ZIP.
- **Node.js**: Utilizado para el servidor de desarrollo simple (`server.js`).
- **ESLint**: Mantiene la calidad y consistencia del código durante el desarrollo.
- **pnpm**: Gestor de paquetes alternativo a npm/yarn.

## Estructura del proyecto

```
/public
  /templates           # Plantillas Handlebars (blog, ecommerce, restaurant, etc.)
/src
  /components          # Componentes React (Formulario, Preview, etc.)
  /styles              # Archivos CSS globales y de componentes
index.html             # Entrada principal del frontend
server.js              # Servidor Node.js opcional
vite.config.js         # Configuración de Vite
package.json           # Dependencias y scripts
pnpm-lock.yaml         # Lockfile de pnpm
```

## Instalación y uso

1. **Clona el repositorio:**
   ```sh
   git clone https://github.com/Sebastianrjm/website-builder.git
   cd website-builder
   ```

2. **Instala las dependencias:**
   (Puedes usar pnpm, npm o yarn)
   ```sh
   pnpm install
   # o
   npm install
   # o
   yarn install
   ```

3. **Inicia el servidor de desarrollo:**
   ```sh
   pnpm dev
   # o
   npm run dev
   # o
   yarn dev
   ```

   El proyecto estará disponible en `http://localhost:3000`.

4. **Build para producción:**
   ```sh
   pnpm build
   # o
   npm run build
   # o
   yarn build
   ```

   Los archivos estáticos listos para producción estarán en la carpeta `/dist`.

## Despliegue

Puedes desplegar fácilmente el sitio generado en servicios gratuitos como:

- **Netlify**: [[https://netlify.com/](https://netlify.com/)](https://webside-builder-b.netlify.app/)
_Si quieres desplegar usando el servidor Node.js (`server.js`), considera servicios como Render, Railway o Heroku._

## Contribución

¡Se aceptan PRs y sugerencias! Para contribuir, por favor sigue las buenas prácticas y linting definidos en el proyecto.

## Licencia

[MIT](LICENSE)
