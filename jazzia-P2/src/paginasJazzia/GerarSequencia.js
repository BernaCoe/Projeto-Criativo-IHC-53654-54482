import React from 'react';

import {FundoEstudio, BarraSuperiorNormal, BotaoNormal} from "../componentesReact/componentesGlobais";
import "../componentesReact/componentesGlobais.css";
import {CaixaTonalidade, CaixaEstrutura, CaixaModulacao} from "../componentesReact/GerarSequencia";




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