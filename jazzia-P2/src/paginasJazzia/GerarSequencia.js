// Feito por 53654

import React, { useState, useEffect } from 'react';
import LoadingScreen from "../componentesReact/LoadingScreen";

import {FundoEstudio, BarraSuperiorNormal, BotaoNormal} from "../componentesReact/componentesGlobais";
import "../componentesReact/componentesGlobais.css";
import "../componentesReact/GerarSequencia.css";
import {CaixaTonalidade, CaixaEstrutura, CaixaModulacao} from "../componentesReact/GerarSequencia";
import { useNavigate } from 'react-router-dom';
import {ModalErroInformativo} from "../componentesReact/Modais.jsx"






const BASE_URL = "https://genjazz-api.fly.dev";


function GerarSequencia(){

    const navigate = useNavigate();

    const [selectedKey, setSelectedKey] = useState(null);
    const [selectedStructure, setSelectedStructure] = useState(null);
    const [selectedModulation, setSelectedModulation] = useState(null);
    const [progression, setProgression] = useState(null);
    const [audioUrl, setAudioUrl] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showErro, setShowErro] = useState(null);

    const [keys, setKeys] = useState([]);
    const [structures, setStructures] = useState([]);
    const [modulations, setModulations] = useState([]);

    const isFormComplete = selectedKey && selectedStructure && selectedModulation;


      useEffect(() => {
        const load = async () => {
          try {
            setLoading(true);
    
            const [kRes, sRes, mRes] = await Promise.all([
              fetch(`${BASE_URL}/api/keys`),
              fetch(`${BASE_URL}/api/structures`),
              fetch(`${BASE_URL}/api/modulations`)
            ]);
    
            const kData = await kRes.json();
            const sData = await sRes.json();
            const mData = await mRes.json();
    
            setKeys(kData.map(k => k.key ?? k));
            setStructures(sData.map(s => s.structure ?? s).slice(0, 10)); // TOP 10
            setModulations(mData.map(m => m.modulation ?? m));
            
            console.log("Lista de tonalidades que a API aceita:", kData); // Para debug
                    
            // para debugging
            fetch(`${BASE_URL}/api/structures`)
            .then(res => res.json())
            .then(data => console.log("Estruturas válidas:", data));

            fetch(`${BASE_URL}/api/modulations`)
            .then(res => res.json())
            .then(data => console.log("Modulações válidas:", data));

          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        };
    
        load();
      }, []);


      if (loading) return <LoadingScreen />;


    
const generateProgression = async () => {
    try {
        setLoading(true);

        // Define valores padrão caso o utilizador não tenha selecionado nada
        const key = selectedKey || "Random";
        const structure = selectedStructure || "Random";
        const modulation = selectedModulation || "Random";

        const url = `${BASE_URL}/api/generate/${encodeURIComponent(key)}/${encodeURIComponent(structure)}/${encodeURIComponent(modulation)}`;
        
        const res = await fetch(url);
        console.log("URL final enviada:", url);

        if (res.status === 500) {
            throw new Error("Combinação indisponível");
        }
        if (!res.ok) {
            throw new Error("Falha no servidor");
        }

        const data = await res.json();

        setProgression(data);
        setAudioUrl(null);
        navigate('/sequenciaGerada', { state: { progression: data } });
        
    } catch (err) {
        console.error("Erro capturado:", err.message);
        setError(err.message);
        setShowErro(true);
    } finally {
        setLoading(false);
    }
};



    return(
        <div className="pagina-conteudo">
          <FundoEstudio> 
              <BarraSuperiorNormal/>

              <CaixaTonalidade 
              onSelect={setSelectedKey} 
              selectedKey={selectedKey} 
              />

              <CaixaEstrutura 
              onSelect={setSelectedStructure} 
              selectedStructure={selectedStructure}
              opcoes={structures}
              />

              <CaixaModulacao 
              onSelect={setSelectedModulation} 
              selectedModulation={selectedModulation}
              opcoes={modulations}
              />

              <BotaoNormal 
                  texto="Gerar" 
                  disabled={!isFormComplete} // Botão desativado se faltar algo
                  onClick={isFormComplete ? () => {
                      setShowErro(false);
                      generateProgression();
                  } : undefined}
              />

              {/* Mensagem informativa */}
              {!isFormComplete && (
                  <p style={{ color: '#000000', textAlign: 'center', fontSize: '14px', marginTop: '10px', backgroundColor: 'gold', height:'50px', alignContent: 'center'}}>
                      Selecione as 3 propriedades para gerar.
                  </p>
              )}

      
              {showErro && (
                  <ModalErroInformativo
                      // Se for erro 500, a mensagem é informativa
                      mensagem={"Esta combinação ainda não está disponível na base de dados. Por favor, tente outra."}
                      
                      onClose={() => setShowErro(false)}
                    
                      onConfirm={ () => {
                              setShowErro(false);
                              generateProgression();
                          }
                      }
                  />
              )}

          </FundoEstudio>
        </div>


);


}

export default GerarSequencia;
