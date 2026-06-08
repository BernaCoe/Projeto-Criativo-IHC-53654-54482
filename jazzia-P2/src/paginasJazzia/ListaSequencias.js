// Feito por 54482 e 53654

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { FundoEstudio, BarraSuperiorNormal, BotaoSequenciaGuardada } from "../componentesReact/componentesGlobais";
import { ModalErroComDecisao } from "../componentesReact/Modais";
import LoadingScreen from "../componentesReact/LoadingScreen";
import '../componentesReact/ListaSequencias.css';
import { openDB } from 'idb';

function ListaSequencias() {

  const { user } = useUser();
  const navigate = useNavigate();
  
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [savedProgressions, setSavedProgressions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('asc');


  // Obtém o email do Clerk
  const email = user?.primaryEmailAddress?.emailAddress;
  const BASE_URL = "https://genjazz-api.fly.dev";




const loadSavedProgressions = async () => {
    
    setLoading(true);

    let dadosDaAPI = [];

    // Tenta buscar da API
    if (email) {
        try {
            const res = await fetch(`${BASE_URL}/api/chords/user/${email}`);
            if (res.ok) {
                dadosDaAPI = await res.json();
                
                // Se a API respondeu, garante que abase local está atualizada
                if (Array.isArray(dadosDaAPI)) {
                  const db = await openDB('GenJazzDB', 1, {
                      upgrade(db) { db.createObjectStore('sequences', { keyPath: '_id' }); }
                  });
                  
                  const tx = db.transaction('sequences', 'readwrite');
                  const store = tx.store;

                  for (const itemApi of dadosDaAPI) {
                      // Tenta buscar o que já tem localmente
                      const itemLocal = await store.get(itemApi._id);
                      
                      // Faz o 'merge': mantem o nome local (se existir), 
                      //    mas atualiza os acordes da API (caso tenham mudado)
                      const itemAtualizado = {
                          ...itemApi,
                          name: itemLocal?.name || itemApi.name || "Nome Indefinido - Consulte IndexedD"
                      };
                      
                      // Guarda o resultado final e preserva o nome
                      await store.put(itemAtualizado);
                  }
                  await tx.done;
              }
            }
        } catch (err) {
            console.warn({err});
        }
    }

    // Se a API falhou ou está vazia, vai buscar tudo o que está no IndexedDB
    try {
        const db = await openDB('GenJazzDB', 1);
        const dadosLocais = await db.getAll('sequences');
        
        // Combina os dados da API com os dados locais
        const dadosFinais = dadosDaAPI.map(itemApi => {
            // Procura se este item da API existe na IndexedDB com um nome definido
            const local = dadosLocais.find(l => l._id === itemApi._id);
            
            return {
                ...itemApi, // Dados da API
                // Usa o nome local se existir, senão usa o da API, senão "Sem nome"
                name: local?.name || itemApi.name || "Sem nome"
            };
        });
        
        setSavedProgressions(dadosFinais);
    } catch (dbErr) {
        setSavedProgressions(dadosDaAPI || []);
    }
    
    setLoading(false);
};
  useEffect(() => {
      loadSavedProgressions();
    }, [email]); 


    if (loading) return <LoadingScreen />;



// Ordenação Numérica pelo ID
const sorted = [...savedProgressions].sort((a, b) => {
    // Extrai o ID e garante que é um número (usa parseInt para ignorar strings)
    const idA = parseInt(a._id || a.id || 0);
    const idB = parseInt(b._id || b.id || 0);

    return sortOrder === 'desc' 
        ? idA - idB 
        : idB - idA;
});



  return (
  <div className='pagina-conteudo'>
    <FundoEstudio>
      <BarraSuperiorNormal to="/estudio" />
      <div className="guardados-content" style={{ maxHeight: 'calc(100vh - 100px)'}}>
        <button className="guardados-sort" onClick={() => setSortOrder(o => o === 'asc' ? 'desc' : 'asc')}>
          Ordem ID: {sortOrder === 'desc' ?  'Decrescente' : 'Crescente'}
        </button>

        <div className="guardados-list">
          {sorted.map((sequencia) => {
            const idBruto = sequencia._id || sequencia.id || "0000";
            const idCurto = String(idBruto).slice(-4).toUpperCase();
            const textoNome = `Sequência ${idCurto}`;
            const textoCifras = `${sequencia.chords ? sequencia.chords.substring(0, 34) + "..." : "Sem acordes"}`;
            return (
              <BotaoSequenciaGuardada
                key={sequencia._id || sequencia.id}
                texto={textoNome}
                textoAcordes={textoCifras}
                onClick={() => navigate("/sequenciaGuardada", { state: { progression: sequencia } })}
              />
            );
          })}
        </div>
        <div style={{marginBottom: '40px'}}></div>
      </div>

      {showErrorModal && (
        <ModalErroComDecisao 
          mensagem={'Não foi possível carregar dados do servidor. Tentar novamente?'}
          onClose={() => setShowErrorModal(false)}
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