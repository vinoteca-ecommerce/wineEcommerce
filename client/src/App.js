import './App.css';
import { Routes, Route } from "react-router-dom";
import { NavBar } from './components/NavBar/NavBar';
import { Home } from './components/Home/Home';
import { Products } from './components/Products/Products';
import { CardDetail } from './components/CardDetail/CardDetail';
import {Aboutus} from './components/About/About.jsx'
import Footer from './components/Footer/Footer';
import { AdminDashboard } from './components/AdminDashboard/AdminDashboard';
import {Contact} from './components/Contact/Contact';
import Login from './components/Login/Login';
import Register from './components/Login/Register';
import { DeleteAndUpdate } from './components/AdminDashboard/DeleteAndUpdate';
import { ShoppingCar } from './components/ShoppingCar/ShoppingCar';
import {UserProfile} from './components/UserProfile/UserProfile'
import {UserOrders} from './components/UserProfile/UserOrders'
import {UserDirection} from './components/UserProfile/UserDirection'



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
        <Route path='/admin/post' element={<AdminDashboard/>}/>
        <Route path='/admin/delete' element={<DeleteAndUpdate/>}/>
        <Route path='/shoppingCar' element={<ShoppingCar/>}/>
        <Route path='/userProfile' element={<UserProfile/>}/>
        <Route path='/userOrders' element={<UserOrders/>}/>
        <Route path='/userDirection' element={<UserDirection/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
