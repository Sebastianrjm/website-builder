import React, { useEffect, useState } from 'react';

const GoogleFontsSelector = ({ config, setConfig }) => {
  const [fonts, setFonts] = useState([]);
  const [selectedFont, setSelectedFont] = useState(config.fontFamily || 'Roboto');

  // Lista de fuentes (puedes obtenerla desde un backend o archivo local)
  useEffect(() => {
    // Una lista básica de fuentes (puedes reemplazar esto con una API o archivo JSON completo)
    const fontList = [
      'Roboto',
      'Open Sans',
      'Lato',
      'Montserrat',
      'Raleway',
      'Poppins',
      'Merriweather',
      'Playfair Display',
      'Nunito',
      'Oswald',
    ];
    setFonts(fontList);
  }, []);

  // Cargar la fuente seleccionada dinámicamente
  useEffect(() => {
    const link = document.createElement('link');
    link.href = `https://fonts.googleapis.com/css2?family=${selectedFont.replace(
      / /g,
      '+'
    )}:wght@400;700&display=swap`;
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Aplicar la fuente seleccionada al estado de configuración
    setConfig((prevConfig) => ({
      ...prevConfig,
      fontFamily: selectedFont,
    }));

    return () => {
      document.head.removeChild(link); // Elimina la fuente anterior para evitar duplicados
    };
  }, [selectedFont, setConfig]);

  return (
    <div>
      <label htmlFor="google-fonts">Selecciona una fuente:</label>
      <select
        id="google-fonts"
        value={selectedFont}
        onChange={(e) => setSelectedFont(e.target.value)}
      >
        {fonts.map((font) => (
          <option key={font} value={font}>
            {font}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GoogleFontsSelector;