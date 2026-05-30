// Funcionalidades de navegação e estética feitas por 53654
// Funcionalidades de utilizador feitas por 54482


import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "../componentesReact/componentesGlobais.css";
import "../componentesReact/Contas.css";

import {FundoConta, BarraSuperiorDashboard, BarraInferiorDashboard} from "../componentesReact/componentesGlobais";
import {CaixaConta, BotaoConta} from "../componentesReact/SeccaoConta";

import { useUser } from "@clerk/clerk-react";


const BASE_URL = "https://genjazz-api.fly.dev";


function SeccaoConta(){
        const location = useLocation();
        const navigate = useNavigate();
            
        // Temporariamente:
        const user = { primaryEmailAddress: { emailAddress: "teste@exemplo.com" } };
    
        // const { user } = useUser();
        const email = user?.primaryEmailAddress?.emailAddress;
    




        return(
            <div className="pagina-conteudo">
            <FundoConta>
                <BarraSuperiorDashboard/>

                <CaixaConta  nome="Nome Utilizador" profissao="Profissão">
                    
                    <BotaoConta 
                            texto="Ver Dados de Conta"
                            onClick={() => navigate("/dadosConta")} 
                    />
                        
                    <BotaoConta 
                            texto="Mudar de Conta" 
                            onClick={() => navigate("/login")} 
                    />
                
                </CaixaConta>


    
                

    
                <BarraInferiorDashboard/>
                
            </FundoConta>
                </div>
        );
}

export default  SeccaoConta;