import './App.css';
import {
  Routes,
  Route,
} from "react-router-dom";
import { NavBar } from './components/NavBar/NavBar';

function App() {
  return (
    <div className="App">
      {/*PONER SUS RUTAS/COMPONENTES PARA HACER PRUEBAS jejeje*/}
      <Routes>
        <Route path='/' element={<NavBar/>}/>
      </Routes>
    </div>
  );
}

export default App;
