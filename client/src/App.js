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

import { ContactForm } from './components/ContactForm/ContactForm'

import { UserAdmin } from './components/AdminDashboard/UsersAdmin';
import {UserProfile} from './components/UserProfile/UserProfile'
import {UserOrders} from './components/UserProfile/UserOrders'
import {UserAddress} from './components/UserProfile/UserAddress'
import {UserAddressForm} from './components/UserProfile/UserAddressForm'


import { PrivateDash } from './components/AdminDashboard/PrivateDash';
//import { PrivateDeleteDash } from './components/AdminDashboard/PrivateDeleteDash';
import { PrivateUpdate } from './components/AdminDashboard/PrivateUpdate';

import { Confirm } from './components/Confirm/Confirm';

import { Dashboard } from './components/AdminDashboard/Dashboard';
import { UserDetail } from './components/AdminDashboard/UserDetail';
import UserFavorites from './components/Favorites/Favorites';
import { Succes } from './components/ResponePurchase/Succes';

import AfterRegister from './components/Login/AfterRegister';
import ConfirmAccount from './components/Login/ConfirmAccount';

import { Purchase } from './components/AdminDashboard/Purchase';
import { UserOrdersPending } from './components/UserProfile/UserOrdersPending';
import { UserOrdersApproved } from './components/UserProfile/UserOrdersApproved';
import { UserOrdersRejected } from './components/UserProfile/UserOrdersRejected';
import { PurchaseDetail } from './components/AdminDashboard/PurchaseDetail'
import { UserOrdersApprovedId } from './components/UserProfile/UserOrdersApprovedId';
import { UserOrdersDetail } from './components/UserProfile/UserOrdersDetails';
 




function App() {
  return (
    <div className="App">
      <div className='BodyDemo'>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/register' element={<Register/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path={`/cardDetail/:id`} element={<CardDetail/>}/>
        <Route path='/about' element={<Aboutus/>}/>
        <Route path='/contact' element={<ContactForm/>}/>
        <Route path='/confirmmail' element={<AfterRegister/>}/>

        <Route path='/success' element={<Succes/>}/>
        <Route path='/confirm' element={<Confirm/>}/>
        <Route path='/confirmed' element={<ConfirmAccount/>}/>

        <Route
          path='/admin/purchase'
          element={
          <PrivateDash>
            <Purchase/>  
            </PrivateDash>
          }
          />
          <Route
          path='/admin/purchase/detail/:id'
          element={
          <PrivateDash>
            <PurchaseDetail/>  
            </PrivateDash>
          }
          />
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
        <Route path='/userorders' element={<UserOrders/>}/>
        <Route path='/userorders/pending' element={<UserOrdersPending/>}/>
        <Route path='/userorders/approved' element={<UserOrdersApproved/>}/>
        <Route path='/userorders/rejected' element={<UserOrdersRejected/>}/>
        <Route path='/userAddress' element={<UserAddress/>}/>
        <Route path='/userAddressForm' element={<UserAddressForm/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/contactForm' element={<ContactForm/>}/>
        <Route path='/userFavorites' element={<UserFavorites/>}/>
        <Route path='/userorders/approved/:id' element={<UserOrdersApprovedId/>}/>
        <Route path='/user/purchase/detail/:id' element={<UserOrdersDetail/>}/>

      </Routes></div>
      <div className='FooterDemo'><Footer/></div>
      
    </div>
  );
}

export default App;
