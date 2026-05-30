// Feito por 53654

import React from "react";
import {useNavigate, useLocation } from 'react-router-dom';
import "./componentesGlobais.css";
import SetaRetrocesso from "../Componentes-Figma/SetaRetrocesso.png";
import BotaoEstudio from '../Componentes-Figma/Botao-seccao-estudio.png';

// Como usar estes componentes:
// import {FundoEstudio, FundoConta, BotaoGrandeEstudio, FundoLogin, FundoEntrada, BarraSuperiorNormal, BarraSuperiorDashboard, BarraInferiorDashboard, BotaoDashboard, BotaoOpcoesGerarSequencia, BotaoNormal, BotaoNaoPopUp, BotaoSimPopUp} from "./componentesGlobais";



export function FundoEstudio({ children }) {
  return (
    <div className="fundo-estudio">
      {children}
    </div>
  );
}



export function FundoLogin({ children }) {
  return (
    <div className="fundo-login">
      {children}
    </div>
  );
}


export function FundoEntrada({ children }) {
  return (
    <div className="fundo-entrada">
      {children}
    </div>
  );
}



export function FundoConta({ children }) {
  return (
    <div className="fundo-conta">
      {children}
    </div>
  );
}




export function BarraSuperiorNormal({ texto = "Voltar" }) {
  const navigate = useNavigate();
  return (
    <div className="barra-superior" onClick={() => navigate(-1)} style={{ cursor: 'pointer' }}>
        <img
        src={SetaRetrocesso}
        alt="Seta de retrocesso"
        className="icone-seta"
      />
      <span className="texto-normal">{texto}</span>
    </div>
  );
}


export function BarraSuperiorDashboard({ texto = "Jazzia - Gera, Toca e Jazz!"}) {
  return (
    <div className="barra-superior">
      <div className="texto-subtitulo" style={{textAlign: 'center', width: '85%'}}>
      {texto}
      </div>
    </div>
  );
}


export function BarraInferiorDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  // Verifica qual é o caminho atual
  const pathname = location.pathname;

  return (
    <div className="barra-inferior">
      <BotaoDashboard 
        texto="Estúdio" 
        // Se já estiver em '/estudio', onClick é nulo (ou vazio), senão navega
        onClick={pathname === '/estudio' ? undefined : () => navigate('/estudio')}
        // prop 'selected' para estilizar o botão
        selected={pathname === '/estudio'}
      />
      
      <BotaoDashboard 
        texto="Conta" 
        // Se já estiver em '/conta', onClick é nulo, senão navega
        onClick={pathname === '/conta' ? undefined : () => navigate('/conta')}
        selected={pathname === '/conta'}
      />
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


export function BotaoNormal({ texto, onClick, disabled }) {
  return (
    <div className="container-botao-centro">
      <button className="botao-normal" onClick={onClick} disabled={disabled}>
        {texto}
      </button>
    </div>
  );
}




export function BotaoGrandeEstudio({ onClick, texto }) {
  return (
    <button className="botao-grande-estudio" onClick={onClick}>
      {texto}
    </button>
  );
}



export function BotaoSequenciaGuardada({ onClick, texto, key }) {
  return (
    <button className="botao-sequencia-guardada" onClick={onClick}>
      {texto}
      {key}
    </button>
  );
}


