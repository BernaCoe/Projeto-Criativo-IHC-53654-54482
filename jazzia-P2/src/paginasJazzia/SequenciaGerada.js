// Feito por 53654

import React, { useState, useEffect } from 'react';
import { openDB } from 'idb';
import { useLocation, useNavigate } from 'react-router-dom';

import {FundoEstudio, BarraSuperiorNormal, BotaoNormal, BarraInferiorDashboard} from "../componentesReact/componentesGlobais";
import "../componentesReact/componentesGlobais.css";
import {TabelaSequenciaGerada, CaixaSequenciaGerada} from '../componentesReact/SequenciaGerada';
import {ModalSucesso, ModalErroInformativo, ModalGuardar} from "../componentesReact/Modais"
import { useUser } from "@clerk/clerk-react";



const BASE_URL = "https://genjazz-api.fly.dev";


function SequenciaGerada(){

    const [ultimoId, setUltimoId] = useState(null);

    const location = useLocation();
        
    const { user } = useUser();
    const email = user?.primaryEmailAddress?.emailAddress;

    const [selectedKey, setKeys] = useState(null);
    const [selectedStructure, setStructures] = useState(null);
    const [selectedModulation, setModulations] = useState(null);

    // Tenta ler do state, se não existir, usa o valor de teste
    const dadosIniciais = location.state?.progression || { 
        chords: [ "C", "G", "Am", "E", "F", "C", "G", "C", "F", "G", "C", "Am", "Dm", "G", "C", "C"] // Exemplo de acordes, por defeito
    };

    const [progression, setProgression] = useState(dadosIniciais);
    
    const [audioUrl, setAudioUrl] = useState(null);
    const [error, setError] = useState(null);
    const [showGuardar, setShowGuardar] = useState(false);
    const [showErroAudio, setShowErroAudio] = useState(false);
    
    const [showSucesso, setShowSucesso] = useState(false);
    const [showErro, setShowErro] = useState(false);

    

    const convertToMp3 = async () => {
        if (!progression?.chords) return;

        try {
        const encoded = encodeURIComponent(progression.chords);
        const res = await fetch(`${BASE_URL}/api/chords2mp3/${encoded}`);
        const data = await res.json();

        setAudioUrl(`${BASE_URL}${data.mp3_url}`);
        } catch (err) {
        setError(err.message);
        setShowErroAudio(true); // Dispara o modal específico de áudio
        }
    };



const initDB = async () => {
    return await openDB('GenJazzDB', 1, {
        upgrade(db) {
            db.createObjectStore('sequences', { keyPath: '_id', autoIncrement: true });
        },
    });
};

const saveProgression = async (nome) => {
    if (!nome || nome.trim() === "") { /* ... */ return; }
    if (!progression?.chords || !email) { /* ... */ return; }

    const novaSequencia = {
        email,
        name: nome,
        chords: progression.chords,
        key: selectedKey,
        structure: selectedStructure || "Random",
        modulation: selectedModulation || "Random",
        timestamp: new Date().toISOString() // Útil para ordenação
    };

    try {
        // Tenta guardar no Servidor
        const res = await fetch(`${BASE_URL}/api/chords`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(novaSequencia)
        });

        if (!res.ok) throw new Error("Falha no servidor");

        const data = await res.json();
        
        // Se o servidor deu OK, guarda no IndexedDB com o ID que ele devolveu
        const db = await initDB();
        await db.put('sequences', { ...novaSequencia, _id: data.id || data._id });
        const idFinal = data.id || data._id;
        setUltimoId(idFinal);
        
        console.log('Guardado com sucesso na API e IndexedDB! Id na API:', data.id);
        setShowSucesso(true);

    } catch (err) {
        // Se falhar (Sem rede ou erro de servidor), guarda apenas em IndexedDB
        console.warn("API indisponível, a guardar localmente...", err);
        const db = await initDB();
        await db.put('sequences', novaSequencia);
        setUltimoId("Local (Offline)"); // Indica que é local
        setShowSucesso(true);
        
        // Avisa o utilizador que guardou mas offline
        console.log("Guardado apenas localmente. Sincronize depois.");
        setShowSucesso(true); 
    }
};


    return(
        <div className="pagina-conteudo">
        <FundoEstudio>
            <BarraSuperiorNormal/>

            {progression && (
                <CaixaSequenciaGerada nome='Sequência Gerada'>
                    <TabelaSequenciaGerada acordes={progression.chords} />
                </CaixaSequenciaGerada>
            )}

            {audioUrl && (
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                width: '100%', 
                margin: '10px 0' // Espaço entre o áudio e os botões
            }}>
                <audio controls src={audioUrl} />
            </div>
        )}

            <BotaoNormal 
                texto="Ouvir" 
                onClick={convertToMp3} 
            />

            <BotaoNormal 
                texto="Guardar" 
                onClick={() => setShowGuardar(true)}
            />            

            
            {showGuardar && (
                <ModalGuardar 
                    onClose={() => setShowGuardar(false)}
                    onConfirm={(nome) => {
                        saveProgression(nome);
                        setShowGuardar(false);
                    }}
                />
            )}

            {showSucesso && (
                <ModalSucesso 
                    mensagem={`A sequência foi guardada com sucesso! ID ${ultimoId}`}
                    onClose={() => setShowSucesso(false)} 
                />
            )}

            {/* Modal Erro (Guardar) */}
            {showErro && (
                <ModalErroInformativo 
                    mensagem="Não foi possível guardar a sequência." 
                    onClose={() => setShowErro(false)} 
                />
            )}

            {/* Modal Erro (Áudio) */}
            {showErroAudio && (
                <ModalErroInformativo 
                    mensagem="Ocorreu um erro na reprodução do áudio." 
                    onClose={() => setShowErroAudio(false)} 
                />
            )}

            </FundoEstudio>
            </div>
       
    );
}


export default SequenciaGerada;
