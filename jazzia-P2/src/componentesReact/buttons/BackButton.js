
import './BackButton.css';
import { useNavigate } from 'react-router-dom';

function BackButton({ label = 'Voltar à Entrada', to = '/' }) {
  const navigate = useNavigate();
  return (
    <button className="back-btn" onClick={() => navigate(to)}>
      <span className="back-btn-arrow">↩</span>
      {label}
    </button>
  );
}

export default BackButton;