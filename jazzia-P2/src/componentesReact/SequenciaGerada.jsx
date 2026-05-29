import React, { useState } from 'react';
import "./componentesGlobais.css";
import './Modais.css'; 


// Uso:
// import {TabelaSequenciaGerada, CaixaSequenciaGerada} from "./SequenciaGerada";

export function CaixaSequenciaGerada({ children }) {
    const caixaStyle = {
        marginTop: '100px',
        width: '250px',
        minHeight: '200px',
        backgroundColor: '#F9D65C', // A tua cor amarela
        borderRadius: '25px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        gap: '25px',
        margin: '0 auto',
        position: 'relative' // Importante para não colidir com o fluxo
    };

    return (
        <div style={caixaStyle}>
            <p className="texto-normal" style={{ margin: 0 }}>Sequência Gerada</p>
            {children}
        </div>
    );
}



// Recebe um array 'acordes' (ex: ["C", "Am", "Dm", "G", ...])
export function TabelaSequenciaGerada({ acordes }) {
  if (!acordes || acordes.length === 0) return null;

  // Garantimos 8 pares (para 16 acordes)
  const pares = [];
  for (let i = 0; i < 8; i++) {
    const acorde1 = acordes[i * 2] || "";
    const acorde2 = acordes[i * 2 + 1] || "";
    pares.push(`${acorde1},  ${acorde2}`);
  }

  // Estilos inline encapsulados
  const tableStyle = {
    width: '220px',
    borderCollapse: 'collapse',
    backgroundColor: '#FBEAAE', // A tua cor de fundo
    margin: '0 auto',
    border: '1px solid #848484'
  };

  const cellStyle = {
    border: '1px solid #848484',
    height: '35px',
    paddingLeft: '10px',
    fontSize: '14px',
    color: '#000000', // Texto preto garantido
    backgroundColor: '#FBEAAE' // Fundo da célula
  };

  return (
    <table style={tableStyle}>
      <tbody>
        <tr>
          <td style={cellStyle}>{pares[0]}</td>
          <td style={cellStyle}>{pares[1]}</td>
        </tr>
        <tr>
          <td style={cellStyle}>{pares[2]}</td>
          <td style={cellStyle}>{pares[3]}</td>
        </tr>
        <tr>
          <td style={cellStyle}>{pares[4]}</td>
          <td style={cellStyle}>{pares[5]}</td>
        </tr>
        <tr>
          <td style={cellStyle}>{pares[6]}</td>
          <td style={cellStyle}>{pares[7]}</td>
        </tr>
      </tbody>
    </table>
  );
}





