// Feito por 53654

import "./componentesGlobais.css";

// Uso:
// import {CaixaTonalidade, CaixaEstrutura, CaixaModulacao} from "./GerarSequencia";

import {BotaoOpcoesGerarSequencia} from "./componentesGlobais.jsx";
import CirculoQuintas from "./CirculoQuintas.jsx";
import "./componentesGlobais.css";





export function CaixaTonalidade({ onSelect, selectedKey }) {
  console.log("Estado atual em PaginaEntrada:", selectedKey);
  return (
    <div className="tonalidade-container">
      <p className="texto-normal">Tonalidade</p>
      <CirculoQuintas 
        onSelect={onSelect} 
        selectedKey={selectedKey} 
      />
    </div>
  );
}



// 1. Recebe 'opcoes' como prop
export function CaixaEstrutura({ onSelect, selectedStructure, opcoes }) {
  
  return (
    <div className="estrutura-container">
      <p className="texto-normal">Estrutura</p>
      
      <select 
        className="input" 
        value={selectedStructure || ""} 
        onChange={(e) => onSelect(e.target.value)}
      >
        {opcoes.map((opcao) => (
          <option key={opcao} value={opcao}>
            {opcao}
          </option>
        ))}
      </select>

    </div>
  );
}


export function CaixaModulacao({ onSelect, selectedModulation, opcoes }) {
  return (
    <div className="modulacao-container">
      <p className="texto-normal">Modulação</p>
      
      <select 
        className="input" 
        value={selectedModulation} 
        onChange={(e) => onSelect(e.target.value)}
      >
        {opcoes.map((opcao) => (
          <option key={opcao} value={opcao}>
            {opcao}
          </option>
        ))}
      </select>


    </div>
  );
}
