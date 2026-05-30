
import './TopBar.css';
import { useNavigate } from 'react-router-dom';

function TopBar({ label = 'Voltar à Entrada', to = '/' }) {
  const navigate = useNavigate();
  return (
    <div className="topbar">
      <button className="topbar-back" onClick={() => navigate(to)}>
        ↩ {label}
      </button>
    </div>
  );
}

export default TopBar;