import './App.css';
import { Routes, Route } from "react-router-dom";
import { NavBar } from './components/NavBar/NavBar';
import { PreCategory } from './components/PreCategory/PreCategory';
import { Landing } from './components/Landing/Landing';

function App() {
  return (
    <div className="App">
      {/*PONER SUS RUTAS/COMPONENTES PARA HACER PRUEBAS jejeje*/}
      <NavBar/>
      <Routes>
        <Route path='/' element={<PreCategory/>}/>
        <Route path='/' element={<Landing/>}/>
      </Routes>
    </div>
  );
}

export default App;
