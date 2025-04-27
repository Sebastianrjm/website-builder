import React from 'react';
import './Formulario.css';

const Formulario = ({ config, setConfig }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setConfig(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTypographyChange = (property, value) => {
    setConfig(prev => ({
      ...prev,
      [property]: value
    }));
  };

  const templateOptions = [
    { value: 'restaurant', label: '🍽️ Restaurante' },
    { value: 'ecommerce', label: '🛒 Tienda Online' },
    { value: 'professional', label: '💼 Servicios Profesionales' },
    { value: 'blog', label: '✏️ Blog Personal' }
  ];

  const fontOptions = [
    { value: 'Arial, sans-serif', label: 'Arial' },
    { value: "'Helvetica Neue', sans-serif", label: 'Helvetica' },
    { value: "'Georgia', serif", label: 'Georgia' }
  ];

  const typographyTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
  const fontSizes = ['12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px'];

  return (
    <form className="form-generador">
      <div className="form-group">
        <label>Tipo de Plantilla:</label>
        <select
          name="templateType"
          value={config.templateType}
          onChange={handleChange}
          className="form-select"
        >
          {templateOptions.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Color Principal:</label>
        <div className="color-picker">
          <input
            type="color"
            name="primaryColor"
            value={config.primaryColor}
            onChange={handleChange}
          />
          <span className="color-value">{config.primaryColor}</span>
        </div>
      </div>

      <div className="form-group">
        <label>Fuente:</label>
        <select
          name="fontFamily"
          value={config.fontFamily}
          onChange={handleChange}
          className="form-select"
        >
          {fontOptions.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group typography-controls">
        <label>Estilo Tipográfico:</label>
        {typographyTags.map((tag) => (
          <div key={tag} className="typography-group">
            <label>{tag.toUpperCase()}</label>
            <div className="input-group">
              <input
                type="color"
                value={config[`${tag}Color`] || '#000000'}
                onChange={(e) => handleTypographyChange(`${tag}Color`, e.target.value)}
                className="color-input"
              />
              <select
                value={config[`${tag}Size`] || '16px'}
                onChange={(e) => handleTypographyChange(`${tag}Size`, e.target.value)}
                className="size-select"
              >
                {fontSizes.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>

      <div className="form-group checkbox-group">
        <label>
          <input
            type="checkbox"
            checked={config.showPreview}
            onChange={() => setConfig(prev => ({
              ...prev,
              showPreview: !prev.showPreview
            }))}
          />
          Mostrar Previsualización
        </label>
      </div>
    </form>
  );
};

export default Formulario;