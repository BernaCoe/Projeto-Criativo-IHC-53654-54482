import './App.css';
import SmartphoneFrame from "./components/SmartphoneFrame";
import Router from "../src/navigation/Router";

function App() {
  return (
    <SmartphoneFrame>
       <Router />
    </SmartphoneFrame>
  );
}

export default App;