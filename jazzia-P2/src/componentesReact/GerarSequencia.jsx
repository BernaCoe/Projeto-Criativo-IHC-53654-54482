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



export function CaixaEstrutura({ onSelect, selectedStructure }) { // <--- Receber aqui
  const opcoes = ["Aleatório", "AABA", "AABC", "ABAB"];
  
  return (
    <div className="estrutura-container">
      <p className="texto-normal">Estrutura</p>
      <div className="estrutura-botoes">
        {opcoes.map((opcao) => (
          <BotaoOpcoesGerarSequencia 
            key={opcao}
            texto={opcao} 
            onClick={() => onSelect(opcao)} 
            isSelected={selectedStructure === opcao} // <--- Passar aqui
          />
        ))}
      </div>
    </div>
  );
}


export function CaixaModulacao({ onSelect, selectedModulation }) {
  const opcoes = ["Random", "Relativo", "Dominante", "Sub-dominante", "Paralelo", "Cromático"];

  return (
    <div className="modulacao-container">
      <p className="texto-normal">Modulação</p>
      <div className="modulacao-botoes">
        {opcoes.map((opcao) => (
          <BotaoOpcoesGerarSequencia 
            key={opcao}
            texto={opcao} 
            onClick={() => onSelect(opcao)} 
            isSelected={selectedModulation === opcao} // Esta é a chave!
          />
        ))}
      </div>
    </div>
  );
}

