import logo from './logo.svg';
import './App.css';
import SmartphoneFrame from "../genjazzui/src/components/SmartphoneFrame";
import Router from "../src/navigation/Router";
import GerarSequencia from "./componentesReact/GeraarSequencia";

function App() {
  return (
      


      <SmartphoneFrame>
            <Router/>
            <GerarSequencia/>
      </SmartphoneFrame>


  );
}

export default App;
