import React from 'react';  
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home/indexHome'
import About from './Misc/About'
import Help from './Misc/Help'
import Deals from './Misc/Deals'
import Login from './Auth/Login/LoginIndex'
import Register from './Auth/Register/RegisterIndex'
import RegistrationSuccess from './Auth/Register/RegistrationSuccess';
import Checkout from './Checkout/indexCheckout'
import Success from './Checkout/Success'
import Cancel from './Checkout/Cancel'
import Cart from './Cart/indexCart'
import Footer from './Layout/Footer'; 
import Pageprofile from './Misc/Pageprofile';
import '../styles/style.scss'
import Nav from './Layout/Nav';

const App = () => {
  return (
    <div style={{height: 'auto', overflow: 'auto'}}>
      <BrowserRouter> 
        <div className='fixed-top'>
          <Nav />
        </div>
        <Routes> 
          <Route path={'/'} exact element={<Home />} />
          <Route path={'/about'} exact element={<About />} />
          <Route path={'/help'} exact element={<Help />} />
          <Route path={'/deals'} exact element={<Deals />} />
      
          <Route path={'/register'} exact element={<Register />} />
          <Route path={'/registerSuccess'} exact element={<RegistrationSuccess />} />
          <Route path={'/login'} exact element={<Login />} />
          <Route path={'/pageprofile'} exact element={<Pageprofile />} />
      
          <Route path={'/cart'} exact element={<Cart />} />
          <Route path={'/checkout'} exact element={<Checkout />} />
          <Route path={'/success'} exact element={<Success />} />
          <Route path={'/cancel'} exact element={<Cancel />} /> 
        </Routes>
        <div className="fixed-bottom">
            <Footer />
        </div>
      </BrowserRouter> 
    </div>
  );
}
export default App;
