import React from "react";

import "./GerarSequencia.css";

// Este código foi gerado pelo Copilot, por ordem de 53654

const MAJOR = ["C", "G", "D", "A", "E", "B", "F#", "C#", "G#", "D#", "A#", "F"];
const MINOR = ["Am", "Em", "Bm", "F#m", "C#m", "G#m", "D#m", "A#m", "Fm", "Cm", "Gm", "Dm"];

function CirculoQuintas() {
  const size = 400;
  const center = size / 2;

  const radiusMajor = 150;
  const radiusMinor = 110;
  const radiusInner = 70; // terceiro círculo opcional

  return (
    <svg width={size} height={size}>
      {/* círculos base */}
      <circle cx={center} cy={center} r={radiusMajor} fill="#222" stroke="#555" />
      <circle cx={center} cy={center} r={radiusMinor} fill="#333" stroke="#555" />
      <circle cx={center} cy={center} r={radiusInner} fill="#444" stroke="#555" />

      {/* notas maiores */}
      {MAJOR.map((note, i) => {
        const angle = (2 * Math.PI * i) / 12 - Math.PI / 2;
        const x = center + radiusMajor * Math.cos(angle);
        const y = center + radiusMajor * Math.sin(angle);

        return (
          <text
            key={note}
            x={x}
            y={y}
            fill="white"
            fontSize="16"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {note}
          </text>
        );
      })}

      {/* notas menores */}
      {MINOR.map((note, i) => {
        const angle = (2 * Math.PI * i) / 12 - Math.PI / 2;
        const x = center + radiusMinor * Math.cos(angle);
        const y = center + radiusMinor * Math.sin(angle);

        return (
          <text
            key={note}
            x={x}
            y={y}
            fill="#FBEAAE"
            fontSize="14"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {note}
          </text>
        );
      })}

      {/* terceiro círculo (exemplo: modos, categorias, etc.) */}
      {MAJOR.map((_, i) => {
        const angle = (2 * Math.PI * i) / 12 - Math.PI / 2;
        const x = center + radiusInner * Math.cos(angle);
        const y = center + radiusInner * Math.sin(angle);

        return (
          <circle key={i} cx={x} cy={y} r={8} fill="#88f" />
        );
      })}
    </svg>
  );
}

export default CirculoQuintas;
