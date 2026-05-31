// Feito por 53654

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ClipLoader } from "react-spinners";
import {FundoEstudio, BarraSuperiorNormal, BotaoNormal} from "../componentesReact/componentesGlobais";
import "../componentesReact/componentesGlobais.css";
import {TabelaSequenciaGerada, CaixaSequenciaGerada} from '../componentesReact/SequenciaGerada';
import {ModalSucesso, ModalErroInformativo, ModalAtencao} from "../componentesReact/Modais"
import { useUser } from "@clerk/clerk-react";
import { openDB } from 'idb';
import LoadingScreen from "../componentesReact/LoadingScreen";



const BASE_URL = "https://genjazz-api.fly.dev";


function SequenciaGuardada(){

    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useUser();
    const email = user?.primaryEmailAddress?.emailAddress;

    const [savedProgression, setSavedProgression] = useState(
        location.state?.progression || null
    );

    const [audioUrl, setAudioUrl] = useState(null);
    const [error, setError] = useState(null);
    const [showDelete, setShowDelete] = useState(false);
    const [showErroAudio, setShowErroAudio] = useState(false);
    
    const [showSucesso, setShowSucesso] = useState(false);
    const [showErro, setShowErro] = useState(false);



    useEffect(() => {
        
        if (!location.state?.progression && email) {
            // Aqui pode-se ir procurar pelo ID
           // loadSavedProgressions(); 
        }
    }, [email, location.state]);


const loadSavedProgressions = async () => {
    try {
        const res = await fetch(`${BASE_URL}/api/chords/user/${email}`);
        const data = await res.json();
        
        const idParaBuscar = location.state?.progression?.id;
        const encontrada = data.find(item => item.id === idParaBuscar);
        
        if (encontrada) {
            console.log("Objeto encontrado na API:", encontrada);
            setSavedProgression(encontrada); 
        }
    } catch (err) {
        setError(err.message);
    }
};

    useEffect(() => {
        // Só carrega se não tiver os dados no state
        if (email && !savedProgression) {
            loadSavedProgressions();
        }
    }, [email, savedProgression]);



    const convertToMp3 = async () => {
        if (!savedProgression?.chords) return;

        try {
        const encoded = encodeURIComponent(savedProgression.chords);
        const res = await fetch(`${BASE_URL}/api/chords2mp3/${encoded}`);
        const data = await res.json();

        setAudioUrl(`${BASE_URL}${data.mp3_url}`);
        } catch (err) {
        setError(err.message);
        setShowErroAudio(true); // Dispara o modal específico de erro de áudio
        }
    };


    const deleteProgression = async (id) => {
        if (!email || !id) return;

        try {
            // Tenta eliminar no servidor
            const res = await fetch(`${BASE_URL}/api/chords/${email}/${id}`, {
                method: "DELETE"
            });

            if (!res.ok) throw new Error("Falha ao eliminar no servidor");

            // Se o servidor OK, elimina também da IndexedDB
            const db = await openDB('GenJazzDB', 1);
            await db.delete('sequences', id); 

            // Sucesso total
            setShowSucesso(true);
            setTimeout(() => navigate("/listaSequencias"), 1000);

        } catch (err) {
            console.error("Erro ao eliminar:", err);
            setError(err.message);
            setShowErro(true);
        }
    };




    return(
        <div className="pagina-conteudo">
        <FundoEstudio>
            <BarraSuperiorNormal to="/listaSequencias" />

            {savedProgression && (
                (() => {
                    // 1. Extrai o ID e formata
                    const idBruto = savedProgression._id || savedProgression.id || "0000";
                    const idCurto = String(idBruto).slice(-4).toUpperCase();
                    
                    // Define o título apenas como "Progressão" + ID
                    const tituloFinal = `Progressão ${idCurto}`;

                    return (
                        <CaixaSequenciaGerada nome={tituloFinal}>
                            <TabelaSequenciaGerada 
                                acordes={savedProgression.chords || savedProgression} 
                            />
                        </CaixaSequenciaGerada>
                    );
                })()
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
                texto="Apagar" 
                onClick={() => setShowDelete(true)}
            />


            {showDelete && (
                <ModalAtencao
                    mensagem="Pretende mesmo eliminar esta sequência?"
                    onClose={() => setShowDelete(false) }
                    onConfirm={() => {
                        setShowDelete(false); 
                        deleteProgression(savedProgression.id);
                        console.log('Progressão eliminada! ID', savedProgression.id); 
                    }}
                />
            )}

            
            {showSucesso && (
                <ModalSucesso 
                    mensagem="A sequência foi eliminada com sucesso." 
                    onClose={() => setShowSucesso(false)} 
                />
            )}

            {/* Modal Erro (Guardar) */}
            {showErro && (
                <ModalErroInformativo 
                    mensagem="Não foi possível eliminar a sequência." 
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


export default SequenciaGuardada;
