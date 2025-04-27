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
    fontFamily: 'Arial, sans-serif', // Fuente del texto
    showPreview: true, // Controla si se muestra la previsualización
    siteTitle: 'Mi Sitio' // Título del sitio
  });

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