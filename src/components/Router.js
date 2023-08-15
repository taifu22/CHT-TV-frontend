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
import DashboardAdmin from './Auth/Admin/DashboardAdmin';
import Erreur_404 from './Misc/Erreur_404';
import { useSelector } from 'react-redux';

const App = () => {

  const user = useSelector(state => {
    if (state.user.users != null) {
      return state.user.users.body.role
    } else {
      return null
    }
  });

  return (
    <div style={{height: 'auto'}}>
      <BrowserRouter> 
        <div className='fixed-top navigation'>
          <Nav />
        </div>
        <Routes> 
          <Route path={'/'} exact element={<Home />} />
          <Route path={'/about'} exact element={<About />} />
          <Route path={'/contact'} exact element={<Help />} />
          <Route path={'/deals'} exact element={<Deals />} />
          <Route path={user === 'admin' ? '/dashboardAdmin/favoris' : '/pageprofil/favoris'} exact element={user === 'admin' ? <DashboardAdmin menu={'favoris'} /> : <Pageprofile menu={'favoris'}/>} /> 
          <Route path={user === 'admin' ? '/dashboardAdmin/messaging' : '/pageprofil/messaging'} exact element={user === 'admin' ? <DashboardAdmin menu={'message'}/> : <Pageprofile menu={'message'}/>} />
          <Route path={'/pageprofil/address'} exact element={<Pageprofile menu={'address'}/>} />
          <Route path={'*'} element={<Erreur_404 />}/> 
      
          <Route path={'/register'} exact element={<Register />} />
          <Route path={'/registerSuccess'} exact element={<RegistrationSuccess />} />
          <Route path={'/login'} exact element={<Login />} />
          <Route path={'/pageprofil'} exact element={<Pageprofile />} />
          <Route path={'/dashboardAdmin'} exact element={user === 'admin' ? <DashboardAdmin /> : <Erreur_404 />} />
      
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
