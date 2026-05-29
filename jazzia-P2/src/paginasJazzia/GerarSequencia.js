import React, { useState } from 'react';

import {FundoEstudio, BarraSuperiorNormal, BotaoNormal} from "../componentesReact/componentesGlobais";
import "../componentesReact/componentesGlobais.css";
import "../componentesReact/GerarSequencia.css";
import {CaixaTonalidade, CaixaEstrutura, CaixaModulacao} from "../componentesReact/GerarSequencia";
import { useUser } from "@clerk/clerk-react";



const BASE_URL = "https://genjazz-api.fly.dev";


function GerarSequencia(){

const [selectedKey, setSelectedKey] = useState(null);
    const [selectedStructure, setSelectedStructure] = useState(null);
    const [selectedModulation, setSelectedModulation] = useState(null);
    const [progression, setProgression] = useState(null);
    const [audioUrl, setAudioUrl] = useState(null);
    const [error, setError] = useState(null);
    
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
        } catch (err) {
        setError(err.message);
        }
    };



    return(
        <>
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
            onClick={generateProgression} 
            />
        </FundoEstudio>
        </>
    );
}

export default GerarSequencia;
