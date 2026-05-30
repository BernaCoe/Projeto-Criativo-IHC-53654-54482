
import './AppButton.css';

function AppButton({
  label,
  onClick,
  variant = 'dourada',
  disabled = false,
  icon = null,
}) {
  return (
    <button
      className={`app-btn ${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {label}
    </button>
  );
}

export default AppButton;