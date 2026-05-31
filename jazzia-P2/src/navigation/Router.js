// Feito por 53654

import React from "react";
import {Routes, Route } from "react-router-dom";

import GerarSequencia from "../paginasJazzia/GerarSequencia";
import ListaSequencias from "../paginasJazzia/ListaSequencias";
import Login from "../paginasJazzia/Login";
import PaginaEntrada from "../paginasJazzia/PaginaEntrada";
import SeccaoConta from "../paginasJazzia/SeccaoConta";
import SeccaoEstudio from "../paginasJazzia/SeccaoEstudio";
import SequenciaGerada from "../paginasJazzia/SequenciaGerada";
import SequenciaGuardada from "../paginasJazzia/SequenciaGuardada";



const Router = () => {
  return (
      <Routes>
        <Route path="/" element={<PaginaEntrada />} />
        <Route path="/login" element={<Login />} />
        <Route path="/estudio" element={<SeccaoEstudio />} />

        <Route path="/gerarSequencia" element={<GerarSequencia/>} />
        <Route path="/listaSequencias" element={<ListaSequencias />} />
        <Route path="/sequenciaGuardada" element={<SequenciaGuardada />} />
        <Route path="/sequenciaGerada" element={<SequenciaGerada />} />

        <Route path="/conta" element={<SeccaoConta/>} />

      </Routes>
  );
};

export default Router;

