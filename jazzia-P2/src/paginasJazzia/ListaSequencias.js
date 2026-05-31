import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react'; // Para obter o email do Clerk
import { FundoEstudio, BarraSuperiorNormal, BotaoSequenciaGuardada } from "../componentesReact/componentesGlobais";
import { ModalErroComDecisao } from "../componentesReact/Modais";
import '../componentesReact/ListaSequencias.css';



function ListaSequencias() {

  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [savedProgressions, setSavedProgressions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  // Obtém o email do Clerk
  const email = user?.primaryEmailAddress?.emailAddress;
  const BASE_URL = "https://genjazz-api.fly.dev";



    useEffect(() => {
        
        console.log("State recebido:", location.state);
        
        const fetchProgressionById = async () => {
            
        if (location.state?.progression) {
            setSavedProgressions(location.state.progression);
            return;
        }

        // Caso contrário, tenta buscar pelo ID se existir
        const id = location.state?.progression?._id;
        if (!email || !id) {
            console.warn("Falta email ou ID:", { email, id });
            return;
        }

            try {
                setLoading(true);
                // O servidor trata de buscar os detalhes completos desta sequência específica
                const res = await fetch(`${BASE_URL}/api/chords/${email}/${location.state.progression._id}`);
                const data = await res.json();
                
                setSavedProgressions(data);

            } catch (err) {
                setShowErrorModal(true);
            } finally {
                setLoading(false);
            }
        };

        fetchProgressionById();
    }, [email, location.state, BASE_URL]);

  // Ordenação
  const sorted = [...savedProgressions].sort((a, b) =>
    sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
  );

  if (error) return <div>Erro: {error}</div>;

  return (
    <div className='pagina-conteudo'>
      <FundoEstudio>
        <BarraSuperiorNormal />
        <div className="guardados-content">
          <button className="guardados-sort" onClick={() => setSortOrder(o => o === 'asc' ? 'desc' : 'asc')}>
            Ordem: {sortOrder === 'asc' ? 'A–Z' : 'Z–A'}
          </button>

          <div>
            {sorted.map((sequencia) => (
              <BotaoSequenciaGuardada
                key={sequencia.id} 
                texto={sequencia.name} 
                onClick={() => navigate("/sequenciaGuardada", { 
                    state: { progression: { _id: sequencia._id } } 
                })}
              />
            ))}
          </div>
        </div>

        {showErrorModal && (
            <ModalErroComDecisao 
            mensagem={'Não foi possível carregar dados do servidor. Tentar novamente?'}
            onClose={() => setShowErrorModal(false)} // Fecha o modal
            onConfirm={() => {
                setShowErrorModal(false);
                window.location.reload(); 
            }}
            />
        )}
      </FundoEstudio>
    </div>
  );
}

export default ListaSequencias;