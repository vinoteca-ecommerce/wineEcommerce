import './App.css';
import {
  Routes,
  Route,
} from "react-router-dom";
import PreCategory from './components/PreCategory/PreCategory';

function App() {
  return (
    <div className="App">
      {/*PONER SUS RUTAS/COMPONENTES PARA HACER PRUEBAS*/}
      <Routes>
        <Route path="/" element={<PreCategory />} />
      </Routes>
    </div>
  );
}

export default App;
