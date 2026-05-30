import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppButton from '../componentesReact/buttons/AppButton';
import '../componentesReact/componentesGlobais.css';
import { FundoEntrada } from "../componentesReact/componentesGlobais";

function PaginaEntrada() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate('/login'), 3000);
    return () => clearTimeout(timer); // Sai da pagina se o utilizador clicar manualmente
  }, [navigate]);

  return (
    <div className="pagina-entrada-fade">
      <FundoEntrada>
        <div className="entrada-content">
          <div className="entrada-actions">
            
          </div>
        </div>
      </FundoEntrada>
    </div>
  );
}

export default PaginaEntrada;