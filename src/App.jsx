import { useState } from 'react';
import Formulario from './components/Formulario';
import Preview from './components/Preview';
import ErrorBoundary from './components/ErrorBoundary';
import './styles/globals.css';

function App() {
  // Estado global que comparten Formulario y Preview
  const [config, setConfig] = useState({
    templateType: 'restaurant', // Este campo es obligatorio
    primaryColor: '#3a86ff', // Color principal del sitio
    secondaryColor: '#ff6f61', // Color secundario
    backgroundColor: '#ffffff', // Color de fondo
    textColor: '#000000', // Color del texto
    fontFamily: 'Arial, sans-serif', // Fuente del texto
    slogan: '', // Eslogan del sitio
    menuSections: [], // Secciones del menú
    showPreview: true, // Controla si se muestra la previsualización
    siteTitle: 'Mi Sitio', // Título del sitio
    // Tamaños de encabezados
    h1Size: '32px',
    h2Size: '28px',
    h3Size: '24px',
    h4Size: '20px',
    h5Size: '16px',
    h6Size: '14px',
  });

  // Renderizar plantilla
  const renderTemplate = () => {
    console.log('Plantilla renderizada con configuración:', config);
  };

  // Restablecer configuración
  const resetTemplate = () => {
    setConfig({
      templateType: 'restaurant', // Este campo es obligatorio
      primaryColor: '#3a86ff', // Color principal del sitio
      secondaryColor: '#ff6f61', // Color secundario
      backgroundColor: '#ffffff', // Color de fondo
      textColor: '#000000', // Color del texto
      fontFamily: 'Arial, sans-serif', // Fuente del texto
      slogan: '', // Eslogan del sitio
      menuSections: [], // Secciones del menú
      showPreview: true, // Controla si se muestra la previsualización
      siteTitle: 'Mi Sitio', // Título del sitio
      // Tamaños de encabezados
      h1Size: '32px',
      h2Size: '28px',
      h3Size: '24px',
      h4Size: '20px',
      h5Size: '16px',
      h6Size: '14px',
    });
    console.log('Configuración restablecida a valores predeterminados.');
  };

  return (
    <ErrorBoundary>
      <div className="app-container">
        <header className="app-header">
          <h2>Personaliza tu sitio en minutos</h2>
        </header>

        <main>
          {/* Sección del formulario */}
          <section className="form-section">
            <Formulario
              config={config}
              setConfig={setConfig}
              renderTemplate={renderTemplate}
              resetTemplate={resetTemplate}
            />
          </section>

          {/* Previsualización en tiempo real */}
          {config.showPreview && (
            <section className="preview-section">
              <Preview config={config} />
            </section>
          )}
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;