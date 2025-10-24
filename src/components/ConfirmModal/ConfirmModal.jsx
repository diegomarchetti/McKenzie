import { useEffect } from 'react';
import Button from '../Button/Button';
import './ConfirmModal.css';

export default function ConfirmModal({ 
  isOpen, 
  onConfirm, 
  onCancel, 
  title = 'Conferma azione',
  message = 'Sei sicuro di voler procedere?' 
}) {
  // Gestisci ESC per chiudere
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onCancel();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Previeni scroll del body
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div 
      className="confirm-modal-overlay" 
      onClick={onCancel}
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
    >
      <div 
        className="confirm-modal" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="confirm-modal__header">
          <h2 id="confirm-modal-title" className="confirm-modal__title">
            {title}
          </h2>
        </div>

        <div className="confirm-modal__content">
          <p>{message}</p>
        </div>

        <div className="confirm-modal__actions">
          <Button 
            onClick={onCancel} 
            variant="secondary"
            ariaLabel="Annulla"
          >
            Annulla
          </Button>
          <Button 
            onClick={onConfirm}
            ariaLabel="Conferma"
          >
            Conferma
          </Button>
        </div>
      </div>
    </div>
  );
}
