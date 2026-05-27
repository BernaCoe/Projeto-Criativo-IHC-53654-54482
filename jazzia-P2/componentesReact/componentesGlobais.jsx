import React from "react";

// Como usar estes componentes:
// import {BotaoNormal, BotaoNaoPopUp, etc } from "./componentesGlobais";

import "./componentesGlobais.css";



export function BotaoNormal({ texto, onClick }) {
  return (
    <button className="botao-normal" onClick={onClick}>
      {texto}
    </button>
  );
}

export function BotaoNaoPopUp({ texto = "Não", onClick }) {
  return (
    <button className="botao-nao-pop-up" onClick={onClick}>
      {texto}
    </button>
  );
}

/* Como usar?
import BotaoNaoPopUp from "./BotaoNaoPopUp";
<BotaoNaoPopUp texto="Não" onClick={() => console.log("Cancelado")} />
*/





