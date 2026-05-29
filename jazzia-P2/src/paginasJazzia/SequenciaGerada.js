import React, { useState, useEffect } from 'react';

import {FundoEstudio, BarraSuperiorNormal, BotaoNormal} from "../componentesReact/componentesGlobais";
import "../componentesReact/componentesGlobais.css";
import {TabelaSequenciaGerada, CaixaSequenciaGerada} from '../componentesReact/SequenciaGerada';
import {ModalSucesso, ModalErroInformativo, ModalGuardar} from "../componentesReact/Modais"
import { useUser } from "@clerk/clerk-react";




const BASE_URL = "https://genjazz-api.fly.dev";


function SequenciaGerada(){
        
    // Temporariamente:
    const user = { primaryEmailAddress: { emailAddress: "teste@exemplo.com" } };

    // const { user } = useUser();
    const email = user?.primaryEmailAddress?.emailAddress;

    const [selectedKey, setKeys] = useState(null);
    const [selectedStructure, setStructures] = useState(null);
    const [selectedModulation, setModulations] = useState(null);
    // const [progression, setProgressions] = useState(null);
    // Apenas para teste, coloca dados falsos para ver se a tabela aparece
    const [progression, setProgressions] = useState({ chords: ["C", "Am", "Dm", "G", "C", "Am", "Dm", "G", "C", "Am", "Dm", "G", "C", "Am", "Dm", "G", ] });
    const [audioUrl, setAudioUrl] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const [showGuardar, setShowGuardar] = useState(false);
    const [showErroAudio, setShowErroAudio] = useState(false);
    
    const [showSucesso, setShowSucesso] = useState(false);
    const [showErro, setShowErro] = useState(false);

    

    
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


    const saveProgression = async () => {
        if (!progression?.chords || !email) {
            setError("Progressão ou utilizador inválido.");
            setShowErro(true);
            return;
        }

        try {
            const res = await fetch(`${BASE_URL}/api/chords`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email,
                chords: progression.chords,
                key: selectedKey,
                structure: selectedStructure || "Random",
                modulation: selectedModulation || "Random"
            })
            });

            if (!res.ok) throw new Error("Falha ao guardar no servidor.");
                setShowSucesso(true); // Se tudo correu bem, abre o modal de sucesso
            } catch (err) {
                setError(err.message);
                setShowErro(true); // Se deu erro, abre o modal de erro
            }
        };



    return(
        <>
        <FundoEstudio>
            <BarraSuperiorNormal/>

            {progression && (
                <CaixaSequenciaGerada>
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
            </>
       
    );
}


export default SequenciaGerada;
