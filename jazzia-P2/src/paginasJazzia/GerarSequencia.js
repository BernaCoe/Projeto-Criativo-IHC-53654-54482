// Feito por 53654

import React, { useState, useEffect } from 'react';

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
    const [loading, setLoading] = useState(null);
    const [showErro, setShowErro] = useState(null);
    const [showErroGeracao, setShowErroGeracao] = useState(null);

      const [keys, setKeys] = useState([]);
    const [structures, setStructures] = useState([]);
    const [modulations, setModulations] = useState([]);



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
    
          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        };
    
        load();
      }, []);


    
    const generateProgression = async () => {
        try {
        const key = selectedKey || "Random";
        const structure = selectedStructure || "Random";
        const modulation = selectedModulation || "Random";

        const res = await fetch(`${BASE_URL}/api/generate/${key}/${structure}/${modulation}`);
            
        if (!res.ok) throw new Error("Falha na rede");

        const data = await res.json();

        setProgression(data);
            setAudioUrl(null);
            navigate('/sequencia-gerada', { state: { progression: data } }); // Passa os dados aqui para a página seguinte
        } catch (err) {
            setShowErro(true);
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
              onClick={() => {
                  setShowErro(false); // Garante que o modal fecha ao clicar
                  generateProgression();
              }}
              />

      
              {showErro && (
                  <ModalErroComDecisao 
                      mensagem="Não foi possível gerar a sequência. Tentar novamente?" 
                      onClose={() => setShowErro(false)}
                      onConfirm={() => {
                          setShowErro(false); // Fecha o modal
                          generateProgression(); // Tenta de novo
                      }}
                  />
              )}

          </FundoEstudio>
        </div>


);


}

export default GerarSequencia;
