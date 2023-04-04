import React from 'react';  
const Footer = () => { 
  return (
    <nav className="navbar fixed-bottom navbar-dark bg-primary text-white d-flex justify-content-between nav-footer">
    <div>
      <i role={'button'} className="fa-brands fa-facebook mr-3 fa-lg"></i>
      <i role={'button'} className="fa-brands fa-twitter mr-3 fa-lg"></i>
      <i role={'button'} className="fa-brands fa-instagram fa-lg"></i>
    </div>
        <small>© Copyright CHT-TV - Tous droits reservés  - {new Date().getFullYear()}</small>
    </nav>)
}  
export default Footer  
