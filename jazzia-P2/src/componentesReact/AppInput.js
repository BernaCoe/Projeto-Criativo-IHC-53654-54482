
import './AppInput.css';

function AppInput({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
}) {
  return (
    <div className="app-input-wrapper">
      {label && <span className="app-input-label">{label}</span>}
      <input
        className="app-input"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete="off"
      />
    </div>
  );
}

export default AppInput;