import React, { useState } from 'react';
import GoogleFontsSelector from './GoogleFontsSelector';
import './Formulario.css';

const Formulario = ({ config, setConfig }) => {
  const [menuSections, setMenuSections] = useState(config.menuSections || []);
  const [footerSocial, setFooterSocial] = useState(config.footerSocial || []);

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

  const handleMenuChange = (index, field, value) => {
    const updatedSections = [...menuSections];
    updatedSections[index] = { ...updatedSections[index], [field]: value };
    setMenuSections(updatedSections);
    setConfig((prev) => ({
      ...prev,
      menuSections: updatedSections,
    }));
  };

  const addMenuSection = () => {
    setMenuSections([...menuSections, { text: '', href: '' }]);
  };

  const removeMenuSection = (index) => {
    const updatedSections = menuSections.filter((_, i) => i !== index);
    setMenuSections(updatedSections);
    setConfig((prev) => ({
      ...prev,
      menuSections: updatedSections,
    }));
  };

  const handleFooterSocialChange = (index, field, value) => {
    const updatedSocial = [...footerSocial];
    updatedSocial[index] = { ...updatedSocial[index], [field]: value };
    setFooterSocial(updatedSocial);
    setConfig((prev) => ({
      ...prev,
      footerSocial: updatedSocial,
    }));
  };

  const addFooterSocial = () => {
    setFooterSocial([...footerSocial, { label: '', href: '' }]);
  };

  const removeFooterSocial = (index) => {
    const updatedSocial = footerSocial.filter((_, i) => i !== index);
    setFooterSocial(updatedSocial);
    setConfig((prev) => ({
      ...prev,
      footerSocial: updatedSocial,
    }));
  };

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
      <div className="form-group compact-input">
        <label>Color del Footer:</label>
        <input
          type="color"
          name="footerBackgroundColor"
          value={config.footerBackgroundColor}
          onChange={handleChange}
        />
      </div>
      <div className="form-group compact-input">
        <label>Color del Texto en el Footer:</label>
        <input
          type="color"
          name="footerTextColor"
          value={config.footerTextColor}
          onChange={handleChange}
        />
      </div>

      {/* Selección de tamaño de fuente global */}
      <div className="form-group">
        <label>Tamaño de Fuente Global (px):</label>
        <input
          type="number"
          name="fontSize"
          min="10"
          max="50"
          value={parseInt(config.fontSize, 10) || 16}
          onChange={(e) =>
            handleChange({
              target: { name: 'fontSize', value: `${e.target.value}px` },
            })
          }
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

      {/* Tamaño de fuente del eslogan */}
      <div className="form-group">
        <label>Tamaño de Fuente del Eslogan (px):</label>
        <input
          type="number"
          name="sloganFontSize"
          min="10"
          max="50"
          value={parseInt(config.sloganFontSize, 10) || 16}
          onChange={(e) =>
            handleChange({
              target: { name: 'sloganFontSize', value: `${e.target.value}px` },
            })
          }
        />
      </div>

      <div className="form-group">
        {/* Tipografia */}
        <GoogleFontsSelector config={config} setConfig={setConfig} />
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
        <ul className="menu-list">
          {menuSections.map((section, index) => (
            <li key={index} className="menu-item">
              <input
                type="text"
                value={section.text || ''}
                onChange={(e) =>
                  handleMenuChange(index, 'text', e.target.value)
                }
                placeholder={`Texto de la Sección ${index + 1}`}
              />
              <input
                type="url"
                value={section.href || ''}
                onChange={(e) =>
                  handleMenuChange(index, 'href', e.target.value)
                }
                placeholder={`Enlace de la Sección ${index + 1}`}
              />
              <button type="button" onClick={() => removeMenuSection(index)}>
                ❌
              </button>
            </li>
          ))}
        </ul>
        <button type="button" onClick={addMenuSection}>
          ➕ Agregar Sección
        </button>
      </div>

      {/* Redes Sociales del Footer */}
      <div className="form-group">
        <label>Redes Sociales en el Footer:</label>
        {footerSocial.map((social, index) => (
          <div key={index} className="footer-social">
            <label>Etiqueta:</label>
            <input
              type="text"
              value={social.label || ''}
              onChange={(e) =>
                handleFooterSocialChange(index, 'label', e.target.value)
              }
              placeholder="Nombre de la red social (ej. Facebook)"
            />
            <label>Enlace:</label>
            <input
              type="url"
              value={social.href || ''}
              onChange={(e) =>
                handleFooterSocialChange(index, 'href', e.target.value)
              }
              placeholder="URL de la red social"
            />
            <button type="button" onClick={() => removeFooterSocial(index)}>
              ❌
            </button>
          </div>
        ))}
        <button type="button" onClick={addFooterSocial}>
          ➕ Agregar Red Social
        </button>
      </div>
    </form>
  );
};

export default Formulario;