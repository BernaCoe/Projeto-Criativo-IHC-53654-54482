/* Gerado pelo Gemini, segundo as indicações de 53654 */

import React from "react";
import "./GerarSequencia.css";
import "./componentesGlobais.css";

// Circulo de Quintas Real
// const MAJOR = ["C", "G", "D", "A", "E", "B", "F#", "C#", "G#", "D#", "A#", "F"];
// const MINOR = ["Am", "Em", "Bm", "F#m", "C#m", "G#m", "D#m", "A#m", "Fm", "Cm", "Gm", "Dm"];


// Tons disponíveis na API
const MAJOR = ["C", "G", "D", "A", "E", "B", "Gb", "Db", "Ab", "Eb", "Bb", "F"];
const MINOR = ["Amin", "Emin", "Bmin", "F#min", "C#min", "G#min", "Ebmin", "Bbmin", "Fmin", "Cmin", "Gmin", "Dmin"];


// Lista de tonalidades que a API não processa bem (segundo os meus testes)
const INVALID_KEYS = ["F#", "C#", "G#", "D#", "A#", "F#m", "C#m", "G#m", "D#m", "A#m"];

function CirculoQuintas({ onSelect, selectedKey }) {
  const size = 360;
  const center = size / 2;
  const rMajor = 140;
  const rMinor = 80;
  // const rInner = 30;



return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Camadas de fundo ajustadas para envolverem as notas com margem uniforme */}
      <circle cx={center} cy={center} r={rMajor + 30} fill="#FBEAAE" stroke="#6D3E0D" strokeWidth="2" style={{ pointerEvents: 'none' }} />
      <circle cx={center} cy={center} r={(rMajor + rMinor) / 2} fill="#FBEAAE" stroke="#6D3E0D" strokeWidth="2" style={{ pointerEvents: 'none' }} />
      <circle cx={center} cy={center} r={rMinor - 30} fill="#fcf8ec" stroke="#6D3E0D" strokeWidth="2" style={{ pointerEvents: 'none' }} />
      
      {/* Notas Maiores e Menores */}
      {[...MAJOR, ...MINOR].map((note, i) => {
        const isMajor = i < 12;
        const index = isMajor ? i : i - 12;
        const radius = isMajor ? rMajor : rMinor;
        const noteSize = isMajor ? 26 : 20;
        const angle = (2 * Math.PI * index) / 12 - Math.PI / 2;

        const isInvalid = INVALID_KEYS.includes(note);
        const isSelected = selectedKey === note;

        return (
          <g 
            key={note} 
            // Adiciona a classe 'disabled' se for inválido
            className={`circle-group ${isInvalid ? 'disabled' : ''}`} 
            // Impede o clique se for inválido
            onClick={() => !isInvalid && onSelect(note)}
          >
          <circle 
            cx={center + radius * Math.cos(angle)} 
            cy={center + radius * Math.sin(angle)} 
            r={noteSize}
            // Adiciona a classe 'invalid' para o CSS aplicar o estilo visual
            className={`circle-item ${isSelected ? 'selected' : ''} ${isInvalid ? 'invalid' : ''}`}
          />
              <text 
                x={center + radius * Math.cos(angle)} 
                y={center + radius * Math.sin(angle)}
                className={`circle-label ${isSelected ? 'selected' : ''}`}
                textAnchor="middle" dominantBaseline="middle" fontSize="14"
              >
                {note}
              </text>
            </g>
          );
        })}
    </svg>
  );
}
export default CirculoQuintas;