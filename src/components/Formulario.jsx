import React, { useState } from 'react';
import './Formulario.css';

const Formulario = ({ config, setConfig }) => {
  const [menuSections, setMenuSections] = useState(config.menuSections || []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConfig((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTypographyChange = (property, value) => {
    setConfig((prev) => ({
      ...prev,
      [property]: value,
    }));
  };

  const handleMenuChange = (index, value) => {
    const updatedSections = [...menuSections];
    updatedSections[index] = value;
    setMenuSections(updatedSections);
    setConfig((prev) => ({
      ...prev,
      menuSections: updatedSections,
    }));
  };

  const addMenuSection = () => {
    setMenuSections([...menuSections, '']);
  };

  const removeMenuSection = (index) => {
    const updatedSections = menuSections.filter((_, i) => i !== index);
    setMenuSections(updatedSections);
    setConfig((prev) => ({
      ...prev,
      menuSections: updatedSections,
    }));
  };

  const fontOptions = [
    { value: 'Arial, sans-serif', label: 'Arial' },
    { value: "'Helvetica Neue', sans-serif", label: 'Helvetica' },
    { value: "'Georgia', serif", label: 'Georgia' },
  ];

  const typographyTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

  return (
    <form className="form-generador">
      {/* Campo para el título de la página web */}
      <div className="form-group">
        <label>Título de la Página Web:</label>
        <input
          type="text"
          name="siteTitle"
          value={config.siteTitle || ''}
          onChange={handleChange}
          placeholder="Escribe el título de tu página web"
        />
      </div>

      {/* Opciones de SEO */}
      <div className="form-group">
        <label>Meta Título:</label>
        <input
          type="text"
          name="metaTitle"
          value={config.metaTitle || ''}
          onChange={handleChange}
          placeholder="Título para SEO"
        />
      </div>
      <div className="form-group">
        <label>Meta Descripción:</label>
        <textarea
          name="metaDescription"
          value={config.metaDescription || ''}
          onChange={handleChange}
          placeholder="Descripción para SEO"
        />
      </div>

      {/* Selección de tipo de plantilla */}
      <div className="form-group">
        <label>Tipo de Plantilla:</label>
        <select
          name="templateType"
          value={config.templateType}
          onChange={handleChange}
          className="form-select"
        >
          <option value="restaurant">🍽️ Restaurante</option>
          <option value="ecommerce">🛒 Tienda Online</option>
          <option value="professional">💼 Servicios Profesionales</option>
          <option value="blog">✏️ Blog Personal</option>
        </select>
      </div>

      {/* Configuración de colores */}
      <div className="form-group compact-input">
        <label>Color Principal:</label>
        <input
          type="color"
          name="primaryColor"
          value={config.primaryColor}
          onChange={handleChange}
        />
      </div>
      <div className="form-group compact-input">
        <label>Color Secundario:</label>
        <input
          type="color"
          name="secondaryColor"
          value={config.secondaryColor}
          onChange={handleChange}
        />
      </div>
      <div className="form-group compact-input">
        <label>Color de Fondo:</label>
        <input
          type="color"
          name="backgroundColor"
          value={config.backgroundColor}
          onChange={handleChange}
        />
      </div>
      <div className="form-group compact-input">
        <label>Color del Texto:</label>
        <input
          type="color"
          name="textColor"
          value={config.textColor}
          onChange={handleChange}
        />
      </div>
      

      {/* Eslogan del sitio */}
      <div className="form-group">
        <label>Eslogan del Sitio:</label>
        <input
          type="text"
          name="slogan"
          value={config.slogan || ''}
          onChange={handleChange}
          placeholder="Escribe un eslogan para tu sitio"
        />
      </div>

      {/* Fuente */}
      <div className="form-group">
        <label>Fuente Principal:</label>
        <select
          name="fontFamily"
          value={config.fontFamily}
          onChange={handleChange}
        >
          {fontOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Configuración de colores y tamaños de encabezados */}
      <div className="form-group">
        <label>Estilo Tipográfico:</label>
        {typographyTags.map((tag) => (
          <div key={tag} className="typography-group">
            <label>{tag.toUpperCase()}:</label>
            <div className="compact-input">
              <label>Color:</label>
              <input
                type="color"
                value={config[`${tag}Color`] || '#000000'}
                onChange={(e) =>
                  handleTypographyChange(`${tag}Color`, e.target.value)
                }
              />
              <label>Tamaño (px):</label>
              <input
                type="number"
                min="10"
                max="100"
                step="1"
                value={parseInt(config[`${tag}Size`], 10) || 16}
                onChange={(e) =>
                  handleTypographyChange(`${tag}Size`, `${e.target.value}px`)
                }
              />
            </div>
          </div>
        ))}
      </div>

      {/* Menú */}
      <div className="form-group">
        <label>Secciones del Menú:</label>
        {menuSections.map((section, index) => (
          <div key={index} className="menu-section">
            <input
              type="text"
              value={section}
              onChange={(e) => handleMenuChange(index, e.target.value)}
              placeholder={`Sección ${index + 1}`}
            />
            <button type="button" onClick={() => removeMenuSection(index)}>
              ❌
            </button>
          </div>
        ))}
        <button type="button" onClick={addMenuSection}>
          ➕ Agregar Sección
        </button>
      </div>
    </form>
  );
};

export default Formulario;