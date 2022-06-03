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
//import {  DeleteProduct } from './components/AdminDashboard/DeleteProduct';
import {  UpdateProduct } from './components/AdminDashboard/UpdateProduct';
import { ShoppingCar } from './components/ShoppingCar/ShoppingCar';
import { UserAdmin } from './components/AdminDashboard/UsersAdmin';
import {UserProfile} from './components/UserProfile/UserProfile'
import {UserOrders} from './components/UserProfile/UserOrders'
import {UserAddress} from './components/UserProfile/UserAddress'
import {UserAddressForm} from './components/UserProfile/UserAddressForm'

import { PrivateDash } from './components/AdminDashboard/PrivateDash';
//import { PrivateDeleteDash } from './components/AdminDashboard/PrivateDeleteDash';
import { PrivateUpdate } from './components/AdminDashboard/PrivateUpdate';
import { Dashboard } from './components/AdminDashboard/Dashboard';
import { UserDetail } from './components/AdminDashboard/UserDetail';
import UserFavorites from './components/Favorites/Favorites';



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
        <Route
          path="/admin/"
          element={
            <PrivateDash>
              <Dashboard/>
            </PrivateDash>
          }
        />
        <Route
          path="/admin/post"
          element={
            <PrivateDash>
              <AddProduct />
            </PrivateDash>
          }
        />
        <Route
          path="/admin/update/:id"
          element={
            <PrivateUpdate>
              <UpdateProduct />
            </PrivateUpdate>
          }
        />
         <Route
          path="/admin/users/"
          element={
            <PrivateUpdate>
              <UserAdmin />
            </PrivateUpdate>
          }
        />
           <Route
          path="/admin/users/:id"
          element={
            <PrivateDash>
              <UserDetail/>
            </PrivateDash>
          }
        />
        <Route path='/shoppingCar' element={<ShoppingCar/>}/>
        <Route path='/userProfile' element={<UserProfile/>}/>
        <Route path='/userOrders' element={<UserOrders/>}/>
        <Route path='/userAddress' element={<UserAddress/>}/>
        <Route path='/userAddressForm' element={<UserAddressForm/>}/>
        {/* <Route path='/userHelp' element={<UserHelp/>}/> */}
        <Route path='/userFavorites' element={<UserFavorites/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
