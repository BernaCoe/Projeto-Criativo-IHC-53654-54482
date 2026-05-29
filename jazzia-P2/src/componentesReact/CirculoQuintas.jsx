import React from "react";
import "./GerarSequencia.css";
import "./componentesGlobais.css";

const MAJOR = ["C", "G", "D", "A", "E", "B", "F#", "C#", "G#", "D#", "A#", "F"];
const MINOR = ["Am", "Em", "Bm", "F#m", "C#m", "G#m", "D#m", "A#m", "Fm", "Cm", "Gm", "Dm"];

function CirculoQuintas({ onSelect, selectedKey }) {
  const size = 300;
  const center = size / 2;
  const rMajor = 120;
  const rMinor = 80;
  // const rInner = 30;



return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Camadas de fundo ajustadas para envolverem as notas com margem uniforme */}
      <circle cx={center} cy={center} r={rMajor + 25} fill="#FBEAAE" stroke="#6D3E0D" strokeWidth="2" style={{ pointerEvents: 'none' }} />
      <circle cx={center} cy={center} r={(rMajor + rMinor) / 2} fill="#FBEAAE" stroke="#6D3E0D" strokeWidth="2" style={{ pointerEvents: 'none' }} />
      <circle cx={center} cy={center} r={rMinor - 20} fill="#fcf8ec" stroke="#6D3E0D" strokeWidth="2" style={{ pointerEvents: 'none' }} />
      
      {/* Notas Maiores e Menores */}
      {[...MAJOR, ...MINOR].map((note, i) => {
        const isMajor = i < 12;
        const index = isMajor ? i : i - 12;
        const radius = isMajor ? rMajor : rMinor;
        const noteSize = isMajor ? 19 : 16;
        const angle = (2 * Math.PI * index) / 12 - Math.PI / 2;
        const isSelected = selectedKey === note;

        return (
          <g key={note} className="circle-group" onClick={() => onSelect(note)}>
            <circle 
              cx={center + radius * Math.cos(angle)} 
              cy={center + radius * Math.sin(angle)} 
              r={noteSize}
              className={`circle-item ${isSelected ? 'selected' : ''}`}
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