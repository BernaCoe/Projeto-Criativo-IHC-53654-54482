// Estética e funcionalidades de interação feitas por 53654
// Funcionalidades de persistência feita por 54482

import { useClerk } from "@clerk/clerk-react";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../componentesReact/componentesGlobais.css";
import "../componentesReact/SeccaoConta.css";

import { FundoConta, BarraSuperiorDashboard, BarraInferiorDashboard } from "../componentesReact/componentesGlobais";
import { CaixaConta, BotaoConta } from "../componentesReact/SeccaoConta";


function SeccaoConta() {
    const navigate = useNavigate();
    const { signOut } = useClerk();
    
    // Estado para controlar a edição e os dados
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState({ 
        nome: "Nome Utilizador", 
        profissao: "Profissão" 
    });

    const handleLogout = async () => {
    await signOut(); // Executa o logout no Clerk
    navigate("/");   // Redireciona
    };

    // Simulação do utilizador (Clerk)
    const user = { primaryEmailAddress: { emailAddress: "teste@exemplo.com" } };

    const handleSave = () => {
        // Aqui: fetch (PUT/PATCH) para a API para guardar os novos dados
        console.log("A guardar:", userData);
        setIsEditing(false);
    };

    return (
        <div className="pagina-conteudo">
            <FundoConta>
                <BarraSuperiorDashboard />

                <CaixaConta>
                    {isEditing ? (
                        // Modo de edição
                        <div className="modo-edicao">
                            <p className='texto-normal'>Nome</p>
                            <input className='input-seccao-conta'
                                value={userData.nome} 
                                onChange={(e) => setUserData({...userData, nome: e.target.value})} 
                            />
                            <p className='texto-normal'>Profissão</p>
                            <input className='input-seccao-conta'
                                value={userData.profissao} 
                                onChange={(e) => setUserData({...userData, profissao: e.target.value})} 
                            />
                            <BotaoConta texto="Guardar Dados" onClick={handleSave} />
                            <BotaoConta texto="Cancelar" onClick={() => setIsEditing(false)} />
                        </div>
                    ) : (
                        // Modo de visualização
                        <div className="modo-visualizacao">
                            <h2>{userData.nome}</h2>
                            <p>{userData.profissao}</p>
                            <p className="email-display">{user.primaryEmailAddress.emailAddress}</p>
                            
                            <BotaoConta texto="Editar Dados" onClick={() => setIsEditing(true)} />
                            <BotaoConta texto="Mudar de Conta" onClick={handleLogout} />
                        </div>
                    )}
                </CaixaConta>

                <BarraInferiorDashboard />
            </FundoConta>
        </div>
    );
}

export default SeccaoConta;