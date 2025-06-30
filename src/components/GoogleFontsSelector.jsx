import React, { useEffect, useState } from 'react';

const API_URL = 'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyAyQkI3JyFbQcg6E1KV3brdUGuL-FuLtCs';

const GoogleFontsLoader = ({ config, setConfig }) => {
  const [fonts, setFonts] = useState([]);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedFont, setSelectedFont] = useState(config.fontFamily || 'Roboto');

  // 1. Traer la lista de fuentes desde la API oficial de Google Fonts
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        if (data.items) {
          setFonts(data.items);
        }
      });
  }, []);

  // 2. Filtrar sugerencias cuando el usuario escribe en el input
  useEffect(() => {
    if (query.length === 0) {
      setSuggestions([]);
      return;
    }
    const filtered = fonts
  .filter(font =>
    font.family.toLowerCase().includes(query.toLowerCase())
  );
setSuggestions(filtered);
  }, [query, fonts]);

  // 3. Cargar y aplicar la fuente seleccionada
  useEffect(() => {
    if (!selectedFont) return;
    const link = document.createElement('link');
    link.href = `https://fonts.googleapis.com/css2?family=${selectedFont.replace(/ /g, '+')}:wght@400;700&display=swap`;
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    setConfig(prevConfig => ({
      ...prevConfig,
      fontFamily: selectedFont,
    }));

    return () => {
      document.head.removeChild(link);
    };
  }, [selectedFont, setConfig]);

  // 4. Manejar selección de fuente desde sugerencias
  const handleSuggestionClick = (fontFamily) => {
    setSelectedFont(fontFamily);
    setQuery(fontFamily);
    setSuggestions([]);
  };

  return (
    <div style={{ position: 'relative'}}>
      <label htmlFor="google-fonts-input">Selecciona una fuente de Google Fonts:</label>
      <input
        id="google-fonts-input"
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Escribe el nombre de la fuente..."
        style={{ padding: 8 }}
        autoComplete="off"
      />
      {suggestions.length > 0 && (
        <ul style={{
          position: 'absolute',
          zIndex: 10,
          background: '#fff',
          border: '1px solid #ccc',
          listStyle: 'none',
          margin: 0,
          padding: 0,
          width: '100%',
          maxHeight: 200,
          overflowY: 'auto'
        }}>
          {suggestions.map(font => (
            <li
              key={font.family}
              style={{ padding: 8, cursor: 'pointer' }}
              onClick={() => handleSuggestionClick(font.family)}
            >
              {font.family}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GoogleFontsLoader;