import React from "react";

// Como usar estes componentes:
// import {FundoEstudio, FundoConta, BarraSuperiorNormal, BarraSuperiorDashboard, BarraInferiorDashboard, BotaoDashboard, BotaoOpcoesGerarSequencia, BotaoNormal, BotaoNaoPopUp, BotaoSimPopUp} from "./componentesGlobais";

import "./componentesGlobais.css";
import SetaRetrocesso from "../Componentes-Figma/SetaRetrocesso.png";







export function FundoEstudio({ children }) {
  return (
    <div className="fundo-estudio">
      {children}
    </div>
  );
}


export function FundoConta() {
  return (
    <div className="fundo-conta">
    </div>
  );
}





export function BarraSuperiorNormal({ texto = "Voltar ao Estúdio", onClick }) {
  return (
    <div className="barra-superior" onClick={onClick}>
        <img
        src={SetaRetrocesso}
        alt="Seta de retrocesso"
        className="icone-seta"
      />
      <span className="texto-normal">{texto}</span>
    </div>
  );
}


export function BarraSuperiorDashboard({ texto = "Jazzia - Gera, Toca e Jazz!", onClick }) {
  return (
    <div className="barra-superior" onClick={onClick}>
        <img
        src={SetaRetrocesso}
        alt="Seta de retrocesso"
        className="icone-seta"
      />
      
    </div>
  );
}


export function BarraInferiorDashboard() {
  return (
    <div className="barra-inferior">
    <BotaoDashboard texto="Estúdio"/>
    <BotaoDashboard texto="Conta"/>
    </div>
  );
}





export function BotaoDashboard({ texto, onClick }) {
  return (
    <button className="botao-dashboard" onClick={onClick}>
      {texto}
    </button>
  );
}


export function BotaoOpcoesGerarSequencia({ texto, onClick, isSelected }) {
  // Vamos imprimir no console para ver se o React acha que está selecionado
  console.log(`Botão ${texto} - isSelected: ${isSelected}`);

  return (
    <button 
      className={`botao-opcoes-gerar-sequencia ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
    >
      {texto}
    </button>
  );
}


export function BotaoNormal({ texto, onClick }) {
  return (
    <div className="container-botao-centro">
      <button className="botao-normal" onClick={onClick}>
        {texto}
      </button>
    </div>
  );
}



