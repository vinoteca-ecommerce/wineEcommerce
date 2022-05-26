import './App.css';

import { Routes, Route } from "react-router-dom";
import { NavBar } from './components/NavBar/NavBar';
import { Home } from './components/Home/Home';
import { Products } from './components/Products/Products';
import { CardDetail } from './components/CardDetail/CardDetail';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path={`/cardDetail/:id`} element={<CardDetail/>}/>
      </Routes>
    </div>
  );
}

export default App;
