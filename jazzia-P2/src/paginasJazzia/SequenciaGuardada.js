// Feito por 53654

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import {FundoEstudio, BarraSuperiorNormal, BotaoNormal} from "../componentesReact/componentesGlobais";
import "../componentesReact/componentesGlobais.css";
import {TabelaSequenciaGerada, CaixaSequenciaGerada} from '../componentesReact/SequenciaGerada';
import {ModalSucesso, ModalErroInformativo, ModalAtencao} from "../componentesReact/Modais"
import { useUser } from "@clerk/clerk-react";




const BASE_URL = "https://genjazz-api.fly.dev";


function SequenciaGuardada(){

    const location = useLocation();
    const navigate = useNavigate();
        
    // Temporariamente:
    const user = { primaryEmailAddress: { emailAddress: "teste@exemplo.com" } };

    // const { user } = useUser();
    const email = user?.primaryEmailAddress?.emailAddress;

    const [savedProgression, setSavedProgressions] = useState(
        location.state?.progression || { chords: [ "C", "G", "Am", "E", "F", "C", "G", "C", "F", "G", "C", "Am", "Dm", "G", "C", "C"] }
    );

    const [audioUrl, setAudioUrl] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showErroAudio, setShowErroAudio] = useState(false);
    
    const [showSucesso, setShowSucesso] = useState(false);
    const [showErro, setShowErro] = useState(false);



useEffect(() => {
    // Só carrega a API se não tiver recebido a sequência pelo state
    // (Útil se o utilizador fizer refresh à página)
    if (!location.state?.progression && email) {
        // Aqui pode-se ir procurar pelo ID
        // loadSavedProgressions(); 
    }
}, [email, location.state]);


    const loadSavedProgressions = async () => {
        if (!email) return;
    
        try {
          const res = await fetch(`${BASE_URL}/api/chords/user/${email}`);
          const data = await res.json();
          setSavedProgressions(data);
        } catch (err) {
          setError(err.message);
        }
      };
    
      useEffect(() => {
        if (email) loadSavedProgressions();
    }, [email]);



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
            const res = await fetch(`${BASE_URL}/api/chords/${email}/${id}`, {
                method: "DELETE"
            });

            if (res.ok) {
                setShowSucesso(true);
                setTimeout(() => navigate("/listaSequencia"), 2000);
            } else {
                throw new Error("Falha ao eliminar");
            }
        } catch (err) {
            setError(err.message);
            setShowErro(true); // Abre o modal de erro
        }
    };




    return(
        <div className="pagina-conteudo">
        <FundoEstudio>
            <BarraSuperiorNormal/>

            {savedProgression && (
                <CaixaSequenciaGerada texto='Sequência Gerada'>
                    <TabelaSequenciaGerada acordes={savedProgression.chords} />
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
                texto="Apagar" 
                onClick={() => setShowDelete(true)}
            />


            {showDelete && (
                <ModalAtencao
                    mensagem="Pretende mesmo eliminar esta sequência?"
                    onClose={() => setShowDelete(false)}
                    onConfirm={() => {
                        // Fecha o modal
                        setShowDelete(false); 
                        // 2. Chama a função passando o ID correto
                        // (savedProgression tem de ter o campo _id ou id)
                        deleteProgression(savedProgression._id); 
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
