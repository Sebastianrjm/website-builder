# Website Builder

**Website Builder** es una aplicación web avanzada que permite a cualquier usuario crear y personalizar sitios web profesionales de manera visual y sencilla, exportando el resultado como código listo para usar. Este proyecto está diseñado para facilitar la generación de sitios web modernos mediante plantillas editables, formularios intuitivos y previsualización en tiempo real.

🌐 **Accede a la app:**  
https://webside-builder-b.netlify.app/

---

## 🚀 ¿Qué hace Website Builder?

- Permite crear sitios web a partir de plantillas predefinidas (blog, ecommerce, restaurante, profesional, etc.).
- Personaliza los contenidos, colores, tipografías (con integración de Google Fonts) y estilos visuales desde formularios interactivos.
- Visualiza los cambios en tiempo real con componentes React.
- Descarga el código fuente del sitio generado (HTML, CSS, assets) en un archivo ZIP listo para desplegar.
- Utiliza plantillas basadas en Handlebars para máxima flexibilidad y separación de lógica y presentación.

---

## 🛠️ Tecnologías utilizadas

- **React**: Construcción de la interfaz de usuario y componentes interactivos.
- **JavaScript (ES Modules)**: Lógica de la aplicación y utilidades.
- **Node.js**: Servidor de desarrollo y utilidades locales.
- **Vite**: Bundler ultrarrápido para desarrollo y build.
- **Handlebars**: Motor de plantillas para generación dinámica de HTML.
- **CSS**: Estilos personalizados para los sitios generados y la interfaz.
- **Google Fonts API**: Selección y previsualización de tipografías.
- **FileSaver & JSZip**: Descarga de archivos y empaquetado ZIP.
- **ESLint**: Linter para mantener la calidad del código.
- **HTML & SVG**: Estructura y recursos visuales.

---

## 📁 Estructura del proyecto

```
/
├── public/
│   └── templates/          # Plantillas Handlebars (.hbs) y HTML base
├── src/
│   ├── components/         # Componentes React reutilizables
│   ├── styles/             # Hojas de estilos CSS
│   ├── utils/              # Utilidades JS para templates, descargas, helpers
│   └── App.jsx, main.jsx   # Entradas principales de la app
├── server.js               # Servidor Node.js para desarrollo local
├── package.json            # Dependencias y scripts
├── vite.config.js          # Configuración de Vite
└── README.md               # Este archivo
```

---

## ✨ ¿Cómo funciona?

1. **Selecciona una plantilla:**  
   Elige entre varias plantillas de sitio web profesional (blog, tienda, restaurante, etc.).

2. **Personaliza el contenido:**  
   Usa los formularios para modificar textos, imágenes, paleta de colores y tipografías.

3. **Previsualiza en tiempo real:**  
   Visualiza los cambios instantáneamente gracias a React y la arquitectura de componentes.

4. **Descarga tu sitio:**  
   Cuando estés satisfecho, descarga un archivo ZIP con todo el código fuente listo para subir a tu hosting.

---

## 🖥️ Instalación y desarrollo local

```bash
git clone https://github.com/Sebastianrjm/website-builder.git
cd website-builder
npm install
npm run dev
```
Luego, abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 📦 Exportar tu sitio

Haz clic en “Descargar sitio” dentro de la aplicación para obtener un archivo ZIP con todos los archivos generados (HTML, CSS, imágenes, fuentes, etc.).

---

## 📄 Licencia

MIT

---

## 🔗 Enlaces útiles

- **App online:** https://webside-builder-b.netlify.app/
- **Repositorio:** https://github.com/Sebastianrjm/website-builder

---
