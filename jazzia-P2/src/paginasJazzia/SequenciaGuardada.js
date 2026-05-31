// Feito por 53654

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ClipLoader } from "react-spinners";
import {FundoEstudio, BarraSuperiorNormal, BotaoNormal} from "../componentesReact/componentesGlobais";
import "../componentesReact/componentesGlobais.css";
import {TabelaSequenciaGerada, CaixaSequenciaGerada} from '../componentesReact/SequenciaGerada';
import {ModalSucesso, ModalErroInformativo, ModalAtencao} from "../componentesReact/Modais"
import { useUser } from "@clerk/clerk-react";




const BASE_URL = "https://genjazz-api.fly.dev";


function SequenciaGuardada(){

    const location = useLocation();
    const navigate = useNavigate();
        
    const { user } = useUser();
    const email = user?.primaryEmailAddress?.emailAddress;

    const [savedProgression, setSavedProgressions] = useState(
        location.state?.progression || null
    );

    const [audioUrl, setAudioUrl] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showErroAudio, setShowErroAudio] = useState(false);
    
    const [showSucesso, setShowSucesso] = useState(false);
    const [showErro, setShowErro] = useState(false);



useEffect(() => {
    if ((!location.state?.progression || !location.state?.progression.chords) && email) {
        const fetchProgressionById = async () => {
            const id = location.state?.progression?._id;
            if (!id) return;

            try {
                setLoading(true);
                const res = await fetch(`${BASE_URL}/api/chords/${email}/${id}`);
                if (!res.ok) throw new Error('Falha ao carregar sequência');
                const data = await res.json();
                setSavedProgressions(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProgressionById();
    }
}, [email, location.state]);


        // Quando necessário, a sequência é carregada pelo _id no efeito acima.



    if (loading) {
        return (
            <div className="pagina-conteudo">
                <FundoEstudio>
                    <BarraSuperiorNormal />
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                        <ClipLoader color="#D4AF37" size={50} />
                    </div>
                </FundoEstudio>
            </div>
        );
    }

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
                setTimeout(() => navigate("/listaSequencias"), 2000);
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

            {error && (
                <div className="erro-mensagem" style={{ color: '#ff4747', margin: '16px 0', textAlign: 'center' }}>
                    Erro: {error}
                </div>
            )}

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
