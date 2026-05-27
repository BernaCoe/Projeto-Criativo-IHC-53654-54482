import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AlterarDadosConta from "../paginasJazzia/AlterarDadosConta";
import GerarSequencia from "../paginasJazzia/GerarSequencia";
import ListaSequencia from "../paginasJazzia/ListaSequencias";
import Login from "../paginasJazzia/Login";
import MudarConta from "../paginasJazzia/MudarConta";
import PaginaEntrada from "../paginasJazzia/PaginaEntrada";
import Registo from "../paginasJazzia/Registo";
import SeccaoConta from "../paginasJazzia/SeccaoConta";
import SeccaoEstudio from "../paginasJazzia/SeccaoEstudio";
import SequenciaGerada from "../paginasJazzia/SequenciaGerada";
import SequenciaGuardada from "../paginasJazzia/SequenciaGuardada";
import VerDados from "../paginasJazzia/VerDadosConta";


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PaginaEntrada />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registo" element={<Registo />} />
        <Route path="/estudio" element={<SeccaoEstudio />} />

        <Route path="/gerarSequencia" element={<GerarSequencia/>} />
        <Route path="/listaSequencia" element={<ListaSequencia />} />
        <Route path="/sequenciaGuardada" element={<SequenciaGuardada />} />
        <Route path="/sequenciaGerada" element={<SequenciaGerada />} />

        <Route path="/conta" element={<SeccaoConta/>} />
        <Route path="/dadosConta" element={<VerDados />} />
        <Route path="/alterarDadosConta" element={<AlterarDadosConta />} />
        <Route path="/mudarConta" element={<MudarConta />} />

      </Routes>
    </BrowserRouter>
  );
};

export default Router;