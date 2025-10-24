import { useState } from 'react';
import useStore from '../../store/useStore';
import Button from '../Button/Button';
import './Settings.css';

export default function Settings({ isOpen, onClose }) {
  const { settings, updateSettings } = useStore();
  const [localSettings, setLocalSettings] = useState(settings);

  if (!isOpen) return null;

  const handleSave = () => {
    updateSettings(localSettings);
    onClose();
  };

  const handleToggle = (key) => {
    setLocalSettings((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleThemeChange = (theme) => {
    setLocalSettings((prev) => ({
      ...prev,
      theme
    }));
  };

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings" onClick={(e) => e.stopPropagation()} role="dialog" aria-labelledby="settings-title">
        <div className="settings__header">
          <h2 id="settings-title" className="settings__title">Impostazioni</h2>
          <button 
            className="settings__close" 
            onClick={onClose}
            aria-label="Chiudi impostazioni"
          >
            ✕
          </button>
        </div>

        <div className="settings__content">
          {/* Audio Settings */}
          <div className="settings__section">
            <h3 className="settings__section-title">Audio</h3>
            
            <label className="settings__option">
              <div className="settings__option-info">
                <span className="settings__option-label">Suoni</span>
                <span className="settings__option-desc">Beep di notifica</span>
              </div>
              <input
                type="checkbox"
                className="settings__toggle"
                checked={localSettings.audioEnabled}
                onChange={() => handleToggle('audioEnabled')}
              />
            </label>

            <label className="settings__option">
              <div className="settings__option-info">
                <span className="settings__option-label">Voce</span>
                <span className="settings__option-desc">Annunci vocali</span>
              </div>
              <input
                type="checkbox"
                className="settings__toggle"
                checked={localSettings.voiceEnabled}
                onChange={() => handleToggle('voiceEnabled')}
              />
            </label>
          </div>

          {/* Theme Settings */}
          <div className="settings__section">
            <h3 className="settings__section-title">Tema</h3>
            
            <div className="settings__theme-options">
              <button
                className={`settings__theme-btn ${localSettings.theme === 'light' ? 'active' : ''}`}
                onClick={() => handleThemeChange('light')}
              >
                ☀️ Chiaro
              </button>
              <button
                className={`settings__theme-btn ${localSettings.theme === 'dark' ? 'active' : ''}`}
                onClick={() => handleThemeChange('dark')}
              >
                🌙 Scuro
              </button>
              <button
                className={`settings__theme-btn ${localSettings.theme === 'auto' ? 'active' : ''}`}
                onClick={() => handleThemeChange('auto')}
              >
                🔄 Auto
              </button>
            </div>
          </div>
        </div>

        <div className="settings__footer">
          <Button onClick={handleSave} fullWidth>
            Salva
          </Button>
        </div>
      </div>
    </div>
  );
}
