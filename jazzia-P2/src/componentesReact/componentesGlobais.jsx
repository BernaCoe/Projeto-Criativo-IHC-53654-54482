// Feito por 53654

import React from "react";
import {useNavigate, useLocation } from 'react-router-dom';
import "./componentesGlobais.css";
import SetaRetrocesso from "../Componentes-Figma/SetaRetrocesso.png";

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




export function BarraSuperiorNormal({ texto = "", to }) {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (to) {
      // Se um destino foi especificado, vai para lá
      navigate(to);
    } else {
      // Caso contrário, tenta o histórico
      navigate(-1);
    }
  };

  return (
    <div className="barra-superior" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <img src={SetaRetrocesso} alt="Seta de retrocesso" className="icone-seta" />
      <span className="texto-normal">{texto}</span>
    </div>
  );
}


export function BarraSuperiorDashboard({ texto = "Jazzia - Gera, Toca e Jazz!"}) {
  return (
    <div className="barra-superior">
      <div className="texto-subtitulos" style={{textAlign: 'center', width: '89%', fontSize: '16px'}}>
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
      <span className="texto-normal">{texto}</span>
    </button>
  );
}



export function BotaoSequenciaGuardada({ onClick, texto, textoAcordes }) {
  return (
    <button 
      className="botao-sequencia-guardada" 
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column', // Força os elementos a empilharem-se verticalmente
        alignItems: 'flex-start', // Alinha tudo à esquerda
        width: '100%',            // Garante que o botão usa a largura disponível
        padding: '10px 20px',      // Ajusta o padding para o conteúdo não colar nas bordas
        marginBottom: '-10px'
      }}
    >
      <div style={{marginLeft: '20px', whiteSpace: 'nowrap', marginTop: '18px'}}>
        <span className="texto-normal">{texto || "Nome Indefinido - Consulte IndexedD"}</span>
      </div>
      <div style={{marginLeft: '20px', whiteSpace: 'nowrap'}}>
        <span className="texto-detalhes">{textoAcordes || "Sem Cifras"}</span>
      </div>
    </button>
  );
}


