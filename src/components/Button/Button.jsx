import './Button.css';

export default function Button({ 
  children, 
  onClick, 
  variant = 'primary', 
  disabled = false,
  icon = null,
  fullWidth = false,
  ariaLabel
}) {
  return (
    <button
      className={`btn btn--${variant} ${fullWidth ? 'btn--full' : ''}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel || children}
    >
      {icon && <span className="btn__icon">{icon}</span>}
      <span className="btn__text">{children}</span>
    </button>
  );
}
