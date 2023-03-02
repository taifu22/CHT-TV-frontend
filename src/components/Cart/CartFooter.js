import React from 'react';  
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

const CartFooter = (props) => {

    const cart = useSelector(state => state.cart.items) 

return(
    <div className="card-body border-top cart-footer">
        <button disabled={cart.length == 0 ? "disabled" : ""} className="btn btn-primary float-md-right"><Link className={cart.length == 0 ? "disabled-cart-btn text-light" : "text-light"} to={props.data === null ? '/login' : '/checkout'} >Make Purchase <i className="fa fa-chevron-right"></i></Link></button>
        <button className="btn btn-secondary float-md-right  mr-2"><Link to='/' className="text-light"> Continue shopping <i className="fa fa-chevron-right"></i></Link></button> 
    </div>)
}
export default CartFooter  