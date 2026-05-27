import logo from './logo.svg';
import './App.css';
import SmartphoneFrame from "./components/SmartphoneFrame";
import Router from "../src/navigation/Router";
import GerarSequencia from "./paginasJazzia/GerarSequencia";

function App() {
  return (
      


      <SmartphoneFrame>
            <Router/>
            <GerarSequencia/>
      </SmartphoneFrame>


  );
}

export default App;
