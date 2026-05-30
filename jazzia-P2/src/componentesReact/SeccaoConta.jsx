// Feito por 53654

import React from "react";
import "./componentesGlobais.css";




export function CaixaConta({ nome, profissao, children }){
    const caixaContaStyle = {
        width: '280px',
        minHeight: '236px',
        borderRadius: '25px',
        backgroundColor:' #F9D65C',
        marginTop: '100px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        gap: '25px',
        position: 'relative',
        margin: '20px auto' /* O "auto" aqui é o que centra o bloco na página */
    };

    return(
        <div style={caixaContaStyle}>
             <p className="texto-normal" style={{ textAlign: 'left', width: '85%', margin: 0 }}>{nome}</p>
             <p className="texto-detalhes" style={{ textAlign: 'left', width: '85%', margin: 0 }}>{profissao}</p>
            {children}
        </div>
    )
}



export function BotaoConta({ texto, onClick }) {
  return (
    <div className="container-botao-centro">
      <button className="botao-seccao-conta" onClick={onClick}>
        {texto}
      </button>
    </div>
  );
}