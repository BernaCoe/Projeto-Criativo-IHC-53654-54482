// Feito por 53654

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import {FundoEstudio, BarraSuperiorNormal, BotaoNormal, BarraInferiorDashboard} from "../componentesReact/componentesGlobais";
import "../componentesReact/componentesGlobais.css";
import {TabelaSequenciaGerada, CaixaSequenciaGerada} from '../componentesReact/SequenciaGerada';
import {ModalSucesso, ModalErroInformativo, ModalGuardar} from "../componentesReact/Modais"
import { useUser } from "@clerk/clerk-react";




const BASE_URL = "https://genjazz-api.fly.dev";


function SequenciaGerada(){

    const location = useLocation();
        
    // Temporariamente:
    const user = { primaryEmailAddress: { emailAddress: "teste@exemplo.com" } };

    // const { user } = useUser();
    const email = user?.primaryEmailAddress?.emailAddress;

    const [selectedKey, setKeys] = useState(null);
    const [selectedStructure, setStructures] = useState(null);
    const [selectedModulation, setModulations] = useState(null);

    // Tentamos ler do state, se não existir, usamos o valor de teste
    const dadosIniciais = location.state?.progression || { 
        chords: [ "C", "G", "Am", "E", "F", "C", "G", "C", "F", "G", "C", "Am", "Dm", "G", "C", "C"] // Exemplo de acordes, por defeito


    };

    const [progression, setProgression] = useState(dadosIniciais);
    
    const [audioUrl, setAudioUrl] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
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


const saveProgression = async (nome) => {
    // 1. Validação para impedir nome vazio ou nulo
    if (!nome || nome.trim() === "") {
        setError("Por favor, insira um nome válido para a sequência.");
        setShowErro(true);
        return;
    }

    // 2. Validação básica de dados
    if (!progression?.chords || !email) {
        setError("Dados da progressão em falta.");
        setShowErro(true);
        return;
    }

    try {
        const res = await fetch(`${BASE_URL}/api/chords`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email,
                name: nome,
                chords: progression.chords,
                key: selectedKey,
                structure: selectedStructure || "Random",
                modulation: selectedModulation || "Random"
            })
        });

        // 3. Verificação de sucesso do servidor
        if (!res.ok) {
            throw new Error("O servidor não conseguiu guardar a sequência.");
        }

        setShowSucesso(true); // Abre o modal de sucesso

    } catch (err) {
        // 4. Captura erros de rede (ex: sem internet) e o throw new Error acima
        console.error("Erro ao guardar:", err);
        setError("Não foi possível ligar ao servidor. Tente novamente mais tarde.");
        setShowErro(true); // Abre o modal de erro
    }
};



    return(
        <div className="pagina-conteudo">
        <FundoEstudio>
            <BarraSuperiorNormal/>

            {progression && (
                <CaixaSequenciaGerada texto='Sequência Gerada'>
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
                    mensagem="A sequência foi guardada com sucesso." 
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
