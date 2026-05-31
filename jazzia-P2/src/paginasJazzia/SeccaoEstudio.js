// Feito por 54482


import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';
import AppButton from '../componentesReact/buttons/AppButton';
import { FundoEstudio, BarraSuperiorDashboard, BarraInferiorDashboard, BotaoGrandeEstudio} from "../componentesReact/componentesGlobais";
import '../componentesReact/SeccaoEstudio.css';

function SeccaoEstudio() {
  const [tab, setTab] = useState('estudio');
  const navigate = useNavigate();
  const { signOut } = useClerk();

  return (
    <div className="pagina-conteudo">
    <FundoEstudio>
      <div className="menu-screen">
        <BarraSuperiorDashboard/>

        <div className="menu-content">
          {tab === 'estudio' && (
            <>
              <BotaoGrandeEstudio
                texto="Gerar Sequência" 
                onClick={() => navigate('/gerarSequencia')}
              />
              <BotaoGrandeEstudio
                texto="Sequências Guardadas"
                onClick={() => navigate('/listaSequencias')}
              />
            </>
          )}

        </div>

        <BarraInferiorDashboard />
      </div>
    </FundoEstudio>
    </div>
  );
}

export default SeccaoEstudio;