import React from 'react';

import {FundoEstudio, BarraSuperiorNormal, BotaoNormal} from "./componentesGlobais";
import "./componentesGlobais.css";
import {CaixaTonalidade, CaixaEstrutura, CaixaModulacao} from "./GerarSequencia";




function GerarSequencia(){
    return(
        <FundoEstudio>
        <BarraSuperiorNormal/>
        <CaixaTonalidade/>
        <CaixaEstrutura/>
        <CaixaModulacao/>
        <BotaoNormal texto="Gerar"/>
        
        </FundoEstudio>
    );
}



export default GerarSequencia;