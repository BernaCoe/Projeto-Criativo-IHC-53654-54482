import "./componentesGlobais.css";

// Uso:
// import {CaixaTonalidade, CaixaEstrutura, CaixaModulacao} from "./GerarSequencia";

import {BotaoOpcoesGerarSequencia} from "./componentesGlobais.jsx";
import CirculoDeQuintas from "./CirculoQuintas.jsx";
import "./componentesGlobais.css";






export function CaixaTonalidade(){
    return(
    <div className="tonalidade-container">
    <p className="texto-normal">Tonalidade</p>
    <CirculoDeQuintas/>
    </div>
    );
}


export function CaixaEstrutura() {
  return (
    <div className="estrutura-container">
      <p className="texto-normal">Estrutura</p>
      <div className="estrutura-botoes">
        <BotaoOpcoesGerarSequencia texto="Aleatório" />
        <BotaoOpcoesGerarSequencia texto="AABA" />
        <BotaoOpcoesGerarSequencia texto="AABC" />
        <BotaoOpcoesGerarSequencia texto="ABAB" />
      </div>
    </div>
  );
}

export function CaixaModulacao() {
  return (
    <div className="modulacao-container">
      <p className="texto-normal">Modulação</p>
      <div className="modulacao-botoes">
        <BotaoOpcoesGerarSequencia texto="Aleatório" />
        <BotaoOpcoesGerarSequencia texto="Relativo" />
        <BotaoOpcoesGerarSequencia texto="Dominante" />
        <BotaoOpcoesGerarSequencia texto="Sub-dominante" />
        <BotaoOpcoesGerarSequencia texto="Paralelo" />
        <BotaoOpcoesGerarSequencia texto="Cromático" />
      </div>
    </div>
  );
}
