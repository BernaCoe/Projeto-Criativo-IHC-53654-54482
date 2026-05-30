// Feito por 54482

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FundoEstudio, BarraSuperiorNormal, BotaoSequenciaGuardada} from "../componentesReact/componentesGlobais";
import AppButton from '../componentesReact/buttons/AppButton';
import '../componentesReact/ListaSequencias.css';


// Aqui mantemos os objetos para que a navegação funcione com todos os dados
const MOCK_SEQUENCES = [
  { id: 1, name: 'Nome da Sequência A', chords: ['C', 'G'] },
  { id: 2, name: 'Nome da Sequência B', chords: ['Am', 'F'] },
  { id: 3, name: 'Nome da Sequência C', chords: ['D', 'A'] },
];

function ListaSequencias() {
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState('asc');

  const sorted = [...MOCK_SEQUENCES].sort((a, b) =>
    sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
  );

  return (
    <div className='pagina-conteudo'>
    <FundoEstudio>
        <BarraSuperiorNormal />

        <div className="guardados-content">
          <button
            className="guardados-sort"
            onClick={() => setSortOrder(o => o === 'asc' ? 'desc' : 'asc')}
          >
            Ordem: {sortOrder === 'asc' ? 'A–Z' : 'Z–A'}
          </button>

          <div>
            {sorted.map((sequencia) => (

              <BotaoSequenciaGuardada
                key={sequencia.id}
                texto={sequencia.name} 
                onClick={() => navigate("/sequenciaGuardada", { 
                  state: { progression: sequencia } 
                })}
              />

            ))}
          </div>
        </div>
    </FundoEstudio>
    </div>
  );
}

export default ListaSequencias;