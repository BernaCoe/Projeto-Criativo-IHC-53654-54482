import React, { useState } from "react";
import "./GerarSequencia.css";
import "./componentesGlobais.css";

const MAJOR = ["F", "C", "Eb", "Bb", "G", "Ab", "Db", "D", "A", "B", "E", "Gb"];
const MINOR = ["Cmin", "Dmin", "Fmin", "Gmin", "Amin", "Bbmin", "Ebmin", "Bmin", "C#min", "G#min", "F#min", "Emin"];
function CirculoQuintas({ onSelect }) {
  const [selected, setSelected] = useState(null);

  const size = 400;
  const center = size / 2;
  const outerRadius = 195;
  const innerRadius = 150;
  const centerRadius = 70;
  const angleStep = (2 * Math.PI) / 12;

  const handleSelect = (note) => {
    setSelected(note);
    onSelect(note);
  };

  // Função para gerar path de um setor entre dois raios
  const getSectorPath = (index, rOuter, rInner) => {
    const startAngle = index * angleStep - Math.PI / 2 - angleStep / 2;
    const endAngle = startAngle + angleStep;

    const x1Outer = center + rOuter * Math.cos(startAngle);
    const y1Outer = center + rOuter * Math.sin(startAngle);
    const x2Outer = center + rOuter * Math.cos(endAngle);
    const y2Outer = center + rOuter * Math.sin(endAngle);

    const x1Inner = center + rInner * Math.cos(startAngle);
    const y1Inner = center + rInner * Math.sin(startAngle);
    const x2Inner = center + rInner * Math.cos(endAngle);
    const y2Inner = center + rInner * Math.sin(endAngle);

    return `
      M ${x1Outer},${y1Outer}
      A ${rOuter},${rOuter} 0 0 1 ${x2Outer},${y2Outer}
      L ${x2Inner},${y2Inner}
      A ${rInner},${rInner} 0 0 0 ${x1Inner},${y1Inner}
      Z
    `;
  };

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Círculo de fundo exterior */}
      <circle cx={center} cy={center} r={outerRadius} fill="#f8f9fa" stroke="#333" strokeWidth="3" />

      {Array.from({ length: 12 }).map((_, i) => {
        const midAngle = i * angleStep - Math.PI / 2;
        const textRadiusMajor = (outerRadius + innerRadius) / 2;
        const textRadiusMinor = (innerRadius + centerRadius) / 2;

        const majorPath = getSectorPath(i, outerRadius, innerRadius);
        const minorPath = getSectorPath(i, innerRadius, centerRadius);

        return (
          <g key={i}>
            {/* Setor MAIOR (anel externo) */}
            <path
              d={majorPath}
              fill={selected === MAJOR[i] ? "#ffd43b" : "#FBEAAE"}
              stroke="#333"
              strokeWidth="2"
              onClick={() => handleSelect(MAJOR[i])}
              style={{ cursor: "pointer" }}
            />

            {/* Setor MENOR (anel interno) */}
            <path
              d={minorPath}
              fill={selected === MINOR[i] ? "#ffd43b" : "#FBEAAE"}
              stroke="#333"
              strokeWidth="2"
              onClick={() => handleSelect(MINOR[i])}
              style={{ cursor: "pointer" }}
            />

            {/* Texto Maior */}
            <text
              x={center + textRadiusMajor * Math.cos(midAngle)}
              y={center + textRadiusMajor * Math.sin(midAngle)}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="25"
              fill="#000000"
              pointerEvents="none"
            >
              {MAJOR[i]}
            </text>

            {/* Texto Menor */}
            <text
              x={center + textRadiusMinor * Math.cos(midAngle)}
              y={center + textRadiusMinor * Math.sin(midAngle)}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="20"
              fill="#000000"
              pointerEvents="none"
            >
              {MINOR[i]}
            </text>
          </g>
        );
      })}

      {/* Centro - Random */}
      <circle
        cx={center}
        cy={center}
        r={centerRadius}
        fill={selected === "Random" ? "#ffd43b" : "#FBEAAE"}
        stroke="#000000"
        strokeWidth="2"
        onClick={() => handleSelect("Random")}
        style={{ cursor: "pointer" }}
      />
      <text
        x={center}
        y={center}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="25"
        pointerEvents="none"
      >
        Random
      </text>
    </svg>
  );
}

export default CirculoQuintas;
