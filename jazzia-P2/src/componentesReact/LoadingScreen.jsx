// Feito por 53654

import React from 'react';
import { ClipLoader } from "react-spinners";
import "./LoadingScreen.css";
import SmartphoneFrame from "../components/SmartphoneFrame";


const LoadingScreen = () => {
  return (
    <SmartphoneFrame>
    <div className="loading-overlay">
      <ClipLoader color="#6D3E0D" size={60} />
      <p className="loading-text">Está a um instante de fazer jazz...</p>
    </div>
    </SmartphoneFrame>
  );
};

export default LoadingScreen;