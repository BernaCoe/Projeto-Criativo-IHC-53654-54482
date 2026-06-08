// Feito por 53654

import React from 'react';
import "./componentesGlobais.css";
import './Modais.css'; 


// Uso:
// import {TabelaSequenciaGerada, CaixaSequenciaGerada} from "./SequenciaGerada";


export function CaixaSequenciaGerada({ nome, children }) {
    const caixaStyle = {
        width: '270px',
        minHeight: '200px',
        backgroundColor: '#F9D65C',
        borderRadius: '25px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        marginTop: '100px',
        gap: '25px',
        margin: '25px',
        position: 'relative'
    };

    return (
        <div style={caixaStyle}>
            <p className="texto-normal" style={{ margin: 0 }}>{nome}</p>
            {children}
        </div>
    );
}




export function TabelaSequenciaGerada({ acordes }) {
  // Converte a string vinda da API num array

  console.log("O que chegou à tabela:", acordes);
  const listaAcordes = typeof acordes === 'string' ? acordes.split('|') : acordes;
  

  if (!acordes || acordes.length === 0) return null;

  // 8 células de tabela (para 16 acordes)
  const celulas = [];

  for (let i = 0; i < 8; i++) {
    const acorde1 = listaAcordes[i * 2] || "";
    const acorde2 = listaAcordes[i * 2 + 1] || "";
    celulas.push(`${acorde1} | ${acorde2}`);
  }

  const tableStyle = {
    width: '270px',
    borderCollapse: 'collapse',
    backgroundColor: '#FBEAAE',
    margin: '0 auto',
    border: '1px solid #848484'
  };

  const cellStyle = {
    border: '1px solid #848484',
    height: '35px',
    paddingLeft: '10px',
    fontSize: '14px',
    color: '#000000',
    backgroundColor: '#FBEAAE'
  };

  const rowStyle = {
  borderBottom: "4px double #848484" // "double" cria o efeito de duas linhas
  };

  return (
      <table style={tableStyle}>
        <tbody>
          <tr style={rowStyle}>
            <td style={cellStyle}>{celulas[0]}</td>
            <td style={cellStyle}>{celulas[1]}</td>
          </tr>
          <tr style={rowStyle}>
            <td style={cellStyle}>{celulas[2]}</td>
            <td style={cellStyle}>{celulas[3]}</td>
          </tr>
          <tr style={rowStyle}>
            <td style={cellStyle}>{celulas[4]}</td>
            <td style={cellStyle}>{celulas[5]}</td>
          </tr>
          <tr>
            <td style={cellStyle}>{celulas[6]}</td>
            <td style={cellStyle}>{celulas[7]}</td>
          </tr>
        </tbody>
      </table>
  );
}





