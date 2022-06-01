import './App.css';
import { Routes, Route } from "react-router-dom";
import { NavBar } from './components/NavBar/NavBar';
import { Home } from './components/Home/Home';
import { Products } from './components/Products/Products';
import { CardDetail } from './components/CardDetail/CardDetail';
import {Aboutus} from './components/About/About.jsx'
import Footer from './components/Footer/Footer';
import { AddProduct } from './components/AdminDashboard/AddProduct';
import {Contact} from './components/Contact/Contact';
import Login from './components/Login/Login';
import Register from './components/Login/Register';
import {  DeleteProduct } from './components/AdminDashboard/DeleteProduct';
import {  UpdateProduct } from './components/AdminDashboard/UpdateProduct';
import { ShoppingCar } from './components/ShoppingCar/ShoppingCar';



function App() {
  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/register' element={<Register/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path={`/cardDetail/:id`} element={<CardDetail/>}/>
        <Route path='/about' element={<Aboutus/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/admin/post' element={<AddProduct/>}/>
        <Route path='/admin/delete' element={<DeleteProduct/>}/>
        <Route path='/admin/update/:id' element={<UpdateProduct/>}/>
        <Route path='/shoppingCar' element={<ShoppingCar/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
