// Feitao por 53654

import { useClerk, useUser } from "@clerk/clerk-react";
import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../componentesReact/componentesGlobais.css";
import "../componentesReact/SeccaoConta.css";
import { FundoConta, BarraSuperiorDashboard, BarraInferiorDashboard } from "../componentesReact/componentesGlobais";
import { CaixaConta, BotaoConta } from "../componentesReact/SeccaoConta";





function SeccaoConta() {
    const navigate = useNavigate();
    const { signOut } = useClerk();
    const { user, isLoaded } = useUser();
    
    const handleLogout = async () => {
        await signOut(); // Executa o logout no Clerk
        navigate("/");   // Redireciona para a página inicial
    };

    
    if (!isLoaded) return null;

    return (
        <div className="pagina-conteudo">
            <FundoConta>
                <BarraSuperiorDashboard />

                <CaixaConta>
                    <div className="modo-visualizacao">
                        <h2>Conta</h2>
                        {/* Apenas o email principal */}
                        <p className="email-display">
                            {user?.primaryEmailAddress?.emailAddress || "Carregando..."}
                        </p>
                        
                        {/* Botão para mudar de conta (Logout) */}
                        <BotaoConta texto="Logout" onClick={handleLogout} />
                    </div>
                </CaixaConta>

                <BarraInferiorDashboard />
            </FundoConta>
        </div>
    );
}

export default SeccaoConta;










{/* Queriamos fazer edição de dados, mas desistimos da ideia:
    
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
    
    
    
    */}