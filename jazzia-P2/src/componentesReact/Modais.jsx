import React, { useState }  from 'react';
import './Modais.css';


// Uso:
// import {BotaoAzulNormalPopUp, BotaoNaoPopUp, BotaoSimPopUp, ModalSucesso, ModalErroInformativo, ModalErroComDecisao} from "../componentesReact/Modais.jsx"




// Estilos compartilhados entre os modais
const overlayStyle = {
  position: 'fixed',
  top: 0, left: 0, right: 0, bottom: 0,
  background: 'rgba(0,0,0,0.3)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000 // Garante que fica por cima de tudo
};

const caixaBaseStyle = {
  width: '262px',
  height: '176px',
  boxShadow: '0 -2px 4px 0 rgba(0, 0, 0, 0.25), 0 4px 4px 0 rgba(0, 0, 0, 0.50)',
  borderRadius: '25px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '15px',
  gap: '8px',
  textAlign: 'center',
  position: 'relative'
};

const divisorStyle = {
  width: '100%',
  border: '0',
  borderTop: '1px solid #000',
  margin: '5px 0'
};

const corpoModalStyle = {
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};











// Estilo base para todos os botões de modal
const baseButtonStyle = {
  fontFamily: "'Armata', sans-serif", // Define a tua fonte
  fontWeight: 'normal',              // Garante que não é negrito
  padding: '10px 20px',
  borderRadius: '10px',
  border: 'none',
  cursor: 'pointer',
  fontSize: '14px',
  transition: '0.2s'
};





export function BotaoAzulNormalPopUp({ texto, onClick }) {
  return (
    <button onClick={onClick} style={{ ...baseButtonStyle, backgroundColor: '#007bff', color: '#fff' }}>
      {texto}
    </button>
  );
}

export function BotaoNaoPopUp({ texto = "Não", onClick }) {
  return (
    <button onClick={onClick} style={{ ...baseButtonStyle, backgroundColor: '#ff4d4d', color: '#fff' }}>
      {texto}
    </button>
  );
}

export function BotaoSimPopUp({ texto = "Sim", onClick }) {
  return (
    <button onClick={onClick} style={{ ...baseButtonStyle, backgroundColor: '#4CAF50', color: '#fff' }}>
      {texto}
    </button>
  );
}

export function BotaoAzulLargoPopUp({ texto, onClick }) {
  return (
    <button onClick={onClick} style={{ ...baseButtonStyle, backgroundColor: '#007bff', color: '#fff', width: '100px' }}>
      {texto}
    </button>
  );
}




export function ModalSucesso({ mensagem, onClose }) {
  return (
    <div style={overlayStyle}>
      <div style={{ ...caixaBaseStyle, backgroundColor: '#CFFF9E' }}>
        <p style={{ margin: 0, fontWeight: 'bold' }}>Sucesso</p>
        <hr style={divisorStyle} />
        <div style={corpoModalStyle}>
          <p style={{ margin: 0 }}>{mensagem}</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
          <BotaoAzulNormalPopUp texto="OK" onClick={onClose} />
        </div>
      </div>
    </div>
  );
}

export function ModalErroInformativo({ mensagem, onClose }) {
  return (
    <div style={overlayStyle}>
      <div style={{ ...caixaBaseStyle, backgroundColor: '#FFB2D3' }}>
        <p style={{ margin: 0, fontWeight: 'bold' }}>Erro</p>
        <hr style={divisorStyle} />
        <div style={corpoModalStyle}>
          <p style={{ margin: 0 }}>{mensagem}</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
          <BotaoAzulNormalPopUp texto="OK" onClick={onClose} />
        </div>
      </div>
    </div>
  );
}




/* Para Login, Registo, etc*/
export function ModalErroComDecisao({ mensagem, onClose, onConfirm }) {
  return (
    <div style={overlayStyle}>
      <div style={{ ...caixaBaseStyle, backgroundColor: '#FFB2D3' }}>
        <p style={{ margin: 0, fontWeight: 'bold' }}>Erro</p>
        <hr style={divisorStyle} />
        
        <div style={corpoModalStyle}>
          <p style={{ margin: 0 }}>{mensagem}</p>
        </div>

        {/* Container específico para dois botões */}
        <div style={{ 
          display: 'flex', 
          gap: '10px', 
          marginTop: 'auto', 
          width: '100%',
          justifyContent: 'center' 
        }}>
          <BotaoNaoPopUp texto="Não" onClick={onClose} />
          <BotaoSimPopUp texto="Sim" onClick={onConfirm} />
        </div>
      </div>
    </div>
  );
}









export function ModalGuardar({ onClose, onConfirm }) {
  const [nome, setNome] = useState("");

  return (
    <div style={overlayStyle}>
      <div style={{ ...caixaBaseStyle, backgroundColor: '#FFFFFF' }}> {/* Supondo fundo branco para este */}
        <p style={{ margin: 0, fontWeight: 'bold' }}>Guardar Sequência</p>
        <hr style={divisorStyle} />
        
        <p style={{ margin: '5px 0', fontSize: '14px' }}>Defina um nome:</p>
        
        <input 
          type="text" 
          placeholder="Nome..." 
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          style={{
            width: '80%',
            padding: '8px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            marginBottom: '10px'
          }}
        />

        <div style={{ 
          display: 'flex', 
          gap: '10px', 
          marginTop: 'auto', 
          width: '100%',
          justifyContent: 'center' 
        }}>
          <BotaoAzulLargoPopUp texto="Cancelar" onClick={onClose} />
          <BotaoAzulNormalPopUp texto="OK" onClick={() => onConfirm(nome)} />
        </div>
      </div>
    </div>
  );
}