import React from 'react';  
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import useWindowSize from '../../lib/hooks/useScreenSize';

const CartFooter = (props) => {

    const cart = useSelector(state => state.cart.items) 
    const screenWidth = useWindowSize().width;

return(
    <div className="card-body border-top cart-footer">
        <button disabled={cart.length == 0 ? "disabled" : ""} className={screenWidth > 600 ? "btn btn-primary float-md-right ml-3" : "btn-sm btn-primary float-md-right ml-3"}><Link className={cart.length == 0 ? "disabled-cart-btn text-light" : "text-light"} to={props.data === null ? '/login' : '/checkout'} >Make Purchase <i className="fa fa-chevron-right"></i></Link></button>
        <button className={screenWidth > 600 ? "btn btn-secondary float-md-right  ml-3" : "btn-sm btn-secondary float-md-right  ml-3"}><Link to='/' className="text-light"> Continue shopping <i className="fa fa-chevron-right"></i></Link></button> 
    </div>)
}
export default CartFooter  