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
  const USE_MOCK = true;




  const loadSavedProgressions = async () => {
    if (USE_MOCK) {
      // Dados estáticos de exemplo
      const mockData = [
        { _id: '1', id: '1', name: 'Progressão Jazz II-V-I' },
        { _id: '2', id: '2', name: 'Blues em Fá' }
      ];
      setSavedProgressions(mockData);
      setLoading(false);
      return;
    }

    if (!email) return;

    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/api/chords/user/${email}`);
      const data = await res.json();
      setSavedProgressions(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
      setShowErrorModal(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSavedProgressions();
  }, [email]);



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