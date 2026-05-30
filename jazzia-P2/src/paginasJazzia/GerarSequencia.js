// Feito por 53654

import React, { useState, useEffect } from 'react';
import { ClipLoader } from "react-spinners";

import {FundoEstudio, BarraSuperiorNormal, BotaoNormal} from "../componentesReact/componentesGlobais";
import "../componentesReact/componentesGlobais.css";
import "../componentesReact/GerarSequencia.css";
import {CaixaTonalidade, CaixaEstrutura, CaixaModulacao} from "../componentesReact/GerarSequencia";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from 'react-router-dom';

import {ModalErroComDecisao} from "../componentesReact/Modais.jsx"






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
    const [showErroGeracao, setShowErroGeracao] = useState(null);

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
            
            console.log("LISTA DE CHAVES QUE A API ACEITA:", kData); // Para debug
                    
            // para debuggin
            fetch(`${BASE_URL}/api/structures`)
            .then(res => res.json())
            .then(data => console.log("Estruturas válidas:", data));


          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        };
    
        load();
      }, []);


      if (loading) return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
            <ClipLoader color="#CB7822" size={50} />
        </div>
      );


    
    const generateProgression = async () => {
      try {
        setLoading(true);
        // Traduz apenas para os termos que não estão na lista da API
        const traducao = {
            "Aleatório": "Random",
            "Dominante": "Dominant",
            "Sub-Dominante": "Sub-Dominant",
            "Paralelo": "Parallel",
            "Relativo": "Relative",
            "Cromático": "Chromatic"
        };


        const processarParametro = (valor, ehChave) => {
            // Se for uma tonalidade/chave, não traduz, usa o valor original
            if (ehChave) return valor; 
            // Se for outro termo (estrutura/modulação), tenta traduzir
            return traducao[valor] || valor;
        };

        const key = encodeURIComponent(processarParametro(selectedKey || "Random", true));
        const structure = encodeURIComponent(processarParametro(selectedStructure || "Random", false));
        const modulation = encodeURIComponent(processarParametro(selectedModulation || "Random", false));
        // const res = await fetch(`${BASE_URL}/api/generate/${key}/${structure}/${modulation}`);

        const url = `${BASE_URL}/api/generate/${key}/${structure}/${modulation}`;
        const res = await fetch(url);  
        console.log("URL final enviada:", url); // para debug   
          
        if (res.status === 500) {
            throw new Error("combinação_indisponivel");
        }
        if (!res.ok) throw new Error("Falha na rede");

        const data = await res.json();

        setProgression(data);
        setAudioUrl(null);
        navigate('/sequenciaGerada', { state: { progression: data } }); // Passa os dados aqui para a página seguinte
        
      } catch (err) {
          console.error("Erro capturado:", err.message);
          // Se for 500, guarda um erro específico
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
              />

              <CaixaModulacao 
              onSelect={setSelectedModulation} 
              selectedModulation={selectedModulation}
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
                  <p style={{ color: '#A25F19', textAlign: 'center', marginTop: '10px' }}>
                      Selecione as 3 propriedades para gerar.
                  </p>
              )}

      
              {showErro && (
                  <ModalErroComDecisao 
                      // Se for erro 500, a mensagem é mais informativa
                      mensagem={error === "combinação_indisponivel" 
                          ? "Esta combinação ainda não está disponível na base de dados. Por favor, tente outra." 
                          : "Falha na ligação. Tentar novamente?"}
                      
                      onClose={() => setShowErro(false)}
                      
                      // Se for erro de rede, o confirmar tenta de novo. 
                      // Se for combinação, o confirmar fecha o modal para o utilizador mudar a seleção
                      onConfirm={error === "combinação_indisponivel" 
                          ? () => setShowErro(false) 
                          : () => {
                              setShowErro(false);
                              generateProgression();
                          }
                      }
                      textoConfirmar={error === "combinação_indisponivel" ? "Entendido" : "Tentar de novo"}
                  />
              )}

          </FundoEstudio>
        </div>


);


}

export default GerarSequencia;
